
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'i0ey71dy',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2024-04-23', // use current date (YYYY-MM-DD) to target the latest API version
});
