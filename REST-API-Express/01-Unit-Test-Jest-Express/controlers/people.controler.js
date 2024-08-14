let {people} = require('../data')


const getPeople = (req,res)=>{
    res.status(200).json({success : true, data:people})
    // console.log(people)
}

const postPeople = (req, res)=>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success: false, message:"Put correct info"})
    }
    // people.push(name)
    res.status(201).json({success:true, data: [...people, name]})
}

const putPeople = (req, res)=>{
    const {ID} = req.params
    const {name} = req.body

    const person = people.find((person)=>person.id === Number(ID))

    if(!person){
        return res.json({success : false, msg: `No id like ${ID}`})
    }
   const newPeople = people.map((person)=>{
    if(person.id === Number(ID)){
        person.name = name
    }
    return person
   })
    res.json({success:true, data:newPeople})
}

const deletePeople = (req, res)=>{
    const {id} = req.params

    const person = people.find((person)=>person.id === Number(id))

    if(!person){
        res.status(400).json({success:false, mess:`No such id as ${id}`})
    }

    const newPeople = people.filter((person)=>person.id !== Number(id))
    return res.status(200).json({success:true, data:newPeople})
}



module.exports = {
    getPeople,
    postPeople,
    putPeople,
    deletePeople
}

