import jwt from 'jsonwebtoken'
exports.login = (req,res) => {
    const {username,password} = req.body
    if(username == 'kmk' && password == "1234"){
        const token = jwt.sign({
            username
        },'secret-code')
        return res.json(token)
    }
}

exports.feed = (req,res) => {
    console.log("feed Page")
}