# AJP Army static test site

This copy preserves the original Divi frontend and Slider Revolution browser rendering, including responsive layer sizing, masks, WebGL effects, pointer movement, and scroll animation. Slider data is embedded locally; PHP and a WordPress database are not needed to render the public pages.

Double-click **Open AJPArmy_Test.cmd** to preview in your browser. Keep its preview window open. Use the local HTTP preview rather than opening index.html directly, so browser modules and fonts load consistently. From this folder, run `python -m http.server 8765 --bind 127.0.0.1` and visit http://127.0.0.1:8765/.

PARTNER navigation and the homepage Truther Media module are removed. The X watch link points to https://x.com/AJPArmy. The Pilled embed and external social/payment links remain live.

The `.nojekyll` file preserves the `_assets` folder when deployed to GitHub Pages. No custom-domain configuration is included.

The earlier simplified artwork, styles, and scripts remain on disk but are no longer used by these pages.
