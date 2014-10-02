cover
=====

This project contains the code of the campaign landing page built for the kick-off.

### Build
    npm install -g gulp
    npm install
    gulp


### Tasks
---
  - default: clean build of the project
  - templates: compile the templates in static/html
  - styles: compile static/less/style.less
  - watch: start a local server [localhost:8080](http://localhost:8080) and watch for style or template changes
  - ci: build and package everything together into dist/
