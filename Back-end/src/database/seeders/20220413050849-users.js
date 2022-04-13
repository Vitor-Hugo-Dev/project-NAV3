'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
      [{
        id: 1,
        name: 'Adiministrador',
        email: 'adm@gmail.com',
        password: 'Vh123456@',
        role: 'admin',
      },
      {
        id: 2,
        name: 'Netenho bagui doido',
        email: 'neto100porcentoerva@gmail.com',
        password: 'Vh123456@',
        role: 'user',
      },
      {
        id: 3,
        name: 'Rogerinho galinha preta',
        email: 'zebirita@email.com',
        password: 'Vh123456@',
        role: 'user',
      }
      ], { timestamps: false });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
