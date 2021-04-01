import fastify from 'fastify';
import socketioServer from 'fastify-socket.io';
import {getFullTextArticle} from './lib/diffbot';

const server = fastify({logger: true});
server.register(socketioServer);

const articleSchema = {
  schema: {
    querystring: {
      feedId: 'string',
      id: 'string',
      url: {
        type: 'string',
        format: 'uri',
        pattern: '^(https?|http)://',
      },
    },
  },
};

server.get('/v1/article', articleSchema, async (request, reply) => {
  const {url} = request.query as any;
  const data = await getFullTextArticle(url);

  if (data.error) {
    if (typeof data.errorCode === 'number') {
      reply.statusCode = data.errorCode;
    }
    return new Error(data.error);
  }

  return data;
});

server.get('/v1/socket/article', articleSchema, async (request) => {
  const {feedId, id, url} = request.query as any;
  getFullTextArticle(url).then((data) => {
    if (!data.error && data.objects) {
      server.io.emit('fulltextArticle', {
        feedId,
        id,
        url,
        data: data.objects[0],
      });
    }
  });
});

server.get('/', async () => {
  return {hello: 'world'};
});

server.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  server.io.on('connect', (socket: any) => console.log('Socket connected!', socket.id));
  console.log(`Server listening at ${address}`);
});
