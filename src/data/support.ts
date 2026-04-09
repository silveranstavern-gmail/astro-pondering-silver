export interface SupportLink {
  title: string;
  href: string;
  description: string;
}

export interface Book {
  title: string;
  href: string;
  image: string;
  description: string;
}

export const donationLinks: SupportLink[] = [
  {
    title: 'Donate with Stripe',
    href: 'https://donate.stripe.com/eVa4hvd8sfNx0Pm4gg',
    description: 'Fast, direct support for the writing, tools, and ongoing creative work behind Pondering Silver.',
  },
  {
    title: 'Donate with PayPal',
    href: 'https://www.paypal.com/donate/?business=5XBKNVSRQXEYU&no_recurring=0&currency_code=USD',
    description: 'Support the work through PayPal if that is the most convenient path for you.',
  },
  {
    title: 'Support me on Ko-fi',
    href: 'https://ko-fi.com/W7W715WXFP',
    description: 'Offer a lighter-weight contribution through Ko-fi.',
  },
];

export const books: Book[] = [
  {
    title: 'Sacred Longing: And the Alchemy of Vulnerability',
    href: 'https://www.amazon.com/dp/B0GHPPDXT5',
    image: 'https://m.media-amazon.com/images/I/81ekifqkJlL._SL1500_.jpg',
    description:
      'Sacred Longing: And the Alchemy of Vulnerability is a lyrical, intimate collection of writings on healing, becoming, sacred intimacy, and the raw aliveness of being human. Blending spiritual memoir, poetic reflection, and contemplative prose, Silver invites the reader into a journey through heartbreak, trauma, longing, love, surrender, and the slow transmutation of pain into presence.\n\nThis is not a book of neat answers or polished self-help formulas. It is a record of a soul learning, through fire and tenderness, how to stop fleeing life and begin entering it more fully. Within these pages are the wounded child, the seeker, the philosopher, the lover, the mystic, and the one who dares to believe that even our deepest ache may conceal a doorway into the sacred.\n\nFor readers drawn to themes of vulnerability, consciousness, devotion, healing, divine union, and emotional truth, Sacred Longing offers more than words on a page. It offers resonance. A remembering. A hand extended into the dark. At once fierce and tender, grounded and transcendent, this book speaks to those who have suffered, those who have loved deeply, and those who sense that something holy lives at the center of their longing.\n\nIf you have ever felt broken, numb, too much, not enough, or quietly certain that there is more to this life than survival, this book was written with you in mind. It is an invitation to let what is messy be sacred, to let what is human be worthy, and to discover - beneath the ache, beneath the seeking, beneath all the stories - the living ember that has never gone out.',
  },
];
