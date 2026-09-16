import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SeoSchemaProps {
  type?: string;
  name?: string;
  description?: string;
  breadcrumb?: { name: string; path: string }[];
}

const BUSINESS = {
  name: 'MGA Markarbeten AB',
  url: 'https://mgamark.se',
  phone: '+46761778570',
  email: 'mattias@mgamark.se',
  locality: 'Habo',
  region: 'Jönköpings län',
  country: 'SE',
  lat: 57.9072,
  lng: 13.7414,
};

export default function SeoSchema({
  type = 'WebPage',
  name,
  description,
  breadcrumb,
}: SeoSchemaProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const scriptId = `seo-schema-${type.toLowerCase()}`;
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const data: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': type,
      '@id': `${BUSINESS.url}${pathname === '/' ? '' : pathname}`,
      url: `${BUSINESS.url}${pathname === '/' ? '' : pathname}`,
      inLanguage: 'sv-SE',
      isPartOf: { '@id': `${BUSINESS.url}/#website` },
      about: { '@id': `${BUSINESS.url}/#business` },
    };

    if (name) data.name = name;
    if (description) data.description = description;

    if (breadcrumb && breadcrumb.length > 0) {
      data.breadcrumb = {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumb.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: `${BUSINESS.url}${item.path}`,
        })),
      };
    }

    if (type === 'ContactPage') {
      data.mainEntity = {
        '@type': 'Organization',
        name: BUSINESS.name,
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: BUSINESS.locality,
          addressRegion: BUSINESS.region,
          addressCountry: BUSINESS.country,
        },
      };
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [type, name, description, breadcrumb, pathname]);

  return null;
}
