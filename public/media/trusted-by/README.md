# Trusted-by logos

Drop client logo files here for the **Trusted by global brands and agencies** section.

## Folder

```
public/media/trusted-by/logos/
```

## Expected files

| Brand | Filename |
|-------|----------|
| American Express | `american-express.svg` |
| Air Canada | `air-canada.svg` |
| Hootsuite | `hootsuite.svg` |
| Secret | `secret.svg` |
| Excel | `excel.svg` |
| Urban Decay | `urban-decay.svg` |
| Dolby | `dolby.svg` |
| Olay | `olay.svg` |

## Format

- **Preferred:** SVG (single-color / white artwork on transparent background)
- **Also supported:** PNG or WebP — update the extension in `src/lib/trusted-by-logos.ts` if not using SVG

## Sizing

- Target cap height: **32–40px** on desktop (logos scale inside the slot)
- Keep artwork centered with comfortable horizontal padding

## Notes

- Until a file is added, the section shows a text placeholder for that brand.
- Logos render monochrome at ~50% opacity; full opacity on hover.
