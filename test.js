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
