const re = (function () {
  const NUM = "(\\d{1,3})";
  const PERCENT = "(\\d{1,3})%";
  const _op = "[\\s|\\(]+";
  const _cp = "\\s*\\)?";
  const _cs = "[,|\\s]+";
  return {
    rgb: new RegExp("rgb" + _op + NUM + _cs + NUM + _cs + NUM + _cp),
    hsl: new RegExp("hsl" + _op + NUM + _cs + PERCENT + _cs + PERCENT + _cp),
    hex: /^#((?:[a-f\d]{2}|[a-f\d]{1}){3})$/i,
    hex3: /([a-f\d]{1})/ig,
    hex6: /([a-f\d]{2})/ig,
    isHEX: ((v) => re.hex.test(v)),
    isRGB: ((v) => re.rgb.test(v)),
    isHSL: ((v) => re.hsl.test(v)),
    hex3To6: ((ch) => `${ch}${ch}`),
    safeSlice: ((v) => (!!v) ? v.slice(1) : v),
    safeSliceF: ((v) => {
      const format = ["rgb", "hsl"][+re.isHSL(v) | +re.isHEX(v)];
      return !!(v = re[format].exec(v)) ?
        v.slice(1).map((n) => +n) : [0, 0, 0];
    }),
  };
})();


const colorUtil = (() => {
  const hexString = ((value) => (Array.isArray(value)) ?
    (([r, g, b]) => `#${r}${g}${b}`.toUpperCase())(value) :
    (({ r, g, b }) => `#${r}${g}${b}`.toUpperCase())(value));
  const rgbString = ((value) => (Array.isArray(value)) ?
    (([r, g, b]) => `rgb(${r}, ${g}, ${b})`)(value) :
    (({ r, g, b }) => `rgb(${r}, ${g}, ${b})`)(value));
  const hslString = ((value) => (Array.isArray(value)) ?
    (([h, s, l]) => `hsl(${h}, ${s}%, ${l}%)`)(value) :
    (({ h, s, l }) => `hsl(${h}, ${s}%, ${l}%)`)(value));

  const dataType = ((value, regex) => {
    return (typeof value === "string") ? re.safeSliceF(value) :
      (!!value && value.values) ? value.values : value;
  });
  const dataRGB = ((value) => dataType(value, re.rgb));
  const dataHSL = ((value) => dataType(value, re.hsl));

  const rgbToHEX = ((value) => {
    let [r, g, b] = dataRGB(value);
    [r, g, b] = [r, g, b].map((n) => parseInt(n, 10).toString(16));
    [r, g, b] = [r, g, b].map((n) => n.length === 1 ? `0${n}` : n);
    return hexString({ r, g, b });
  });
  const rgbToHSL = ((value) => {
    let [r, g, b] = dataRGB(value);
    [r, g, b] = [r, g, b].map((v) => v / 255);
    let cmin = Math.min(r, g, b);
    let cmax = Math.max(r, g, b);
    let c = cmax - cmin;
    let [h, s, l] = [0, 0, (cmax + cmin) * 0.5];
    if (c !== 0) {
      h = // conditional hue value
        (cmax === r) ? ((g - b) / c) % 6 :
        (cmax === g) ? (b - r) / c + 2 :
        (r - g) / c + 4; // (cmax === b)
      s = c / (1 - Math.abs(cmax + cmin - 1));
    }
    [h, s, l] = [h * 60, s * 100, l * 100];
    if (h < 0) h += 360; // neg hue correction
    [h, s, l] = [h, s, l].map((n) => parseInt(n));
    return hslString({ h, s, l });
  });

  const hslToRGB = ((value) => {
    let [h, s, l] = dataHSL(value);
    [h, s, l] = [h / 60, s / 100, l / 100];
    let c = s * (1 - Math.abs(2 * l - 1));
    let x = c * (1 - Math.abs(h % 2 - 1));
    let m = l - c / 2;
    [c, x, m] = [(c + m), (x + m), m].map((v) => Math.round(v * 255));
    [c, x, m] = [c, x, m].map((v) => (v < 1) ? 0 : v); // NOTE: Math.round() => -0
    let [r, g, b] = [
      [c, x, m],
      [x, c, m],
      [m, c, x],
      [m, x, c],
      [x, m, c],
      [c, m, x]
    ][Math.floor(h) % 6];
    return rgbString({ r, g, b });
  });
  const hslToHEX = ((value) => {
    let [r, g, b] = dataRGB(hslToRGB(value));
    [r, g, b] = [r, g, b].map((n) => parseInt(n, 10).toString(16));
    [r, g, b] = [r, g, b].map((n) => n.length === 1 ? `0${n}` : n);
    return hexString({ r, g, b });
  });

  const hexToRGB = ((value) => {
    if (value.includes("#"))
      value = value.replace("#", "");
    if (value.length === 3)
      value = ([...value]).map(re.hex3To6).join("");
    value = ((v) => {
      return ([v >> 16 & 0xff, v >> 8 & 0xff, v & 0xff]);
    })("0x" + value);
    return rgbString(value);
  });
  const hexToHSL = ((value) => {
    value = dataRGB(hexToRGB(value));
    return rgbToHSL(value);
  });

  const colorSplit = ((value) => {
    const color = {};

    ([{ format: "HEX", test: "isHEX" },
      { format: "RGB", test: "isRGB" },
      { format: "HSL", test: "isHSL" }
    ]).forEach(({ format, test }) => {

      if (re[test](value)) {
        color.format = format;
        if (color.format === "HEX") {
          color.values = // hex3 or hex6
            ((value.match(re.hex6).length < 3) ?
              value.match(re.hex3).map(re.hex3To6) :
              value.match(re.hex6)).join("");
          color.hex = `#${color.values}`;
          color.values = ((v) => [
            v >> 16 & 0xff,
            v >> 8 & 0xff,
            v & 0xff
          ])("0x" + color.values);
        } else {
          color.values = re.safeSliceF(value);
        }
      }
    });

    return color;
  });

  const compSort = ((colors) => {
    let [column_0, column_1, column_2, results] = [[], [], [], []];

    colors = colors.map(({ values }) => values);
    colors.forEach(([c0, c1, c2]) => {
      column_0.push(c0);
      column_1.push(c1);
      column_2.push(c2);
    });

    column_0 = new Set(column_0.sort((a, b) => a - b));
    column_1 = new Set(column_1.sort((a, b) => a - b));
    column_2 = new Set(column_2.sort((a, b) => a - b));

    ([...column_0]).forEach((item0) => {
      const f0 = colors.filter(([v, , ]) => v === item0);
      ([...column_1]).forEach((item1) => {
        const f1 = f0.filter(([, v, ]) => v === item1);
        ([...column_2]).forEach((item2) => {
          const f2 = f1.filter(([, , v]) => v === item2);
          if (!!f2) // NOTE: values that match all 3 filters
            ([...f2]).forEach((value) => results.push(value));
        });
      });
    });
    // 
    return results;
  });
  const colorSort = ((colors) => {
    const formats = {};

    colors = ([...colors]).map((v) => colorSplit(v));

    formats.hex = colors.filter((color) => color.format === "HEX");
    formats.rgb = colors.filter((color) => color.format === "RGB");
    formats.hsl = colors.filter((color) => color.format === "HSL");

    formats.hex = compSort(formats.hex)
      .map(([r, g, b]) => rgbToHEX([r, g, b]));
    formats.rgb = compSort(formats.rgb)
      .map(([r, g, b]) => rgbString([r, g, b]));
    formats.hsl = compSort(formats.hsl)
      .map(([h, s, l]) => hslString([h, s, l]));

    return [...formats.hex, ...formats.rgb, ...formats.hsl].join("\n");
  });

  const getContrast = ((colorA, colorB) => {
    if (!colorA) { return; }
    if (!colorB) {
      colorA = (re.isRGB(colorA)) ?
        colorA : newColorObj(colorA).rgb;
      if (!colorA || !re.isRGB(colorA)) return;
      const black = getContrast(colorA, "rgb(0,0,0)");
      const white = getContrast(colorA, "rgb(255,255,255)");
      return { black, white };
    }

    if (re.isRGB(colorA) && re.isRGB(colorB)) {
      const linear_sRGB = ((v) =>
        (v < 0.04045) ? (v / 12.92) : ((v + 0.055) / 1.055) ** 2.4);
      //
      const [L1, L2] = [colorA, colorB].map((value) => {
        let [r, g, b] = dataRGB(value).map((v) => linear_sRGB(v / 255));
        return [(r * 0.2126) + (g * 0.7152) + (b * 0.0722)];
      });
      const C = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      return (!!C) ? +C.toPrecision((C >= 10) ? 4 : 3) : (L1 === L2) ? 1 : 21;
    }
  });

  const newColorObj = ((color) => {

    if (!color) return newColorObj("#000");
    if (Array.isArray(color)) {
      return ((array) =>
        ([...array].filter((v) => !!v))
        .map((v) => newColorObj(v)))(color);
    } else if (!color.format) color = colorSplit(color);

    return (color.format === "HEX") ? {
        hex: color.hex,
        rgb: rgbString(color.values),
        hsl: hexToHSL(color.values),
        contrast: getContrast(rgbString(color.values))
      } :
      (color.format === "RGB") ? {
        hex: rgbToHEX(color.values),
        rgb: rgbString(color.values),
        hsl: rgbToHSL(color.values),
        contrast: getContrast(rgbString(color.values))
      } :
      (color.format === "HSL") ? {
        hex: hslToHEX(color.values),
        rgb: hslToRGB(color.values),
        hsl: hslString(color.values),
        contrast: getContrast(hslToRGB(color.values))
      } : newColorObj("#000");
  });

  return { colorSplit, colorSort, getContrast, newColorObj };
})();


/* random color generator */
const gen = (() => {
  const rand = ((N = 255) => Math.floor(Math.random() * N));

  const hexLength = (() => [3, 6][rand() % 2]);
  const textCase = ["toUpperCase", "toLowerCase"][rand() % 2];
  const hexChar = (() => "0123456789ABCDEF".charAt(rand(16))[textCase]());

  const randRGB = (() => `rgb(${rand()}, ${rand()}, ${rand()})`);
  const randHSL = (() => `hsl(${rand(360)}, ${rand(100)}%, ${rand(100)}%)`);
  const randHEX = (() => `#${Array.from({ length: hexLength() },  hexChar).join("")}`);

  const mapFunc = ((n, fn) => ([...",".repeat(n)]).map(fn));
  const randArray = () => ([
    ...mapFunc(12, (() => randHEX())),
    ...mapFunc(6, (() => randRGB())),
    ...mapFunc(6, (() => randHSL()))
  ]);
  return { randHEX, randRGB, randHSL, randArray };
})();