import { createContext } from 'react';

export const NavbarContext = createContext()

export const REGIONS = [
  { name: "I'm flexible", image: '/navbar/world.png' },
  { name: 'United States', image: '/navbar/usa.png' },
  { name: 'United Kingdom', image: '/navbar/uk.png' },
  { name: 'Middle East', image: '/navbar/middleeast.png' },
  { name: 'Spain', image: '/navbar/spain.png' },
  { name: 'Southeast Asia', image: '/navbar/southeastasia.png' },
]

export const DATE_FORMATS = ['calendar', 'flexible']

export const DATE_LENGTH = ['weekend', 'week', 'month']

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
