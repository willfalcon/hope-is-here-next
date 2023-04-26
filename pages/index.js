import { body } from '@/components/Content';
import HomePage from '@/components/Homepage';
import Wrapper, { site } from '@/components/Wrapper';
import client from '@/utils/client';
import groq from 'groq';

export default function Home({ site, page }) {
  return (
    <Wrapper site={site}>
      <HomePage {...page} />
    </Wrapper>
  );
}

export async function getStaticProps(context) {
  const data = await client.fetch(groq`{
    ${site}, 
    "page": *[_type == "homePage"][0] {
      content[] {
        ${body}
      }
    }
  }`);

  return {
    props: data,
  };
}
