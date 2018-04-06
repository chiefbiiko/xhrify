var tape = require('tape')
var xhrify = require('.')

tape('xhrify - GET', function (t) {
  var conf = { 
    url: 'https://raw.githubusercontent.com/chiefbiiko/siphash24-stream/master/index.js'
  }
  xhrify(conf, function (err, res) {
    if (err) t.end(err)
    t.ok(res.body.length, 'got something')
    t.end()
  })
})

tape('xhrify - HEAD', function (t) {
  var conf = {
    url: 'https://raw.githubusercontent.com/chiefbiiko/siphash24-stream/master/index.js',
    method: 'head'
  }
  xhrify(conf, function (err, res) {
    if (err) t.end(err)
    t.ok(Object.keys(res.headers).length, 'got some headers')
    t.notOk(res.body, 'body is null')
    t.end()
  })
})

tape('xhrify - error pt 1', function (t) {
  var conf = {
    url: 'https://raw.githubusercontent.com/chiefbiiko/siphash24-stream/master/index.js',
    method: 'post'
    // ,data: 'fraud'
  }
  xhrify(conf, function (err, res) {
    t.ok(err, 'errors on empty post')
    t.end()
  })
})

tape('xhrify - error pt 2', function (t) {
  var conf = {
    url: 'https://raw.githubusercontent.com/chiefbiiko/siphash24-stream/master/index.js',
    method: 'options'
  }
  xhrify(conf, function (err, res) {
    t.ok(err, 'errors on unsupported method')
    t.end()
  })
})

tape('xhrify - error pt 3', function (t) {
  var conf = {
    url: 'https://',
    method: 'options'
  }
  xhrify(conf, function (err, res) {
    t.ok(err, 'invalid url')
    t.end()
  })
})