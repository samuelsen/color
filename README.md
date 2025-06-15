# Color Picker – Vite + React + TypeScript

A minimalist, Japandi-inspired web app for selecting, generating, and previewing colors.

## Features
- Select a color using a color picker (SketchPicker)
- Add the selected color to your palette (duplicates are not allowed)
- Remove individual colors by clicking or using the trash icon on hover
- Remove all colors with one click
- Generate a palette of colors based on adjustable hue and saturation steps (with confirmation modal)
- The first color in the grid is always white; the rest are sorted by hue
- Color previews are 100x100px, with subtle border and shadow
- Responsive grid, up to 8 colors per row, always centered
- Color picker, add/remove buttons, and color generation accordion are visually grouped and have the same fixed width
- Footer with copyright and current year always at the bottom
- Minimalist, Japandi-inspired design: warm, light earth tones, soft contrasts, rounded corners, and clean layouts

## Usage
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser at [http://localhost:5173](http://localhost:5173)

## Project Structure
- `src/App.tsx`: Main React component and logic
- `src/App.css`: Custom minimalist/Japandi CSS
- `.github/copilot-instructions.md`: Copilot instructions for consistent code style

---

© {current year} Simen Samuelsen
