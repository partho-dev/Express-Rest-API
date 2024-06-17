const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')



//Before refactoring the code with asyncwrapper middleware to get rid of try&catch 
/*const getAllTasks = async(req, res)=>{
    try {
        const task = await Task.find({})
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({message:error})
    }
}*/

/*But, since we have removed the catch block, we are not able to handle the error properly, 
so we would need to create another middleware for that*/

const getAllTasks = asyncWrapper(async(req, res)=>{
        //keep the find() with empty, to get all the values
        const task = await Task.find({})
        res.status(200).json({task})
        // res.status(200).json({status: "success", data: {task, nbHits: task.length}})   
}) 

const createTask = asyncWrapper(async (req, res)=>{
        const task = await Task.create(req.body)
        res.status(201).json({task})
})

// Before implimenting the Custom error handler middleware
/*const getTask = asyncWrapper(async (req, res)=>{

        const {id:taskID} = req.params
        const task = await Task.findOne( { _id: taskID})
        if(!task){
           return res.status(404).json({msg: `No Task with id : ${taskID}`})
        }
        res.status(200).json({task})
}) */

// After implimenting the Custom error handler middleware
const getTask = asyncWrapper(async (req, res, next)=>{

    const {id:taskID} = req.params
    const task = await Task.findOne( { _id: taskID})
    if(!task){
        return next(createCustomError(`No Task with the taskID ${taskID}`, 400))
    //    return res.status(404).json({msg: `No Task with id : ${taskID}`})
    }
    res.status(200).json({task})
})

const updateTask = asyncWrapper(async(req, res)=>{

        const {id:taskID} = req.params
        /*Note : Task.findByIdAndUpdate({The ID that needs to be updated}, 
        The content or data that needs to be updated, 
        {it will return the updated data to the FE after updating, force the validator to run})*/
        const task = await Task.findByIdAndUpdate({_id:taskID}, req.body, {new:true, runValidators:true})
        if(!task){
            // return res.status(404).json({msg: `No Task with id : ${taskID}`})
            return next(createCustomError(`No Task with the taskID ${taskID}`, 400))
         }
        res.status(200).json({task})
}
)


const deleteTask = asyncWrapper(async(req, res)=>{
 
        const {id:taskID}=req.params
        const task = await Task.findByIdAndDelete({_id:taskID})
        if(!task){
            // return res.status(404).json({msg: `No Task with id : ${taskID}`})
            return next(createCustomError(`No Task with the taskID ${taskID}`, 400))
         }
        //  res.status(200).json({task})
         res.status(200).json({task: null, status: "Deleted"})
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}