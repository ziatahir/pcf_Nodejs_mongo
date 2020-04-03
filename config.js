var vcapServices = require('vcap_services');
var credentials = vcapServices.getCredentials('mlab');

module.exports = {
   "database": credentials.uri,
   "port": process.env.PORT || 3000,
   "secretKey": "aquaSurfer"
}

