# SkySafe - Quick Setup Guide

## Method 1: Download from Figma Make (Recommended)

If you're viewing this in Figma Make, you can download the entire project:

1. Click the **download/export button** in the Figma Make interface
2. This will download a ZIP file containing all project files
3. Extract the ZIP file to your desired location
4. Continue with the "Local Setup" steps below

## Method 2: Manual File Creation

If you need to create the project manually:

1. Create a new folder: `mkdir skysafe && cd skysafe`
2. Copy all files from the file structure shown
3. Ensure the directory structure matches the project structure
4. Continue with the "Local Setup" steps below

## Local Setup

### Step 1: Install Dependencies

```bash
npm install
```

Or if you prefer other package managers:
```bash
yarn install
# or
pnpm install
# or
bun install
```

### Step 2: Start Development Server

```bash
npm run dev
```

The application will open automatically in your browser at `http://localhost:5173`

### Step 3: Verify Installation

You should see:
- ✓ The landing page with animated stars
- ✓ "SkySafe" title and "Start Simulation" button
- ✓ No console errors

## Troubleshooting

### Issue: "Module not found" errors

**Solution**: Make sure all dependencies are installed
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors

**Solution**: Ensure TypeScript is properly configured
```bash
npm install -D typescript @types/react @types/react-dom
```

### Issue: Tailwind styles not loading

**Solution**: 
1. Check that `styles/globals.css` exists and is imported in `main.tsx`
2. Restart the development server: `npm run dev`

### Issue: Canvas animations not working

**Solution**: Some browsers require hardware acceleration. Enable it in your browser settings.

## File Checklist

Ensure you have all these files:

### Root Files
- [ ] `package.json`
- [ ] `vite.config.ts`
- [ ] `tsconfig.json`
- [ ] `index.html`
- [ ] `main.tsx`
- [ ] `App.tsx`
- [ ] `README.md`
- [ ] `.gitignore`

### Styles
- [ ] `styles/globals.css`

### Data
- [ ] `data/asteroidData.ts`

### Components
- [ ] `components/LandingPage.tsx`
- [ ] `components/AsteroidDashboard.tsx`
- [ ] `components/AsteroidOrbitVisualizer.tsx`
- [ ] `components/ImpactSimulator.tsx`
- [ ] `components/InteractiveMap.tsx`
- [ ] `components/ImpactAnimation.tsx`
- [ ] `components/MitigationStrategies.tsx`
- [ ] `components/EducationalMode.tsx`
- [ ] `components/DecisionSupport.tsx`

### UI Components (Shadcn)
- [ ] All files in `components/ui/` directory (provided by the framework)

## Next Steps

1. **Explore the Application**
   - Start at the landing page
   - Navigate to the Asteroid Dashboard
   - Try simulating an impact
   - Explore educational mode and take the quiz

2. **Customize**
   - Add more asteroids in `data/asteroidData.ts`
   - Modify color schemes in `styles/globals.css`
   - Adjust impact physics in `components/ImpactSimulator.tsx`

3. **Deploy**
   - Build for production: `npm run build`
   - Deploy to Vercel, Netlify, or any static hosting
   - See README.md for deployment instructions

## Development Tips

- **Hot Reload**: Changes to .tsx files will auto-refresh
- **Console**: Check browser console for any errors
- **Performance**: Use Chrome DevTools Performance tab to profile animations
- **Responsive**: Test on different screen sizes (mobile, tablet, desktop)

## Support

If you encounter issues:

1. Check that all dependencies are installed correctly
2. Ensure you're using Node.js 18 or higher
3. Clear browser cache and restart dev server
4. Review the browser console for specific error messages

## Building for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized build in the `dist/` directory that can be deployed to any static hosting service.

### Recommended Hosting Services

- **Vercel**: Zero-config deployment for React apps
- **Netlify**: Drag-and-drop deployment
- **GitHub Pages**: Free hosting for public repositories
- **Cloudflare Pages**: Fast global CDN

---

**Need help?** Check the README.md for detailed documentation and feature descriptions.
