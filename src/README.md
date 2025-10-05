# SkySafe - Asteroid Impact Simulation & Mitigation Tool

A comprehensive web application for simulating asteroid impacts, evaluating mitigation strategies, and supporting decision-making for planetary defense.

## 🚀 Features

- **Real Asteroid Database**: Browse 10+ real near-Earth asteroids with authentic NASA data
- **Interactive Impact Simulator**: Simulate impacts at any location on Earth with real-time physics calculations
- **3D Visualizations**: Animated orbital paths and impact sequences
- **Mitigation Strategies**: Evaluate 4 defense options (Nuclear Deflection, Kinetic Impactor, Gravity Tractor, Evacuation)
- **Educational Mode**: Learn about asteroid detection, types, and planetary defense with interactive quizzes
- **Decision Support Dashboard**: Comprehensive risk assessment and policy recommendations with data visualizations

## 📋 Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager

## 🛠️ Installation

1. **Clone or download this project**

2. **Install dependencies**:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Run the development server**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open your browser** and navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📦 Dependencies

This project uses the following main dependencies:

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "latest",
    "recharts": "^2.12.0",
    "motion": "latest",
    "tailwindcss": "^4.0.0",
    "@radix-ui/react-slot": "latest",
    "@radix-ui/react-label": "latest",
    "@radix-ui/react-slider": "latest",
    "@radix-ui/react-progress": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "typescript": "latest"
  }
}
```

## 📁 Project Structure

```
skysafe/
├── App.tsx                          # Main application component
├── data/
│   └── asteroidData.ts             # Asteroid database
├── components/
│   ├── LandingPage.tsx             # Landing page with intro
│   ├── AsteroidDashboard.tsx       # Asteroid data browser
│   ├── AsteroidOrbitVisualizer.tsx # Orbital path visualization
│   ├── ImpactSimulator.tsx         # Impact simulation engine
│   ├── InteractiveMap.tsx          # World map with location selection
│   ├── ImpactAnimation.tsx         # Impact sequence animation
│   ├── MitigationStrategies.tsx    # Defense strategy evaluation
│   ├── EducationalMode.tsx         # Learning center with quiz
│   ├── DecisionSupport.tsx         # Risk assessment dashboard
│   └── ui/                         # Shadcn/ui components
├── styles/
│   └── globals.css                 # Tailwind CSS configuration
└── README.md                        # This file
```

## 🎮 Usage

### Navigation Flow

1. **Landing Page** → Click "Start Simulation"
2. **Asteroid Dashboard** → Select an asteroid from the list
3. **Impact Simulator** → 
   - Select impact location on the interactive map
   - Adjust asteroid parameters (size, velocity, angle)
   - Click "Calculate Impact" to see results
4. **Mitigation Strategies** → Evaluate defense options
5. **Decision Support** → View comprehensive risk assessment

### Additional Features

- **Educational Mode**: Access from the dashboard to learn about asteroids
- **Quiz**: Test your knowledge with interactive questions
- **Export Reports**: Generate decision support reports (from Decision Support page)

## 🎨 Customization

### Modifying Asteroid Data

Edit `/data/asteroidData.ts` to add or modify asteroids:

```typescript
{
  id: 'unique-id',
  name: 'Asteroid Name',
  description: 'Description',
  diameter: 500,        // meters
  velocity: 20,         // km/s
  mass: '1.0×10¹² kg',
  impactProbability: 0.001,
  nextApproach: 'Date',
  orbit: {
    semiMajorAxis: 1.5,  // AU
    eccentricity: 0.2,
    period: 500,         // days
  },
  approachHistory: [
    { date: '2024', distance: 25.5 },
  ],
}
```

### Styling

The application uses Tailwind CSS v4. Modify `/styles/globals.css` to customize:
- Color schemes (light/dark mode)
- Typography
- Spacing and borders

## 🧪 Impact Simulation Physics

The impact calculations use simplified but realistic formulas:

- **Kinetic Energy**: KE = ½ × mass × velocity²
- **Crater Diameter**: Based on energy release scaling
- **Blast Radius**: Calculated from megaton equivalent
- **Seismic Effects**: Richter scale approximation from energy

## 🚀 Mitigation Strategies Included

1. **Nuclear Deflection** (85% success, $5-10B, 6-12 months)
2. **Kinetic Impactor** (75% success, $300-500M, 1-3 years)
3. **Gravity Tractor** (70% success, $2-3B, 5-10 years)
4. **Mass Evacuation** (60% success, $10-50B, 3-12 months)

## 📊 Data Sources

- Asteroid orbital parameters based on NASA JPL data
- Impact physics based on published scientific models
- Mitigation strategies from NASA and ESA planetary defense studies

## 🏗️ Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

The production build will be output to the `dist/` directory.

## 🌐 Deployment

This is a static React application that can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📝 Notes

- This is a simulation tool for educational and planning purposes
- Impact calculations are simplified approximations
- Real-world impact assessments require detailed modeling and expert analysis
- Population casualty estimates use random distribution for demonstration

## 🔗 Resources

- [NASA Center for Near-Earth Object Studies](https://cneos.jpl.nasa.gov/)
- [ESA Space Situational Awareness](https://www.esa.int/Safety_Security/Space_Situational_Awareness)
- [NASA DART Mission](https://www.nasa.gov/dart)
- [The Planetary Society - Asteroid Defense](https://www.planetary.org/space-missions/asteroid-and-comet-missions)

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs. Suggestions for improvements:
- Integration with real NASA APIs (NeoWs, Horizons)
- More sophisticated impact modeling
- Additional mitigation strategies
- Enhanced 3D visualizations using Three.js or Cesium

## ⚠️ Disclaimer

This application is for educational and simulation purposes only. It should not be used as the sole basis for actual emergency planning or policy decisions. Real asteroid threat assessment requires comprehensive scientific analysis and expert evaluation.

---

**Built with React, Tailwind CSS, and Motion** | **Data visualizations by Recharts**
