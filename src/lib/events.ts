import raw from '../data/events.json';
import { locales, type Locale } from '../i18n/config';
import { absUrl, site } from '../i18n/site';

// Evenementen staan in src/data/events.json (te beheren via /admin/, "Agenda").
// Titel en omschrijving per taal; datum, tijd, foto en link gelden voor alle talen.
export interface RawEvent {
	date: string; // YYYY-MM-DD
	endDate?: string;
	time?: string; // vrije tekst, bv. "19:00"
	title_pt: string;
	title_en: string;
	description_pt?: string;
	description_en?: string;
	image?: string;
	link?: string;
}

export interface EventItem {
	date: string;
	endDate: string;
	time?: string;
	title: string;
	description?: string;
	image?: string;
	link?: string;
}

const TZ = 'Europe/Lisbon';

export function todayInLisbon(): string {
	return new Intl.DateTimeFormat('sv-SE', { timeZone: TZ }).format(new Date()); // YYYY-MM-DD
}

function localize(e: RawEvent, locale: Locale): EventItem {
	const pick = (base: 'title' | 'description') =>
		(e as any)[`${base}_${locale}`] || (e as any)[`${base}_pt`] || (e as any)[`${base}_en`] || undefined;
	return {
		date: e.date,
		endDate: e.endDate || e.date,
		time: e.time || undefined,
		title: pick('title') ?? '',
		description: pick('description'),
		image: e.image || undefined,
		link: e.link || undefined,
	};
}

/** Alle (nog) komende evenementen, op datum gesorteerd. */
export function upcomingEvents(locale: Locale, limit?: number): EventItem[] {
	const today = todayInLisbon();
	const list = ((raw as { items?: RawEvent[] }).items ?? [])
		.filter((e) => e.date && (e.endDate || e.date) >= today)
		.map((e) => localize(e, locale))
		.sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? ''));
	return limit ? list.slice(0, limit) : list;
}

export function formatParts(date: string, locale: Locale) {
	const d = new Date(`${date}T12:00:00Z`);
	const lang = locales[locale].htmlLang;
	const f = (o: Intl.DateTimeFormatOptions) =>
		new Intl.DateTimeFormat(lang, { ...o, timeZone: 'UTC' }).format(d);
	return {
		weekday: f({ weekday: 'short' }),
		day: f({ day: 'numeric' }),
		month: f({ month: 'short' }),
		long: f({ day: 'numeric', month: 'long' }),
	};
}

export function eventsJsonLd(events: EventItem[], pagePath: string) {
	return events.map((e) => ({
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: e.title,
		startDate: e.time && /^\d{1,2}:\d{2}$/.test(e.time) ? `${e.date}T${e.time.padStart(5, '0')}` : e.date,
		endDate: e.endDate !== e.date ? e.endDate : undefined,
		eventStatus: 'https://schema.org/EventScheduled',
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		description: e.description,
		image: e.image ? absUrl(e.image) : undefined,
		url: absUrl(pagePath),
		location: {
			'@type': 'Place',
			name: site.name,
			address: { '@type': 'PostalAddress', ...site.address },
		},
		organizer: { '@type': 'Organization', name: site.name, url: site.url },
	}));
}
