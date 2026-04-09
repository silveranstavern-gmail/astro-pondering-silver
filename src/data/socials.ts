export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  classes: string;
}

export const socialLinks: SocialLink[] = [
  {
    href: 'https://discord.gg/Z7pVmpdx3R',
    label: 'Discord',
    icon: 'simple-icons:discord',
    classes: 'bg-[#5865F2] hover:bg-[#4752c4]',
  },
  {
    href: 'https://www.youtube.com/@pondering-silver',
    label: 'YouTube',
    icon: 'simple-icons:youtube',
    classes: 'bg-[#FF0000] hover:bg-[#d90000]',
  },
  {
    href: 'https://x.com/ponderingsilver',
    label: 'X',
    icon: 'simple-icons:x',
    classes: 'bg-[#111111] hover:bg-black',
  },
];
