const express =require('express')
,     router =express.Router()
,     users =require('../datas/users')()

console.log(users);


// TODO GET
router.get(`/`, (req,res)=>{
  res.status(200).json({success:true, data:users})
})
router.get(`/:id`, (req,res)=>{
  const {id} =req.params
  ,     persona =users.find(p=>p.id===id)

  res.status(200).json(persona)
})

  
  
// TODO POST
router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.post(`/`, (req,res)=>{
  const nuovaPersona =req.body
  users.push(nuovaPersona)
  res.status(200).json({success:true,data:users})
})
  
// TODO PUT
router.put('/:id', (req,res)=>{
  let {id} =req.params
  ,     personaAggiornata =req.body
  ,     index =users.findIndex( persona=>persona.id==id )

  if(index!=-1){
    users[index].nome =personaAggiornata.nome
    users[index].cognome =personaAggiornata.cognome
    res.status(200).json({success:true, data:users})

  }else res.status(404).json({success:true, data:[]})
})

// TODO DELETE
router.delete('/:id', (req,res)=>{
  const {id} =req.params
  ,     index =users.findIndex( persona=>persona.id==id )

  if(index!=-1){
    users.splice(index,1)
    res.status(200).json({success:true, data:users})

  }else res.status(404).json({success:true, data:[]})
})

module.exports =router