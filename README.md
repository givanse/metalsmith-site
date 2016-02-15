# Metalsmith Site

Metalsmith configuation for a static site with isolated pages. Each page can have it's own data, css, and javascript files.

## Files and Folders

### main.js + build.js
Metalsmith entry point

### src/

All files related to the site. The following file are copied to `/build`.

- `**/{index,data,global}.{js,css,scss}`
- `**/index.{html,swig}`
- `static/*`

### config/

Various helpers an metalsmith plugins

### build/

Output of static site. Upload this to the server.
