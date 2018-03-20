var xhrify = require('.')

var conf = { 
  url: 'https://raw.githubusercontent.com/chiefbiiko/siphash24-stream/master/index.js'
}
xhrify(conf, function (err, res) {
  if (err) return console.error(err)
  console.log('response:', res)
})
