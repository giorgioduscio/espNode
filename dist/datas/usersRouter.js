"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const expressDatas = require('express'), routerDatas = expressDatas.Router(), usersDatas = require('./users'), bcrypt = require('bcrypt');
// TODO GET
routerDatas.get(`/`, (req, res) => {
    res.status(200).json({ success: true, data: usersDatas });
});
routerDatas.get(`/:id`, (req, res) => {
    const { id } = req.params, user = usersDatas.find((user) => user.id === id);
    res.status(200).json(user);
});
// TODO POST
routerDatas.use(expressDatas.json());
routerDatas.use(expressDatas.urlencoded({ extended: false }));
routerDatas.post(`/`, (req, res) => {
    const nuovaPersona = req.body;
    usersDatas.push(nuovaPersona);
    res.status(200).json({ success: true, data: usersDatas });
});
routerDatas.post('/crypt', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt.genSalt(10), hashedPassword = yield bcrypt.hash(req.body.password, salt);
        console.log(salt, hashedPassword);
        const nuovaPersona = req.body;
        nuovaPersona.password = hashedPassword;
        usersDatas.push(nuovaPersona);
        res.status(200).json({ success: true, data: nuovaPersona });
        // hash('password',{})
    }
    catch (_a) {
        res.status(500).send();
    }
}));
routerDatas.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = usersDatas.find((user) => user.name === req.body.name);
        if (user == null)
            return res.status(400).send('Utente non trovato');
        if (yield bcrypt.compare(req.body.password, user.password)) {
            res.send('success');
        }
        else
            res.send('fail');
    }
    catch (_a) {
        res.status(500).send();
    }
}));
// TODO PUT
routerDatas.put('/:id', (req, res) => {
    let { id } = req.params, updateUser = req.body, index = usersDatas.findIndex((user) => user.id == id);
    if (index != -1) {
        usersDatas[index].name = updateUser.name;
        usersDatas[index].second = updateUser.second;
        res.status(200).json({ success: true, data: usersDatas });
    }
    else
        res.status(404).json({ success: true, data: [] });
});
// TODO DELETE
routerDatas.delete('/:id', (req, res) => {
    const { id } = req.params, index = usersDatas.findIndex((user) => user.id == id);
    if (index != -1) {
        usersDatas.splice(index, 1);
        res.status(200).json({ success: true, data: usersDatas });
    }
    else
        res.status(404).json({ success: true, data: [] });
});
module.exports = routerDatas;
