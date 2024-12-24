const ApiError = require('../errors/ApiError')
const userService =  require('../service/user-service')


class UserController {
    async registration(req, res) {
        try {
          const userData = req.body;
          const newUser = await userService.addUser(userData);
          return res.status(201).json(newUser);
        } catch (error) {
          console.error(error.message);
          if (error.message.includes('Користувач з цією електронною поштою вже існує.')) {
            return res.status(409).json({ error: 'Користувач з цією електронною поштою вже існує.' });
          } else {
            return res.status(500).json({ error: 'Помилка реєстрації користувача.' });
          }
        }
    }
    
    async login(req, res) {
        try {
          const { email, password } = req.body;
          const user = await userService.loginUser(email, password);
          return res.status(200).json(user);
        } catch (error) {
          console.error(error.message);
          if (error.message === 'Користувача з такою електронною поштою не знайдено.' || error.message === 'Неправильний пароль.') {
            return res.status(401).json({ error: 'Неправильна електронна пошта або пароль.' });
          } else {
            return res.status(500).json({ error: 'Помилка входу користувача.' });
          }
        }
    }
    
    async logoutUser(req, res) {
        try {
          const result = await UserService.logoutUser(req);
          return res.json(result);
        } catch (error) {
          console.error('ERROR:', error);
          return res.status(500).send(`Помилка: ${error.message}`);
        }
    }

    async updateUser(req, res) {
        try {
          const userId = req.params.id; // Припускаючи, що ідентифікатор користувача передається через параметр шляху
          const updatedUserData = req.body;
          const updatedUser = await UserService.updateUser(userId, updatedUserData);
          return res.json(updatedUser);
        } catch (error) {
          console.error('ERROR:', error);
          res.status(500).send(`Помилка: ${error.message}`);
        }
    }

    async getOneUser(req, res) {
        try {
          const userId = req.params.id;
          const user = await UserService.getOneUser(userId);
          return res.json(user);
        } catch (error) {
          console.error('ERROR:', error);
          return res.status(500).send(`Error: ${error.message}`);
        }
    }
    
    async getAllUsers(req, res) {
        try {
          const users = await UserService.getAllUsers();
          return res.json(users);
        } catch (error) {
          console.error('ERROR:', error);
          return res.status(500).send(`Error: ${error.message}`);
        }
    }
}

module.exports = new UserController()