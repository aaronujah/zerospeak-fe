"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";
import { getAuthRedirectUrl } from "@/lib/auth-utils";

interface WithAuthOptions {
  redirectTo?: string;
  loadingComponent?: ComponentType;
}

export default function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const {
    redirectTo = getAuthRedirectUrl(),
    loadingComponent: LoadingComponent,
  } = options;

  return function AuthenticatedComponent(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Still loading

      if (!session) {
        // User is not authenticated, redirect to login
        router.push(redirectTo);
        return;
      }
    }, [session, status, router, redirectTo]);

    // Show loading state while checking authentication
    if (status === "loading") {
      if (LoadingComponent) {
        return <LoadingComponent />;
      }
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      );
    }

    // Show nothing while redirecting
    if (!session) {
      return null;
    }

    // User is authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };
}
