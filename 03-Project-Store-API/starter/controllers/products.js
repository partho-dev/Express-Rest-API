
const { query } = require('express')
const Products = require('../models/product')

const getAllProductsStatic = async(req, res)=>{
    const products = await Products.find({price:{$gt:30 , $lt:100}}).sort('price').select('name rating price').limit(4)
    res.status(200).json({total: products.length, products})
}

const getAllProducts = async(req, res)=>{

    const {featured, company, name, sort, fields} = req.query
    /*while we destructure, we can give any name, but for keeping it more relevant, 
    we use the most obvious name like sort, fields etc */

    /*If the user adds more value along with featured, like page=2, in that case, this filter wont work
    so, to control the req.query, we will use another variable with an empty object
    */
    const queryObject = {}
    // if featured is given into the query
    if(featured){
        queryObject.featured=featured==='true'?true:false
    }

    //Search with Company
    if(company){
        queryObject.company=company
    }

    //search with name
    if(name){
        // queryObject.name=name

        //search with name which starts with some charecter | use $regex and $option=i (case insensitive) 
        queryObject.name={$regex:name, $options:"i"}
    }

    // Implimenting the Numeric filters [ Price > some value, rating = some value etc]
    

    /* Implimenting the sort functionality
            1. Sort needs to be chained with . along with the find, so first we need to get value of find and then chain it
            2. If there are more than one value passed as an argument for sorting, that needs to be without any , and only with space, so 
            we need to use split to remove the , and fill that with space
            3. if the user, does not include any parameter for sort, we will use default sort as createdAT using else block*/

    //first find all the products to sort from
    let result = Products.find({}) // here we are not using await
    //if sort is there on query, then chain it with the result using .
    if(sort){
        sortList = sort.split(',').join(" ") 
        /* 1. here the sort is the variable name that we are setting up in the req.query destructure
        2. user may input more than 1 parameter and by default, it comes with , 
        3. but sort needs space as seperator */
        result=result.sort(sortList) //here the sort is the method to sort
    }else{
        result = result.sort('rating')
    }

    // Implimenting the fileds(select method) to show the selected value, instead of showing all
    /*implimenting the field that needs to be shown, example: we just want to show the name and rating
        1. mongo has a property called select ex: select('name occupation')
        2. select also needs to be chained same like sort
        3. it accepts " "(space) as seperator, so need of split here
        4. specific value also can be passed this way 
        5. if you want to show the range also, we can show like this find({price:{$gt:30 , $lt:100}})
        */
    if(fields){
        fieldsList = fields.split(',').join(" ") // here the field is the variable name that we are setting up in the req.query destructure
        result=result.select(fieldsList) // select is the method to show only these fields on the FE
    }

    /*pagination = implimenting the limit method to show only $limit items, instead of listing all the itsms
            1. it needs the limit method
            2. it needs the skip as well to skip the items ex: skip(2) it will skip the first 2 items
            */
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1)*limit // for first page 0 skip, for 2nd page 10 items skipped, so the listing will start from 11th item

    result = result.skip(skip).limit(limit)
    // const products = await Products.find(queryObject)
    const products = await result // here we are awaiting the result
    res.status(200).json({total: products.length, products})
}

module.exports = { 
    getAllProductsStatic,
    getAllProducts
}