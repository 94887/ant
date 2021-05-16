const user = require('../../src/tables/user')
const employees = require('../../src/tables/employees')

exports.up = function(knex) {
  return (
    knex.schema
    .createTable('user', user)
    .createTable('employees', employees)
    .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
  );
};

exports.down = function(knex) {
    return (
        knex.schema
          .dropTableIfExists('user')
          .dropTableIfExists('employees')
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          })
      );
};
