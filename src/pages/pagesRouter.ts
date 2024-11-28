// @ts-nocheck
const express =require('express')
const path =require('path')
const router =express.Router()
const routes =require('./routes')

routes.forEach(item=>{
  let htmlPath =path.join(__dirname, item.filePath +'.html')
  let pugPath =path.join('C:/Users/Giorno Giovanna/Desktop/Programmazione/espNode/src/pages', item.filePath +'.pug')
  let tsDatas =require('./' +item.filePath)  
  
  router.get(item.urlPath, (req:any, res:any) => {
    res.render(pugPath, tsDatas)
  })
})

module.exports =router