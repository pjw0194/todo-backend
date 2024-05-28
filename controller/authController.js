const authController = {};
const jwt = require("jsonwebtoken");

require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
	try {
		const tokenString = req.headers.authorization; // Bearer ...
		if (!tokenString) {
			throw new Error("Invalid token");
		}
		const token = tokenString.replace("Bearer ", "");
		jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
			if (error) {
				throw new Error("Token verification failed");
			}
			// res.status(200).json({ status: "ok", userId: payload._id });
			req.userId = payload._id;
		});
		next();
	} catch (err) {
		res.status(400).json({ stats: "fail", message: err.message });
	}
};

module.exports = authController;
