
const http = require('http');
const xml2js = require('xml2js');
const parser = xml2js.Parser({ explicitArray: false });

const goodReadSvc = () => {
  const getBookById = (id, cb) => {

    const options = {
      host: 'www.goodreads.com',
      path: `/book/show/${id}?format=xml&key=txq62eHhfdEpzglrNFA8A`
    };

    const callback = (response) => {
      let str = '';
      response.on('data', chunk => str+=chunk);
      response.on('end', () => {
        console.log(str);
        parser.parseString(str, (err, result) => {
          cb(null, result.GoodreadsResponse.book);
        })
      });
    };

    http.request(options, callback).end();

  };
  return {
    getBookById
  }
};

module.exports = goodReadSvc;