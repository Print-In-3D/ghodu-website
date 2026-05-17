/**
 * generate-sitemap.mjs
 *
 * Dynamically generates public/sitemap.xml from productsData.js
 * using human-readable slugs for every category and sub-product page.
 *
 * Run manually:  node scripts/generate-sitemap.mjs
 * Auto-runs on:  npm run build  (via "prebuild" in package.json)
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { topicsData, subProductsMap } from '../src/data/productsData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://printin3d.in';
const TODAY    = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

/* ── Slug helper ─────────────────────────────────────── */
const slugify = (text) =>
    (text || '')
        .toLowerCase()
        .trim()
        .replace(/[&]/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

/* ── XML helper ──────────────────────────────────────── */
const urlEntry = (loc, lastmod, changefreq, priority) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

/* ══════════════════════════════════════════════════════
   BUILD URL LIST
══════════════════════════════════════════════════════ */
const urls = [];

/* 1 ── Static / core pages */
const staticPages = [
    { path: '/',              changefreq: 'weekly',  priority: '1.0' },
    { path: '/about',         changefreq: 'monthly', priority: '0.8' },
    { path: '/contact',       changefreq: 'monthly', priority: '0.8' },
    { path: '/faq',           changefreq: 'monthly', priority: '0.7' },
    { path: '/search',        changefreq: 'weekly',  priority: '0.6' },
    { path: '/terms',         changefreq: 'yearly',  priority: '0.5' },
    { path: '/return-policy', changefreq: 'yearly',  priority: '0.5' },
];

staticPages.forEach(({ path, changefreq, priority }) =>
    urls.push(urlEntry(`${BASE_URL}${path}`, TODAY, changefreq, priority))
);

/* 2 ── Category pages  →  /product/<category-slug> */
topicsData.forEach(topic => {
    const catSlug = slugify(topic.title);
    // Also keep the numeric ID route for backwards compat
    urls.push(urlEntry(`${BASE_URL}/product/${catSlug}`, TODAY, 'weekly', '0.9'));
});

/* 3 ── Sub-product pages  →  /product/<category-slug>/<product-slug> */
topicsData.forEach(topic => {
    const catSlug  = slugify(topic.title);
    const products = subProductsMap[topic.id] || [];

    products.forEach(product => {
        if (!product.name || !product.name.trim()) return; // skip empty names
        const prodSlug = slugify(product.name);
        urls.push(
            urlEntry(
                `${BASE_URL}/product/${catSlug}/${prodSlug}`,
                TODAY,
                'monthly',
                '0.7'
            )
        );
    });
});

/* ══════════════════════════════════════════════════════
   WRITE sitemap.xml
══════════════════════════════════════════════════════ */
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('')}

</urlset>
`;

const outPath = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(outPath, xml, 'utf8');

console.log(`✅  Sitemap generated → ${outPath}`);
console.log(`    ${urls.length} URLs written (${TODAY})`);

// Print a preview of generated slug URLs
console.log('\n📄  Preview of product slug URLs:');
urls
    .filter(u => u.includes('/product/'))
    .slice(0, 8)
    .forEach(u => {
        const match = u.match(/<loc>(.*?)<\/loc>/);
        if (match) console.log(`    ${match[1]}`);
    });
console.log('    ...\n');
