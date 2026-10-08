#!/bin/sh
# Run from the repository root. This prepares files; it does not deploy anything.
set -eu
mkdir -p cast-v3-preview-dist/cast-v3/js
cp cast-v3/index.html cast-v3/styles.css cast-v3-preview-dist/cast-v3/
cp cast-v3/js/*.js cast-v3-preview-dist/cast-v3/js/
cp IMG_0316.png 5E4FFD0F-38D3-4870-AB2B-571593DF09A9.png cast-v3-preview-dist/
