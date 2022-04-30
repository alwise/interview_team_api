import {Sequelize} from 'sequelize';
import Config from "../Config";
/**
 * initialize database
 */
const sequelize =  new Sequelize(Config.database.uri,Config.database.options);

// sequelize.authenticate();

export default sequelize;