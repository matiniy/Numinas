# Project case study media

Drop visuals for each case study in its own folder.

## Folders

| Slug | Client · Title |
|------|----------------|
| `bellemint` | Bellemint · Bellemint |
| `urban-decay-ride-or-die` | Urban Decay · Ride or Die |
| `olay-stem` | Olay · STEM |
| `american-express-play-it` | American Express · Play It |
| `excel-get-chewing` | Excel · Get Chewing |
| `secret-aluminum-free` | Secret · Aluminum Free |
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
