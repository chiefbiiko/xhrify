var ERR = {
  URL: Error('no url'),
  DATA: Error('no data'),
  NOOP: Error('noops not allowed'),
  HTTP: function (status) {
    return Error('unexpected HTTP response status ' + status)
  }
}

function mapHeaders (stringheaders) {
  return stringheaders.trim().split(/[\r\n]+/)
    .reduce(function (acc, cur) {
      var parts = cur.split(': ')
      var key = parts.shift()
      var value = parts.join(': ')
      acc[key] = value
      return acc
    }, {})
}

function xhrify (conf, cb) {
  if (!conf || !cb) throw(ERR.NOOP)
  if (!conf.url) return cb(ERR.URL)

  conf.method = conf.method ? conf.method.toLowerCase() : 'get' 

  if (/^(put|post)$/i.test(conf.method) && !conf.data) return cb(ERR.DATA)

  var xhr = new XMLHttpRequest()

  conf.headers = conf.headers || {}

  Object.keys(conf.headers).forEach(function (key) {
    xhr.setRequestHeader(key, conf.headers[key])
  })

  xhr.addEventListener('load', function () {
    if (xhr.status >= 400) return cb(ERR.HTTP(xhr.status))
    var headers = mapHeaders(xhr.getAllResponseHeaders())
    var body = xhr.response || xhr.responseText || xhr.responseXML
    cb(null, { status: xhr.status, headers: headers, body: body }) 
  })

  xhr.withCredentials = !!conf.withCredentials

  xhr.open(conf.method, conf.url, true)

  xhr.send(/^(put|post)$/i.test(conf.method) ? conf.data : null)
}

window.xhrify = xhrify
module.exports = xhrify