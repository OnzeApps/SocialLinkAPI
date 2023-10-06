const route = require('express').Router();
const { login, register, users } = require('../controllers/user');
const { postCard, getPosts, getImage} = require('../controllers/postUser');
const { editVerificado } = require('../controllers/edit')


route.post('/user/register', register);
route.post('/user/login', login);
route.get('/user/usuarios', users);
route.post('/user/edit/verificado', editVerificado);

route.post('/user/post', postCard);
route.get('/user/posts', getPosts);
route.get('/images/:id', getImage);


module.exports = { route }