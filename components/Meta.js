import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Meta(props) {
  const router = useRouter();
  const { seo, title, home, customCSS, siteName } = props;
  const seoTitle = seo && seo.title ? seo.title : title;
  const titleTag = home ? 'Home' : seoTitle;
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const openUrl = `${origin}${router.asPath}`;

  return (
    <Head>
      {customCSS?.code && <style>{customCSS.code}</style>}
      <meta property="og:title" content={titleTag} />
      <meta property="og:url" content={openUrl} />
      <title>{`${!home ? `${titleTag} | ` : ''}${siteName}`}</title>
      {seo?.metaDescription && <meta name="description" content={seo.metaDescription} />}
    </Head>
  );
}
