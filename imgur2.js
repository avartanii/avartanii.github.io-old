'use strict';
/* global XMLHttpRequest */
/* global process.env.API_IMGUR */
const querystring = require('querystring');


/**
 * Fetches a page of results from the Imgur API.
 *
 * @param   {String}    options.q        Query
 * @param   {Number}    options.page     Index of the page of results
 * @param   {Function}  done             Callback that receives the parsed response
 */
module.exports = ({q = '', page = 0} = {}, done) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE){
      let response;
      try {
        response = JSON.parse(xhr.responseText);
      } catch(e){
        response = {};
      }
      if (response.success){
        const parsed = response.data
        .filter(result => !result.is_album)
        .map(data => {
          return {
            title: data.title,
            url: data.link,
            width: data.width,
            height: data.height
          };
        });
        done(parsed);
      } else {
        done(false);
      }
    }
  };
  const url = 'https://api.imgur.com/3/gallery/search/top/' + page + '/?' + querystring.stringify({q});
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Authorization', `Client-ID ab16bf44f450080`);
  xhr.send(null);
};