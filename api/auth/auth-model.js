const { Model } = require('objection');
const db = require('../../data/dbConfig'); 

Model.knex(db); 

class User extends Model {
  static get tableName() {
    return 'users'; 
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 1024 },
      }
    };
  }
  static findBy(filter) {
   return this.query().where(filter).first();
 }
}

module.exports = User;
