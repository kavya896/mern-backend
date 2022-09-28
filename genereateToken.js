const jwt = require("jsonwebtoken")

const jwtsecret = "kavyareddy"



module.exports = function (id){
    return jwt.sign({id},jwtsecret,{
        expiresIn:"30d"
    })
}