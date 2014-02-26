#!/bin/bash
# build the static site in the dist/static/ directory
# assuming you're already running
# grunt serve:dist on localhost:9000/pouch-test-reports/

rm -fr dist/static
mkdir -p dist
wget --recursive --no-clobber --page-requisites --html-extension --convert-links --no-parent localhost:9000/index.html
mv localhost:9000 dist/static
jade app/views/partials/*.jade --out dist/static/partials
jade app/views/404.jade --out dist/static
mv dist/static/partials/main.html dist/static/partials/main
mv dist/static/partials/navbar.html dist/static/partials/navbar
