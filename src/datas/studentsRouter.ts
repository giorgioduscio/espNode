// @ts-ignore
const express =require('express')
const router =express.Router()
const functionQuery =require('./functionQuery')
const database ={
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school'
}


// TODO GET
router.get(`/`, (req:any, res:any)=>{
  functionQuery(database, "SELECT * FROM studenti", (result:any)=>{
    let dataToPush ={success:true, data:result}
    res.status(200).json(dataToPush)
  })
})
router.get('/:id', (req:any, res:any)=>{
  const id =Number(req.params.id)
  functionQuery(database, `SELECT * FROM studenti WHERE id_studente=${id}`, (result:any)=>{
    let dataToPush ={success:true, data:result}
    res.status(200).json(dataToPush)
  })
})

// TODO POST
router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.post(`/`, (req:any, res:any)=>{
  const {nome, cognome, email, data_nascita} =req.body
  const newQuery =`INSERT INTO studenti(nome, cognome, email, data_nascita) VALUES ("${nome}", "${cognome}", "${email}", ${data_nascita})`
  
  functionQuery(database, newQuery, (result:any)=>{
    res.status(200).json({success:true,data:result})
  })
})

// TODO DELETE
router.delete('/:id', (req:any, res:any)=>{
  const {id} =req.params
  const query =`DELETE FROM studenti WHERE id_studente=${id}`

  functionQuery(database, query, (result:any)=>{
    res.status(200).json({success:true,data:result})
  })
})

// TODO PUT
router.put('/:id', (req:any, res:any)=>{
  const {id} =req.params
  const updateUser =req.body
  // const query =`UPDATE studenti SET username='Mario', coins=1785 WHERE id_studente=${id}`
  let query =`UPDATE studenti SET `
  Object.keys(updateUser).forEach((key,i,array)=>{
    query +=`${key} ="${updateUser[key]}" `
    if(i!=array.length-1) query +=', '
  })
  query +=`WHERE id_studente=${id}`
  // console.log(query)
  
  functionQuery(database, query, (result:any)=>{
    res.status(200).json({success:true,data:result})
  })
})


module.exports =router