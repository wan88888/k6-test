import http from 'k6/http';
import { check, sleep } from 'k6';

export class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(path, params = {}) {
    const url = `${this.baseUrl}${path}`;
    const response = http.get(url, params);
    this._checkResponse(response);
    return response;
  }

  post(path, data = {}, params = {}) {
    const url = `${this.baseUrl}${path}`;
    const response = http.post(url, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      ...params
    });
    this._checkResponse(response);
    return response;
  }

  put(path, data = {}, params = {}) {
    const url = `${this.baseUrl}${path}`;
    const response = http.put(url, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      ...params
    });
    this._checkResponse(response);
    return response;
  }

  delete(path, params = {}) {
    const url = `${this.baseUrl}${path}`;
    const response = http.del(url, null, params);
    this._checkResponse(response);
    return response;
  }

  _checkResponse(response) {
    check(response, {
      'status is 2xx': (r) => r.status >= 200 && r.status < 300,
      'response time OK': (r) => r.timings.duration < 2000
    });
  }

  static sleep(seconds) {
    sleep(seconds);
  }
}