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
{
  input: 'input_format',
  rgb: 'rgb_string',
  hex: 'hex_string',
  hsl: 'hsl_string',
  contrast: { black: 1.00, white: 21.00 }
}
```

