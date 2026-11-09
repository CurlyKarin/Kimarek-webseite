import { pfad } from '../lib/pfad';

export type NavLink = {
  href: string;
  label: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavLink[];
};

export const navigation: NavItem[] = [
  {
    label: 'Freizeiten',
    children: [
      { href: '/kinderwoche', label: 'Kinderwoche' },
      { href: '/jugendwoche', label: 'Jugendwoche' },
      { href: '/ablauf', label: 'Ablauf' },
    ],
  },
  {
    label: 'Team',
    children: [
      { href: '/betreuer', label: 'Betreuer' },
      { href: '/vorstand', label: 'Vorstand' },
    ],
  },
  {
    label: 'Geschichte',
    children: [
      { href: '/geschichte', label: 'Geschichte' },
      { href: '/zelt', label: 'Das Zelt' },
    ],
  },
  {
    label: 'Galerie',
    children: [
      { href: '/galerie', label: 'Die letzten Jahre' },
      { href: '/videos', label: 'Videos' },
    ],
  },
];

export function isCurrent(pathname: string, href: string) {
  const ziel = pfad(href).replace(/\/$/, '') || '/';
  const hier = pathname.replace(/\/$/, '') || '/';
  return hier === ziel;
}
