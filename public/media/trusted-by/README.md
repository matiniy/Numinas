# Trusted-by logos

Drop client logo files here for the **Trusted by global brands and agencies** section.

## Folder

```
public/media/trusted-by/logos/
```

## Files (current)

| Brand | Filename |
|-------|----------|
| American Express | `amex.png` |
| Air Canada | `aircanada.png` |
| Hootsuite | `hootsuit.png` |
| Secret | `secret.png` |
| Excel | `excel.png` |
| Urban Decay | `urbandecay.png` |
| Dolby | `dolby.png` |
| Olay | `olay.png` |

## Format

- **Current:** PNG in this folder (paths in `src/lib/trusted-by-logos.ts`)
- **Also supported:** SVG or WebP — update filenames in `src/lib/trusted-by-logos.ts` if you swap formats

## Sizing

- Target cap height: **32–40px** on desktop (logos scale inside the slot)
- Keep artwork centered with comfortable horizontal padding

## Notes

- Until a file is added, the section shows a text placeholder for that brand.
- Logos render monochrome at ~50% opacity; full opacity on hover.
