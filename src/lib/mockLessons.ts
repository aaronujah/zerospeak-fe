import { Lesson } from "@/types/lessons";

export const mockLessons: Lesson[] = [
  // Grammar Lessons
  {
    id: "lesson-1",
    title: "Introduction to Spanish Grammar",
    description:
      "Learn the fundamentals of Spanish grammar structure and basic rules.",
    duration: 15,
    type: "grammar",
    level: "beginner",
    isCompleted: true,
    isLocked: false,
    contentType: "article",
    articleContent: {
      content: `
        <h2>Understanding Spanish Grammar Basics</h2>
        <p>Spanish grammar follows logical patterns that, once understood, make learning much easier. Let's explore the fundamental structure of the Spanish language.</p>
        
        <h3>Word Order in Spanish</h3>
        <p>Like English, Spanish typically follows a Subject-Verb-Object (SVO) pattern:</p>
        <ul>
          <li><strong>María</strong> (subject) <strong>come</strong> (verb) <strong>manzanas</strong> (object)</li>
          <li>María eats apples</li>
        </ul>
        
        <h3>Gender and Number Agreement</h3>
        <p>One of the most important concepts in Spanish is that nouns have gender (masculine or feminine) and number (singular or plural). Adjectives must agree with the nouns they describe.</p>
        
        <h3>Verb Conjugation Patterns</h3>
        <p>Spanish verbs change their endings based on who is performing the action. This is called conjugation, and it's one of the key differences from English.</p>
      `,
      images: [
        {
          url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
          caption: "Spanish grammar follows logical patterns",
          alt: "Books and grammar charts on a desk",
        },
      ],
    },
    order: 1,
  },
  {
    id: "lesson-2",
    title: "Articles: El, La, Los, Las",
    description: "Master the use of definite articles in Spanish.",
    duration: 20,
    type: "grammar",
    level: "beginner",
    isCompleted: true,
    isLocked: false,
    contentType: "video",
    videoUrl: "https://example.com/video1.mp4",
    order: 2,
  },
  {
    id: "lesson-3",
    title: "Noun Gender and Number",
    description:
      "Understand masculine/feminine nouns and singular/plural forms.",
    duration: 25,
    type: "grammar",
    level: "beginner",
    isCompleted: false,
    isLocked: false,
    contentType: "article",
    articleContent: {
      content: `
        <h2>Spanish Noun Gender: Masculine vs Feminine</h2>
        <p>Every Spanish noun is either masculine or feminine. While this might seem arbitrary, there are patterns that can help you identify the gender of most nouns.</p>
        
        <h3>General Rules for Masculine Nouns</h3>
        <p>Most nouns ending in <strong>-o</strong> are masculine:</p>
        <ul>
          <li>el libro (the book)</li>
          <li>el carro (the car)</li>
          <li>el perro (the dog)</li>
        </ul>
        
        <h3>General Rules for Feminine Nouns</h3>
        <p>Most nouns ending in <strong>-a</strong> are feminine:</p>
        <ul>
          <li>la mesa (the table)</li>
          <li>la casa (the house)</li>
          <li>la gata (the female cat)</li>
        </ul>
        
        <h3>Making Nouns Plural</h3>
        <p>To make Spanish nouns plural, follow these simple rules:</p>
        <ul>
          <li>If the noun ends in a vowel, add <strong>-s</strong></li>
          <li>If the noun ends in a consonant, add <strong>-es</strong></li>
        </ul>
      `,
      images: [
        {
          url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop",
          caption: "Masculine and feminine articles in Spanish",
          alt: "Spanish language learning materials",
        },
        {
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
          caption: "Practice makes perfect with Spanish grammar",
          alt: "Student practicing Spanish grammar",
        },
      ],
    },
    order: 3,
  },
  {
    id: "lesson-4",
    title: "Present Tense Verbs",
    description: "Learn regular -ar, -er, and -ir verb conjugations.",
    duration: 30,
    type: "grammar",
    level: "beginner",
    isCompleted: false,
    isLocked: true,
    contentType: "video",
    videoUrl: "https://example.com/video2.mp4",
    order: 4,
  },
  {
    id: "lesson-5",
    title: "Irregular Verbs: Ser and Estar",
    description: "Master the difference between 'to be' verbs in Spanish.",
    duration: 35,
    type: "grammar",
    level: "intermediate",
    isCompleted: false,
    isLocked: true,
    contentType: "article",
    articleContent: {
      content: `
        <h2>Ser vs Estar: The Two "To Be" Verbs</h2>
        <p>Spanish has two verbs that mean "to be": <strong>ser</strong> and <strong>estar</strong>. Understanding when to use each one is crucial for speaking Spanish correctly.</p>
        
        <h3>When to Use SER</h3>
        <p>Use <strong>ser</strong> for permanent or unchanging characteristics:</p>
        <ul>
          <li><strong>Identity:</strong> Soy María (I am María)</li>
          <li><strong>Origin:</strong> Soy de México (I am from Mexico)</li>
          <li><strong>Profession:</strong> Soy médico (I am a doctor)</li>
          <li><strong>Physical characteristics:</strong> Es alto (He is tall)</li>
        </ul>
        
        <h3>When to Use ESTAR</h3>
        <p>Use <strong>estar</strong> for temporary states or locations:</p>
        <ul>
          <li><strong>Location:</strong> Estoy en casa (I am at home)</li>
          <li><strong>Emotions:</strong> Estoy feliz (I am happy)</li>
          <li><strong>Temporary conditions:</strong> Está cansado (He is tired)</li>
          <li><strong>Progressive tenses:</strong> Estoy estudiando (I am studying)</li>
        </ul>
      `,
      images: [
        {
          url: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=400&fit=crop",
          caption: "Understanding the difference between ser and estar",
          alt: "Spanish verb conjugation chart",
        },
      ],
    },
    order: 5,
  },
  {
    id: "lesson-6",
    title: "Past Tense (Pretérito)",
    description:
      "Learn to express actions in the past with regular and irregular verbs.",
    duration: 40,
    type: "grammar",
    level: "intermediate",
    isCompleted: false,
    isLocked: true,
    contentType: "video",
    videoUrl: "https://example.com/video3.mp4",
    order: 6,
  },

  // Alphabet Lessons
  {
    id: "alphabet-1",
    title: "Spanish Alphabet Overview",
    description: "Introduction to the 27 letters of the Spanish alphabet.",
    duration: 12,
    type: "alphabet",
    level: "beginner",
    isCompleted: true,
    isLocked: false,
    contentType: "audio",
    audioUrl: "https://example.com/audio1.mp3",
    order: 7,
  },
  {
    id: "alphabet-2",
    title: "Vowels: A, E, I, O, U",
    description: "Master Spanish vowel pronunciation and sounds.",
    duration: 18,
    type: "alphabet",
    level: "beginner",
    isCompleted: true,
    isLocked: false,
    contentType: "article",
    articleContent: {
      content: `
        <h2>Spanish Vowels: Pure and Consistent</h2>
        <p>Spanish vowels are much simpler than English vowels. Each vowel has only one sound, making pronunciation predictable and easy to learn.</p>
        
        <h3>The Five Spanish Vowels</h3>
        <p>Spanish has exactly five vowel sounds, and they never change:</p>
        
        <h4>A - /a/ (ah)</h4>
        <p>Like the 'a' in "father" or "car"</p>
        <ul>
          <li>casa (house)</li>
          <li>gato (cat)</li>
          <li>mano (hand)</li>
        </ul>
        
        <h4>E - /e/ (eh)</h4>
        <p>Like the 'e' in "bed" or "pet"</p>
        <ul>
          <li>perro (dog)</li>
          <li>mesa (table)</li>
          <li>verde (green)</li>
        </ul>
        
        <h4>I - /i/ (ee)</h4>
        <p>Like the 'ee' in "seen" or "machine"</p>
        <ul>
          <li>libro (book)</li>
          <li>niño (child)</li>
          <li>timido (shy)</li>
        </ul>
        
        <h4>O - /o/ (oh)</h4>
        <p>Like the 'o' in "more" or "door"</p>
        <ul>
          <li>cosa (thing)</li>
          <li>poco (little)</li>
          <li>globo (balloon)</li>
        </ul>
        
        <h4>U - /u/ (oo)</h4>
        <p>Like the 'oo' in "moon" or "boot"</p>
        <ul>
          <li>luna (moon)</li>
          <li>grupo (group)</li>
          <li>futuro (future)</li>
        </ul>
      `,
      images: [
        {
          url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop",
          caption: "Spanish vowels are pure and consistent",
          alt: "Spanish alphabet pronunciation guide",
        },
      ],
    },
    order: 8,
  },
  {
    id: "alphabet-3",
    title: "Consonants and Special Letters",
    description: "Learn ñ, ll, rr and other Spanish-specific sounds.",
    duration: 22,
    type: "alphabet",
    level: "beginner",
    isCompleted: false,
    isLocked: false,
    contentType: "audio",
    audioUrl: "https://example.com/audio2.mp3",
    order: 9,
  },
  {
    id: "alphabet-4",
    title: "Letter Combinations and Digraphs",
    description: "Understanding ch, ll, rr and other special combinations.",
    duration: 25,
    type: "alphabet",
    level: "intermediate",
    isCompleted: false,
    isLocked: true,
    contentType: "article",
    articleContent: {
      content: `
        <h2>Spanish Letter Combinations and Digraphs</h2>
        <p>Spanish has several special letter combinations that create unique sounds. These are called digraphs - two letters that together make one sound.</p>
        
        <h3>CH - /ch/</h3>
        <p>Pronounced like 'ch' in "church"</p>
        <ul>
          <li>chocolate (chocolate)</li>
          <li>muchacho (boy)</li>
          <li>noche (night)</li>
        </ul>
        
        <h3>LL - /y/ or /j/</h3>
        <p>Traditionally a 'ly' sound, but often pronounced like 'y' in "yes"</p>
        <ul>
          <li>llama (flame/llama)</li>
          <li>pollo (chicken)</li>
          <li>calle (street)</li>
        </ul>
        
        <h3>RR - /rr/</h3>
        <p>A strong rolling 'r' sound</p>
        <ul>
          <li>perro (dog)</li>
          <li>carro (car)</li>
          <li>horrible (horrible)</li>
        </ul>
        
        <h3>Ñ - /ñ/</h3>
        <p>Like 'ny' in "canyon"</p>
        <ul>
          <li>niño (child)</li>
          <li>año (year)</li>
          <li>España (Spain)</li>
        </ul>
      `,
      images: [
        {
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
          caption: "Special Spanish letter combinations",
          alt: "Spanish pronunciation practice",
        },
      ],
    },
    order: 10,
  },

  // Phonetics Lessons
  {
    id: "phonetics-1",
    title: "Spanish Sound System",
    description: "Overview of Spanish phonetics and pronunciation rules.",
    duration: 20,
    type: "phonetics",
    level: "intermediate",
    isCompleted: false,
    isLocked: false,
    contentType: "video",
    videoUrl: "https://example.com/video4.mp4",
    order: 11,
  },
  {
    id: "phonetics-2",
    title: "Stress and Accent Marks",
    description: "Learn Spanish stress patterns and when to use accents.",
    duration: 25,
    type: "phonetics",
    level: "intermediate",
    isCompleted: false,
    isLocked: false,
    contentType: "article",
    articleContent: {
      content: `
        <h2>Spanish Stress Patterns and Accent Marks</h2>
        <p>Understanding where to place stress in Spanish words is crucial for clear pronunciation and proper spelling.</p>
        
        <h3>Natural Stress Rules</h3>
        <p>Spanish has predictable stress patterns:</p>
        
        <h4>Words ending in vowels, -n, or -s</h4>
        <p>Stress falls on the second-to-last syllable (penultimate):</p>
        <ul>
          <li>ca-<strong>sa</strong> (house)</li>
          <li>ha-<strong>blan</strong> (they speak)</li>
          <li>li-<strong>bros</strong> (books)</li>
        </ul>
        
        <h4>Words ending in consonants (except -n or -s)</h4>
        <p>Stress falls on the last syllable:</p>
        <ul>
          <li>ciu-<strong>dad</strong> (city)</li>
          <li>co-<strong>mer</strong> (to eat)</li>
          <li>re-<strong>loj</strong> (clock)</li>
        </ul>
        
        <h3>When to Use Accent Marks</h3>
        <p>Accent marks (tildes) are used when the stress doesn't follow the natural rules:</p>
        <ul>
          <li><strong>médico</strong> (doctor) - stress on third-to-last syllable</li>
          <li><strong>café</strong> (coffee) - stress on last syllable of vowel-ending word</li>
          <li><strong>inglés</strong> (English) - stress on last syllable of -s ending word</li>
        </ul>
      `,
      images: [
        {
          url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
          caption: "Spanish accent marks follow clear rules",
          alt: "Spanish accent and stress pattern guide",
        },
      ],
    },
    order: 12,
  },
  {
    id: "phonetics-3",
    title: "Regional Pronunciation Differences",
    description:
      "Explore pronunciation variations across Spanish-speaking countries.",
    duration: 30,
    type: "phonetics",
    level: "intermediate",
    isCompleted: false,
    isLocked: true,
    contentType: "video",
    videoUrl: "https://example.com/video5.mp4",
    order: 13,
  },
  {
    id: "phonetics-4",
    title: "Intonation and Rhythm",
    description: "Master Spanish sentence melody and natural speech patterns.",
    duration: 28,
    type: "phonetics",
    level: "advanced",
    isCompleted: false,
    isLocked: true,
    contentType: "audio",
    audioUrl: "https://example.com/audio3.mp3",
    order: 14,
  },

  // Vocabulary Lessons
  {
    id: "vocab-1",
    title: "Essential Daily Vocabulary",
    description:
      "Learn the most common words used in everyday Spanish conversations.",
    duration: 15,
    type: "vocabulary",
    level: "beginner",
    isCompleted: true,
    isLocked: false,
    contentType: "interactive",
    order: 15,
  },
  {
    id: "vocab-2",
    title: "Family and Relationships",
    description: "Vocabulary for describing family members and relationships.",
    duration: 20,
    type: "vocabulary",
    level: "beginner",
    isCompleted: false,
    isLocked: true,
    contentType: "article",
    articleContent: {
      content: `
        <h2>Family and Relationships in Spanish</h2>
        <p>Learning family vocabulary is essential for personal conversations in Spanish. Let's explore how to talk about your family members and relationships.</p>
        
        <h3>Immediate Family - La Familia Inmediata</h3>
        <ul>
          <li><strong>los padres</strong> - parents</li>
          <li><strong>el padre / papá</strong> - father / dad</li>
          <li><strong>la madre / mamá</strong> - mother / mom</li>
          <li><strong>el hijo</strong> - son</li>
          <li><strong>la hija</strong> - daughter</li>
          <li><strong>los hijos</strong> - children</li>
          <li><strong>el hermano</strong> - brother</li>
          <li><strong>la hermana</strong> - sister</li>
        </ul>
        
        <h3>Extended Family - La Familia Extendida</h3>
        <ul>
          <li><strong>los abuelos</strong> - grandparents</li>
          <li><strong>el abuelo</strong> - grandfather</li>
          <li><strong>la abuela</strong> - grandmother</li>
          <li><strong>el tío</strong> - uncle</li>
          <li><strong>la tía</strong> - aunt</li>
          <li><strong>el primo / la prima</strong> - cousin</li>
          <li><strong>el nieto / la nieta</strong> - grandson / granddaughter</li>
        </ul>
        
        <h3>Relationships - Las Relaciones</h3>
        <ul>
          <li><strong>el novio / la novia</strong> - boyfriend / girlfriend</li>
          <li><strong>el esposo / el marido</strong> - husband</li>
          <li><strong>la esposa / la mujer</strong> - wife</li>
          <li><strong>estar casado/a</strong> - to be married</li>
          <li><strong>estar soltero/a</strong> - to be single</li>
        </ul>
      `,
      images: [
        {
          url: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop",
          caption: "Family is central to Spanish-speaking cultures",
          alt: "Happy family gathering",
        },
      ],
    },
    order: 16,
  },
  {
    id: "vocab-3",
    title: "Food and Dining",
    description: "Essential vocabulary for restaurants, cooking, and food.",
    duration: 25,
    type: "vocabulary",
    level: "intermediate",
    isCompleted: false,
    isLocked: true,
    contentType: "video",
    videoUrl: "https://example.com/video6.mp4",
    order: 17,
  },

  // Conversation Lessons
  {
    id: "conversation-1",
    title: "Basic Greetings and Introductions",
    description: "Learn how to greet people and introduce yourself in Spanish.",
    duration: 18,
    type: "conversation",
    level: "beginner",
    isCompleted: true,
    isLocked: false,
    contentType: "audio",
    audioUrl: "https://example.com/audio4.mp3",
    order: 18,
  },
  {
    id: "conversation-2",
    title: "Asking for Directions",
    description: "Practice asking for and giving directions in Spanish.",
    duration: 22,
    type: "conversation",
    level: "intermediate",
    isCompleted: false,
    isLocked: true,
    contentType: "interactive",
    order: 19,
  },
  {
    id: "conversation-3",
    title: "Shopping and Numbers",
    description: "Learn to shop, negotiate prices, and use numbers in context.",
    duration: 26,
    type: "conversation",
    level: "intermediate",
    isCompleted: false,
    isLocked: true,
    contentType: "video",
    videoUrl: "https://example.com/video7.mp4",
    order: 20,
  },
];

export const fetchLessons = async (
  type?: string,
  level?: string
): Promise<Lesson[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filtered = mockLessons;

  if (type) {
    filtered = filtered.filter((lesson) => lesson.type === type);
  }

  if (level) {
    filtered = filtered.filter((lesson) => lesson.level === level);
  }

  return filtered;
};

export const fetchLessonById = async (id: string): Promise<Lesson | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const lesson = mockLessons.find((lesson) => lesson.id === id);
  return lesson || null;
};
