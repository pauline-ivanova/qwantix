export interface Author {
  slug: string;
  name: string;
  jobTitle: string;
  description: string;
  bio: string;
  expertise: string[];
  languages: string[];
  education: string;
  socialLinks: {
    linkedin?: string;
    upwork?: string;
  };
  image?: string;
}

export const authors: Record<string, Author> = {
  'polina-ivanova': {
    slug: 'polina-ivanova',
    name: 'Polina Ivanova',
    jobTitle: 'International SEO and Digital Marketing Consultant',
    description: 'Expert articles on SEO, content strategy, localisation, and trust-based optimisation',
    bio: 'Polina is an international SEO and digital marketing consultant and the author of expert articles on SEO, content strategy, localisation, and trust-based optimisation. She writes from hands-on experience working with complex websites across multiple industries, languages, and market conditions.\n\nHer articles are designed for practitioners, founders, and marketing teams who need clear, experience-based guidance rather than generic theory.',
    expertise: [
      'SEO-led site structure and page mapping',
      'Content strategy (TOFU, MOFU, BOFU)',
      'Technical SEO audits and prioritisation',
      'International and multilingual SEO',
      'Content localisation vs direct translation',
      'EEAT and trust signals for YMYL websites',
      'On-page optimisation and internal linking',
      'Structured data and schema fundamentals',
    ],
    languages: ['English', 'Spanish', 'Russian', 'German', 'Catalan'],
    education: 'Academic background in linguistics, law, and international regulation. This informs her approach to content accuracy, localisation quality, and compliance-aware SEO, particularly in regulated and YMYL-related industries.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/polina-a-ivanova/',
      upwork: 'https://www.upwork.com/freelancers/ivanovapolina',
    },
  },
};

export function getAuthor(slug: string): Author | null {
  return authors[slug] || null;
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}

