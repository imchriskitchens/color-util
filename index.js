const colorUtil = (() => {
  /************** PATTERN MATCHING **************/
  const re = (() => {
    const _op = "[\\s|\\(]+";
    const _cp = "\\s*\\)?";
    const _cs = "[,|\\s]+";
    const NUM = "(\\d{1,3})";
    const PERCENT = "(\\d{1,3})%";
    const HEX_DIGIT = "(?:[a-f\\d])";
    return ({
      rgb: new RegExp("rgb" + _op + NUM + _cs + NUM + _cs + NUM + _cp),
      hsl: new RegExp("hsl" + _op + NUM + _cs + PERCENT + _cs + PERCENT + _cp),
      hex: new RegExp("^#((?:" + HEX_DIGIT + "{2}|" + HEX_DIGIT + "{1}){3})$", "i"),
      hex3: new RegExp("(" + HEX_DIGIT + "{1})", "ig"),
      hex6: new RegExp("(" + HEX_DIGIT + "{2})", "ig"),
    });
  })();

  const isHEX = ((v) => re.hex.test(v));
  const isRGB = ((v) => re.rgb.test(v));
  const isHSL = ((v) => re.hsl.test(v));

  const matchFormat = ((val, fmt) => {
    fmt = fmt.toLowerCase();
    val = val.match(re[fmt]);
    return (!!val) ? (
      val.slice(1)
      .map((n) => +n)
    ) : false;
  });

  /************* MISC TOOLS & UTILS *************/
  const hexToDecimal = ((v) => ([
    v >> 16 & 0xFF,
    v >> 8 & 0xFF,
    v & 0xFF,
  ]));

  const doubleChar = ((c) => `${c}${c}`);
  const rgbString = (([r, g, b]) => `rgb(${r}, ${g}, ${b})`);
  const hslString = (([h, s, l]) => `hsl(${h}, ${s}%, ${l}%)`);

  /******************** CONVERSIONS ********************/
  const dataType = ((value) => (
    (isRGB(value)) ? matchFormat(value, "RGB") :
    (isHSL(value)) ? matchFormat(value, "HSL") :
    (isHEX(value)) ? matchFormat(value, "HEX") :
    (Array.isArray(value)) ? ([...value]) : value));

  const rgbToHEX = ((value) => {
    value = dataType(value);
    return "#" + (
      [...new Uint8ClampedArray(value)]
      .map((n) => (n & 0xFF).toString(16))
      .map((n) => (n.length < 2) ? "0" + n : n)
      .map((v) => (typeof v === "string") ? v.replace("0x", "") : v)
      .join("")
    ).toUpperCase();
  });

  const rgbToHSL = ((value) => {
    let [r, g, b] = dataType(value);
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
    return hslString([h, s, l]);
  });

  const hslToRGB = ((value) => {
    let [h, s, l] = dataType(value);
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
    return rgbString([r, g, b]);
  });

  const hslToHEX = ((value) => {
    value = hslToRGB(value);
    value = dataType(value);
    return rgbToHEX(value);
  });

  const hexToRGB = ((value) => {
    if (value.includes("#"))
      value = value.replace("#", "");
    if (value.length < 6)
      value = ([...value].map(doubleChar).join(""));
    value = hexToDecimal("0x" + value);
    return rgbString(value);
  });

  const hexToHSL = ((value) => {
    value = hexToRGB(value);
    value = dataType(value);
    return rgbToHSL(value);
  });

  /********** COLOR FORMAT & COMPONENT SORTING **********/
  const colorSplit = ((value) => {
    const color = {};

    ([ ///* VALID FORMATS */
      { format: "HEX", isValid: isHEX(value) },
      { format: "RGB", isValid: isRGB(value) },
      { format: "HSL", isValid: isHSL(value) }
    ]).forEach(({ format, isValid }) => {

      if (isValid) { // COLOR FORMAT
        color.format = format;

        if (format === "HEX") {
          value = (
            (value.length < 6) ?
            value.match(re.hex3).map(doubleChar) :
            value.match(re.hex6)
          ).join("");

          color.hex = ("#" + value);
          [color.r, color.g, color.b] = hexToDecimal("0x" + value);
        } else {
          value = matchFormat(value, format);

          if (format === "HSL")
            [color.h, color.s, color.l] = value;
          if (format === "RGB")
            [color.r, color.g, color.b] = value;
        }
      }
    });

    return color;
  });

  const compSort = ((colors) => {
    let [results, column_0, column_1, column_2] = [[], [], [], []];

    colors = colors.map((c) => {
      if (c.format === "RGB" || c.format === "HEX") {
        column_0.push(c.r);
        column_1.push(c.g);
        column_2.push(c.b);
        return [c.r, c.g, c.b];
      }
      if (c.format === "HSL") {
        column_0.push(c.h);
        column_1.push(c.s);
        column_2.push(c.l);
        return [c.h, c.s, c.l];
      }
    });

    column_0 = new Set(column_0.sort((a, b) => a - b));
    column_1 = new Set(column_1.sort((a, b) => a - b));
    column_2 = new Set(column_2.sort((a, b) => a - b));

    [...column_0].forEach((v0) => {
      const first = colors.filter(([x, , ]) => x === v0);
      [...column_1].forEach((v1) => {
        const second = first.filter(([, y, ]) => y === v1);
        [...column_2].forEach((v2) => {
          const third = second.filter(([, , z]) => z === v2);
          if (!!third) // NOTE: values that match all 3 filters
            third.forEach((value) => results.push(value));
        });
      });
    });
    // 
    return results;
  });

  const colorSort = ((colors) => {
    if (!Array.isArray(colors)) {
      console.log(`colorSort() expects an array of colors but recieved: { value: "${colors}", type: "${typeof colors}" }`);
      return colors;
    }

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

  /********************** CONTRAST **********************/
  const getContrast = ((colorA, colorB) => {
    if (Array.isArray(colorA)) {
      return colorA.map(getContrast);
    } else if (!colorA) { return; }
    if (colorA && !isRGB(colorA)) {
      colorA = (newColorObj(colorA).rgb);
    } else if (!colorA || !isRGB(colorA)) { return; }
    if (!colorB) {
      const black = getContrast(colorA, "rgb(0,0,0)");
      const white = getContrast(colorA, "rgb(255,255,255)");
      return { black, white };
    }

    if (isRGB(colorA) && isRGB(colorB)) {
      const [L1, L2] = ([colorA, colorB]).map((value) => {
        const [r, g, b] = (
          dataType(value)
          .map((v) => v / 255)
          .map((v) => (
            (v < 0.04045) ?
            (v / 12.92) :
            ((v + 0.055) / 1.055) ** 2.4)));
        return [(r * 0.2126) + (g * 0.7152) + (b * 0.0722)];
      });

      const C = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      return (!!C) ? +C.toPrecision((C >= 10) ? 4 : 3) : (L1 === L2) ? 1 : 21;
    }
  });

  /********************** FACTORY **********************/
  const newColorObj = ((color) => {
    const fallback = {
      hex: '#000000',
      rgb: 'rgb(0, 0, 0)',
      hsl: 'hsl(0, 0%, 0%)',
      contrast: { black: 1, white: 21 }
    };

    if (!color) return fallback;
    if (Array.isArray(color)) {
      return ((array) =>
        ([...array].filter((v) => !!v))
        .map((v) => newColorObj(v)))(color);
    } else if (!color.format) {
      color = colorSplit(color);
    }

    return (
      (color.format === "HEX") ? {
        hex: color.hex,
        rgb: rgbString([color.r, color.g, color.b]),
        hsl: rgbToHSL([color.r, color.g, color.b]),
        contrast: getContrast(rgbString([color.r, color.g, color.b]))
      } :
      (color.format === "RGB") ? {
        hex: rgbToHEX([color.r, color.g, color.b]),
        rgb: rgbString([color.r, color.g, color.b]),
        hsl: rgbToHSL([color.r, color.g, color.b]),
        contrast: getContrast(rgbString([color.r, color.g, color.b]))
      } :
      (color.format === "HSL") ? {
        hex: hslToHEX([color.h, color.s, color.l]),
        rgb: hslToRGB([color.h, color.s, color.l]),
        hsl: hslString([color.h, color.s, color.l]),
        contrast: getContrast(hslToRGB([color.h, color.s, color.l]))
      } : fallback
    );
  });


  return {
    isHEX,
    isRGB,
    isHSL,
    rgbToHEX,
    rgbToHSL,
    hslToRGB,
    hslToHEX,
    hexToRGB,
    hexToHSL,
    colorSplit,
    colorSort,
    getContrast,
    newColorObj
  };
})();



const testColors = ([
  "#DDA",
  "#31595B",
  "#B0D8F0",
  "#ED6",
  "#EDAF10",
  "#0A8835",
  "#B31217",
  "#3B1592",
  "#5ADAE9",
  "#D3A",
  "#0DBE7A",
  "#38BF7D",
  "#D0B",
  "#FDDD90",
  "#0C1",
  "#25E047",
  "rgb(92, 31, 57)",
  "rgb(51, 35, 13)",
  "rgb(249, 220, 89)",
  "rgb(74, 203, 205)",
  "rgb(81, 71, 88)",
  "rgb(4, 203, 210)",
  "rgb(161, 94, 239)",
  "rgb(197, 89, 136)",
  "rgb(209, 61, 194)",
  "rgb(10, 22, 241)",
  "rgb(104, 212, 70)",
  "rgb(180, 39, 67)",
  "rgb(23, 3, 210)",
  "rgb(233, 77, 178)",
  "rgb(237, 247, 188)",
  "rgb(222, 238, 243)",
  "rgb(92, 56, 76)",
  "rgb(100, 89, 98)",
  "hsl(232, 13%, 23%)",
  "hsl(220, 73%, 7%)",
  "hsl(303, 14%, 58%)",
  "hsl(31, 50%, 30%)",
  "hsl(2, 75%, 10%)",
  "hsl(227, 77%, 42%)",
  "hsl(10, 63%, 12%)",
  "hsl(233, 32%, 82%)",
  "hsl(73, 61%, 35%)",
  "hsl(36, 29%, 97%)",
  "hsl(81, 93%, 84%)",
  "hsl(4, 26%, 72%)"
]);

// console.log(colorUtil.colorSort(testColors));

testColors.forEach((v) => {
  // console.log(colorUtil.getContrast(v));
  console.log(colorUtil.newColorObj(v));
  /* if (colorUtil.isHEX(v)) {
    console.log(colorUtil.hexToHSL(v));
    console.log(colorUtil.hexToRGB(v));
  } */
  /* if (colorUtil.isRGB(v)) {
    console.log(colorUtil.rgbToHEX(v));
    console.log(colorUtil.rgbToHSL(v));
  } */
  /* if (colorUtil.isHSL(v)) {
    console.log(colorUtil.hslToHEX(v));
    console.log(colorUtil.hslToRGB(v));
  } */
})