# Daily Log

Habits and tasks, logged every day. Installable, works offline, and your data stays on your device.

## Put it online (free, once)

Step-by-step for GitHub Pages: **DEPLOY-GITHUB.md**.

The app has to be opened from an `https://` address before a browser will let you install it. Two free ways to get one:

**GitHub Pages**
1. Create a new repository called `daily-log` and upload everything in this folder, keeping the `icons/` and `fonts/` folders as they are.
2. In the repository, go to **Settings → Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. After a minute the app is live at `https://<your-username>.github.io/daily-log/`.

**Netlify Drop** (no account setup needed)
1. Open app.netlify.com/drop and drag this whole folder onto the page.
2. You get a link straight away. Create a free account if you want it to stay up permanently.

## Just testing on your phone first?

You can install it without hosting anything — see **INSTALL-LOCAL.md**.

## Install it

- **Android:** open the link in Chrome. Tap **Install** in Settings → App, or use Chrome's **⋮** menu → **Install app**.
- **PC:** open the link in Chrome or Edge and click the install icon at the right of the address bar.

After that, it opens from its own icon, in its own window, with or without internet.

## Move your existing data

Data doesn't move between addresses or devices automatically.
1. In your old copy, go to **Export → Download backup**.
2. In the installed app, go to **Export → Restore** and pick that file.

Do this once per device.

## Releasing an update

1. Change `index.html`.
2. In `sw.js`, bump `VERSION` (for example `daily-log-v1` → `daily-log-v2`).
3. Upload both files.

Open copies will show "A new version is ready — Update". If you skip step 2, phones keep the old version.

## Tests

```
npm install jsdom
node tests/test3.js index.html     # core app — 82 checks
node tests/test4.js index.html     # settings, rest mode, day end, week start — 49
node tests/pilltest2.js index.html # focus pill — 8
node tests/pwatest.js .            # install, offline, updates — 31
```

The Outfit font is included under the SIL Open Font License (`fonts/OFL.txt`).
