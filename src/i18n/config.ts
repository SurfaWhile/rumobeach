// Nieuwe taal toevoegen: hier een regel bij, plus een map src/data/<code>/ met vertalingen.
export const locales = {
	pt: { label: 'PT', name: 'Português', htmlLang: 'pt-PT', ogLocale: 'pt_PT' },
	en: { label: 'EN', name: 'English', htmlLang: 'en-GB', ogLocale: 'en_GB' },
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = 'pt';
export const localeCodes = Object.keys(locales) as Locale[];

export const sitemapLocales = Object.fromEntries(
	localeCodes.map((code) => [code, locales[code].htmlLang]),
);

export function isLocale(value: string | undefined): value is Locale {
	return value !== undefined && value in locales;
}

export function localePath(locale: Locale, path = '/'): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	return locale === defaultLocale ? clean : `/${locale}${clean === '/' ? '/' : clean}`;
}

export function getStaticLocalePaths() {
	return localeCodes.map((code) => ({
		params: { lang: code === defaultLocale ? undefined : code },
	}));
}

export function localeFromParams(lang: string | undefined): Locale {
	return isLocale(lang) ? lang : defaultLocale;
}
