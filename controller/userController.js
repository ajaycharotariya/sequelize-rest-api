require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Articles } = require('../models/index')

login = async (req, res, next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        let result = await User.findAll({ email: email})
        
        if (result.length < 1) {
            res.status(401).send({ message: 'Incorrect email or password.Try again!'})
        }else {
            console.log("password", password, "database user field password", result[0].password);
            let data = await bcrypt.compare(password, result[0].password).catch((err) => { return Promise.reject(err); });
            if (data) {
                var token = await jwt.sign({ email: result[0].email }, process.env.SECRET, {
                    expiresIn: '1h' 
                });
                let data = {
                    auth: true,
                    token: token,
                    data: result[0]
                };
                res.status(200).send({ message: 'Login successfully', data: data})
            } else {
                res.status(401).send({ message: 'Password doesent match'})
            }
        }
    }catch(err){
        console.log('err', err)
    }  
}

signup = async (req, res, next) => {
    try{
        const { name, email, password } = req.body
        console.log(name, email, password)
        let passwordHash = await bcrypt.hash(password, 10)
        let data = await User.create({ name: name, email: email, password: passwordHash })
        return res.status(201).send({ message: 'user created succesfully', data: data})
    }catch(err){
        console.log('err', err)
    }
}

addArticle = async (req, res, next) => {
    try{
        const { userId, title, content } = req.body
        console.log(userId, title, content)
        let data = await Articles.create({ userId: userId, title: title, content: content })
        return res.status(201).send({ message: 'Article created succesfully', data: data})
    }catch(err){
        console.log('err', err)
    }
}

getUserArticles = async (req, res, next) => {
    try{
        let data = await User.findAll({
            include: [{
                model: Articles,
                required: true,
                as: 'articles'
               }]
        })
        return res.status(201).send({ message: 'Get user article succesfully', data: data})
    }catch(err){
        console.log('err', err)
    }
 }




module.exports = {
    login,
    signup,
    addArticle,
    getUserArticles
};