import {
  Utensils,
  Car,
  Home,
  ShoppingBag,
  Plane,
} from 'lucide-react';

/**
 * Array of steps for the carbon footprint calculator.
 * Contains configuration for each category including options and CO2 values.
 * @type {Array<Object>}
 */
export const steps = [
  {
    key: 'diet',
    label: 'Diet',
    icon: Utensils,
    question: 'How would you describe your diet?',
    options: [
      { title: 'Meat-Heavy', desc: 'Meat in most meals, daily', value: 3.3 },
      { title: 'Meat-Moderate', desc: 'Meat a few times per week', value: 2.5 },
      { title: 'Pescatarian', desc: 'Fish but no other meat', value: 2.0 },
      { title: 'Vegetarian', desc: 'No meat or fish', value: 1.7 },
      { title: 'Vegan', desc: 'No animal products', value: 1.5 },
    ],
  },
  {
    key: 'transport',
    label: 'Transport',
    icon: Car,
    question: 'What is your primary mode of transport?',
    options: [
      { title: 'Solo Car (Gas)', desc: 'Drive alone, gasoline vehicle', value: 4.6 },
      { title: 'Solo Car (Electric)', desc: 'Drive alone, electric vehicle', value: 2.0 },
      { title: 'Carpool', desc: 'Share rides regularly', value: 1.5 },
      { title: 'Public Transit', desc: 'Bus, metro, or train', value: 1.0 },
      { title: 'Bike / Walk', desc: 'Active transport only', value: 0.0 },
    ],
  },
  {
    key: 'energy',
    label: 'Home Energy',
    icon: Home,
    question: 'What best describes your home energy usage?',
    options: [
      { title: 'Large Home, Fossil', desc: 'Large home on gas/oil heating', value: 5.0 },
      { title: 'Medium Home, Standard', desc: 'Average home, grid electricity', value: 3.0 },
      { title: 'Small Home, Efficient', desc: 'Compact space, efficient appliances', value: 1.8 },
      { title: 'Renewable Mix', desc: 'Partial solar or green energy plan', value: 0.8 },
      { title: 'Full Renewable', desc: '100% renewable energy sources', value: 0.0 },
    ],
  },
  {
    key: 'shopping',
    label: 'Shopping',
    icon: ShoppingBag,
    question: 'How would you describe your consumption habits?',
    options: [
      { title: 'Heavy Consumer', desc: 'Frequent new purchases, fast fashion', value: 2.5 },
      { title: 'Average', desc: 'Regular purchases, some second-hand', value: 1.5 },
      { title: 'Conscious Buyer', desc: 'Buys quality, mostly second-hand', value: 0.8 },
      { title: 'Minimalist', desc: 'Only essential purchases', value: 0.3 },
    ],
  },
  {
    key: 'flights',
    label: 'Travel',
    icon: Plane,
    question: 'How often do you fly for leisure or work?',
    options: [
      { title: 'Frequent Flyer', desc: 'More than 4 long-haul flights/year', value: 4.0 },
      { title: 'Several Flights', desc: '2-3 flights per year', value: 2.0 },
      { title: 'Rare Flights', desc: '1 short flight per year', value: 0.8 },
      { title: 'No Flights', desc: 'Never fly', value: 0.0 },
    ],
  },
];
