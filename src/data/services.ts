export interface ServiceOffering {
  title: string;
  description: string;
}

export interface ServicePath {
  title: string;
  rhythm: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export const bookingUrl = 'https://cal.com/ponderingsilver';

export const servicePaths: ServicePath[] = [
  {
    title: 'Single Soul Clarity Session',
    rhythm: 'One open-ended 60 minute session',
    description:
      'Bring the place in your life that feels tangled, repetitive, painful, uncertain, or hard to speak about. We begin with what is actually present and listen for what wants to become clearer.',
  },
  {
    title: 'Ongoing Spiritual Companionship',
    rhythm: 'A continuing relationship over time',
    description:
      'For people who want continuity as patterns unfold in real life. We track recurring dynamics, subtle shifts, decisions, relationships, and inner guidance as they keep revealing themselves.',
  },
];

export const services: ServiceOffering[] = [
  {
    title: 'The Confessional',
    description:
      "A space to speak openly, without needing to organize, justify, or make sense of everything first. You bring what’s there: messy, unfinished, contradictory. I listen for what is being said, what is not being said, and where your own knowing may already be trying to come through.",
  },
  {
    title: 'Pattern Clarity',
    description:
      "If you feel stuck in recurring situations, especially in relationships or emotional reactions, we look at what is actually creating that repetition. I pay attention to what your attention returns to, what you avoid, where language tightens, and what keeps looping. When a pattern becomes visible, it often stops running automatically.",
  },
  {
    title: 'Manifestation & Inner Mechanics',
    description:
      "I approach manifestation as a relationship between attention, belief, desire, and the body. Your internal state is not abstract; it shows up as contraction or ease, pressure or openness. Rather than trying to force outcomes or think the right thoughts, we notice where you are working against yourself and let that begin to unwind.",
  },
  {
    title: 'Inner Resonance (Heartsong)',
    description:
      "There is a way of being that is not built from expectations, roles, or external pressure. Not something you create, but something you notice when the extra layers fall away. We question the rules and identities that feel fixed, then listen for what remains: simpler, more direct, and more naturally aligned.",
  },
  {
    title: 'Spiritual & Energetic Practice',
    description:
      "When it feels appropriate and welcome, the work may include silence, contemplative inquiry, prayer, energy awareness, or spiritual language. My own practice informs how I listen, but the point is not to make you adopt my beliefs. We work through the language that is alive and meaningful for you.",
  },
];

export const faqs: ServiceFaq[] = [
  {
    question: 'How long are the sessions?',
    answer:
      'Sessions are usually 60 minutes, though the exact rhythm can be adjusted depending on the nature of the work.',
  },
  {
    question: 'How do we meet?',
    answer:
      'Sessions are held online by video call. Once you book, you’ll receive the link and details.',
  },
  {
    question: 'What should I prepare before our session?',
    answer:
      'You do not need to prepare anything formally. It helps to arrive willing to be honest about what is happening for you, even if it feels messy or unclear.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'That depends on what you are coming in with. Some people get a lot from a single session. Others prefer ongoing work so we can track patterns over time.',
  },
  {
    question: 'Do I need to share your spiritual beliefs?',
    answer:
      'No. My work is informed by meditation, nondual spirituality, Kashmir Shaivism, psychological inquiry, and energy work, but I am not here to install a belief system. We can work through psychological, spiritual, religious, philosophical, energetic, or simply human language.',
  },
  {
    question: 'Is this therapy?',
    answer:
      'No. This is reflective and spiritual companionship, not therapy, medical care, or crisis support. If you need clinical mental health care, this can sit alongside that kind of support, but it is not a replacement for it.',
  },
  {
    question: 'Is this work right for me?',
    answer:
      'This work tends to be most useful for people who are willing to look at their own patterns honestly. If you are mainly looking for reassurance or someone to take your side, this may not feel like the right fit. If you are open to being met warmly and truthfully, it can be very useful.',
  },
];
