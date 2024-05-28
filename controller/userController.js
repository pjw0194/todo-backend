const User = require("../model/User");
const userController = {};
const bcrypt = require("bcryptjs");
const saltRounds = 10;

userController.createUser = async (req, res) => {
	try {
		const { email, name, password } = req.body;

		// Check if the user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(409)
				.json({ status: "fail", message: "User already exists" });
		}

		// Generate salt and hash the password asynchronously
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);

		// Create and save the new user
		const newUser = new User({ email, name, password: hash });
		await newUser.save();

		res
			.status(200)
			.json({ status: "ok", message: "User created successfully" });
	} catch (err) {
		console.error(err); // Log the error for debugging purposes
		res.status(500).json({
			status: "fail",
			message: "Error creating user",
			error: err.message,
		});
	}
};

userController.loginWithEmail = async (req, res) => {
	try {
		const { email, password } = req.body;
		const existingUser = await User.findOne(
			{ email },
			"-createdAt -updatedAt -__v"
		);
		if (existingUser) {
			const isMatched = bcrypt.compareSync(password, existingUser.password);
			if (isMatched) {
				const token = existingUser.generateToken();
				return res.status(200).json({
					status: "ok",
					message: "User login successful",
					existingUser,
					token,
				});
			}
		}
		res
			.status(400)
			.json({ status: "fail", message: "Id or password doesn't match" });
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: "Error logging in",
			error: err.message,
		});
	}
};

userController.getUser = async (req, res) => {
	try {
		const { userId } = req; // req.userId
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("Cannot find user");
		}
		res.status(200).json({ status: "ok", user });
	} catch (err) {
		res.status(400).json({ status: "fail", message: err.message });
	}
};

module.exports = userController;
