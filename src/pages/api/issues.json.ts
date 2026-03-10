export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const apiKey = import.meta.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ results: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const res = await fetch(
    'https://api.buttondown.com/v1/emails?status=sent&ordering=-publish_date&page_size=5',
    { headers: { Authorization: `Token ${apiKey}` } }
  );

  if (!res.ok) {
    return new Response(JSON.stringify({ results: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await res.json();
  return new Response(JSON.stringify({ results: data.results ?? [] }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
