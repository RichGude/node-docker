const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
    const {username, password} = req.body;
    try {
        const hashpassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            password: hashpassword
        });
        // Automatically log in user after account generation
        req.session.user = newUser;
        res.status(201).json({
            status: "success",
            data: {
                user: newUser
            }
        });
    } catch (e) {
        res.status(400).json({
            status: e,
        });
    };
};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username})

        // Confirm user in database
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "user not found"
            });
        };

        // Hash password and compare to user password
        const isCorrect = await bcrypt.compare(password, user.password);

        if (isCorrect) {
            // Save the user values to the session (stored in a cookie)
            req.session.user = user;
            res.status(200).json({
                status: "success",
            });
        } else {
            res.status(400).json({
                status: "fail",
                message: "incorrect username or password"
            });
        };
    } catch (e) {
        res.staus(400).json({
            status: "fail",
        });
    };
};