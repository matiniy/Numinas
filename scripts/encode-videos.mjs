/**
 * Encode MP4s under public/media for web delivery.
 *
 * Creates a sibling `*-web.mp4` with H.264, faststart, and capped resolution.
 * Requires ffmpeg on PATH.
 *
 * Usage:
 *   npm run encode-videos
 *   npm run encode-videos -- --replace   # overwrite originals (use with care)
 */

import { spawnSync } from 'node:child_process'
import { existsSync, renameSync, unlinkSync } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const mediaRoot = path.resolve(__dirname, '../public/media')
const replaceOriginal = process.argv.includes('--replace')

function hasFfmpeg() {
  const result = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' })
  return result.status === 0
}

async function collectMp4Files(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      await collectMp4Files(fullPath, files)
      continue
    }

    if (!entry.name.toLowerCase().endsWith('.mp4')) continue
    if (entry.name.toLowerCase().endsWith('-web.mp4')) continue

    files.push(fullPath)
  }

  return files
}

function encodeFile(inputPath) {
  const parsed = path.parse(inputPath)
  const outputPath = replaceOriginal
    ? inputPath
    : path.join(parsed.dir, `${parsed.name}-web${parsed.ext}`)

  if (!replaceOriginal && existsSync(outputPath)) {
    console.log(`skip  ${path.relative(mediaRoot, outputPath)} (exists)`)
    return { status: 'skipped' }
  }

  const tempPath = replaceOriginal ? `${inputPath}.tmp-encode.mp4` : outputPath

  console.log(`encode ${path.relative(mediaRoot, inputPath)}`)

  const args = [
    '-y',
    '-i',
    inputPath,
    '-an',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '23',
    '-vf',
    "scale='min(1920,iw)':-2",
    '-movflags',
    '+faststart',
    '-pix_fmt',
    'yuv420p',
    tempPath,
  ]

  const result = spawnSync('ffmpeg', args, { stdio: 'inherit' })

  if (result.status !== 0) {
    console.error(`failed ${inputPath}`)
    return { status: 'failed' }
  }

  if (replaceOriginal) {
    unlinkSync(inputPath)
    renameSync(tempPath, inputPath)
  }

  return { status: 'encoded', outputPath: replaceOriginal ? inputPath : outputPath }
}

async function main() {
  if (!hasFfmpeg()) {
    console.error('ffmpeg not found. Install ffmpeg and retry.')
    process.exit(1)
  }

  if (!existsSync(mediaRoot)) {
    console.error(`media folder not found: ${mediaRoot}`)
    process.exit(1)
  }

  const inputs = await collectMp4Files(mediaRoot)

  if (inputs.length === 0) {
    console.log('No MP4 files found under public/media.')
    return
  }

  let encoded = 0
  let skipped = 0
  let failed = 0

  for (const inputPath of inputs) {
    const before = await stat(inputPath)
    const result = encodeFile(inputPath)

    if (result.status === 'encoded') {
      encoded += 1
      const afterPath = result.outputPath ?? inputPath
      const after = await stat(afterPath)
      const beforeMb = (before.size / (1024 * 1024)).toFixed(1)
      const afterMb = (after.size / (1024 * 1024)).toFixed(1)
      console.log(`  ${beforeMb} MB → ${afterMb} MB`)
    } else if (result.status === 'skipped') {
      skipped += 1
    } else {
      failed += 1
    }
  }

  console.log(`\nDone: ${encoded} encoded, ${skipped} skipped, ${failed} failed.`)
  console.log('Set VITE_VIDEO_USE_WEB_VARIANT=true in .env to serve *-web.mp4 files.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
