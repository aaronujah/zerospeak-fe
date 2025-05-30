import { ContentItem } from "@/types/content";

const topics = [
  "Daily Life",
  "Travel",
  "Food",
  "Culture",
  "History",
  "Science",
  "Technology",
  "Art",
  "Music",
  "Sports",
  "Nature",
  "Business",
  "Health",
  "Education",
  "Entertainment",
  "News",
];

const creators = [
  { name: "María García", avatar: "👩‍🏫", verified: true },
  { name: "Carlos Mendoza", avatar: "👨‍🎓", verified: true },
  { name: "Ana Rodriguez", avatar: "👩‍💼", verified: false },
  { name: "Luis Fernández", avatar: "👨‍🎨", verified: true },
  { name: "Sofia Morales", avatar: "👩‍🔬", verified: false },
  { name: "Diego Santos", avatar: "👨‍🍳", verified: true },
  { name: "Elena Vargas", avatar: "👩‍🎤", verified: false },
  { name: "Pablo Jiménez", avatar: "👨‍⚕️", verified: true },
];

const videoTitles = [
  "A Day in Barcelona: Morning Routine",
  "Cooking Traditional Paella",
  "Spanish Street Art Tour",
  "Learning Spanish Through Music",
  "Mexican Market Adventure",
  "Flamenco Dance Basics",
  "Spanish Coffee Culture",
  "Exploring Madrid Museums",
  "Beach Day in Valencia",
  "Spanish Family Traditions",
  "Tapas Tour in Seville",
  "Spanish Weather Expressions",
  "Shopping in Buenos Aires",
  "Spanish Festivals Explained",
  "Learning Spanish Numbers",
];

const audioTitles = [
  "Spanish Pronunciation Guide",
  "Bedtime Stories in Spanish",
  "Spanish News Summary",
  "Conversational Spanish Practice",
  "Spanish Poetry Reading",
  "Language Learning Tips",
  "Spanish Idioms Explained",
  "Cultural Insights Podcast",
  "Spanish Music Analysis",
  "Interview with Native Speaker",
  "Spanish History Podcast",
  "Travel Spanish Phrases",
  "Spanish Literature Reading",
  "Meditation in Spanish",
  "Spanish Cooking Instructions",
];

const storyTitles = [
  "The Little Prince (Chapter 1)",
  "A Spanish Fairy Tale",
  "Adventures in Mexico City",
  "The Magic Guitar",
  "Journey Through Spain",
  "The Wise Grandmother",
  "Festival of Colors",
  "The Dancing Shoes",
  "Mystery in the Library",
  "The Friendly Dragon",
  "Tales from Argentina",
  "The Musical Cat",
  "Adventure in the Forest",
  "The Kind Baker",
  "Stories from Childhood",
];

function generateMockContent(page: number, limit: number = 10): ContentItem[] {
  const items: ContentItem[] = [];
  const startId = page * limit;

  for (let i = 0; i < limit; i++) {
    const id = startId + i;
    const types: ContentItem["type"][] = ["video", "audio", "story", "podcast"];
    const type = types[Math.floor(Math.random() * types.length)];
    const levels: ContentItem["level"][] = [
      "beginner",
      "intermediate",
      "advanced",
    ];
    const level = levels[Math.floor(Math.random() * levels.length)];

    let title: string;
    switch (type) {
      case "video":
        title = videoTitles[Math.floor(Math.random() * videoTitles.length)];
        break;
      case "audio":
      case "podcast":
        title = audioTitles[Math.floor(Math.random() * audioTitles.length)];
        break;
      case "story":
        title = storyTitles[Math.floor(Math.random() * storyTitles.length)];
        break;
      default:
        title = "Spanish Learning Content";
    }

    const creator = creators[Math.floor(Math.random() * creators.length)];
    const selectedTopics = topics
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);

    const item: ContentItem = {
      id: `content-${id}`,
      type,
      title: `${title} ${id > 0 ? `(${id + 1})` : ""}`,
      description: generateDescription(type, level),
      thumbnail: generateThumbnail(type, id),
      duration: Math.floor(Math.random() * 1800) + 120, // 2-32 minutes
      level,
      language: "Spanish",
      topics: selectedTopics,
      url: `https://example.com/content/${id}`,
      audioUrl:
        type === "video" ? `https://example.com/audio/${id}` : undefined,
      transcript: "Sample transcript available...",
      createdAt: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      views: Math.floor(Math.random() * 10000) + 100,
      likes: Math.floor(Math.random() * 500) + 10,
      isLiked: Math.random() > 0.7,
      isBookmarked: Math.random() > 0.8,
      creator,
      subtitles: [
        { language: "Spanish", url: `https://example.com/subtitles/${id}/es` },
        { language: "English", url: `https://example.com/subtitles/${id}/en` },
      ],
    };

    items.push(item);
  }

  return items;
}

function generateDescription(
  type: ContentItem["type"],
  level: ContentItem["level"]
): string {
  const descriptions = {
    video: [
      "Watch and learn through visual context and natural conversation.",
      "Immerse yourself in authentic Spanish culture and language.",
      "Perfect for visual learners who enjoy cultural content.",
    ],
    audio: [
      "Listen and absorb the natural rhythm of Spanish.",
      "Great for developing your ear for authentic pronunciation.",
      "Perfect for learning on the go or during quiet time.",
    ],
    story: [
      "Engaging narrative that builds vocabulary naturally.",
      "Follow along with captivating stories in Spanish.",
      "Develop comprehension through storytelling.",
    ],
    podcast: [
      "In-depth discussions on Spanish culture and language.",
      "Learn from native speakers in natural conversation.",
      "Perfect for intermediate to advanced learners.",
    ],
  };

  const levelDescriptions = {
    beginner:
      "Designed for new learners with simple vocabulary and clear speech.",
    intermediate: "Moderate pace with everyday vocabulary and expressions.",
    advanced: "Natural speed with complex vocabulary and cultural references.",
  };

  const typeDesc =
    descriptions[type][Math.floor(Math.random() * descriptions[type].length)];
  const levelDesc = levelDescriptions[level];

  return `${typeDesc} ${levelDesc}`;
}

function generateThumbnail(type: ContentItem["type"], id: number): string {
  // Using placeholder images with different themes based on content type
  const themes = {
    video: ["nature", "city", "people", "food", "culture"],
    audio: ["abstract", "music", "waves", "minimal"],
    story: ["books", "fantasy", "adventure", "fairy-tale"],
    podcast: ["microphone", "studio", "conversation", "interview"],
  };

  const theme = themes[type][id % themes[type].length];
  return `https://picsum.photos/400/225?random=${id}&theme=${theme}`;
}

export async function fetchFeedContent(
  page: number = 0,
  limit: number = 10
): Promise<ContentItem[]> {
  // Simulate API delay
  await new Promise((resolve) =>
    setTimeout(resolve, 500 + Math.random() * 1000)
  );

  return generateMockContent(page, limit);
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
