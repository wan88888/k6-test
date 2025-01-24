import { group } from 'k6';
import { config } from '../config/config.js';
import { HttpClient } from '../utils/http.js';

export const options = {
  stages: config.stages.spike,
  thresholds: config.thresholds
};

const client = new HttpClient(config.baseUrl);

export default function() {
  group('browsing', () => {
    // 模拟用户快速访问首页
    const homeResponse = client.get('/posts');
    HttpClient.sleep(0.05);

    // 模拟用户并发搜索热门商品
    const searchResponse = client.get('/posts?userId=1');
    HttpClient.sleep(0.05);
  });

  group('products', () => {
    // 模拟用户快速访问多个热门商品
    for (let i = 1; i <= 3; i++) {
      const productResponse = client.get(`/users/${i}`);
      HttpClient.sleep(0.05);
    }
  });

  group('orders', () => {
    // 模拟用户快速下单
    const orderResponse = client.post('/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1
    });
    HttpClient.sleep(0.1);
  });
}