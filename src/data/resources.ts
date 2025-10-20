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
