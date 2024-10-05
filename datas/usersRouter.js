const express =require('express')
,     router =express.Router()
,     users =require('./users')()
,     bcrypt =require('bcrypt')

// console.log(users);


// TODO GET
router.get(`/`, (req,res)=>{
  res.status(200).json({success:true, data:users})
})
router.get(`/:id`, (req,res)=>{
  const {id} =req.params
  ,     user =users.find(p=>p.id===id)

  res.status(200).json(user)
})

  
  
// TODO POST
router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.post(`/`, (req,res)=>{
  const nuovaPersona =req.body
  users.push(nuovaPersona)
  res.status(200).json({success:true,data:users})
})

router.post('/crypt', async (req, res)=>{
  try {
    const salt =await bcrypt.genSalt(10)
    ,     hashedPassword =await bcrypt.hash(req.body.password, salt)
    console.log(salt,hashedPassword);
    
    const nuovaPersona =req.body
    nuovaPersona.password =hashedPassword
    users.push(nuovaPersona)
    
    res.status(200).json({success:true,data:nuovaPersona})
    hash('password')
  } catch{ res.status(500).send() }
})

router.post('/login', async (req, res)=>{
  try {
    const user =users.find(user=>user.name===req.body.name)
    if (user==null) return res.status(400).send('Utente non trovato')
    if (await bcrypt.compare(req.body.password, user.password)){
      res.send('success')
    }else res.send('fail')

  } catch{ res.status(500).send() }
})
  
// TODO PUT
router.put('/:id', (req,res)=>{
  let {id} =req.params
  ,     updateUser =req.body
  ,     index =users.findIndex( user=>user.id==id )

  if(index!=-1){
    users[index].name =updateUser.name
    users[index].second =updateUser.second
    res.status(200).json({success:true, data:users})

  }else res.status(404).json({success:true, data:[]})
})

// TODO DELETE
router.delete('/:id', (req,res)=>{
  const {id} =req.params
  ,     index =users.findIndex( user=>user.id==id )

  if(index!=-1){
    users.splice(index,1)
    res.status(200).json({success:true, data:users})

  }else res.status(404).json({success:true, data:[]})
})

module.exports =router