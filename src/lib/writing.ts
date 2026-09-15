import { getCollection } from 'astro:content';
export async function getWriting() {
  return (await getCollection('writing', ({ data }) => import.meta.env.DEV || !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}
export const local = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const dateLabel = (date: Date) => new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(date);
