import { body } from '@/components/Content';
import Page from '@/components/Page';
import Wrapper, { site } from '@/components/Wrapper';
import client from '@/utils/client';
import groq from 'groq';

export default function page({ site, page, regions, meta }) {
  return (
    <Wrapper site={{ ...site, regions }} seo={page.seoSettings} title={page.title} meta={meta}>
      <Page {...page} />
    </Wrapper>
  );
}

export async function getStaticPaths() {
  const pages = await client.fetch(`
    *[_type=='page'][] {
      "slug": slug.current
    }
  `);

  return {
    paths: pages.map(page => {
      return {
        params: {
          slug: page.slug,
        },
      };
    }),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const data = await client.fetch(
    groq`{
    ${site},
    "page": *[_type == "page" && slug.current == $slug][0] {
      title,
      hero {
        ...,
        image {
          ...,
          asset->{...}
        }
      },
      content[] {
        ${body}
      },
      seoSettings {
        title,
        metaDescription
      }
    }
  }`,
    { slug: context.params.slug }
  );
  return {
    props: data,
  };
}
