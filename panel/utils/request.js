import fetch from 'dva/fetch';

const parseJSON = response => {
  return response.json();
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) return response;
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export const request = (url, options) => {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
};
