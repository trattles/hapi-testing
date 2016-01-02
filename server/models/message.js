import Sequelize from 'sequelize';
import sequelize from './index.js';

let Message = sequelize.define('message', {
	message: {
		type: Sequelize.STRING,
		field: 'message'
	}
});

Message.sync();

export default Message;