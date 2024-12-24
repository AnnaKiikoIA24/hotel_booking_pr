const ApiError = require('../errors/ApiError')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError){
        return res.status(err.status).json( {msg: err.msg} )
    }
    return res.status(500).json( {msg: 'Unhandled Error!'} )
}