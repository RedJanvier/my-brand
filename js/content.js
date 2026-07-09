/* ============================================================
   content.js — the tiny "CMS".
   Projects and posts are plain markdown files under /content.
   Each file starts with a --- front-matter block. An index.json
   per collection lists the slugs (so no server-side listing is
   needed). Rendering happens client-side with marked.js.
   ============================================================ */

const MD = window.marked;
MD.setOptions({ mangle: false, headerIds: false });

/* --- Front-matter parser (key: value pairs, comma lists) --- */
export function parseFrontMatter(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val === "true") val = true;
    else if (val === "false") val = false;
    meta[key] = val;
  }
  return { meta, body: raw.slice(m[0].length) };
}

export async function loadIndex(collection) {
  const res = await fetch(`content/${collection}/index.json`);
  if (!res.ok) throw new Error(`Missing index for ${collection}`);
  return res.json();
}

export async function loadEntry(collection, slug) {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error("Bad slug");
  const res = await fetch(`content/${collection}/${slug}.md`);
  if (!res.ok) throw new Error(`Not found: ${slug}`);
  return parseFrontMatter(await res.text());
}

/* Load front-matter for every slug in an index, in parallel. */
export async function loadCollection(collection) {
  const slugs = await loadIndex(collection);
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const { meta } = await loadEntry(collection, slug);
        return { slug, ...meta };
      } catch { return null; }
    })
  );
  return entries.filter(Boolean);
}

export function renderMarkdown(body) {
  return MD.parse(body);
}

export const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

/* --- Project card used on index + projects pages --- */
export function projectCard(p, i = 0) {
  const tags = (p.stack || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 5)
    .map((t) => `<span>${esc(t)}</span>`)
    .join("");
  const links = [
    p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener">Live site</a>` : "",
    p.repo ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener">Source</a>` : "",
  ].join("");
  const initials =
    esc((p.title || "?")[0]) + esc(((p.title || "").split(" ")[1] || "")[0] || "");
  const visual = p.image
    ? `<img class="proj-shot" src="${esc(p.image)}" alt="${esc(p.title)} — live interface" loading="lazy" decoding="async" width="1280" height="800" />`
    : `<div class="wire"></div>
       <div class="chrome"><span class="glyph">${initials}</span></div>`;
  return `
  <article class="proj-card reveal" style="--proj-tint:${esc(p.color || "#2b464f")};--d:${i % 4}">
    <a class="cover" href="project.html?slug=${esc(p.slug)}" aria-label="${esc(p.title)} case study"></a>
    <div class="proj-visual${p.image ? " has-shot" : ""}">
      ${visual}
    </div>
    <div class="proj-meta">
      <div class="top">
        <h3>${esc(p.title)}</h3>
        <span class="year">${esc(p.year || "")}</span>
      </div>
      <p>${esc(p.tagline || "")}</p>
      <div class="proj-tags">${tags}</div>
      <div class="quicklinks">${links}</div>
    </div>
  </article>`;
}
