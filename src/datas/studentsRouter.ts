// @ts-nocheck
const express =require('express')
const router =express.Router()
const sendQuery =require('./sendQuery')
const database ={
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school'
}


// TODO GET
router.get(`/`, (req:any, res:any)=>{
  sendQuery(database, `
    SELECT * 
    FROM studenti
    `, (result:any)=> res.status(200).json({success:true, data:result})
  )
})
router.get('/:id', (req:any, res:any)=>{
  const id =Number(req.params.id)
  sendQuery(database, `
    SELECT * 
    FROM studenti 
    WHERE id_studente=${id}
    `, (result:any)=>res.status(200).json({success:true, data:result})
  )
})

// TODO POST
router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.post(`/`, (req:any, res:any)=>{
  const {nome, cognome, email, data_nascita} =req.body  
  sendQuery(database, `
    INSERT INTO studenti(nome, cognome, email, data_nascita) 
    VALUES ("${nome}", "${cognome}", "${email}", ${data_nascita})
    `, (result:any)=> res.status(200).json({success:true,data:result})
  )
})

// TODO DELETE
router.delete('/:id', (req:any, res:any)=>{
  sendQuery(database, `
    DELETE FROM studenti 
    WHERE id_studente=${req.params.id};
    `, (result:any)=> res.status(200).json({success:true,data:result})
  )
})

// TODO PUT
router.put('/:id', (req:any, res:any)=>{
  const updateUser =req.body 
  const itemize =require('../tools/itemize')
  sendQuery(database, `
    UPDATE studenti 
    SET ${itemize(updateUser, (key)=>` ${key} ="${updateUser[key]}" `)}
    WHERE id_studente=${req.params.id}
    `, (result:any)=> res.status(200).json({success:true,data:result})
  )
})


module.exports =router