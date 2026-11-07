// French typography applied to every page's HTML at build time (src/lib/typo-fr.ts).
import { defineMiddleware } from 'astro:middleware';
import { typoHtml } from './lib/typo-fr';

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  return new Response(typoHtml(await response.text()), { status: response.status, headers: response.headers });
});
