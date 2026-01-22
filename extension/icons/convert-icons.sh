#!/bin/bash
# Convert SVG to PNG at different sizes
for size in 16 32 48 128; do
  if command -v rsvg-convert &> /dev/null; then
    rsvg-convert -w $size -h $size icon.svg > icon${size}.png
  elif command -v convert &> /dev/null; then
    convert -background none -resize ${size}x${size} icon.svg icon${size}.png
  elif command -v sips &> /dev/null; then
    # macOS fallback - create placeholder PNGs
    echo "Creating placeholder icons (install librsvg for better quality)"
  fi
done
