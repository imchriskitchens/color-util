# [color-util](https://github.com/imchriskitchens/color-util)

**Updating Documentation Soon**   

- hexString( *rgb_object* )
- rgbString( *rgb_object* )
- hslString( *hsl_object* )

- dataType( )

- rgbToHEX( *rgb_string* )
- rgbToHSL( *rgb_string* )
- hslToRGB( *hsl_string* )
- hslToHEX( *hsl_string* )
- hexToRGB( *hex_string* )
- hexToHSL( *hex_string* )

- colorSplit( )

- compSort( )
- colorSort( )

- getContrast( )

- newColorObj( )



```javascript
const array = gen.randArray();
console.log(array);
/* ['#e76dcb',
'#2a8',
'#9c0bc1',
'#9b5',
'#b834a1',
'#494',
'#185841',
'#6a1',
'rgb(62, 7, 130)',
'rgb(27, 248, 5)',
'rgb(4, 167, 63)',
'rgb(32, 225, 139)',
'rgb(129, 4, 170)',
'rgb(246, 171, 68)',
'hsl(183, 47%, 78%)',
'hsl(336, 39%, 56%)',
'hsl(35, 66%, 86%)',
'hsl(356, 97%, 64%)',
'hsl(268, 41%, 88%)',
'hsl(255, 27%, 89%)'] */


console.log(array.map((v) => colorUtil.colorSplit(v)));
/* [ { format: 'HEX', values: [ 231, 109, 203 ], hex: '#e76dcb' },
  { format: 'HEX', values: [ 34, 170, 136 ], hex: '#22aa88' },
  { format: 'HEX', values: [ 156, 11, 193 ], hex: '#9c0bc1' },
  { format: 'HEX', values: [ 153, 187, 85 ], hex: '#99bb55' },
  { format: 'HEX', values: [ 184, 52, 161 ], hex: '#b834a1' },
  { format: 'HEX', values: [ 68, 153, 68 ], hex: '#449944' },
  { format: 'HEX', values: [ 24, 88, 65 ], hex: '#185841' },
  { format: 'HEX', values: [ 102, 170, 17 ], hex: '#66aa11' },
  { format: 'RGB', values: [ 62, 7, 130 ] },
  { format: 'RGB', values: [ 27, 248, 5 ] },
  { format: 'RGB', values: [ 4, 167, 63 ] },
  { format: 'RGB', values: [ 32, 225, 139 ] },
  { format: 'RGB', values: [ 129, 4, 170 ] },
  { format: 'RGB', values: [ 246, 171, 68 ] },
  { format: 'HSL', values: [ 183, 47, 78 ] },
  { format: 'HSL', values: [ 336, 39, 56 ] },
  { format: 'HSL', values: [ 35, 66, 86 ] },
  { format: 'HSL', values: [ 356, 97, 64 ] },
  { format: 'HSL', values: [ 268, 41, 88 ] },
  { format: 'HSL', values: [ 255, 27, 89 ] } ] */


console.log(array.map((v) => colorUtil.getContrast(v)));
/* [ { black: 7.45, white: 2.82 },
  { black: 7.17, white: 2.93 },
  { black: 3.23, white: 6.5 },
  { black: 9.59, white: 2.19 },
  { black: 4.04, white: 5.19 },
  { black: 5.89, white: 3.57 },
  { black: 2.51, white: 8.36 },
  { black: 7.32, white: 2.87 },
  { black: 1.56, white: 13.48 },
  { black: 14.48, white: 1.45 },
  { black: 6.6, white: 3.18 },
  { black: 12.2, white: 1.72 },
  { black: 2.53, white: 8.3 },
  { black: 10.83, white: 1.94 },
  { black: 14.42, white: 1.46 },
  { black: 5.24, white: 4.01 },
  { black: 16.16, white: 1.3 },
  { black: 6.25, white: 3.36 },
  { black: 14.81, white: 1.42 },
  { black: 15.47, white: 1.36 } ] */


console.log(array.map((v) => colorUtil.newColorObj(v)));
/* [ { hex: '#e76dcb',
    rgb: 'rgb(231, 109, 203)',
    hsl: 'hsl(0, 100%, 6%)',
    contrast: { black: 7.45, white: 2.82 } },
  { hex: '#22aa88',
    rgb: 'rgb(34, 170, 136)',
    hsl: 'hsl(108, 100%, 19%)',
    contrast: { black: 7.17, white: 2.93 } },
  { hex: '#9c0bc1',
    rgb: 'rgb(156, 11, 193)',
    hsl: 'hsl(90, 100%, 9%)',
    contrast: { black: 3.23, white: 6.5 } },
  { hex: '#99bb55',
    rgb: 'rgb(153, 187, 85)',
    hsl: 'hsl(59, 100%, 26%)',
    contrast: { black: 9.59, white: 2.19 } },
  { hex: '#b834a1',
    rgb: 'rgb(184, 52, 161)',
    hsl: 'hsl(46, 99%, 4%)',
    contrast: { black: 4.04, white: 5.19 } },
  { hex: '#449944',
    rgb: 'rgb(68, 153, 68)',
    hsl: 'hsl(180, 11%, 36%)',
    contrast: { black: 5.89, white: 3.57 } },
  { hex: '#185841',
    rgb: 'rgb(24, 88, 65)',
    hsl: 'hsl(0, 14%, 46%)',
    contrast: { black: 2.51, white: 8.36 } },
  { hex: '#66aa11',
    rgb: 'rgb(102, 170, 17)',
    hsl: 'hsl(12, 100%, 21%)',
    contrast: { black: 7.32, white: 2.87 } },
  { hex: '#3E0782',
    rgb: 'rgb(62, 7, 130)',
    hsl: 'hsl(266, 89%, 26%)',
    contrast: { black: 1.56, white: 13.48 } },
  { hex: '#1BF805',
    rgb: 'rgb(27, 248, 5)',
    hsl: 'hsl(114, 96%, 49%)',
    contrast: { black: 14.48, white: 1.45 } },
  { hex: '#04A73F',
    rgb: 'rgb(4, 167, 63)',
    hsl: 'hsl(141, 95%, 33%)',
    contrast: { black: 6.6, white: 3.18 } },
  { hex: '#20E18B',
    rgb: 'rgb(32, 225, 139)',
    hsl: 'hsl(153, 76%, 50%)',
    contrast: { black: 12.2, white: 1.72 } },
  { hex: '#8104AA',
    rgb: 'rgb(129, 4, 170)',
    hsl: 'hsl(285, 95%, 34%)',
    contrast: { black: 2.53, white: 8.3 } },
  { hex: '#F6AB44',
    rgb: 'rgb(246, 171, 68)',
    hsl: 'hsl(34, 90%, 61%)',
    contrast: { black: 10.83, white: 1.94 } },
  { hex: '#ADDFE1',
    rgb: 'rgb(173, 223, 225)',
    hsl: 'hsl(183, 47%, 78%)',
    contrast: { black: 14.42, white: 1.46 } },
  { hex: '#BB6386',
    rgb: 'rgb(187, 99, 134)',
    hsl: 'hsl(336, 39%, 56%)',
    contrast: { black: 5.24, white: 4.01 } },
  { hex: '#F3DFC4',
    rgb: 'rgb(243, 223, 196)',
    hsl: 'hsl(35, 66%, 86%)',
    contrast: { black: 16.16, white: 1.3 } },
  { hex: '#FC4A56',
    rgb: 'rgb(252, 74, 86)',
    hsl: 'hsl(356, 97%, 64%)',
    contrast: { black: 6.25, white: 3.36 } },
  { hex: '#E0D4ED',
    rgb: 'rgb(224, 212, 237)',
    hsl: 'hsl(268, 41%, 88%)',
    contrast: { black: 14.81, white: 1.42 } },
  { hex: '#DFDBEB',
    rgb: 'rgb(223, 219, 235)',
    hsl: 'hsl(255, 27%, 89%)',
    contrast: { black: 15.47, white: 1.36 } } ] */


console.log(JSON.stringify(array.map((v) => colorUtil.newColorObj(v)), null, 2));
/* [
  {
    "hex": "#bb7755",
    "rgb": "rgb(187, 119, 85)",
    "hsl": "hsl(108, 100%, 26%)",
    "contrast": {
      "black": 5.88,
      "white": 3.57
    }
  },
  {
    "hex": "#45ff4a",
    "rgb": "rgb(69, 255, 74)",
    "hsl": "hsl(180, 15%, 39%)",
    "contrast": {
      "black": 15.66,
      "white": 1.34
    }
  },
  {
    "hex": "#0bbe38",
    "rgb": "rgb(11, 190, 56)",
    "hsl": "hsl(0, 25%, 45%)",
    "contrast": {
      "black": 8.44,
      "white": 2.49
    }
  },
  {
    "hex": "#b4fa62",
    "rgb": "rgb(180, 250, 98)",
    "hsl": "hsl(88, 100%, 30%)",
    "contrast": {
      "black": 16.79,
      "white": 1.25
    }
  },
  {
    "hex": "#dd4411",
    "rgb": "rgb(221, 68, 17)",
    "hsl": "hsl(359, 63%, 24%)",
    "contrast": {
      "black": 4.91,
      "white": 4.28
    }
  },
  {
    "hex": "#992200",
    "rgb": "rgb(153, 34, 0)",
    "hsl": "hsl(60, 100%, 10%)",
    "contrast": {
      "black": 2.58,
      "white": 8.13
    }
  },
  {
    "hex": "#4bab1b",
    "rgb": "rgb(75, 171, 27)",
    "hsl": "hsl(359, 48%, 29%)",
    "contrast": {
      "black": 7.14,
      "white": 2.94
    }
  },
  {
    "hex": "#b52788",
    "rgb": "rgb(181, 39, 136)",
    "hsl": "hsl(108, 100%, 19%)",
    "contrast": {
      "black": 3.61,
      "white": 5.82
    }
  },
  {
    "hex": "#7D4613",
    "rgb": "rgb(125, 70, 19)",
    "hsl": "hsl(28, 73%, 28%)",
    "contrast": {
      "black": 2.76,
      "white": 7.62
    }
  },
  {
    "hex": "#81A656",
    "rgb": "rgb(129, 166, 86)",
    "hsl": "hsl(87, 31%, 49%)",
    "contrast": {
      "black": 7.52,
      "white": 2.79
    }
  },
  {
    "hex": "#57FD24",
    "rgb": "rgb(87, 253, 36)",
    "hsl": "hsl(105, 98%, 56%)",
    "contrast": {
      "black": 15.48,
      "white": 1.36
    }
  },
  {
    "hex": "#AA03EE",
    "rgb": "rgb(170, 3, 238)",
    "hsl": "hsl(282, 97%, 47%)",
    "contrast": {
      "black": 3.96,
      "white": 5.31
    }
  },
  {
    "hex": "#F7CD85",
    "rgb": "rgb(247, 205, 133)",
    "hsl": "hsl(37, 87%, 74%)",
    "contrast": {
      "black": 14.03,
      "white": 1.5
    }
  },
  {
    "hex": "#ECBA04",
    "rgb": "rgb(236, 186, 4)",
    "hsl": "hsl(47, 96%, 47%)",
    "contrast": {
      "black": 11.59,
      "white": 1.81
    }
  },
  {
    "hex": "#F0B056",
    "rgb": "rgb(240, 176, 86)",
    "hsl": "hsl(35, 84%, 64%)",
    "contrast": {
      "black": 11.05,
      "white": 1.9
    }
  },
  {
    "hex": "#DDC6D1",
    "rgb": "rgb(221, 198, 209)",
    "hsl": "hsl(329, 25%, 82%)",
    "contrast": {
      "black": 13.07,
      "white": 1.61
    }
  },
  {
    "hex": "#D9FC79",
    "rgb": "rgb(217, 252, 121)",
    "hsl": "hsl(76, 95%, 73%)",
    "contrast": {
      "black": 18.15,
      "white": 1.16
    }
  },
  {
    "hex": "#3C6796",
    "rgb": "rgb(60, 103, 150)",
    "hsl": "hsl(211, 43%, 41%)",
    "contrast": {
      "black": 3.57,
      "white": 5.88
    }
  },
  {
    "hex": "#31253C",
    "rgb": "rgb(49, 37, 60)",
    "hsl": "hsl(271, 23%, 19%)",
    "contrast": {
      "black": 1.46,
      "white": 14.38
    }
  },
  {
    "hex": "#FDF7F7",
    "rgb": "rgb(253, 247, 247)",
    "hsl": "hsl(1, 53%, 98%)",
    "contrast": {
      "black": 19.82,
      "white": 1.06
    }
  }
] */


console.log(array.map((v) => colorUtil.newColorObj(v))
  .sort((a, b) => a.contrast.black - b.contrast.black));
/* [ { hex: '#3E0782',
    rgb: 'rgb(62, 7, 130)',
    hsl: 'hsl(266, 89%, 26%)',
    contrast: { black: 1.56, white: 13.48 } },
  { hex: '#185841',
    rgb: 'rgb(24, 88, 65)',
    hsl: 'hsl(0, 14%, 46%)',
    contrast: { black: 2.51, white: 8.36 } },
  { hex: '#8104AA',
    rgb: 'rgb(129, 4, 170)',
    hsl: 'hsl(285, 95%, 34%)',
    contrast: { black: 2.53, white: 8.3 } },
  { hex: '#9c0bc1',
    rgb: 'rgb(156, 11, 193)',
    hsl: 'hsl(90, 100%, 9%)',
    contrast: { black: 3.23, white: 6.5 } },
  { hex: '#b834a1',
    rgb: 'rgb(184, 52, 161)',
    hsl: 'hsl(46, 99%, 4%)',
    contrast: { black: 4.04, white: 5.19 } },
  { hex: '#BB6386',
    rgb: 'rgb(187, 99, 134)',
    hsl: 'hsl(336, 39%, 56%)',
    contrast: { black: 5.24, white: 4.01 } },
  { hex: '#449944',
    rgb: 'rgb(68, 153, 68)',
    hsl: 'hsl(180, 11%, 36%)',
    contrast: { black: 5.89, white: 3.57 } },
  { hex: '#FC4A56',
    rgb: 'rgb(252, 74, 86)',
    hsl: 'hsl(356, 97%, 64%)',
    contrast: { black: 6.25, white: 3.36 } },
  { hex: '#04A73F',
    rgb: 'rgb(4, 167, 63)',
    hsl: 'hsl(141, 95%, 33%)',
    contrast: { black: 6.6, white: 3.18 } },
  { hex: '#22aa88',
    rgb: 'rgb(34, 170, 136)',
    hsl: 'hsl(108, 100%, 19%)',
    contrast: { black: 7.17, white: 2.93 } },
  { hex: '#66aa11',
    rgb: 'rgb(102, 170, 17)',
    hsl: 'hsl(12, 100%, 21%)',
    contrast: { black: 7.32, white: 2.87 } },
  { hex: '#e76dcb',
    rgb: 'rgb(231, 109, 203)',
    hsl: 'hsl(0, 100%, 6%)',
    contrast: { black: 7.45, white: 2.82 } },
  { hex: '#99bb55',
    rgb: 'rgb(153, 187, 85)',
    hsl: 'hsl(59, 100%, 26%)',
    contrast: { black: 9.59, white: 2.19 } },
  { hex: '#F6AB44',
    rgb: 'rgb(246, 171, 68)',
    hsl: 'hsl(34, 90%, 61%)',
    contrast: { black: 10.83, white: 1.94 } },
  { hex: '#20E18B',
    rgb: 'rgb(32, 225, 139)',
    hsl: 'hsl(153, 76%, 50%)',
    contrast: { black: 12.2, white: 1.72 } },
  { hex: '#ADDFE1',
    rgb: 'rgb(173, 223, 225)',
    hsl: 'hsl(183, 47%, 78%)',
    contrast: { black: 14.42, white: 1.46 } },
  { hex: '#1BF805',
    rgb: 'rgb(27, 248, 5)',
    hsl: 'hsl(114, 96%, 49%)',
    contrast: { black: 14.48, white: 1.45 } },
  { hex: '#E0D4ED',
    rgb: 'rgb(224, 212, 237)',
    hsl: 'hsl(268, 41%, 88%)',
    contrast: { black: 14.81, white: 1.42 } },
  { hex: '#DFDBEB',
    rgb: 'rgb(223, 219, 235)',
    hsl: 'hsl(255, 27%, 89%)',
    contrast: { black: 15.47, white: 1.36 } },
  { hex: '#F3DFC4',
    rgb: 'rgb(243, 223, 196)',
    hsl: 'hsl(35, 66%, 86%)',
    contrast: { black: 16.16, white: 1.3 } } ] */


console.log(colorUtil.colorSort(array));
/* #185841
#22AA88
#449944
#66AA11
#99BB55
#9C0BC1
#B834A1
#E76DCB
rgb(4, 167, 63)
rgb(27, 248, 5)
rgb(32, 225, 139)
rgb(62, 7, 130)
rgb(129, 4, 170)
rgb(246, 171, 68)
hsl(35, 66%, 86%)
hsl(183, 47%, 78%)
hsl(255, 27%, 89%)
hsl(268, 41%, 88%)
hsl(336, 39%, 56%)
hsl(356, 97%, 64%) */
```
