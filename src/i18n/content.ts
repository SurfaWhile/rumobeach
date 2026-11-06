import { defaultLocale, type Locale } from './config';

const files = import.meta.glob('../data/*/*.json', { eager: true, import: 'default' });

export type ContentName = 'homepage' | 'beachClub' | 'surfClub' | 'contactos' | 'team' | 'ui';

// Enige plek die weet waar content vandaan komt: later vervangbaar door een WordPress REST-call.
// Ontbreekt een vertaling, dan valt het terug op de standaardtaal.
export async function getContent<T = any>(locale: Locale, name: ContentName): Promise<T> {
	const found = files[`../data/${locale}/${name}.json`] ?? files[`../data/${defaultLocale}/${name}.json`];
	if (!found) throw new Error(`Content ontbreekt: ${locale}/${name}`);
	return found as T;
}
