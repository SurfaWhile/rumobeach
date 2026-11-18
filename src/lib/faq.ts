import raw from '../data/faq.json';
import type { Locale } from '../i18n/config';

// Veelgestelde vragen staan in src/data/faq.json (te beheren via /admin/, "FAQ").
// Elke vraag hoort bij één of meer pagina's; vraag en antwoord per taal.
export type FaqPage = 'home' | 'surf-club' | 'beach-club' | 'contact';

export interface RawFaq {
	pages?: FaqPage[];
	question_pt: string;
	question_en: string;
	answer_pt: string;
	answer_en: string;
}

export interface FaqItem {
	question: string;
	answer: string;
}

export function faqFor(locale: Locale, page: FaqPage): FaqItem[] {
	const pick = (e: RawFaq, base: 'question' | 'answer') =>
		((e as any)[`${base}_${locale}`] || (e as any)[`${base}_pt`] || (e as any)[`${base}_en`] || '').trim();
	return ((raw as { items?: RawFaq[] }).items ?? [])
		.filter((e) => e.pages?.includes(page))
		.map((e) => ({ question: pick(e, 'question'), answer: pick(e, 'answer') }))
		.filter((e) => e.question && e.answer);
}

/** schema.org FAQPage; leeg als er (nog) geen vragen zijn. */
export function faqJsonLd(items: FaqItem[]): object[] {
	if (!items.length) return [];
	return [
		{
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: items.map((i) => ({
				'@type': 'Question',
				name: i.question,
				acceptedAnswer: { '@type': 'Answer', text: i.answer },
			})),
		},
	];
}
