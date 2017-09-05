var request     = require("request");
var querystring = require("querystring");
var extend      = require('util')._extend;

var API_URL     = "bytehand.com";
var API_PORT    = {
    http: 3800,
    https: 8443
};

var Bytehand = function(config){
    this.useHttps = config.https || config.secure || false;
    this.auth = {
        id: config.id || null,
        key: config.key || null
    };
};

module.exports = function(config){
    var config = config || {};
    return new Bytehand(config);
};

Bytehand.prototype.send = function(message, callback){
    this._call('send', message, function(err, response){
       if( err ) return callback(err, null);

       callback(null, {
           status: "OK",
           messageId: response.description
       });

    });
};

Bytehand.prototype.balance = function(callback){
    this._call('balance', {}, function(err, response){
        if( err ) return callback(err, null);
        callback(null, response.description);
    });
};

Bytehand.prototype.status = function(message, callback){

    var messageId = null;

    switch (typeof message) {
        case 'string':
            messageId = message;
            break;
        case 'object':
            messageId = message.id || message.messageId;
            break;
        default:
            break;
    }

    if( ! messageId ) return callback('no message identifier', null);

    this._call('status', {message: messageId}, function(err, response){
        if( err ) return callback(err, null);
        callback(null, response.description);
    });
};

Bytehand.prototype._call = function(method, message, callback){
    var url  = this.prepareUrl(method, message);
    var self = this;
    request.get(url, function(err, response, body){
        self._handle(err, response, body, callback);
    });
};

Bytehand.prototype._handle = function(err, response, body, callback){
    if( err) return callback(err, null);

    var data = this._parseJSON(body);

    if( response.statusCode != 200 || data.status !== 0)
        return callback(data, null);

    callback(null, data);
};

Bytehand.prototype._parseJSON = function(str){
    var data = null;
    try{
        data = JSON.parse(str);
    } catch(e){
        console.log('could not parse JSON string: ', str, e);
    }
    return data;
};

Bytehand.prototype.prepareUrl = function(method, message){
    var params  = extend(message, this.auth);
    var qs      = [method, querystring.stringify(params)].join('?');
    var schema  = (this.useHttps) ? 'https' : 'http';
    var port    = API_PORT[schema];
    var url     = [[schema,API_URL].join('://'), port].join(':');
    return [url, qs].join('/');
};