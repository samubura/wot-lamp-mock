const { notImplemented, internalServerError } = require("../utils/action-results")

exports.mapControllerRoutes = function (controllerName, mapper) {
  const controller = require(`../controllers/${controllerName}`)
  return app => mapper(app, controller)
}

function printSeparator() {
  console.log("=================================================")
}
exports.action = function (f) {
  return async function (req, res) {
    try {
      printSeparator()
      console.log(`${req.method} ${req.originalUrl}`)
      console.log("Agent:", req.headers['x-agent-id'])
      console.log('Body:', req.body)
      console.log('Time:', new Date().toUTCString() )
      printSeparator()
      let result = (f ? await f(req) : notImplemented()) || notImplemented()
      res.setResult(result)
      printSeparator()
    } catch (error) {
      res.setResult(internalServerError(error))
    }
  }
}