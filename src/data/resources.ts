export interface ResourceLink {
  title: string;
  description: string;
  path: string;
  enabled?: boolean;
}

export interface YouTubeChannel {
  name: string;
  url: string;
  description?: string;
}

export interface ExternalResource {
  name: string;
  url: string;
  description?: string;
}

export interface ExternalResourceSection {
  title: string;
  resources: ExternalResource[];
}

export interface ResourceCategory {
  title: string;
  channels: YouTubeChannel[];
}

export const resourceLinks: ResourceLink[] = [
  {
    title: 'YouTube Channels',
    description:
      'Curated collection of spiritual YouTube channels including Light Language and meditation resources.',
    path: '/resources/youtube',
  },
  {
    title: 'Tantra',
    description:
      'Selected Tantra resources including Christopher Wallis on Audible and the Tantra 112 app and full text.',
    path: '/resources/tantra',
  },
  {
    title: 'Non-Duality',
    description:
      'A growing collection of non-dual resources across channels, favorite videos, and books.',
    path: '/resources/non-duality',
  },
];

export const youtubeResources: ResourceCategory[] = [
  {
    title: 'Light Language',
    channels: [
      { name: 'Activations with JJ', url: 'https://www.youtube.com/@activationswithjj' },
      { name: 'Encoded Frequencies with Katie', url: 'https://www.youtube.com/@encodedfrequencies' },
      {
        name: 'ASTELIA STARBORN',
        url: 'https://www.youtube.com/@ASTELIASTARBORN',
        description: 'Stellar Keys Of Sacred Return | Channel Formerly 8th House Sun 𓂀☼',
      },
      { name: 'Sunlight Dances On Water', url: 'https://www.youtube.com/@SunlightDancesOnWater' },
      { name: 'Light Language Reiki Angels & Art Counselling', url: 'https://www.youtube.com/@LightLanguageReikiAndAngels' },
    ],
  },
  {
    title: 'High Vibrational Music',
    channels: [
      { name: 'Larimar Sound Alchemy', url: 'https://www.youtube.com/@LarimarSoundAlchemy' },
      { name: 'Man Of No Ego - Blinkers Removed', url: 'https://youtu.be/GRe3GUaw1iU?si=Lj95oYI6aDfPsTWC' },
      { name: 'Mose - Reveries (Chill Out Live Set)', url: 'https://youtu.be/JFE3iIOBMDk?si=edgbTh6ZA_EjUwuU' },
      { name: 'Resueño', url: 'https://www.youtube.com/@resuenomusic' },
      { name: 'Shivelight', url: 'https://www.youtube.com/@Shivelight' },
      { name: 'Liquid Bloom', url: 'https://youtu.be/us5NzvhdXqA?si=64YFDroiiNAI20fG' },
      { name: 'Shiva Shakti Aikya Mantra | Mantras of the Mystics', url: 'https://youtu.be/jadzbp2yEPg?si=yvlMv9e0TQvB3a6f' },
      { name: 'Darpan - LoveLight', url: 'https://youtube.com/playlist?list=OLAK5uy_lt4vQ6jQde4m_lmFUpuBb25gjZ4vkP3FI&si=KD7NLexQVZ3f28uG' },
      { name: 'Porangui', url: 'https://www.youtube.com/@porangui' },
      { name: 'Meditative Mind', url: 'https://www.youtube.com/@meditativemind' },
    ],
  },
];

export const tantraResources: ExternalResourceSection[] = [
  {
    title: 'Audible',
    resources: [
      {
        name: 'Tantra Illuminated Audiobook',
        url: 'https://www.audible.com/pd/Tantra-Illuminated-The-Philosophy-History-and-Practice-of-a-Timeless-Tradition-Audiobook/B01ACM9BMI',
        description: 'Christopher Wallis explores the philosophy, history, and practice of the Tantric tradition.',
      },
      {
        name: 'The Recognition Sutras Audiobook',
        url: 'https://www.audible.com/pd/The-Recognition-Sutras-Audiobook/B076ZQM87M',
        description: 'Christopher Wallis presents a practical and philosophical guide to recognition in the nondual Shaiva tradition.',
      },
    ],
  },
  {
    title: 'YouTube',
    resources: [
      {
        name: 'Christopher Wallis',
        url: 'https://www.youtube.com/@christopherwallis751',
        description: 'Christopher Wallis channel with teachings and discussions on Tantra, nondual Shaiva philosophy, and practice.',
      },
      {
        name: 'Readings in the Tantraloka with Prof. Alexis Sanderson',
        url: 'https://www.youtube.com/playlist?list=PLJyd721t3kqHzaR581kzR_FNHXzbB2jYw',
        description: 'Oxford Centre for Hindu Studies playlist covering Tantraloka readings across nine videos and later sessions.',
      },
    ],
  },
  {
    title: 'Misc',
    resources: [
      {
        name: 'Geography of Conciousness',
        url: 'https://serj-sxhx.github.io/geography-of-conciousness/',
        description: 'Interactive visual study aid for Tantra and contemplative exploration.',
      },
      {
        name: 'Tantra 112 App',
        url: 'https://tantra112.app/',
        description: 'Interactive app centered on the 112 meditation methods drawn from the Vijnana Bhairava Tantra.',
      },
      {
        name: 'Tantra 112 Full Text',
        url: 'https://tantra112.app/full-text',
        description: 'Read the full text presentation alongside the app-based exploration of the 112 methods.',
      },
      {
        name: 'Tantraloka Full Text and Translation',
        url: 'https://www.sanskrit-trikashaivism.com/en/tantraloka-introduction-trika-scriptures-non-dual-shaivism-of-kashmir/581',
        description: 'Online source text with translation for Tantraloka within the Trika Shaivism tradition of Kashmir.',
      },
    ],
  },
];

export const nonDualityResources: ExternalResourceSection[] = [
  {
    title: 'YouTubers',
    resources: [
      {
        name: 'Emerson Non-Duality',
        url: 'https://www.youtube.com/@EmersonNonDuality',
        description:
          'Contemporary direct-path nonduality. His own site and podcast center on "instant recognition" and the "end of seeking," with a radical, non-conceptual style rather than a named classical lineage.',
      },
      {
        name: 'Simply Always Awake',
        url: 'https://www.youtube.com/@SimplyAlwaysAwake',
        description:
          'Angelo Dilullo\'s channel. Contemporary awakening teaching with strong self-inquiry, no-self, shadow-work, and Zen-practice roots; his site explicitly points readers to The Three Pillars of Zen and organizes material around non-duality, no-self, and self-inquiry.',
      },
      {
        name: 'Christopher Wallis (Hareesh)',
        url: 'https://www.youtube.com/@christopherwallis751',
        description:
          'Classical Tantra with clear nondual Shaiva and Kashmir Shaivism roots. A Sanskrit scholar-practitioner initiated in a traditional Indian lineage, with explicit grounding in Shaiva Tantra, Classical Yoga, and source-text study.',
      },
      {
        name: 'Nishanth Selvalingam',
        url: 'https://www.youtube.com/@jaimakali8',
        description:
          'Yoga, Vedanta, and Tantra with strong Shaiva roots. His public teaching centers on Kashmir Shaivism and nondual Tantra, with Shaiva Siddhanta practice background and Ramakrishna lineage connection through Swami Sarvadevananda Puri.',
      },
      {
        name: 'Frank Yang',
        url: 'https://www.youtube.com/@frankyang',
        description:
          'Eclectic contemporary nonduality. He explicitly teaches a hybrid of mindfulness, Vipassana, do-nothing meditation, self-inquiry, Dzogchen-style practice, jhanas, and samadhi, so this is more of a pragmatic mixed-method path than a single lineage.',
      },
      {
        name: 'Michael Taft Nondual Meditation',
        url: 'https://www.youtube.com/@MichaelTaft108',
        description:
          'Pragmatic nondual meditation with strong Buddhist roots, especially Vajrayana and Dzogchen-style methods, combined with modern insight practice and deconstructive meditation frameworks.',
      },
      {
        name: 'Mountain Gnosis',
        url: 'https://www.youtube.com/@MountainGnosis',
        description:
          'Helen\'s channel. Short, high-quality explainer videos on consciousness, no-self, the witness, emptiness, and perception. Not presented as belonging to one formal path; it draws eclectically from Buddhism, Advaita-style witness consciousness, Hindu sources like the Upanishads and Ramakrishna/Vivekananda, plus modern neuroscience and philosophy.',
      },
      {
        name: 'Gary Weber',
        url: 'https://www.youtube.com/@GaryWeber',
        description:
          'Advaita-oriented nonduality with major Ramana Maharshi influence, combined with Zen, yoga, chanting, and neuroscience. His work is especially focused on ending compulsive thought through embodied practice and inquiry.',
      },
      {
        name: 'Adyashanti',
        url: 'https://www.youtube.com/@Adyashanti',
        description:
          'Zen-rooted awakening teaching. He trained for years in Zen under teachers connected to Taizan Maezumi Roshi and Jakusho Kwong Roshi, but his public teaching is broad, direct, and post-sectarian rather than narrowly Buddhist.',
      },
      {
        name: 'Rob Burbea Talks',
        url: 'https://www.youtube.com/@boubabuddha',
        description:
          'Western Buddhist Insight Meditation with deep emphasis on emptiness, dependent arising, jhana, and Rob Burbea\'s original "ways of looking" and later Soulmaking Dharma work.',
      },
      {
        name: 'Moojiji',
        url: 'https://www.youtube.com/@Moojiji',
        description:
          'Advaita satsang and self-inquiry in the Papaji to Ramana Maharshi line. The emphasis is direct recognition of the Self through inquiry, presence, and surrender.',
      },
      {
        name: 'Rupert Spira',
        url: 'https://www.youtube.com/@rupertspira',
        description:
          'Direct Path nonduality grounded in Advaita Vedanta and Kashmir Shaivism, especially through Francis Lucille, Jean Klein, and Atmananda Krishna Menon influences.',
      },
    ],
  },
  {
    title: 'Favorite Videos',
    resources: [],
  },
  {
    title: 'Books',
    resources: [],
  },
];
