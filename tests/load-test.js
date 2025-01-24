import { config } from '../config/config.js';
import { HttpClient } from '../utils/http.js';
import { group } from 'k6';

export const options = {
  stages: config.stages.load,
  thresholds: config.thresholds
};

const client = new HttpClient(config.baseUrl);

export default function() {
  // 帖子管理模块
  group('posts', () => {
    const postsResponse = client.get('/posts');
    HttpClient.sleep(0.1);
    
    const newPost = client.post('/posts', {
      title: 'Test Post',
      body: 'This is a test post',
      userId: 1
    });
    HttpClient.sleep(0.1);
  });

  // 评论管理模块
  group('comments', () => {
    const postDetails = client.get('/posts/1');
    const comments = client.get('/posts/1/comments');
    HttpClient.sleep(0.1);

    const newComment = client.post('/posts/1/comments', {
      name: 'Test Comment',
      email: 'test@example.com',
      body: 'This is a test comment'
    });
    HttpClient.sleep(0.1);
  });

  // 相册管理模块
  group('albums', () => {
    const albums = client.get('/albums');
    const photos = client.get('/albums/1/photos');
    HttpClient.sleep(0.1);
  });

  // 待办事项管理模块
  group('todos-read', () => {
    const todos = client.get('/todos');
    HttpClient.sleep(0.1);
  });

  group('todos-write', () => {
    const newTodo = client.post('/todos', {
      title: 'Test Todo',
      completed: false,
      userId: 1
    });
    HttpClient.sleep(0.1);

    const updatePost = client.put('/posts/1', {
      title: 'Updated Post',
      body: 'This post has been updated',
      userId: 1
    });
    HttpClient.sleep(0.1);

    const deleteTodo = client.delete('/todos/1');
    HttpClient.sleep(0.1);
  });
}