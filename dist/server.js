"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const diffbot_1 = require("./lib/diffbot");
const server = fastify_1.default();
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
    const { url } = request.query;
    const articleData = await diffbot_1.getFullTextArticle(url);
    if (articleData.error) {
        if (typeof articleData.errorCode === 'number') {
            reply.statusCode = articleData.errorCode;
        }
        return new Error(articleData.error);
    }
    return articleData;
});
server.get('/', async () => {
    return { hello: 'world' };
});
server.listen(8080, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
