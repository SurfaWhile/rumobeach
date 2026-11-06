// Netlify Image CDN: verkleint en converteert bronafbeeldingen uit /public on-the-fly.
// In dev (en buiten Netlify) gebruiken we gewoon het origineel.
type Format = 'avif' | 'webp';

export function imgUrl(src: string, width: number, format?: Format): string {
	if (import.meta.env.DEV || !src.startsWith('/')) return src;
	const params = new URLSearchParams({ url: src, w: String(width) });
	if (format) params.set('fm', format);
	return `/.netlify/images?${params}`;
}

export function imgSrcset(src: string, widths: number[], format?: Format): string {
	return widths.map((w) => `${imgUrl(src, w, format)} ${w}w`).join(', ');
}
