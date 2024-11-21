"use strict";
const expressPages = require('express');
const path = require('path');
const directory = 'C:/Users/Giorno Giovanna/Desktop/Programmazione/espNode/src/pages/';
const routerPages = expressPages.Router();
const routerToExecute = [
    { urlPath: '/home', filePath: directory + 'home/home.html' },
    { urlPath: '/about', filePath: directory + 'about/about.html' },
];
routerToExecute.forEach(item => {
    routerPages.get(item.urlPath, (req, res) => {
        res.sendFile(item.filePath);
    });
});
module.exports = routerPages;
