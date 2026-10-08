#!/bin/sh
# Run from the repository root. Stages the V3 preview at /; never deploys it.
set -eu
# A temporary staging directory prevents stale nested output from surviving rebuilds.
staging=$(mktemp -d /tmp/cast-v3-build.XXXXXX)
trap 'rm -rf "$staging"' EXIT HUP INT TERM
mkdir -p "$staging/js" "$staging/assets"
cp cast-v3/index.html cast-v3/styles.css "$staging/"
cp cast-v3/js/*.js "$staging/js/"
cp cast-v3/assets/cast-signature-no1.svg "$staging/assets/"
cp IMG_0316.png 5E4FFD0F-38D3-4870-AB2B-571593DF09A9.png "$staging/"
# This directory contains only outputs produced by this build.
rm -rf cast-v3-preview-dist
mkdir cast-v3-preview-dist
cp -R "$staging/." cast-v3-preview-dist/
