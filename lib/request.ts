import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const instance = rateLimit(axios.create(), {
  maxRequests: 15,
  perMilliseconds: 1000,
  maxRPS: 1,
});

export default axios;
