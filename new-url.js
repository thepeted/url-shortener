'use strict'
const mongo = require('mongodb').MongoClient
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/urlShortener'
const shortid = require('shortid')
const validUrl = require('valid-url')

module.exports = function insertNewUrl(original_url, callback) {
  if (!validUrl.isUri(original_url)) {
    return callback({
      error: 'Not a valid url'
    })
  }
  
  // generate slug for short_url and create document
  const slug = shortid.generate()
  const document = { 
    original_url, 
    slug 
  }

  // insert document to db and cb with created document
  mongo.connect(dbUrl, (err, db) => {
    const collection = db.collection('urls')
    collection.insert(document, err => {
      if (err) throw err
      callback(null, document)
      db.close()
    })
  })  
}

