import axios from './request';
import type {diffbotArticleType} from './types';

const DIFFBOT_TOKEN = process.env.DIFFBOT_TOKEN;

export const getFullTextArticle = async (url: string): Promise<diffbotArticleType> => {
  const {data} = await axios.get(
    'https://l.com/v3/article?token=' +
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

  return data;
};
