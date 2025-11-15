const express = require("express");
const jwt = require("jsonwebtoken");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function auth(req, res, next) {
	const authorization = req.headers.authorization;
	const token = authorization?.split(" ")[1];

    if(!token) {
        res.status(401).json({ msg: "access token is required" });
    }

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
        if(user) {
            req.user = user;
            next();
        }
	} catch (e) {
		res.status(401).json({ msg: "Invalid token" });
	}
}

module.exports = auth;
