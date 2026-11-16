// Render one page of a split protocol PDF to a canvas with pdf.js, then draw the fill values on top.
let pdfjsPromise = null
function loadPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = Promise.all([
      import('pdfjs-dist'),
      import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
    ]).then(([lib, worker]) => {
      lib.GlobalWorkerOptions.workerSrc = worker.default
      return lib
    })
  }
  return pdfjsPromise
}

let fieldsPromise = null
export function loadFields() {
  if (!fieldsPromise) fieldsPromise = fetch('/protocol/fields.json').then(r => r.ok ? r.json() : {}).catch(() => ({}))
  return fieldsPromise
}

const docCache = new Map()
async function getDoc(file) {
  if (!docCache.has(file)) {
    const lib = await loadPdfjs()
    docCache.set(file, lib.getDocument({ url: `/protocol/${file}` }).promise)
  }
  return docCache.get(file)
}

/**
 * @param {string} file        section file name, e.g. 'ipd-all.pdf'
 * @param {number} localPage   1-based page inside that file
 * @param {Array} fills        [{x,y,w,h,text}] in PDF points (top-left origin)
 * @param {number} scale       render scale (2 ≈ 144 dpi)
 * @returns {Promise<HTMLCanvasElement>}
 */
export async function renderFilledPage(file, localPage, fills, scale = 2) {
  const doc = await getDoc(file)
  const page = await doc.getPage(localPage)
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  canvas.width = Math.ceil(viewport.width)
  canvas.height = Math.ceil(viewport.height)
  const ctx = canvas.getContext('2d')
  await page.render({ canvasContext: ctx, viewport }).promise

  ctx.textBaseline = 'alphabetic'
  for (const f of fills) {
    const x = f.x * scale, y = f.y * scale, w = f.w * scale, h = f.h * scale
    // white out the dotted leader, then write the value
    ctx.fillStyle = '#fff'
    ctx.fillRect(x + 0.5 * scale, y - 1, w - 0.5 * scale, h + 2)
    const fontPx = Math.max(9, Math.min(h * 0.95, 11 * scale))
    ctx.font = `600 ${fontPx}px Sarabun, "TH Sarabun New", Arial, sans-serif`
    ctx.fillStyle = '#0d2a8c'
    let text = String(f.text)
    while (ctx.measureText(text).width > Math.max(w + 6 * scale, 20) && text.length > 1) text = text.slice(0, -1)
    ctx.fillText(text, x + 1.5 * scale, y + h - 1.5 * scale)
  }
  return canvas
}
