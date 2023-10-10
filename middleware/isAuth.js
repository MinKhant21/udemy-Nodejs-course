import jwt from 'jsonwebtoken'
module.exports = (req,res,next) =>{
    let decodedToken;
    if(!req.get('Authorization')){
        return res.json({status:'401',message:'no authirozation'})
    }
    let authHeader = req.get('Authorization').split(' ')[1];
    try {
        decodedToken = jwt.verify(authHeader,'secret-code')
    } catch (error) {
         error.statusCode = 500
         throw error
    }
}