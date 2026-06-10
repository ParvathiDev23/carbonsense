# CarbonSense 🌍

![CarbonSense Hero](public/images/hero-earth.png)

**CarbonSense** is a premium, modern Carbon Footprint Awareness Platform designed to help individuals understand, track, and reduce their environmental impact through personalized insights and actionable daily challenges.

[**Live Demo**](https://project2-jade-three.vercel.app)

---

## ✨ Key Features

- **Immersive Interface**: High-end glassmorphic UI with dynamic scroll reveals, 3D tilt effects, and floating particle animations.
- **Comprehensive Calculator**: A 5-step intuitive assessment covering Diet, Transport, Home Energy, Shopping, and Flights to accurately estimate your annual CO2 emissions.
- **Personalized Dashboard**: Visualizes your carbon footprint breakdown using custom-styled charts and compares it against global averages.
- **Daily Action Logging**: A swipeable carousel of eco-friendly actions you can take daily to reduce your footprint, complete with impact values and streak tracking.
- **Real-time Analytics**: See your total CO2 reduced, actions logged, and current streak update instantly as you interact with the platform.

## 🛠️ Technology Stack

- **Framework**: React + Vite
- **Styling**: Pure CSS with a custom design system (glassmorphism, advanced keyframe animations, CSS variables, noise overlays)
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Hosting/Deployment**: Vercel

## 🚀 Getting Started

To run CarbonSense locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ParvathiDev23/carbonsense.git
   cd carbonsense
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🎯 Challenge Requirements

### Chosen Vertical
**Carbon Footprint Awareness Platform**
We chose this vertical to design a solution that helps individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights.

### Approach and Logic
- **Gamification & Engagement:** Instead of a dry form, the platform uses a dynamic, premium UI to keep users engaged. The calculator uses a progressive 5-step flow with immediate visual feedback.
- **Action-Oriented Tracking:** The core logic shifts from just *calculating* a number to *actively reducing* it. Users are presented with a daily carousel of eco-actions, each carrying a specific CO2 reduction impact.
- **Streak System:** To build sustainable habits, the platform tracks consecutive days of logged actions (streaks), encouraging daily return visits.
- **Local Persistence:** To ensure privacy and speed, user data (baseline, current footprint, history, and streaks) is stored locally in the browser (`localStorage`), removing the friction of account creation while maintaining a personalized experience.

### How the Solution Works
1. **Onboarding / Calculator:** A new user takes a 5-step assessment (Diet, Transport, Home Energy, Shopping, Flights). Each selection has an assigned CO2 tonnage value.
2. **Dashboard:** The user is presented with their total estimated annual footprint, compared against the global average (4.5 tons). A pie chart breaks down their emissions by category.
3. **Action Logging:** Users scroll through a list of daily eco-actions (e.g., "Bike Commute", "Meatless Meal"). Logging an action subtracts its CO2 impact from their current footprint and updates their progress chart and streak counter in real time.

### Assumptions Made
- The global average carbon footprint is assumed to be 4.5 tons of CO2 per year for comparison purposes.
- CO2 impact values in the calculator and daily actions are estimates designed for relative comparison rather than precise scientific measurement.
- Users are interacting on a single personal device (data is stored in `localStorage` and is not synced across multiple devices).

## 🏗️ Project Structure

- `/src/components/`: Modular React components (Hero, Features, Calculator, Dashboard, ActionCarousel, Footer).
- `/src/index.css`: The core design system containing variables, global styles, and all animation keyframes.
- `/public/images/`: Custom generated atmospheric background images.
- `/public/videos/`: High-quality looping video backgrounds.

## ♿ Accessibility & Quality
- **Accessibility**: ARIA labels on interactive elements, high contrast text, and semantic HTML structure.
- **Performance**: Optimized asset loading and CSS-based animations.

## 📝 License

This project is licensed under the MIT License.
