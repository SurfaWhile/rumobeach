export const site = {
	name: 'Rumo Beach Baleal',
	url: 'https://rumobeach.com',
	email: 'hello@rumobeach.com',
	telephone: '+351925310525',
	defaultOgImage: '/og-default.jpg',
	address: {
		streetAddress: 'Rua Praia do Baleal, Baleal S/N',
		postalCode: '2520-051',
		addressLocality: 'Ferrel',
		addressCountry: 'PT',
	},
	opens: '10:00',
	sameAs: [
		'https://www.facebook.com/profile.php?id=61588020290619',
		'https://www.instagram.com/rumobeach/',
	],
};

export function absUrl(path: string): string {
	return new URL(path, site.url).href;
}

type BusinessType ='Restaurant' | 'SportsActivityLocation';

export function businessJsonLd(opts: {
	type: BusinessType;
	url: string;
	description: string;
	image: string;
}) {
	const id = opts.type === 'Restaurant' ? '#restaurant' : '#surf-school';
	return {
		'@context': 'https://schema.org',
		'@type': opts.type,
		'@id': `${site.url}/${id}`,
		name: opts.type === 'Restaurant' ? site.name : `${site.name} Surf Club`,
		url: opts.url,
		description: opts.description,
		image: opts.image,
		telephone: site.telephone,
		email: site.email,
		address: { '@type': 'PostalAddress', ...site.address },
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: [
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
					'Sunday',
				],
				opens: site.opens,
			},
		],
		sameAs: site.sameAs,
	};
}
