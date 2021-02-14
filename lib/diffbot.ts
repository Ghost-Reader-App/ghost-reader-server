import axios from './request';
import Redis from 'ioredis';
import type {diffbotArticleType} from './types';

const DIFFBOT_TOKEN = process.env.DIFFBOT_TOKEN;
const redis = new Redis(process.env.REDIS_URL);

export const getFullTextArticle = async (url: string): Promise<diffbotArticleType> => {
  const cache = await redis.get(url);
  if (cache) {
    return JSON.parse(cache);
  }

  const {data} = await axios.get(
    'https://api.diffbot.com/v3/article?token=' +
      DIFFBOT_TOKEN +
      '&paging=true&maxTags=1&tagConfidence=0.9&discussion=false&timeout=10000&url=' +
      encodeURIComponent(url),
    {
      timeout: 25000,
      headers: {
        'X-Forward-Referer': 'https://l.facebook.com/',
      },
    },
  );

  redis.set(url, JSON.stringify(data));
  return data;
};
