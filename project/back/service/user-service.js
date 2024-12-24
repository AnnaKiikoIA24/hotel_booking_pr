const User = require('../models/models');
//npm install express-session

class UserService {
    static async addUser(userData) {
        try {
          const existingUser = await User.findOne({
            where: { email: userData.email }
          });
          if (existingUser) {
            throw new Error('Користувач з цією електронною поштою вже існує.');
          }
          const newUser = await User.create(userData);
          return newUser;
        } catch (error) {
          throw error;
        }
    }

    static async loginUser(email, password) {
        try {
          const user = await User.findOne({
            where: { email: email },
          });
          if (!user) {
            throw new Error('Користувача з такою електронною поштою не знайдено.');
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error('Неправильний пароль.');
          }
          return user;
        } catch (error) {
          throw error;
        }
    }

    static async logoutUser(req) {
        try {
          req.session.destroy();// Знищення сесії
          return { message: 'Користувач вийшов з акаунту успішно.' };
        } catch (error) {
          throw error;
        }
    }

    static async updateUser(userId, updatedUserData) {
        try {
          const user = await User.findByPk(userId); //findByPk - Sequelize method
          if (!user) {
            throw new Error('Користувач не знайдений.');
          }
          await user.update(updatedUserData);
          return user;
        } catch (error) {
          throw error;
        }
    }

    static async getOneUser(userId) {
        try {
          const user = await User.findByPk(userId);
          if (!user) {
            throw new Error('User not found.');
          }
          return user;
        } catch (error) {
          throw error;
        }
    }

    static async getAllUsers() {
        try {
          const users = await User.findAll();
          return users;
        } catch (error) {
          throw error;
        }
    }
}

module.exports = new UserService()