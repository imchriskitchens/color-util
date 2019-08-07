let colorArrays = ["#E5F2EE", "rgb(171, 223, 207)", "#78CBB4", "#4FB79D", "hsl(166, 53%, 41%)", "#1B9077", "#0C7C66", "#036855", "#005545", "#004136", "hsl(170, 100%, 8%)", "#001A15", "rgb(242, 229, 229)", "#F2C2C3", "#F0A0A1", "rgb(236, 127, 129)", "#E66467", "hsl(357, 68%, 58%)", "hsl(357, 61%, 51%)", "#BE2A31", "#A41E25", "#7F131A", "#500B10", "#1A0305", "#F2EAE5", "#EFCEBC", "#EAB293", "#E2986E", "#D8814F", "hsl(22, 57%, 50%)", "#B75D22", "#A04E14", "#843F0A", "#632F05", "#3E1F01", "#1A0D00", "hsl(38, 34%, 92%)", "#F0DBAE", "#E7C878", "rgb(217, 179, 72)", "#C49D21", "#AB8606", "hsl(47, 100%, 28%)", "#765E00", "#5C4A00", "#443700", "#2E2600", "hsl(48, 100%, 5%)", "#EDF2E3", "rgb(204, 235, 169)", "#99D971", "hsl(105, 53%, 51%)", "#2EB01E", "#069A08", "#008310", "#006D16", "#005817", "#004214", "#002E0F", "#001A09"];


const conversions = {
  hexToRGB(hex) {
    hex = +`0x${hex.replace("#", "")}`;
    let r = (hex >> 16) & 255,
      g = (hex >> 8) & 255,
      b = hex & 255;
    return `rgb(${r}, ${g}, ${b})`;
  },

  hexToHSL(hex) {
    let [r, g, b] = [0, 0, 0];
    if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin;
    let [h, s, l] = [0, 0, 0];
    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(0);
    l = +(l * 100).toFixed(0);
    return `hsl(${h}, ${s}%, ${l}%)`;
  },

  rgbToHEX(rgb) {
    let [r, g, b] = rgb.match(/\d+/g);
    r = parseInt(r, 10).toString(16);
    g = parseInt(g, 10).toString(16);
    b = parseInt(b, 10).toString(16);
    r = r.length == 1 ? "0" + r : r;
    g = g.length == 1 ? "0" + g : g;
    b = b.length == 1 ? "0" + b : b;
    return `#${r}${g}${b}`;
  },

  rgbToHSL(rgb) {
    let [r, g, b] = rgb.match(/\d+/g);
    r = r / 255;
    g = g / 255;
    b = b / 255;
    let max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      c = max - min;
    let h = 0,
      s = 0,
      l = (max + min) / 2;
    switch (max) {
      case r:
        h = ((g - b) / c) % 6;
        break;
      case g:
        h = (b - r) / c + 2;
        break;
      case b:
        h = (r - g) / c + 4;
        break;
    }
    h = Math.round(h * 60);
    h = h < 0 ? h + 360 : h;
    s = c === 0 ? 0 : c / (1 - Math.abs(2 * l - 1));
    s *= 100;
    l *= 100;
    return `hsl(${parseInt(h)}, ${parseInt(s)}%, ${parseInt(l)}%)`;
  },

  hslToRGB(hsl) {
    let [h, s, l] = hsl.match(/\d+/g);
    s = s / 100;
    l = l / 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round(Math.abs((r + m) * 255));
    g = Math.round(Math.abs((g + m) * 255));
    b = Math.round(Math.abs((b + m) * 255));
    return `rgb(${r}, ${g}, ${b})`;
  },

  hslToHEX(hsl) {
    let [h, s, l] = hsl.match(/\d+/g);
    s = s / 100;
    l = l / 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    return `#${r}${g}${b}`;
  }
}

const { hexToRGB, hexToHSL, rgbToHEX, rgbToHSL, hslToRGB, hslToHEX } = conversions;


const colorUtil = {
  isHEX: /^#?([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})$/i,
  isRGB: /^(rgb)\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/,
  isRGBA: /^(rgba)\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d*\.?\d*)\s*\)$/,
  isHSL: /^(hsl)\((\s*\d{1,3}\s*),(\s*\d{1,3}%\s*),(\s*\d{1,3}%\s*)\)$/,

  LUM(color) {
    const getsRGB = v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    let [r, g, b] = color.match(/\d+/g);
    r = getsRGB(r / 255) * 0.2126;
    g = getsRGB(g / 255) * 0.7152;
    b = getsRGB(b / 255) * 0.0722;
    return r + g + b;
  },

  getContrast(colorA, colorB) {
    const L1 = (typeof colorA === "string") ? LUM(colorA) : colorA;
    const L2 = (typeof colorB === "string") ? LUM(colorB) : colorB;
    const compare = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const contrast = (`${compare}`).match(/(?:\d*\.?\d{2})/);
    if (contrast != undefined) return contrast[0];
    return L1 === L2 ? 1 : 21;
  },

  getFormat(color) {
    return (isHEX.test(color)) ? ['HEX', hexToRGB(color), color, hexToHSL(color)] :
      (isRGB.test(color)) ? ['RGB', color, rgbToHEX(color), rgbToHSL(color)] :
      (isHSL.test(color)) ? ['HSL', hslToRGB(color), hslToHEX(color), color] : '';
  }
}

const { isHEX, isRGB, isRGBA, isHSL, toRGB, LUM, getContrast, getFormat } = colorUtil;



const colorObj = (color) => {
  const [formatDEF, formatRGB, formatHEX, formatHSL] = getFormat(color);
  const contrastBlk = color => getContrast(color, "rgb(0,0,0)");
  const contrastWh = color => getContrast(color, "rgb(255,255,255)");

  return {
    default: formatDEF,
    rgb: formatRGB,
    hex: formatHEX.toUpperCase(),
    hsl: formatHSL,
    contrast: {
      black: Number(contrastBlk(formatRGB)),
      white: Number(contrastWh(formatRGB))
    }
  };
}

colorArrays.forEach(item => {
  console.log(colorObj(item));
});






//