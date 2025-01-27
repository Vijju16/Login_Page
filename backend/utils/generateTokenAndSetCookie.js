const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ id: userId }, 'secretKey', {
        expiresIn: "7d",
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
};

module.exports = generateTokenAndSetCookie;