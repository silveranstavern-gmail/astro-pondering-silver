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
      "A space to speak openly, without needing to organize, justify, or make sense of everything first. You bring what’s there: messy, unfinished, contradictory. I listen not just to what you’re saying, but to how it’s being said: where things tighten, where something repeats, and where something feels slightly off. There’s no pressure to fix anything. But when something is seen more clearly, without filtering or reshaping it, it often starts to move on its own.",
  },
  {
    title: 'Pattern Clarity (1:1 Sessions)',
    description:
      "If you feel stuck in recurring situations, especially in relationships or emotional reactions, this is where we look at what’s actually creating that repetition. I don’t focus on giving advice. I pay attention to how your experience is structured as you describe it: what you focus on, what you avoid, and what keeps looping. Then I reflect that back to you, often in real time. At times this can feel confronting, not because anything is being pushed on you, but because you’re seeing something you were previously inside of. When a pattern becomes visible, it stops running automatically. From there, things tend to shift without needing to force change.",
  },
  {
    title: 'Manifestation & Inner Mechanics',
    description:
      "I approach manifestation as a relationship between your internal state and what you experience. Your vibration isn’t abstract; it shows up directly in the body as tension or contraction, openness or ease. We look at where your attention is going, and what your system is holding at the same time. If those don’t match, there’s friction. Instead of trying to override that, we bring awareness to it, both mentally and physically. When that friction becomes clear, it usually starts to loosen. This isn’t about trying to think the right thoughts or force outcomes. It’s about noticing where you’re working against yourself, and letting that unwind.",
  },
  {
    title: 'Inner Resonance (Heartsong)',
    description:
      "There’s a way of being that isn’t built from expectations, roles, or external pressure. Not something you create, but something you notice when the extra layers fall away. In this work, we look at the roles you’ve taken on, the internal rules you follow, and the parts of your identity that feel fixed. We question them, not to replace them, but to see what actually holds. What remains tends to feel simpler, more direct, and more natural. From there, decisions and direction don’t need as much effort; they follow that alignment.",
  },
  {
    title: 'Ongoing Work',
    description:
      "For those who want continuity over time. This becomes less about isolated sessions and more about tracking patterns as they unfold in real life. We revisit recurring dynamics, new situations as they arise, and subtle shifts in how you’re seeing things. The focus stays the same: seeing clearly, reducing unnecessary friction, and allowing your experience to reorganize from that.",
  },
];

export const faqs: ServiceFaq[] = [
  {
    question: 'How long are the sessions?',
    answer:
      'Sessions typically last 60 minutes, though the exact duration can be adjusted depending on the nature of the work.',
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
    question: 'Is this work right for me?',
    answer:
      'This work tends to be most useful for people who are willing to look at their own patterns honestly. If you are mainly looking for reassurance or someone to take your side, this may not feel like the right fit. If you are open to seeing what is actually happening and working from there, it can be very useful.',
  },
];
