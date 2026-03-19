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
];

export const youtubeResources: ResourceCategory[] = [
  {
    title: 'Light Language',
    channels: [
      { name: 'Activations with JJ', url: 'https://www.youtube.com/@activationswithjj' },
      { name: 'Encoded Frequencies with Katie', url: 'https://www.youtube.com/@encodedfrequencies' },
      { name: '8th House Sun', url: 'https://www.youtube.com/@EighthHouseSun' },
      { name: 'Sunlight Dances On Water', url: 'https://www.youtube.com/@SunlightDancesOnWater' },
      { name: 'Light Language Reiki Angels & Art Counselling', url: 'https://www.youtube.com/@LightLanguageReikiAndAngels' },
    ],
  },
  {
    title: 'High Vibrational Music',
    channels: [
      { name: 'Larimar Sound Alchemy', url: 'https://www.youtube.com/@LarimarSoundAlchemy' },
      { name: 'Mose - Reveries (Chill Out Live Set)', url: 'https://youtu.be/JFE3iIOBMDk?si=edgbTh6ZA_EjUwuU' },
      { name: 'Resueño', url: 'https://www.youtube.com/@resuenomusic' },
      { name: 'Shivelight', url: 'https://www.youtube.com/@Shivelight' },
      { name: 'Liquid Bloom', url: 'https://youtu.be/us5NzvhdXqA?si=64YFDroiiNAI20fG' },
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
