var ERR = {
  URL: Error('no url'),
  DATA: Error('no data'),
  METH: Error('unsupported method'),
  NOOP: Error('noops not allowed'),
  NOTOK: function (status) {
    return Error('unexpected HTTP response status ' + status)
  }
}

var METH = [ 'get', 'head', 'put', 'post', 'delete' ] // forget the rest 4 now

function xhrify (conf, cb) {
  if (!conf || !cb) throw(ERR.NOOP)
  if (!conf.url) return cb(ERR.URL)

  conf.method = conf.method ? conf.method.toLowerCase() : 'get' 

  if (!METH.includes(conf.method)) return cb(ERR.METH)
  if (/^(put|post)$/i.test(conf.method) && !conf.data) return cb(ERR.DATA)

  var xhr = new XMLHttpRequest()

  conf.headers = conf.headers || {}

  Object.keys(conf.headers).map(function (key) {
    return [ key, conf.headers[key] ]
  }).forEach(function (header) {
    xhr.setRequestHeader(header[0], header[1])
  })

  xhr.open(conf.method, conf.url, true)

  xhr.addEventListener('load', function (e) {
    xhr.status === 200 ? cb(null, xhr.response) : cb(ERR.NOTOK(xhr.status))
  })

  xhr.send(/^(put|post)$/i.test(conf.method) ? conf.data : null)
}

module.exports = xhrify
