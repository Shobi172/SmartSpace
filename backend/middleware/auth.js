const jwt = require("jsonwebtoken");
const secret = "test";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodeData;
        if (token && isCustomAuth) {
            decodeData = jwt.verify(token, secret);
            req.userId = decodeData?.id
            
        }
        next();


    } catch (err) {
        console.log(err.message);
    }
};

module.exports = {
    auth
}
