//Contains our config for good logger
import good_file from 'good-file';

module.exports = {
	opsInterval: 1000,
	reporters: [{
		reporter: require('good-console'),
		events: {log: '*', response: '*'}
	},
	{
		reporter: good_file,
        events: { ops: '*' },
        config: './server/storage/logs/good_ops_log'
	},
	{
		reporter: good_file,
		events: { response: '*' },
		config: './server/storage/logs/good_response_log'
	},
	{
		reporter: good_file,
		events: { error: '*', log: '*' },
		config: './server/storage/logs/good_log'
	}
	]
};

