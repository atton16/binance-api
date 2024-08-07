type RequestOptions = {
  body?: string;
  qs?: {[key: string]: any};
  headers?: {[key: string]: any};
  json?: boolean;
  uri: string;
};

const handler = (method: RequestInit["method"], opt: RequestOptions) => {
  if (typeof opt.qs === 'object') {
    Object.keys(opt.qs).forEach(key => opt.qs[key] === undefined ? delete opt.qs[key] : {});
  }
  if (typeof opt.headers === 'object') {
    Object.keys(opt.headers).forEach(key => opt.headers[key] === undefined ? delete opt.headers[key] : {});
  }
  const qs = new URLSearchParams(opt.qs).toString();
  const uri = qs ? `${opt.uri}?${qs}` : opt.uri;
  return fetch(uri, {
    method,
    body: opt.body,
    headers: opt.headers,
  }).then(res => {
    if (res.ok) {
      // default to true
      if (opt.json !== false) {
        return res.json();
      }
      return res.text();
    }
    return Promise.reject(res);
  });
}

export default {
  get: (opt: RequestOptions) => handler('GET', opt),
  post: (opt: RequestOptions) => handler('POST', opt),
  put: (opt: RequestOptions) => handler('PUT', opt),
  delete: (opt: RequestOptions) => handler('DELETE', opt),
};
