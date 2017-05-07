'use strict'
const http = require('http')
const createHtml = require('./create-html')
const getOriginalUrl = require('./find-url')
const insertNewUrl = require('./new-url')

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'})
    return res.end()
  }

  if (req.method === 'GET') {
    // show README
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      return res.end(createHtml())
    }

    // create a new shortened url
    if (/^\/new\//.test(req.url)) {
      const urlToShorten = req.url.substr(req.url.indexOf('/',1) + 1)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      insertNewUrl(urlToShorten, (err, result) => {
        if (err) {
          return res.end(JSON.stringify(err))
        }
        return res.end(JSON.stringify({
          "original_url": result.original_url,
          "short_url": `http://${req.headers.host}/${result.slug}`
        }))
      })
      return
    }
     
    // send 404 if user is trying to access a route not declared above
    if (/\//.test(req.url.substr(1))) {
      res.writeHead(404, {"Content-Type": "text/plain"});
      return res.end("404 Not Found\n");
    }
    
    // attempt to retrieve passed short-url slug
    const slug = req.url.substr(1)
    getOriginalUrl(slug, (err, result) => {
      if (err) {
        // not found
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(err))
      }
      // redirect
      res.writeHead(302, { location: result })
      return res.end()
    })
  }
})

const port = process.env.PORT || 3000;
console.log('server listening on port ' + port)
server.listen(port)
