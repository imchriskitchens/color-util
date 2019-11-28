# color-util
Color contrast and conversion tool


- hexString( *rgb_object* )
- rgbString( *rgb_object* )
- hslString( *hsl_object* )


- hexToRGB( *hex_string* )
- hexToHSL( *hex_string* )
- rgbToHEX( *rgb_string* )
- rgbToHSL( *rgb_string* )
- hslToRGB( *hsl_string* )
- hslToHEX( *hsl_string* )


- getContrast( *rgb_string* , *rgb_string* )

- getObjectArray( *array [ string_values ]* )

- getColorObj( *string_value* )



```javascript
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

```
