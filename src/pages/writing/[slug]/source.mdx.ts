import type { APIRoute } from 'astro';
import { getWriting } from '../../../lib/writing';
const sources = import.meta.glob<string>('../../../content/writing/**/*.{md,mdx}', { query: '?raw', import: 'default', eager: true });
export async function getStaticPaths() {
  return (await getWriting()).filter(piece => piece.data.experience === 'essay').map(piece => {
    const source = Object.entries(sources).find(([path]) => path.replace('../../../content/writing/', '').replace(/\.(md|mdx)$/, '') === piece.id)?.[1];
    if (!source) throw new Error(`Missing source for ${piece.id}`);
    return { params: { slug: piece.id }, props: { source } };
  });
}
export const GET: APIRoute = ({ props }) => new Response(props.source, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
