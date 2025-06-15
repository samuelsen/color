<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This project is a Vite + React + TypeScript web application for selecting and previewing colors. The UI should be minimalist and inspired by Japandi style: use warm, light earth tones, soft contrasts, rounded corners, and clean layouts. 

Requirements:
- The color picker, add/remove buttons, and the accordion for color generation must have the same fixed width and be visually grouped.
- The color preview grid is centered, responsive, and displays up to 8 colors per row.
- All color previews are 100x100px, with a subtle border and shadow.
- When hovering a color, show a trash icon for removal.
- The first color in the grid is always white; the rest are sorted by hue.
- Footer with copyright and current year is always at the bottom.
- Use functional React components and hooks only.
- No UI libraries (like MUI) should be used; use custom CSS for all styling.
