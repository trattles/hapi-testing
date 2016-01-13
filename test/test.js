const Code = require('code');
const Lab = require ('lab');
const lab = exports.lab = Lab.script();
const server = require('./../server/server.js');

lab.experiment('testing', () => {
	lab.test('math works fine', (done) => {
		Code.expect(1+1).to.equal(2);
		done();
	});

	lab.test('testing an endpoint', (done) => {
		var options = {
			method: "GET",
			url: "/api/v1/returnthis"
		};

		server.inject(options, function(response) {
			var result = response.result;
			Code.expect(response.statusCode).to.equal(200);
		})
		done();
	});
});