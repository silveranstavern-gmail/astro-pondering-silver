export interface ToolLink {
  title: string;
  description: string;
  path: string;
  enabled?: boolean;
}

export interface ToolCategory {
  title: string;
  accent: string;
  tools: ToolLink[];
}

export const toolCategories: ToolCategory[] = [
  {
    title: 'Spiritual & Mindfulness',
    accent: 'text-purple-700',
    tools: [
      {
        title: 'Manifestation Tracker',
        description:
          'Track your 7-day manifestation practice with affirmations. Choose between 36 or 108 repetitions and monitor your daily progress.',
        path: '/tools/manifestation-tracker',
      },
    ],
  },
  {
    title: 'Productivity',
    accent: 'text-purple-700',
    tools: [
      {
        title: 'List Tracker',
        description: 'Create and manage multiple lists with drag-and-drop functionality.',
        path: '/tools/tracker',
      },
      {
        title: 'Purchase Decision Helper',
        description:
          'Compare different purchase options and make better buying decisions based on cost and desirability factors.',
        path: '/tools/purchase-decision-helper',
      },
    ],
  },
  {
    title: 'Games & Puzzles',
    accent: 'text-purple-700',
    tools: [
      {
        title: 'Lights On Solver',
        description:
          'Solve the Magicraft Lights On puzzle by finding the optimal sequence of moves to turn all lights on.',
        path: '/tools/magicraft-lights-on-solver',
      },
    ],
  },
];
