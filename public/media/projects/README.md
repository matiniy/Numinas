# Project case study media

Drop visuals for each case study in its own folder.

## Folders

| Slug | Client · Title |
|------|----------------|
| `bellemint` | Bellemint · Bellemint |
| `dolby` | Dolby · Dolby |
| `urban-decay-ride-or-die` | Urban Decay · Ride or Die |
| `olay-stem` | Olay · STEM |
| `american-express-play-it` | American Express · Plan It |
| `excel-get-chewing` | Excel · Get Chewing |
| `secret-aluminum-free` | Secret · Aluminum Free |
| `readcoin` | Readcoin · Readcoin |
| `pellican-cushion` | Pellican · Cushion |

## Recommended files per project

```
public/media/projects/{slug}/
  thumb.jpg          # Homepage grid thumbnail
  hero.mp4           # Case study hero (or hero.jpg)
  hero.jpg           # Hero poster / still fallback
  hero.jpg           # Grid slot: hero
  still-01.jpg       # Grid slots (match ids in src/lib/projects.ts)
  still-02.jpg
  loop.mp4
  ...
```

Grid slot IDs are defined in `src/lib/projects.ts` under each project's `media` array.

## Notes

- Until files are added, case study pages show vibrant gradient placeholders.
- Videos should be muted-friendly loops for autoplay in the gallery grid.
- Update `src` paths in `projects.ts` when filenames differ from slot IDs.

## Git: videos vs code (avoid large-file warnings)

**Videos (`*.mp4`) are tracked with [Git LFS](https://git-lfs.github.com/).** Images and code stay in normal git.

### Adding new project media

1. **Code first** — commit `src/lib/projects.ts` (and any component changes) without new video files.
2. **Images** — add JPG/PNG for a project, commit, push.
3. **Video last** — add one project’s `.mp4` at a time, commit, push (LFS uploads separately).

Example:

```bash
# 1) Code + image paths only
git add src/lib/projects.ts public/media/projects/my-project/*.jpg
git commit -m "Wire My Project case study assets (images)."
git push

# 2) Video via LFS (one file or one project per commit)
git add public/media/projects/my-project/hero.mp4
git commit -m "Add My Project hero video (LFS)."
git push
```

### Tips

- Keep each MP4 **under ~50 MB** when possible (compress for web) — GitHub still accepts larger LFS files but smaller uploads are faster.
- Run **`npm run encode-videos`** (requires ffmpeg) to create `*-web.mp4` siblings with faststart + 1080p cap. Then set `VITE_VIDEO_USE_WEB_VARIANT=true`.
- Optional: set **`VITE_VIDEO_CDN_URL`** to a CDN origin (Bunny, Cloudflare R2, etc.) so the site streams from edge instead of the app host.
- Do **not** commit multiple large MP4s in a single push if you can split them.
- **Do not commit raw `.mov` masters** (often 300MB+) — export a compressed `.mp4` for the site first.
- After clone, run `git lfs pull` if videos look missing (most clients fetch LFS automatically).
