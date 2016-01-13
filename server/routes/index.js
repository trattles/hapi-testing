module.exports = [{
	method: 'GET',
	path: '/config',
	handler: function(req, res) {
		res(req.headers['user-agent']);
	}
},
{
	method: 'GET',
	path: '/static/{filename}',
	handler: function (req, reply) {
		reply.file('static/' + req.params.filename);
	}
},
{
	method: 'GET',
	path: '/favicon.ico',
	handler: function (req, res) {
		res.file('static/favicon.ico');
	}
},
{
	method: 'GET',
	path: '/',
	handler: function(req, res) {
		res('hello world');
	}
},
{
	method: 'GET',
	path: '/api/v1/messages',
	handler: function(req, res) {
		//let messages = Message.findAll();
		let messages = models.Message.findAll();
		res(messages);
	}
},
{
	method: 'GET',
	path: '/api/v1/returnthis',
	handler: function(req, res) {
		res('hey there');
	}
},
{
	method: 'POST',
	path: '/api/v1/login',
	handler: function(req, res) {
		models.User.findOne({
			where: {
				email: req.payload.email
			}
		}).then(function(user) {
			bcrypt.compare(req.payload.password, user.password, function(err, valid){
				console.log(valid);
				if(valid){
					console.log('in this part');
					req.auth.session.set(user);
					res('login successful');
				}
				else {
					res('login failed');
				}
			})
		})
	}
},
{
	method: 'GET',
	path: '/api/v1/logout',
	config: {
		handler: function(req, res) {
			req.auth.session.clear();
			res('Logged Out');
		}
	}
},
{
	method: 'GET',
	path: '/api/v1/authTest',
	config: {
		auth: {
			strategy: 'session'
		},
		handler: function(req, res) {
			res('you hit a successful route');
		}
	}
},
{
	method: 'POST',
	path: '/api/v1/messages',
	handler: function(req, res) {
		models.Message.create({
			title: req.payload.title,
			message: req.payload.message
		}).then(function() {
			let resPayload = models.Message.findAll();
			res(resPayload);
		});
	}
},
{
	method: 'POST',
	path: '/api/v1/user',
	handler: function(req, res) {
		let AuthenticationController = require('./controllers/AuthenticationController.js')
		AuthenticationController.createUser(req, res);
	}
}];