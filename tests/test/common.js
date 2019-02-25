let chai = require('chai');
const GraphQLClient = require('graphql-client');
const url = 'http://localhost:4000/graphql';
exports.url = url;
exports.removeSpaceAndNewLine = function (value) {
    return value.replace(/(\r\n\t|\n|\r\t)/gm, "").replace(/\s+/g, '')
}
// exports.httpClient = require('request');
exports.request = GraphQLClient({
    url: url
});
exports.methodNotAllowedMsg = "<h1>Method Not allowed.</h1>";
exports.badRequestMsg = '<h1>Bad Request</h1>';
exports.forbiddenText = "<h1>We are sorry, but you are not allowed access to this resource.</h1>";
exports.expect = chai.expect;
exports.browserAccept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"