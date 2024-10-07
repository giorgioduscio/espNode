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
// @ts-ignore
const express = require('express'), router = express.Router() // @ts-ignore
, users = require('./users'), bcrypt = require('bcrypt');
// TODO GET
router.get(`/`, (req, res) => {
    res.status(200).json({ success: true, data: users });
});
router.get(`/:id`, (req, res) => {
    const { id } = req.params, user = users.find((user) => user.id === id);
    res.status(200).json(user);
});
// TODO POST
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.post(`/`, (req, res) => {
    const nuovaPersona = req.body;
    users.push(nuovaPersona);
    res.status(200).json({ success: true, data: users });
});
router.post('/crypt', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt.genSalt(10), hashedPassword = yield bcrypt.hash(req.body.password, salt);
        console.log(salt, hashedPassword);
        const nuovaPersona = req.body;
        nuovaPersona.password = hashedPassword;
        users.push(nuovaPersona);
        res.status(200).json({ success: true, data: nuovaPersona });
        // hash('password',{})
    }
    catch (_a) {
        res.status(500).send();
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = users.find((user) => user.name === req.body.name);
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
router.put('/:id', (req, res) => {
    let { id } = req.params, updateUser = req.body, index = users.findIndex((user) => user.id == id);
    if (index != -1) {
        users[index].name = updateUser.name;
        users[index].second = updateUser.second;
        res.status(200).json({ success: true, data: users });
    }
    else
        res.status(404).json({ success: true, data: [] });
});
// TODO DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params, index = users.findIndex((user) => user.id == id);
    if (index != -1) {
        users.splice(index, 1);
        res.status(200).json({ success: true, data: users });
    }
    else
        res.status(404).json({ success: true, data: [] });
});
module.exports = router;
