import { useEffect } from 'react';
import { ADDRESS, EMAIL, PHONE, LOCATION } from '../constants';
import { useSiteSettings } from '../hooks/useSiteSettings';

function setMeta(selector: string, attribute: 'content', value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    const propertyMatch = selector.match(/meta\[property="([^"]+)"\]/);
    const nameMatch = selector.match(/meta\[name="([^"]+)"\]/);
    if (propertyMatch) element.setAttribute('property', propertyMatch[1]);
    if (nameMatch) element.setAttribute('name', nameMatch[1]);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

function setCanonical(url: string) {
  if (!url) return;
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function setSchema(schema: object) {
  const id = 'gad-local-business-schema';
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}

export default function SEOManager() {
  const { get } = useSiteSettings();

  useEffect(() => {
    const title = get('seo_title');
    const description = get('seo_description');
    const shareImage = get('seo_share_image');
    const canonicalUrl = get('seo_canonical_url') || window.location.origin + window.location.pathname;
    const businessName = get('business_name', 'GAD GROWTHS');
    const businessDescription = get('business_description', description);

    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', shareImage);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', shareImage);
    setCanonical(canonicalUrl);
    setSchema({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: businessName,
      description: businessDescription,
      telephone: PHONE,
      email: EMAIL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS,
        addressRegion: LOCATION,
        addressCountry: 'IN',
      },
      url: canonicalUrl,
      image: shareImage,
    });
  }, [get]);

  return null;
}
