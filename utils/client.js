import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  // token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: '2022-11-21',
});

const imageClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: '2022-11-21',
});

const builder = imageUrlBuilder(imageClient);
function urlFor(source) {
  return builder.image(source);
}

export { urlFor };
export default client;
