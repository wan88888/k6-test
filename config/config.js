export const config = {
  baseUrl: 'https://jsonplaceholder.typicode.com',
  stages: {
    load: [
      { duration: '5s', target: 10 },   // 缓慢增加到10个用户
      { duration: '5s', target: 10 },   // 保持10个用户5s
      { duration: '5s', target: 0 }    // 缓慢减少到0个用户
    ],
    stress: [
      { duration: '2s', target: 10 },  // 逐步增加到10个用户
      { duration: '5s', target: 20 },  // 逐步增加到20个用户
      { duration: '2s', target: 0 }     // 逐步减少到0个用户
    ],
    spike: [
      { duration: '5s', target: 50 }, // 快速增加到50个用户
      { duration: '5s', target: 50 },  // 保持50个用户2s
      { duration: '5s', target: 0 }    // 快速减少到0个用户
    ]
  },
  thresholds: {
    // 响应时间指标
    http_req_duration: [
      'p(95)<6000',    // 调整95%的请求响应时间阈值
      'p(99)<7000',    // 调整99%的请求响应时间阈值
      'avg<5000',      // 调整平均响应时间阈值
      'med<4000',      // 调整响应时间中位数阈值
      'min<1000'       // 调整最小响应时间阈值
    ],
    // 错误率指标
    http_req_failed: ['rate<0.02'],
    
    // 吞吐量指标
    http_reqs: ['rate>15'],              // 调整每秒请求数阈值
    
    // 服务器处理时间
    http_req_waiting: ['p(90)<3000'],    // 调整服务器响应时间阈值
    
    // 网络性能指标
    http_req_sending: ['p(95)<300'],     // 调整请求发送时间阈值
    http_req_receiving: ['p(95)<600'],   // 调整响应接收时间阈值
    
    // 各业务模块性能指标
    'group_duration{group:::posts}': [
      'p(95)<4000',   // 调整posts模块性能指标
      'avg<3000',
      'med<2500'
    ],
    'group_duration{group:::comments}': [
      'p(95)<4000',
      'avg<3000',
      'med<2500'
    ],
    'group_duration{group:::albums}': [
      'p(95)<4000',
      'avg<3000',
      'med<2500'
    ],
    'group_duration{group:::todos}': [
      'p(95)<4000',
      'avg<3000',
      'med<2500'
    ],
    
    // 虚拟用户指标
    vus: ['value>0'],
    vus_max: ['value<=500']
  }
};