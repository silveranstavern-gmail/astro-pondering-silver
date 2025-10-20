export interface ServiceOffering {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export const bookingUrl = 'https://cal.com/ponderingsilver';

export const services: ServiceOffering[] = [
  {
    title: 'The Confessional',
    description:
      "In The Confessional, you're welcomed into a sacred, judgment-free space designed purely for your emotional and spiritual liberation. Here, you may speak your truths openly, without reservation or self-censorship. Whether you're carrying burdens, seeking closure, or simply desiring to be genuinely seen and heard, this space offers you unconditional presence and compassionate witnessing. Through the gentle act of being authentically received, you'll experience profound relief, renewal, and a deeper reconnection with yourself.",
  },
  {
    title: 'Heart-Centered Consultation',
    description:
      "In a Heart-Centered Consultation, you'll step into a collaborative space grounded in deep listening, intuitive insight, and practical guidance. Together, we'll gently explore the challenges or questions you're facing, whether they pertain to spiritual development, personal relationships, career transitions, or everyday hurdles. With clarity, compassion, and actionable insights, we'll co-create solutions that resonate deeply with your heart's truth, empowering you to confidently move forward.",
  },
  {
    title: 'Life Coaching & Mentorship',
    description:
      "Life Coaching & Mentorship provides dedicated, ongoing support tailored precisely to your personal journey and ambitions. Whether you're navigating significant life transitions, encountering persistent obstacles, or striving toward meaningful, heart-aligned goals, this offering brings structure, accountability, and gentle encouragement to your process. Through reflective inquiry, practical guidance, and compassionate mentoring, you'll build momentum, discover new possibilities, and confidently chart a course toward a more fulfilling life.",
  },
  {
    title: 'Inner Resonance Guidance',
    description:
      "Inner Resonance Guidance invites you into an intimate exploration of your inner world to reconnect deeply with your internal compass—your heartsong. Together, we'll tune into your unique frequency, gently uncovering clarity about your desires, purpose, and next steps. By aligning more clearly with your internal resonance, you'll find yourself naturally guided toward decisions, actions, and experiences that feel deeply authentic and nourishing. This transformative process not only clarifies your path forward but enriches your overall sense of well-being and alignment with life's greater flow.",
  },
  {
    title: 'Manifestation Coaching & Mentorship',
    description:
      "Manifestation Coaching & Mentorship supports you in mastering the art of intentional creation. Together, we'll explore and refine your vision, identify and dissolve limiting beliefs, and cultivate empowering practices that align with your deepest desires. Through personalized guidance, practical tools, and energetic alignment techniques, you'll learn to harness your innate power to consciously shape your reality and manifest a life filled with joy, abundance, and fulfillment.",
  },
];

export const faqs: ServiceFaq[] = [
  {
    question: 'How long are the sessions?',
    answer:
      'Sessions typically last 60 minutes, though the exact duration can be discussed and adjusted based on your specific needs and the nature of our work together.',
  },
  {
    question: 'How do we meet?',
    answer:
      'Sessions are conducted virtually via video call, allowing for flexibility and convenience regardless of your location. A private link will be provided upon booking.',
  },
  {
    question: 'What should I prepare before our session?',
    answer:
      "Simply come with an open mind and heart. You may wish to reflect on what you hope to gain from our time together, but there's no formal preparation required. If specific preparation would benefit our work, I'll let you know in advance.",
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'This varies widely depending on your goals and circumstances. Some find significant value in even a single session, while others benefit from ongoing support. We can discuss what might be most supportive for you during our initial consultation.',
  },
  {
    question: 'Is this type of coaching right for me?',
    answer:
      "My approach is best suited for those open to self-reflection, personal growth, and spiritual development. If you're uncertain, I welcome you to book an initial consultation where we can explore whether my offerings align with your needs.",
  },
];
