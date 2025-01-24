export const config = {
  baseUrl: 'https://jsonplaceholder.typicode.com',
  stages: {
    load: [
      { duration: '5s', target: 10 },  // 逐步增加到100个用户
      { duration: '10s', target: 10 }, // 保持100个用户10分钟
      { duration: '5s', target: 0 }     // 逐步减少到0个用户
    ],
    stress: [
      { duration: '2s', target: 10 },  // 逐步增加到100个用户
      { duration: '5s', target: 20 },  // 逐步增加到200个用户
      { duration: '2s', target: 0 }     // 逐步减少到0个用户
    ],
    spike: [
      { duration: '10s', target: 50 }, // 快速增加到500个用户
      { duration: '2s', target: 50 },  // 保持500个用户1分钟
      { duration: '10s', target: 0 }    // 快速减少到0个用户
    ]
  },
  thresholds: {
    // 响应时间指标
    http_req_duration: [
      'p(95)<5000',    // 95%的请求响应时间小于5秒
      'p(99)<6000',    // 99%的请求响应时间小于6秒
      'avg<4000',      // 平均响应时间小于4秒
      'med<3000',      // 响应时间中位数小于3秒
      'min<500'        // 最小响应时间小于500ms
    ],
    // 错误率指标
    http_req_failed: ['rate<0.02'],       // 失败率小于2%
    
    // 吞吐量指标
    http_reqs: ['rate>30'],              // 每秒请求数大于30
    
    // 服务器处理时间
    http_req_waiting: ['p(90)<2000'],    // 90%的服务器响应时间小于2秒
    
    // 网络性能指标
    http_req_sending: ['p(95)<200'],     // 95%的请求发送时间小于200ms
    http_req_receiving: ['p(95)<500'],   // 95%的响应接收时间小于500ms
    
    // 各业务模块性能指标
    'group_duration{group:::posts}': [
      'p(95)<3000',   // 95%完成时间小于3秒
      'avg<2000',     // 平均完成时间小于2秒
      'med<1500'      // 中位数完成时间小于1.5秒
    ],
    'group_duration{group:::comments}': [
      'p(95)<3000',
      'avg<2000',
      'med<1500'
    ],
    'group_duration{group:::albums}': [
      'p(95)<3000',
      'avg<2000',
      'med<1500'
    ],
    'group_duration{group:::todos}': [
      'p(95)<4000',
      'avg<3000',
      'med<2500'
    ],
    
    // 吞吐量指标
    http_reqs: ['rate>20'],              // 每秒请求数大于20
    
    // 服务器处理时间
    http_req_waiting: ['p(90)<2000'],    // 90%的服务器响应时间小于2秒
    
    // 网络性能指标
    http_req_sending: ['p(95)<200'],     // 95%的请求发送时间小于200ms
    http_req_receiving: ['p(95)<500'],   // 95%的响应接收时间小于500ms
    
    // 各业务模块性能指标
    'group_duration{group:::posts}': [
      'p(95)<3000',   // 95%完成时间小于3秒
      'avg<2000',     // 平均完成时间小于2秒
      'med<1500'      // 中位数完成时间小于1.5秒
    ],
    'group_duration{group:::comments}': [
      'p(95)<3000',
      'avg<2000',
      'med<1500'
    ],
    'group_duration{group:::albums}': [
      'p(95)<3000',
      'avg<2000',
      'med<1500'
    ],
    'group_duration{group:::todos}': [
      'p(95)<3000',
      'avg<2000',
      'med<1500'
    ],
    
    // 虚拟用户指标
    vus: ['value>0'],           // 确保始终有活跃用户
    vus_max: ['value<=500']     // 最大并发用户数不超过500
  }
};