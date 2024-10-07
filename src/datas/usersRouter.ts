// @ts-ignore
const express =require('express')
,     router =express.Router() // @ts-ignore
,     users =require('./users')
,     bcrypt =require('bcrypt')




// TODO GET
router.get(`/`, (req:any, res:any)=>{
  res.status(200).json({success:true, data:users})
})
router.get(`/:id`, (req:any, res:any)=>{
  const {id} =req.params
  ,     user =users.find((user:any)=>user.id===id)

  res.status(200).json(user)
})

  
  
// TODO POST
router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.post(`/`, (req:any, res:any)=>{
  const nuovaPersona =req.body
  users.push(nuovaPersona)
  res.status(200).json({success:true,data:users})
})

router.post('/crypt', async (req:any, res:any)=>{
  try {
    const salt =await bcrypt.genSalt(10)
    ,     hashedPassword =await bcrypt.hash(req.body.password, salt)
    console.log(salt,hashedPassword);
    
    const nuovaPersona =req.body
    nuovaPersona.password =hashedPassword
    users.push(nuovaPersona)
    
    res.status(200).json({success:true,data:nuovaPersona})
    // hash('password',{})
  } catch{ res.status(500).send() }
})

router.post('/login', async (req:any, res:any)=>{
  try {
    const user =users.find((user:any)=>user.name===req.body.name)
    if (user==null) return res.status(400).send('Utente non trovato')
    if (await bcrypt.compare(req.body.password, user.password)){
      res.send('success')
    }else res.send('fail')

  } catch{ res.status(500).send() }
})
  
// TODO PUT
router.put('/:id', (req:any, res:any)=>{
  let {id} =req.params
  ,     updateUser =req.body
  ,     index =users.findIndex( (user:any)=>user.id==id )

  if(index!=-1){
    users[index].name =updateUser.name
    users[index].second =updateUser.second
    res.status(200).json({success:true, data:users})

  }else res.status(404).json({success:true, data:[]})
})

// TODO DELETE
router.delete('/:id', (req:any, res:any)=>{
  const {id} =req.params
  ,     index =users.findIndex( (user:any)=>user.id==id )

  if(index!=-1){
    users.splice(index,1)
    res.status(200).json({success:true, data:users})

  }else res.status(404).json({success:true, data:[]})
})

module.exports =router