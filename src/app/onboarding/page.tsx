"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface OnboardingData {
  targetLanguage: string;
  currentLevel: "beginner" | "intermediate" | "advanced";
  dailyGoal: number;
  interests: string[];
  learningStyle: string;
  motivation: string;
}

const languages = [
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
];

const interests = [
  { id: "stories", name: "Stories & Tales", icon: "📚" },
  { id: "daily-life", name: "Daily Life", icon: "🏠" },
  { id: "culture", name: "Culture & Traditions", icon: "🎭" },
  { id: "food", name: "Food & Cooking", icon: "🍳" },
  { id: "travel", name: "Travel & Places", icon: "✈️" },
  { id: "nature", name: "Nature & Animals", icon: "🌿" },
  { id: "music", name: "Music & Arts", icon: "🎵" },
  { id: "sports", name: "Sports & Activities", icon: "⚽" },
  { id: "technology", name: "Technology", icon: "💻" },
  { id: "history", name: "History", icon: "🏛️" },
];

export default function OnboardingPage() {
  const {} = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    targetLanguage: "",
    currentLevel: "beginner",
    dailyGoal: 15,
    interests: [],
    learningStyle: "visual",
    motivation: "",
  });

  const totalSteps = 7;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);

    try {
      // Send onboarding data to backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/complete-onboarding`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to complete onboarding:", errorData);
        // Still redirect to completion page even if backend call fails
      }

      // Redirect to completion page
      router.push("/onboarding/complete");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      // Still redirect to completion page even if there's an error
      router.push("/onboarding/complete");
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = (
    field: keyof OnboardingData,
    value: string | number | string[]
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interestId: string) => {
    setData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <LanguageStep data={data} updateData={updateData} />;
      case 3:
        return <LevelStep data={data} updateData={updateData} />;
      case 4:
        return <InterestsStep data={data} toggleInterest={toggleInterest} />;
      case 5:
        return <LearningStyleStep data={data} updateData={updateData} />;
      case 6:
        return <GoalStep data={data} updateData={updateData} />;
      case 7:
        return <MotivationStep data={data} updateData={updateData} />;
      default:
        return <WelcomeStep />;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return data.targetLanguage !== "";
      case 3:
        return data.currentLevel !== "";
      case 4:
        return data.interests.length > 0;
      case 5:
        return data.learningStyle !== "";
      case 6:
        return data.dailyGoal > 0;
      case 7:
        return data.motivation.trim() !== "";
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-slate-500">
                {Math.round((currentStep / totalSteps) * 100)}% complete
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 min-h-[500px]">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={currentStep === 1 ? "invisible" : ""}
            >
              Back
            </Button>

            {currentStep === totalSteps ? (
              <Button
                onClick={handleComplete}
                disabled={!canProceed() || isLoading}
                isLoading={isLoading}
                size="lg"
              >
                Complete Setup
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!canProceed()} size="lg">
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components
function WelcomeStep() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-3xl mb-6">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-slate-900 mb-4">
        Welcome to Zerospeak! 🎉
      </h1>

      <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto">
        Let's set up your personalized language learning journey. This will only
        take a few minutes.
      </p>

      <div className="bg-emerald-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-emerald-900 mb-3">
          How Zerospeak Works
        </h3>
        <div className="text-left space-y-3 text-emerald-800">
          <div className="flex items-start space-x-3">
            <span className="text-emerald-500 mt-1">🧠</span>
            <p>
              <strong>Natural Learning:</strong> Just like babies learn their
              first language through understanding
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-emerald-500 mt-1">👂</span>
            <p>
              <strong>Listen First:</strong> Focus on comprehension before
              speaking
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-emerald-500 mt-1">🎯</span>
            <p>
              <strong>Zero Pressure:</strong> No tests, quizzes, or forced
              output
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-emerald-500 mt-1">📚</span>
            <p>
              <strong>Rich Content:</strong> Stories, videos, and audio with
              visual support
            </p>
          </div>
        </div>
      </div>

      <p className="text-slate-500">
        Ready to begin your natural language acquisition journey?
      </p>
    </div>
  );
}

function LanguageStep({
  data,
  updateData,
}: {
  data: OnboardingData;
  updateData: Function;
}) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Which language would you like to learn?
        </h2>
        <p className="text-slate-600">
          Choose the language you want to acquire naturally through
          comprehensible input.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => updateData("targetLanguage", language.code)}
            className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
              data.targetLanguage === language.code
                ? "border-emerald-500 bg-emerald-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="text-3xl mb-2">{language.flag}</div>
            <div className="font-medium text-slate-900">{language.name}</div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl">
        <p className="text-sm text-blue-800">
          <strong>Don't see your language?</strong> We're constantly adding new
          languages. Contact us and we'll prioritize it!
        </p>
      </div>
    </div>
  );
}

function LevelStep({
  data,
  updateData,
}: {
  data: OnboardingData;
  updateData: Function;
}) {
  const levels = [
    {
      id: "beginner",
      name: "Beginner",
      description: "I know little to no words in this language",
      icon: "🌱",
    },
    {
      id: "intermediate",
      name: "Intermediate",
      description: "I can understand simple conversations",
      icon: "🌳",
    },
    {
      id: "advanced",
      name: "Advanced",
      description: "I can understand most content but want to improve",
      icon: "🌲",
    },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          What's your current level?
        </h2>
        <p className="text-slate-600">
          Don't worry about being exact - we'll adjust content based on your
          comprehension.
        </p>
      </div>

      <div className="space-y-4">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => updateData("currentLevel", level.id)}
            className={`w-full p-6 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${
              data.currentLevel === level.id
                ? "border-emerald-500 bg-emerald-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-start space-x-4">
              <span className="text-3xl">{level.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {level.name}
                </h3>
                <p className="text-slate-600">{level.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-emerald-50 rounded-xl">
        <p className="text-sm text-emerald-800">
          <strong>Remember:</strong> In ALG, your level doesn't limit you. We
          provide content slightly above your current understanding to promote
          natural acquisition.
        </p>
      </div>
    </div>
  );
}

function InterestsStep({
  data,
  toggleInterest,
}: {
  data: OnboardingData;
  toggleInterest: Function;
}) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          What interests you?
        </h2>
        <p className="text-slate-600">
          Select topics you enjoy. We'll personalize your content to keep you
          engaged.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {interests.map((interest) => (
          <button
            key={interest.id}
            onClick={() => toggleInterest(interest.id)}
            className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
              data.interests.includes(interest.id)
                ? "border-emerald-500 bg-emerald-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="text-2xl mb-2">{interest.icon}</div>
            <div className="font-medium text-slate-900 text-sm">
              {interest.name}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Choose at least 3-4 interests for the best
          content variety. You can always change these later!
        </p>
      </div>
    </div>
  );
}

function GoalStep({
  data,
  updateData,
}: {
  data: OnboardingData;
  updateData: Function;
}) {
  const goalOptions = [5, 10, 15, 20, 30, 45, 60];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Daily listening goal
        </h2>
        <p className="text-slate-600">
          How many minutes per day would you like to spend with comprehensible
          input?
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {goalOptions.map((minutes) => (
          <button
            key={minutes}
            onClick={() => updateData("dailyGoal", minutes)}
            className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
              data.dailyGoal === minutes
                ? "border-emerald-500 bg-emerald-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="text-2xl font-bold text-slate-900">{minutes}</div>
            <div className="text-sm text-slate-600">min</div>
          </button>
        ))}
      </div>

      <div className="bg-emerald-50 rounded-xl p-6">
        <h3 className="font-semibold text-emerald-900 mb-3">
          Why daily exposure matters:
        </h3>
        <div className="space-y-2 text-emerald-800 text-sm">
          <p>
            • <strong>Consistency beats intensity:</strong> 15 minutes daily is
            better than 2 hours once a week
          </p>
          <p>
            • <strong>Natural rhythm:</strong> Regular exposure helps your brain
            internalize patterns
          </p>
          <p>
            • <strong>Sustainable progress:</strong> Small daily habits lead to
            big results
          </p>
        </div>
      </div>
    </div>
  );
}

function LearningStyleStep({
  data,
  updateData,
}: {
  data: OnboardingData;
  updateData: Function;
}) {
  const learningStyles = [
    {
      id: "visual",
      name: "Visual",
      description: "I learn best with images, videos, and visual cues",
      icon: "👁️",
    },
    {
      id: "auditory",
      name: "Auditory",
      description: "I learn best by listening and hearing",
      icon: "👂",
    },
    {
      id: "kinesthetic",
      name: "Kinesthetic",
      description: "I learn best through movement and hands-on activities",
      icon: "🤲",
    },
    {
      id: "reading-writing",
      name: "Reading/Writing",
      description: "I learn best through text and written materials",
      icon: "📝",
    },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          How do you learn best?
        </h2>
        <p className="text-slate-600">
          Choose your preferred learning style to help us personalize your
          content experience.
        </p>
      </div>

      <div className="space-y-4">
        {learningStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => updateData("learningStyle", style.id)}
            className={`w-full p-6 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${
              data.learningStyle === style.id
                ? "border-emerald-500 bg-emerald-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-start space-x-4">
              <span className="text-3xl">{style.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {style.name}
                </h3>
                <p className="text-slate-600">{style.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-emerald-50 rounded-xl">
        <p className="text-sm text-emerald-800">
          <strong>Note:</strong> We'll use this to optimize your content, but
          you'll still get a variety of learning materials to keep things
          engaging!
        </p>
      </div>
    </div>
  );
}

function MotivationStep({
  data,
  updateData,
}: {
  data: OnboardingData;
  updateData: Function;
}) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          What motivates you to learn?
        </h2>
        <p className="text-slate-600">
          Tell us about your language learning goals. This helps us encourage
          you along the way.
        </p>
      </div>

      <div className="space-y-6">
        <Input
          label="Your motivation (optional but recommended)"
          placeholder="e.g., I want to connect with my heritage, travel to Spain, understand anime without subtitles..."
          value={data.motivation}
          onChange={(e) => updateData("motivation", e.target.value)}
          className="min-h-[100px]"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6">
            <h3 className="font-semibold text-emerald-900 mb-3">
              🎯 Your Journey Ahead
            </h3>
            <ul className="space-y-2 text-emerald-800 text-sm">
              <li>• Personalized daily content feed</li>
              <li>• Progress tracking without pressure</li>
              <li>• Rich visual and audio stories</li>
              <li>• Natural comprehension development</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-3">💡 Remember</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• No pressure to speak early</li>
              <li>• Understanding comes before production</li>
              <li>• Every minute of input counts</li>
              <li>• Trust the natural process</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
