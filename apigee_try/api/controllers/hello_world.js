'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 http://www.w3schools.com/js/js_strict.asp
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var request = require("request");
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */

//opid: function 
module.exports = {
  keyword: keyword
};


function getSears(req, res) {
  request("http://api.developer.sears.com/v2.1/products/search/Sears/xml/keyword/cribs?apikey=vtyggDVouJ7GXS9vDsGl9E9cgi32U4Ub", function(err, resp, body) {
    if(err) {
      res.send(err);
    } else {
      var results = {};
      results.entities = JSON.parse(body).entities;
      res.json(results);
    }
  });
}

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function keyword(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  //var name = req.swagger.params.name.value || 'stranger';
  var keyword = req.swagger.params.keyword.value || 'data not found';
  
  request("http://api.developer.sears.com/v2.1/products/search/Sears/json/keyword/"+keyword+"?apikey=vtyggDVouJ7GXS9vDsGl9E9cgi32U4Ub", function(err, resp, body) {
    if(err) {
      res.send(err);
    } else {
      //JSON.parse()
      res.json(body);
    }
  });


  //util.format('Hello, %s!', name);

  // this sends back a JSON response which is a single string
}
