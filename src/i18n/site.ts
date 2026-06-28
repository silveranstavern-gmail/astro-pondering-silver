export const SUPPORTED_LOCALES = ['en', 'es'] as const;
export type SiteLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SiteLocale = 'en';

export const siteUi = {
  en: {
    homePath: '/',
    navigationLabel: 'Main navigation',
    menuLabel: 'Toggle navigation menu',
    languageLabel: 'View in Spanish',
    languageCode: 'ES',
    navItems: [
      { href: '/', label: 'Home', ariaLabel: 'Navigate to Home page', icon: 'heroicons:home' },
      { href: '/services', label: 'Services', ariaLabel: 'Navigate to Services page', icon: 'heroicons:sparkles' },
      { href: '/resources', label: 'Resources', ariaLabel: 'Navigate to Resources page', icon: 'heroicons:book-open' },
      { href: '/tools', label: 'Tools', ariaLabel: 'Navigate to Tools page', icon: 'heroicons:wrench-screwdriver' },
      { href: '/blog', label: 'Blog', ariaLabel: 'Navigate to Blog page', icon: 'heroicons:pencil-square' },
      { href: '/support', label: 'Support', ariaLabel: 'Navigate to Support page', icon: 'heroicons:heart' },
    ],
    actions: {
      donate: 'Donate',
      socials: 'Socials',
      share: 'Share',
      hide: 'Hide',
      more: 'More',
      closeDialog: 'Close dialog',
      close: 'Close',
      supportTitle: 'Support My Work',
      donationTitles: ['Donate with Stripe', 'Donate with PayPal', 'Support me on Ko-fi'],
      socialsTitle: 'Follow elsewhere',
      shareTitle: 'Share this page',
      shareOn: 'Share on',
      copyLink: 'Copy link',
      copied: 'Copied!',
      copyFailed: 'Copy failed',
    },
    footer: {
      lead: 'Crafted with intention, built by',
      tail: 'and powered by Astro.',
      privacy: 'Privacy & Terms',
    },
  },
  es: {
    homePath: '/es',
    navigationLabel: 'Navegación principal',
    menuLabel: 'Abrir o cerrar el menú de navegación',
    languageLabel: 'Ver en inglés',
    languageCode: 'EN',
    navItems: [
      { href: '/es', label: 'Inicio', ariaLabel: 'Ir a la página de inicio', icon: 'heroicons:home' },
      { href: '/es/services', label: 'Servicios', ariaLabel: 'Ir a la página de servicios', icon: 'heroicons:sparkles' },
      { href: '/es/blog', label: 'Blog', ariaLabel: 'Ir al blog', icon: 'heroicons:pencil-square' },
    ],
    actions: {
      donate: 'Apoyar',
      socials: 'Redes',
      share: 'Compartir',
      hide: 'Ocultar',
      more: 'Más',
      closeDialog: 'Cerrar diálogo',
      close: 'Cerrar',
      supportTitle: 'Apoya mi trabajo',
      donationTitles: ['Donar con Stripe', 'Donar con PayPal', 'Apoyarme en Ko-fi'],
      socialsTitle: 'Sígueme en otras redes',
      shareTitle: 'Compartir esta página',
      shareOn: 'Compartir en',
      copyLink: 'Copiar enlace',
      copied: '¡Copiado!',
      copyFailed: 'No se pudo copiar',
    },
    footer: {
      lead: 'Creado con intención y desarrollado por',
      tail: 'con la tecnología de Astro.',
      privacy: 'Privacidad y términos',
    },
  },
} as const;
