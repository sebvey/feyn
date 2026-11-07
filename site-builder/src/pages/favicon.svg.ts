// The favicon, written by the build from the course's logo and its accent (src/lib/look.ts): the
// engine has no favicon of its own. Base.astro links it; verify-site reads the base path from that link.
import type { APIRoute } from 'astro';
import { favicon } from '../lib/look';

export const GET: APIRoute = () => new Response(favicon, { headers: { 'content-type': 'image/svg+xml' } });
