(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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

},{}]},{},[1]);
