
import jwt from "jsonwebtoken";

const auth  = async (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.send({"message": "You are not autherized", "status": 401});

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
    if (err) return res.send({"message": "Access Token Expired", "status": 403})
    req.user = user;
    next();
  }) 

}

export default auth;