const authorize = (req, res, next) =>{

const {user} = req.query
if(user === "John"){
    req.user = { name : "John"}
    next()
}else {
    res.status(401).send("Sorry, get some token")
}}

module.exports = authorize