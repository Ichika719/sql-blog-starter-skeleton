const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    classMethods: {
      associate() {

      },
    },
  });

  User.beforeCreate((user, options, callback) => {
    user.email = user.email.toLowerCase();
    if (user.password) {
      bcrypt.hash(user.get('password'), 10, (err, hash) => {
        if (err) return callback(err);
        user.set('password', hash);
        return callback(null, options);
      });
    } else {
      return callback(null, options);
    }
  });

  return User;
};
