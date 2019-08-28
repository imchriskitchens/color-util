let colorArrays = ["#E5F2EE", "rgb(171, 223, 207)", "#78CBB4", "#4FB79D", "hsl(166, 53%, 41%)", "#1B9077", "#0C7C66", "#036855", "#005545", "#004136", "hsl(170, 100%, 8%)", "#001A15", "rgb(242, 229, 229)", "#F2C2C3", "#F0A0A1", "rgb(236, 127, 129)", "#E66467", "hsl(357, 68%, 58%)", "hsl(357, 61%, 51%)", "#BE2A31", "#A41E25", "#7F131A", "#500B10", "#1A0305", "#F2EAE5", "#EFCEBC", "#EAB293", "#E2986E", "#D8814F", "hsl(22, 57%, 50%)", "#B75D22", "#A04E14", "#843F0A", "#632F05", "#3E1F01", "#1A0D00", "hsl(38, 34%, 92%)", "#F0DBAE", "#E7C878", "rgb(217, 179, 72)", "#C49D21", "#AB8606", "hsl(47, 100%, 28%)", "#765E00", "#5C4A00", "#443700", "#2E2600", "hsl(48, 100%, 5%)", "#EDF2E3", "rgb(204, 235, 169)", "#99D971", "hsl(105, 53%, 51%)", "#2EB01E", "#069A08", "#008310", "#006D16", "#005817", "#004214", "#002E0F", "#001A09"];


const to16 = (n) => parseInt(n, 10).toString(16);
const expand = (n) => (n.length === 1) ? `0${n}` : n;

const digits = (str) => str.match(/\d+/g);
const minMax = (r, g, b) => [Math.min(r, g, b), Math.max(r, g, b)];


const conversions = {
  rgbToHEX(rgb) {
    let [r, g, b] = digits(rgb);
  [r, g, b] = [r, g, b].map(to16);
  [r, g, b] = [r, g, b].map(expand);
    return `#${r}${g}${b}`;
  },

  rgbToHSL(rgb) {
    let [r, g, b] = digits(rgb).map((n) => n / 255);
    let [min, max] = minMax(r, g, b);
    let [hue, sat, lit, c] = Array(4).fill(0);

    lit = (max + min) / 2;
    c = max - min;

    if (c !== 0) hue = (max === r) ? ((g - b) / c) % 6 :
      (max === g) ? (b - r) / c + 2 :
      (r - g) / c + 4; //(max === b)

    hue *= 60;
    if (hue < 0) hue += 360;
    if (c !== 0) sat = (c) / (1 - Math.abs(max + min - 1));
    sat *= 100;
    lit *= 100;

  [hue, sat, lit] = [hue, sat, lit].map((n) => parseInt(n));
    return `hsl(${hue}, ${sat}%, ${lit}%)`;
  },

  hexToRGB(hex) {
    hex = +`0x${hex.replace("#", "")}`;
    let [r, g, b] = [(hex >> 16), (hex >> 8), hex].map((n) => n & 255);
    return `rgb(${r}, ${g}, ${b})`;
  },

  hexToHSL(hex) {
    hex = hexToRGB(hex);
    return rgbToHSL(hex);
  },

  hslToHEX(hsl) {
    let [h, s, l] = digits(hsl);
    s /= 100;
    l /= 100;

    let [c, x, m, r, g, b] = Array(6).fill(0);
    c = (1 - Math.abs(2 * l - 1)) * s;
    x = c * (1 - Math.abs((h / 60) % 2 - 1));
    m = l - c / 2;

    if (0 <= h && h < 60)
      [r, g, b] = [c, x, 0];
    else if (60 <= h && h < 120)
      [r, g, b] = [x, c, 0];
    else if (120 <= h && h < 180)
      [r, g, b] = [0, c, x];
    else if (180 <= h && h < 240)
      [r, g, b] = [0, x, c];
    else if (240 <= h && h < 300)
      [r, g, b] = [x, 0, c];
    else if (300 <= h && h < 360)
      [r, g, b] = [c, 0, x];

    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

  [r, g, b] = [r, g, b].map(expand);
    return `#${r}${g}${b}`;
  },

  hslToRGB(hsl) {
    let hex = hslToHEX(hsl);
    return hexToRGB(hex);
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