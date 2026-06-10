import {
  Utensils,
  Bike,
  Bus,
  Shirt,
  Lightbulb,
  Plug,
  ShoppingBag,
  Recycle,
  Leaf,
  Users,
} from 'lucide-react';

/**
 * Array of daily eco-friendly actions for the carousel.
 * Includes CO2 impact estimates and categories.
 * @type {Array<Object>}
 */
export const actions = [
  { title: 'Plant-Based Meal', description: 'Replace one meat meal with a plant-based alternative today.', impact: -0.1, category: 'Diet', icon: Utensils, color: '#4ade80' },
  { title: 'Bike Commute', description: 'Cycle to work or errands instead of driving.', impact: -0.2, category: 'Transport', icon: Bike, color: '#38bdf8' },
  { title: 'Public Transit', description: 'Take the bus or train for your commute today.', impact: -0.1, category: 'Transport', icon: Bus, color: '#38bdf8' },
  { title: 'Line Dry Clothes', description: 'Skip the dryer and air-dry your laundry.', impact: -0.05, category: 'Energy', icon: Shirt, color: '#fbbf24' },
  { title: 'LED Lighting', description: 'Switch remaining bulbs to energy-efficient LEDs.', impact: -0.03, category: 'Energy', icon: Lightbulb, color: '#fbbf24' },
  { title: 'Unplug Devices', description: 'Disconnect chargers and standby electronics when not in use.', impact: -0.02, category: 'Energy', icon: Plug, color: '#fbbf24' },
  { title: 'Buy Second-Hand', description: 'Choose pre-owned items instead of buying new.', impact: -0.15, category: 'Shopping', icon: ShoppingBag, color: '#a78bfa' },
  { title: 'Bring Reusable Bag', description: 'Carry your own bag to avoid single-use plastic.', impact: -0.01, category: 'Shopping', icon: Recycle, color: '#a78bfa' },
  { title: 'Meatless Monday', description: 'Go fully meatless for the entire day.', impact: -0.12, category: 'Diet', icon: Leaf, color: '#4ade80' },
  { title: 'Carpool', description: 'Share your ride with a colleague or neighbor.', impact: -0.08, category: 'Transport', icon: Users, color: '#38bdf8' },
];
