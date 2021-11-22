const jwt = require("jsonwebtoken");

require('dotenv').config()

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.DB_TOKEN); 
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID";
        }
        next();
    } catch (error) {
        res.status(401).json({
            error: error | "Requête non authentifiée !",
        });
    }
};
