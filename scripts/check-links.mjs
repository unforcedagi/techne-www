import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
const root = path.resolve('dist');
const base = (process.env.BASE_PATH || '/techne-www').replace(/\/$/, '');
const origin = new URL(process.env.SITE_URL || 'https://unforcedagi.github.io').origin;
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
const files = await walk(root);
const errors = [];
let checked = 0;
async function check(raw, current, from) {
  if (!raw || /^(mailto:|tel:|data:|at:)/i.test(raw)) return;
  const url = new URL(raw, current);
  if (url.origin !== origin) return;
  if (base && url.pathname !== base && !url.pathname.startsWith(base + '/')) {
    errors.push(`${from}: link escapes base: ${raw}`); return;
  }
  const relative = decodeURIComponent(url.pathname.slice(base.length)).replace(/^\//, '');
  let target = path.resolve(root, relative);
  if (target !== root && !target.startsWith(root + path.sep)) { errors.push(`${from}: invalid path ${raw}`); return; }
  try {
    if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
    await stat(target);
    if (url.hash && target.endsWith('.html')) {
      const $target = load(await readFile(target, 'utf8'));
      const id = decodeURIComponent(url.hash.slice(1));
      if (!$target('[id]').toArray().some(el => $target(el).attr('id') === id)) errors.push(`${from}: missing fragment ${raw}`);
    }
    checked++;
  } catch { errors.push(`${from}: missing ${raw}`); }
}
for (const file of files.filter(f => f.endsWith('.html'))) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  const current = `${origin}${base}/${relative.replace(/index\.html$/, '')}`;
  const $ = load(await readFile(file, 'utf8'));
  for (const el of $('a[href],link[href],script[src],img[src],source[src]')) {
    await check($(el).attr('href') || $(el).attr('src'), current, relative);
  }
}
for (const file of files.filter(f => f.endsWith('.css'))) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  for (const match of (await readFile(file, 'utf8')).matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    await check(match[1], `${origin}${base}/${relative}`, relative);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Internal links/assets: ${checked} checked; ${files.filter(f => f.endsWith('.html')).length} pages; base ${base || '/'}.`);
