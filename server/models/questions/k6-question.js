import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 1 },
    { duration: '30s', target: 50 },
    { duration: '1m30s', target: 100 },
    // { duration: '2m0s', target: 100 },
    // { duration: '2m30s', target: 200 },
  ],
};

export default function () {
  let res = '';
  for (let i = 99000; i < 99100; i++) {
    res = http.get(`http://localhost:3000/qa/questions?product_id=${i}&count=200`);
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
    // sleep(1);
  }
}
