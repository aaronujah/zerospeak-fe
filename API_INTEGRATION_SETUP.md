# API Integration Setup Guide

This guide explains how to set up the frontend to connect with the backend API.

## Environment Variables

Create a `.env.local` file in the frontend root directory with the following variables:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Database (if using local database)
DATABASE_URL=your-database-url-here
```

## API Services

The following API services have been created:

- `src/lib/api/auth.ts` - Authentication endpoints
- `src/lib/api/users.ts` - User management endpoints
- `src/lib/api/languages.ts` - Language management endpoints
- `src/lib/api/content.ts` - Content management endpoints
- `src/lib/api/progress.ts` - Progress tracking endpoints
- `src/lib/api/lessons.ts` - Lesson management endpoints
- `src/lib/api/journal.ts` - Journal management endpoints
- `src/lib/api/flashcards.ts` - Flashcard management endpoints

## Custom Hooks

The following custom hooks have been created for easy API integration:

- `src/hooks/useApi.ts` - Base API hook with loading states and error handling
- `src/hooks/useFlashcards.ts` - Flashcard-related API calls
- `src/hooks/useJournal.ts` - Journal-related API calls
- `src/hooks/useLessons.ts` - Lesson-related API calls
- `src/hooks/useProgress.ts` - Progress tracking API calls
- `src/hooks/useContent.ts` - Content management API calls
- `src/hooks/useUsers.ts` - User management API calls
- `src/hooks/useLanguages.ts` - Language management API calls

## Usage Example

```typescript
import { useFlashcardDecks } from "@/hooks/useFlashcards";

function FlashcardDecksPage() {
  const { data: decks, loading, error, refetch } = useFlashcardDecks();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {decks?.map((deck) => (
        <div key={deck.id}>{deck.title}</div>
      ))}
    </div>
  );
}
```

## Authentication

The authentication system has been updated to:

1. Try to authenticate with the backend API first
2. Fall back to placeholder accounts for demo purposes
3. Store JWT tokens in localStorage for API calls
4. Automatically refresh tokens when they expire

## Error Handling

The API client includes:

- Automatic token refresh on 401 errors
- Proper error handling with typed error responses
- Loading states for all API calls
- Retry logic for failed requests

## Next Steps

1. Set up the environment variables
2. Start the backend server on port 3001
3. Start the frontend server on port 3000
4. Test the API integration by logging in and navigating through the app

## Testing

To test the integration:

1. Try logging in with backend credentials
2. Navigate to different pages to see API calls in action
3. Check the browser's Network tab to see API requests
4. Verify that data is being fetched from the backend instead of mock data
