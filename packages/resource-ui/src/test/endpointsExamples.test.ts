/** Through graphql(), which validates unlike SchemaLink, so a documented example cannot drift. */
import { graphql } from 'graphql';
import { describe, expect, it } from 'vitest';

import doc from '../../ENDPOINTS.md?raw';
import { buildMockSchema } from '../../mock-server/schema';
import sdl from '../gql/gen/schema.graphql?raw';

const examples = [...doc.matchAll(/```graphql\n([\s\S]*?)```/g)].map((match) => match[1] ?? '');

describe('the ENDPOINTS.md examples', () => {
  it('finds the documented queries - a broken fence would silently pin nothing', () => {
    expect(examples.length).toBeGreaterThanOrEqual(8);
  });

  const { schema } = buildMockSchema(sdl);
  it.each(examples.map((source) => [source.trim().split('\n')[1]?.trim() ?? source, source] as const))(
    'executes documented example %# (%s) against the schema the mock serves',
    async (_selection, source) => {
      const result = await graphql({ schema, source });
      expect(result.errors).toBeUndefined();
      expect(result.data).toBeTruthy();
    },
  );
});
