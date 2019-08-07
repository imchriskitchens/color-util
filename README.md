# color-util
Color contrast and conversion tool

## conversions: 
 - hexToRGB(hex)
 - hexToHSL(hex)
 - rgbToHEX(rgb)
 - rgbToHSL(rgb)
 - hslToRGB(hsl)
 - hslToHEX(hsl)

## colorUtil
 * **Regular Expressions**
 - isHEX
 - isRGB
 - isHSL
 
 * getContrast(colorA, colorB)
 
 * getFormat(color)
  - Format auto-detection using RegExp
  - Automatically selects conversion functions to calculate missing values 
 
 
 ## colorObj()
   *Takes a string value and returns an object containing:*
   - Default format (input value)
   - RGB value
   - HEX value
   - HSL value
   - contrast ratios
    - white text
    - black text
