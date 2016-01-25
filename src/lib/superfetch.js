import 'isomorphic-fetch';

/**
 * fetch wrapper with promise support
 * @method superFetch
 * @param  {[type]}   url [description]
 * @return {[type]}       [description]
 */
export default function superfetch(url, option) {
  return fetch(url, option)
    .then(res => res.json())
    .then(json => {
      if (json.message) {
        throw new Error(json.message);
      }

      return json;
    });
}
