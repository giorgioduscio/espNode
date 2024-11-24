const expressDatas =require('express')
,     routerDatas =expressDatas.Router()
,     usersDatas :any =[]
,     bcrypt =require('bcrypt')

// TODO GET
routerDatas.get(`/`, (req:any, res:any)=>{
  res.status(200).json({success:true, data:usersDatas})
})
routerDatas.get(`/:id`, (req:any, res:any)=>{
  const {id} =req.params
  ,     user =usersDatas.find((user:any)=>user.id===id)

  res.status(200).json(user)
})
  
// TODO POST
routerDatas.use(expressDatas.json())
routerDatas.use(expressDatas.urlencoded({extended:false}))

routerDatas.post(`/`, (req:any, res:any)=>{
  const nuovaPersona =req.body
  usersDatas.push(nuovaPersona)
  res.status(200).json({success:true,data:usersDatas})
})

routerDatas.post('/crypt', async (req:any, res:any)=>{
  try {
    const salt =await bcrypt.genSalt(10)
    ,     hashedPassword =await bcrypt.hash(req.body.password, salt)
    console.log(salt,hashedPassword);
    
    const nuovaPersona =req.body
    nuovaPersona.password =hashedPassword
    usersDatas.push(nuovaPersona)
    
    res.status(200).json({success:true,data:nuovaPersona})
    // hash('password',{})
  } catch{ res.status(500).send() }
})

routerDatas.post('/login', async (req:any, res:any)=>{
  try {
    const user =usersDatas.find((user:any)=>user.name===req.body.name)
    if (user==null) return res.status(400).send('Utente non trovato')
    if (await bcrypt.compare(req.body.password, user.password)){
      res.send('success')
    }else res.send('fail')

  } catch{ res.status(500).send() }
})
  
// TODO PUT
routerDatas.put('/:id', (req:any, res:any)=>{
  let {id} =req.params
  ,     updateUser =req.body
  ,     index =usersDatas.findIndex( (user:any)=>user.id==id )

  if(index!=-1){
    usersDatas[index].name =updateUser.name
    usersDatas[index].second =updateUser.second
    res.status(200).json({success:true, data:usersDatas})

  }else res.status(404).json({success:true, data:[]})
})

// TODO DELETE
routerDatas.delete('/:id', (req:any, res:any)=>{
  const {id} =req.params
  ,     index =usersDatas.findIndex( (user:any)=>user.id==id )

  if(index!=-1){
    usersDatas.splice(index,1)
    res.status(200).json({success:true, data:usersDatas})

  }else res.status(404).json({success:true, data:[]})
})

module.exports =routerDatas