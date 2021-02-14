"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullTextArticle = void 0;
const request_1 = __importDefault(require("./request"));
const DIFFBOT_TOKEN = process.env.DIFFBOT_TOKEN;
const getFullTextArticle = async (url) => {
    const { data } = await request_1.default.get('https://l.com/v3/article?token=' +
        DIFFBOT_TOKEN +
        '&paging=true&maxTags=1&tagConfidence=0.9&discussion=false&timeout=10000&url=' +
        encodeURIComponent(url), {
        timeout: 25000,
        headers: {
            'X-Forward-Referer': 'https://l.facebook.com/',
        },
    });
    return data;
};
exports.getFullTextArticle = getFullTextArticle;
