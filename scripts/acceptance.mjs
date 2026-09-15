import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
const fixture = 'src/content/writing/acceptance-probe.md';
assert(!existsSync(fixture), 'Acceptance fixture already exists; refusing to overwrite');
const run = (base) => spawnSync('npm', ['run', 'build'], { encoding: 'utf8', env: { ...process.env, BASE_PATH: base } });
const valid = '---\ntitle: Acceptance probe\nauthors:\n  - name: Test\ndate: 2026-09-15\nsummary: Temporary acceptance fixture.\n';
try {
  for (const field of ['title', 'date']) {
    writeFileSync(fixture, valid.replace(new RegExp(`^${field}:.*\\n`, 'm'), '') + '---\nProbe.\n');
    const result = run('/techne-www');
    assert.notEqual(result.status, 0, `${field} must fail`);
    assert.match(result.stdout + result.stderr, new RegExp(field), 'Failure must identify missing field');
    console.log(`EXPECTED FAILURE: missing ${field}\n${(result.stdout + result.stderr).slice(-1800)}`);
  }
  const uri = 'at://did:plc:acceptance/site.standard.document/probe';
  writeFileSync(fixture, valid + `atUri: ${uri}\n---\nProbe.\n`);
  let result = run('/');
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const $ = load(readFileSync('dist/writing/acceptance-probe/index.html', 'utf8'));
  assert.equal($('link[rel="alternate"]').attr('href'), uri);
  assert.match($('body').text(), /Also on atproto:/);
  console.log('PASS: root build, internal links and optional atUri output.');
  unlinkSync(fixture);
  result = run('/techne-www');
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert(!existsSync('dist/writing/draft-example/index.html'));
  assert(!existsSync('dist/writing/acceptance-probe/index.html'));
  const index = readFileSync('dist/writing/index.html', 'utf8');
  assert(!index.includes('An unfinished note'));
  const piece = readFileSync('dist/writing/about-this-site/index.html', 'utf8');
  assert(!piece.includes('Also on atproto:'));
  assert.equal(load(piece)('link[rel="alternate"]').length, 0);
  console.log('PASS: preview-base build, internal links, production drafts excluded, absent atUri stays absent.');
} finally { if (existsSync(fixture)) unlinkSync(fixture); }
