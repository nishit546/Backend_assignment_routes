function auth(req,res,next){
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({msg : "Access denied. Token is required"});
    }
    if(toke !== "valid_token"){
        return res.status(403).json({msg : "Invalid token"});
    }
    next();
}
modile.exports = auth;