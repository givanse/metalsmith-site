# Metalsmith Site

Metalsmith configuration for a static site with isolated pages. Each page can have it's own data, css, and javascript files.

## Setup

```sh
git clone https://github.com/moudy/metalsmith-site
cd metalsmith-site
npm install
npm run dev
```

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
