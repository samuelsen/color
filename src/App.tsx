import { useState } from 'react'
import { SketchPicker, type ColorResult } from 'react-color'
import './App.css'

interface Color {
  r: number;
  g: number;
  b: number;
}

function rgbToString({ r, g, b }: Color) {
  return `rgb(${r}, ${g}, ${b})`;
}

function hslToRgb(h: number, s: number, v: number): Color {
  const l = v - v * s / 2;
  const s_l = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
  let r: number, g: number, b: number;
  if (s_l === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s_l) : l + s_l - l * s_l;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function getHue({ r, g, b }: Color): number {
  const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  if (max === min) {
    h = 0;
  } else if (max === rNorm) {
    h = (60 * ((gNorm - bNorm) / (max - min)) + 360) % 360;
  } else if (max === gNorm) {
    h = (60 * ((bNorm - rNorm) / (max - min)) + 120) % 360;
  } else if (max === bNorm) {
    h = (60 * ((rNorm - gNorm) / (max - min)) + 240) % 360;
  }
  return h;
}

function App() {
  const [color, setColor] = useState<Color>({ r: 0, g: 0, b: 0 });
  const [colors, setColors] = useState<Color[]>([]);
  const [hueSteps, setHueSteps] = useState(12);
  const [satSteps, setSatSteps] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [, setPendingGenerate] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const handleColorChange = (c: ColorResult) => {
    setColor(c.rgb);
  };

  const addColor = () => {
    const exists = colors.some(
      (c) => c.r === color.r && c.g === color.g && c.b === color.b
    );
    if (!exists) {
      setColors((prev) => [...prev, color]);
    }
  };

  const removeColor = (idx: number) => {
    setColors((prev) => prev.filter((_, i) => i !== idx));
  };

  const clearColors = () => setColors([]);

  const handleGenerateClick = () => {
    if (colors.length > 0) {
      setShowModal(true);
      setPendingGenerate(true);
    } else {
      generateColors();
    }
  };

  const handleModalOk = () => {
    setShowModal(false);
    setPendingGenerate(false);
    generateColors(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setPendingGenerate(false);
  };

  const generateColors = (clearFirst = false) => {
    if (clearFirst) setColors([]);
    const newColors: Color[] = [{ r: 255, g: 255, b: 255 }];
    for (let h = 0; h < hueSteps; h++) {
      for (let s = 1; s <= satSteps; s++) {
        const color = hslToRgb(h / hueSteps, s / satSteps, 1);
        if (!newColors.some(c => c.r === color.r && c.g === color.g && c.b === color.b)) {
          newColors.push(color);
        }
      }
    }
    setColors(clearFirst ? newColors : prev => [...prev, ...newColors]);
  };

  return (
    <div className="container">
      <h1>Color Picker</h1>
      <div className="picker">
        <SketchPicker
          color={color}
          onChange={handleColorChange}
        />
        <div className="add-btn-group">
          <button onClick={addColor} className="add-btn">Add</button>
          <button onClick={clearColors} className="add-btn" style={{background:'#d32f2f'}}>Remove all</button>
        </div>
      </div>
      <div className={`accordion${accordionOpen ? ' open' : ''}`}>
        <button className="accordion-header" onClick={() => setAccordionOpen(o => !o)}>
          Generate colors
          <span className="accordion-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 8l3 3 3-3" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        <div className="accordion-content">
          <div className="generate-controls">
            <label>
              Hue steps:
              <input type="number" min={1} max={24} value={hueSteps} onChange={e => setHueSteps(Number(e.target.value))} style={{width:60,marginLeft:8}} />
            </label>
            <label>
              Saturation steps:
              <input type="number" min={1} max={10} value={satSteps} onChange={e => setSatSteps(Number(e.target.value))} style={{width:60,marginLeft:8}} />
            </label>
            <button onClick={handleGenerateClick} className="add-btn" style={{background:'#1976d2'}}>Generate colors</button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Generating will remove all selected colors. Are you sure you want to generate new colors?</p>
            <div style={{display:'flex',gap:'1rem',justifyContent:'center',marginTop:'1rem'}}>
              <button className="add-btn" onClick={handleModalOk}>OK</button>
              <button className="add-btn" style={{background:'#888'}} onClick={handleModalCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className="preview-grid">
        {(() => {
          if (colors.length === 0) return null;
          const [first, ...rest] = colors;
          const sorted = rest.sort((a, b) => getHue(a) - getHue(b));
          return [first, ...sorted].map((c, idx) => (
            <div
              key={idx}
              className="color-preview"
              style={{ background: rgbToString(c), cursor: 'pointer' }}
              title={rgbToString(c)}
              onClick={() => removeColor(colors.indexOf(c))}
            >
              <span className="overlay"></span>
              <span className="delete-icon" onClick={e => { e.stopPropagation(); removeColor(colors.indexOf(c)); }} title="Remove color">
                <svg viewBox="0 0 24 24">
                  <path d="M3 6h18v2H3V6zm2 3h14l-1.5 14h-11L5 9zm5 2v8h2v-8h-2zm-4 0v8h2v-8H6zm8 0v8h2v-8h-2zM9 4V2h6v2h5v2H4V4h5z"/>
                </svg>
              </span>
              <span className="color-label">{rgbToString(c)}</span>
            </div>
          ));
        })()}
      </div>
      <footer>
        &copy; {new Date().getFullYear()} Simen Samuelsen
      </footer>
    </div>
  )
}

export default App
