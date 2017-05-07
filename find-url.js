'use strict'
const mongo = require('mongodb').MongoClient
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/urlShortener'

module.exports = function getOriginalUrl(slug, callback) {
  mongo.connect(dbUrl, (err, db) => {
    if (err) throw err
    db.collection('urls').findOne(
      { slug: slug }).then((result) => {
      if (result) {
        callback(null, result.original_url)
      } else {
        callback({
          error: 'Not found in database'
        })
      }
      db.close()
    })
  })
}