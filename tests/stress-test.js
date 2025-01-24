import { group } from 'k6';
import { config } from '../config/config.js';
import { HttpClient } from '../utils/http.js';

export const options = {
  stages: config.stages.stress,
  thresholds: config.thresholds
};

const client = new HttpClient(config.baseUrl);

export default function() {
  group('posts', () => {
    // 获取帖子列表
    const postsResponse = client.get('/posts');
    HttpClient.sleep(0.1);

    // 获取单个帖子详情
    const postDetailResponse = client.get('/posts/1');
    HttpClient.sleep(0.1);
  });

  group('comments', () => {
    // 获取评论列表
    const commentsResponse = client.get('/posts/1/comments');
    HttpClient.sleep(0.1);

    // 创建新评论
    const newCommentResponse = client.post('/posts/1/comments', {
      name: 'Test Comment',
      email: 'test@example.com',
      body: 'This is a test comment'
    });
    HttpClient.sleep(0.1);
  });

  group('albums', () => {
    // 获取相册列表
    const albumsResponse = client.get('/albums');
    HttpClient.sleep(0.1);

    // 获取相册中的照片
    const photosResponse = client.get('/albums/1/photos');
    HttpClient.sleep(0.1);
  });
}