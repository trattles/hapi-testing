import Sequelize from 'sequelize';

let sequelize = new Sequelize('mysql://hapi:hapi@localhost:3306/hapi');

export default sequelize;