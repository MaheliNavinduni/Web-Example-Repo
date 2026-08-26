import {
  Award,
  Droplet,
  Gem,
  Hand,
  Heart,
  Sprout,
  Truck,
  Wind,
  Wine,
  type LucideIcon,
} from 'lucide-react';

import type { IconName } from '@/types';

/**
 * Maps the plain icon names stored in the data files to lucide components, so
 * data/site.ts never has to import React. `IconName` keys the record, which
 * means adding a name to the type without adding it here is a build error.
 */
const ICONS: Record<IconName, LucideIcon> = {
  award: Award,
  heart: Heart,
  glass: Wine,
  truck: Truck,
  droplet: Droplet,
  tractor: Sprout,
  hand: Hand,
  wind: Wind,
  gem: Gem,
};

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function Icon({ name, size = 22, className, strokeWidth = 1.5 }: IconProps) {
  const Component = ICONS[name] ?? Wine;
  return (
    <Component size={size} className={className} strokeWidth={strokeWidth} aria-hidden="true" />
  );
}
