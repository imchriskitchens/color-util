// 

const colorUtil = {
  hexString({ r, g, b }) { return `#${r}${g}${b}` /**/ .toUpperCase() /**/ ; },
  rgbString({ r, g, b }) { return `rgb(${r}, ${g}, ${b})`; },
  hslString({ h, s, l }) { return `hsl(${h}, ${s}%, ${l}%)`; },

  rgbToHEX(value, { data } = false) {
    let [r, g, b] = value.match(/\d+/g);
    [r, g, b] = [r, g, b].map((n) => parseInt(n, 10).toString(16));
    [r, g, b] = [r, g, b].map((n) => n.length === 1 ? `0${n}` : n);
    return (data) ? ([r, g, b]) : colorUtil.hexString({ r, g, b });
  },

  rgbToHSL(value) {
    let [r, g, b] = (Array.isArray(value)) ? value: value.match(/\d+/g);
    [r, g, b] = [r, g, b].map((v) => v / 255);
    let cmin = Math.min(r, g, b);
    let cmax = Math.max(r, g, b);
    let c = cmax - cmin;
    let [h, s, l] = [0, 0, (cmax + cmin) * 0.5];
    if (c !== 0) {
      h = // condition hue value
        (cmax === r) ? ((g - b) / c) % 6 :
        (cmax === g) ? (b - r) / c + 2 :
        (r - g) / c + 4; // (cmax === b)
      s = c / (1 - Math.abs(cmax + cmin - 1));
    }
    [h, s, l] = [h * 60, s * 100, l * 100];
    if (h < 0) h += 360; // neg hue correction
    [h, s, l] = [h, s, l].map((n) => parseInt(n));
    return colorUtil.hslString({ h, s, l });
  },

  hslToRGB(value, { data } = false) {
    let [h, s, l] = value.match(/\d+/g);
    [h, s, l] = [h / 60, s / 100, l / 100];
    let c = s * (1 - Math.abs(2 * l - 1));
    let x = c * (1 - Math.abs(h % 2 - 1));
    let m = l - c / 2;
    [c, x, m] = [(c + m), (x + m), m].map((v) => Math.round(v * 255));
    [c, x, m] = [c, x, m].map((v) => (v < 1) ? 0 : v);
    let [r, g, b] = [[c, x, m], [x, c, m], [m, c, x], [m, x, c], [x, m, c], [c, m, x]][Math.floor(h) % 6];
    return (data) ? ([r, g, b]) : colorUtil.rgbString({ r, g, b });
  },

  hslToHEX(value, { data } = false) {
    let [r, g, b] = colorUtil.hslToRGB(value, { data: true });
    [r, g, b] = [r, g, b].map((n) => parseInt(n, 10).toString(16));
    [r, g, b] = [r, g, b].map((n) => n.length === 1 ? `0${n}` : n);
    return (data) ? ([r, g, b]) : colorUtil.hexString({ r, g, b });
  },

  hexToRGB(value, { data } = false) {
    value = value.replace("#", "");
    value = (value.length === 3) ? ("0x" + ([...value]).map((ch) =>
      `${ch}${ch}`).join("")) : `0x${value}`;
    const [r, g, b] = [(value >> 16), (value >> 8), value].map((n) => n & 255);
    return (data) ? ([r, g, b]) : colorUtil.rgbString({ r, g, b });
  },

  hexToHSL(value) {
    const [r, g, b] = colorUtil.hexToRGB(value, { data: true });
    return colorUtil.rgbToHSL([r, g, b]);
  },

  getContrast(colorA, colorB) {
    const lin_sRGB = (v) =>
      (v < 0.04045) ? (v / 12.92) : ((v + 0.055) / 1.055) ** 2.4;
    const LUM = (value) => {
      let [r, g, b] = value.match(/\d+/g);
      [r, g, b] = [r, g, b].map(v => lin_sRGB(v / 255));
      [r, g, b] = [r * 0.2126, g * 0.7152, b * 0.0722];
      return [r, g, b].reduce((a, b) => a + b);
    }
    const [L1, L2] = [LUM(colorA), LUM(colorB)];
    const compare = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    return (compare != undefined) ?
      compare.toPrecision((compare >= 10) ? 4 : 3) : (L1 === L2) ? 1 : 21;
  },

  getObjectArray(values) {
    return values.filter((v) => !!v)
      .map((v) => colorUtil.getColorObj(v));
  },

  getColorObj(value) {
    if (Array.isArray(value)) {
      return colorUtil.getObjectArray(value);
    }

    const isHEX = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    const isRGB = /^rgb\((\s*\d{1,3}\s*),(\s*\d{1,3}\s*),(\s*\d{1,3}\s*)\)$/i;
    const isHSL = /^hsl\((\s*\d{1,3}\s*),(\s*\d{1,3}%\s*),(\s*\d{1,3}%\s*)\)$/i;

    if (isHEX.test(value) && value.length < 6) {
      value = "#" + ([...value.slice(1)])
        .map((v) => `${v}${v}`).join("");
    }

    const { hexToRGB, hexToHSL, rgbToHEX, rgbToHSL, hslToRGB, hslToHEX } = colorUtil;

    const [formatINPUT, formatRGB, formatHEX, formatHSL] =
    (isHEX.test(value)) ? ['HEX', hexToRGB(value), value, hexToHSL(value)] :
    (isRGB.test(value)) ? ['RGB', value, rgbToHEX(value), rgbToHSL(value)] :
    (isHSL.test(value)) ? ['HSL', hslToRGB(value), hslToHEX(value), value] : "";

    const contrastB = colorUtil.getContrast(formatRGB, "rgb(0,0,0)");
    const contrastW = colorUtil.getContrast(formatRGB, "rgb(255,255,255)");

    return {
      input: formatINPUT,
      rgb: formatRGB,
      hex: formatHEX,
      hsl: formatHSL,
      contrast: {
        black: Number(contrastB),
        white: Number(contrastW)
      }
    };
  },

  /* DEMO ARRAY FUNCTION */
  demoArray(array, { demos_active } = false) {
    if (demos_active) {
      console.log("/**/");
      ([...array, "/**/"]).forEach((value) => {
        console.count("\n//", "demo"), console.log(value)
      });
    }
  },

};


const colorArray = [null, "#E5F2EE", "rgb(171, 223, 207)", "#78CBB4", "#4FB79D", "hsl(166, 53%, 41%)", "#1B9077", "#0C7C66", "#036855", "#005545", "#004136", "hsl(170, 100%, 8%)", "#001A15", "rgb(242, 229, 229)", "#F2C2C3", "#F0A0A1", "rgb(236, 127, 129)", "#E66467", "hsl(357, 68%, 58%)", "hsl(357, 61%, 51%)", "#BE2A31", "#A41E25", "#7F131A", "#500B10", "#1A0305", "#F2EAE5", "#EFCEBC", "#EAB293", "#E2986E", "#D8814F", "hsl(22, 57%, 50%)", "#B75D22", "#A04E14", "#843F0A", "#632F05", "#3E1F01", "#1A0D00", "hsl(38, 34%, 92%)", "#F0DBAE", "#E7C878", "rgb(217, 179, 72)", "#C49D21", "#AB8606", "hsl(47, 100%, 28%)", "#765E00", "#5C4A00", "#443700", "#2E2600", "hsl(48, 100%, 5%)", "#EDF2E3", "rgb(204, 235, 169)", "#99D971", "hsl(105, 53%, 51%)", "#2EB01E", "#069A08", "#008310", "#006D16", "#005817", "#004214", "#002E0F", "#001A09"];




const { hexToRGB, hexToHSL, rgbToHEX, rgbToHSL, hslToRGB, hslToHEX } = colorUtil;
const { getContrast, getObjectArray, getColorObj, demoArray /*  */ } = colorUtil;

demoArray([

  getColorObj("#333"),
  /* { input: 'HEX',
      rgb: 'rgb(51, 51, 51)',
      hex: '#333333',
      hsl: 'hsl(0, 0%, 20%)',
      contrast: { black: 1.66, white: 12.63 } } */

  getColorObj("rgb(51, 51, 51)"),
  /* { input: 'RGB',
      rgb: 'rgb(51, 51, 51)',
      hex: '#333333',
      hsl: 'hsl(0, 0%, 20%)',
      contrast: { black: 1.66, white: 12.63 } } */

  getColorObj(hexToRGB("#333")),
  /* { input: 'RGB',
      rgb: 'rgb(51, 51, 51)',
      hex: '#333333',
      hsl: 'hsl(0, 0%, 20%)',
      contrast: { black: 1.66, white: 12.63 } } */

  getColorObj(rgbToHEX("rgb(51, 51, 51)")),
  /* { input: 'HEX',
      rgb: 'rgb(51, 51, 51)',
      hex: '#333333',
      hsl: 'hsl(0, 0%, 20%)',
      contrast: { black: 1.66, white: 12.63 } } */


  getContrast("rgb(0, 0, 0)", hexToRGB("#333")),
  /* 1.66 */
  getContrast("rgb(0, 0, 0)", "rgb(51, 51, 51)"),
  /* 1.66 */
  getContrast("rgb(0, 0, 0)", getColorObj("#333").rgb),
  /* 1.66 */


  getColorObj(["#222", "#111", "#000"])
/* [ { input: 'HEX',
    rgb: 'rgb(34, 34, 34)',
    hex: '#222222',
    hsl: 'hsl(0, 0%, 13%)',
    contrast: { black: 1.32, white: 15.91 } },
  { input: 'HEX',
    rgb: 'rgb(17, 17, 17)',
    hex: '#111111',
    hsl: 'hsl(0, 0%, 6%)',
    contrast: { black: 1.11, white: 18.88 } },
  { input: 'HEX',
    rgb: 'rgb(0, 0, 0)',
    hex: '#000000',
    hsl: 'hsl(0, 0%, 0%)',
    contrast: { black: 1, white: 21 } } ] */

], { demos_active: true })








//