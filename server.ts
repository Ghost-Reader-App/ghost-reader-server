import fastify from 'fastify';
import {getFullTextArticle} from './lib/diffbot';

const server = fastify({logger: true});

interface articleQuery {
  jsonfeed: boolean;
  url: string;
}

const articleSchema = {
  schema: {
    querystring: {
      url: {
        type: 'string',
        format: 'uri',
        pattern: '^(https?|http)://',
      },
    },
  },
};

server.get('/v1/article', articleSchema, async (request, reply) => {
  const {url} = request.query as articleQuery;
  const articleData = await getFullTextArticle(url);

  if (articleData.error) {
    if (typeof articleData.errorCode === 'number') {
      reply.statusCode = articleData.errorCode;
    }
    return new Error(articleData.error);
  }

  return articleData;
});

server.get('/', async () => {
  return {hello: 'world'};
});

server.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
