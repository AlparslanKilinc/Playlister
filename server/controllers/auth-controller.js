const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    try {
        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }

        const loggedInUser = await User.findOne({ _id: userId });
        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email,
                userName: loggedInUser.userName,
                interactions:loggedInUser.interactions,
            }
        })
    } catch (err) {
        res.status(401)
            json(false);
    }
}

loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        console.log(userName);
        if (!userName || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields" });
        }

        const existingUser = await User.findOne({ userName: userName });
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong User Name or password provided"
                })
        }

        console.log("provided password: " + password);
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided"
                })
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser._id);
        console.log(token);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,  
                email: existingUser.email,
                userName: existingUser.userName,
                interactions:existingUser.interactions,           
            }
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

logoutUser = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
}

registerUser = async (req, res) => {
    try {
        const { userName, firstName, lastName, email, password, passwordVerify,interactions } = req.body;
        console.log("create user: " + userName+" "+ firstName + " " + lastName + " " + email + " " + password + " " + passwordVerify);
        if (!userName || !firstName || !lastName || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields" });
        }
        console.log("all fields provided");
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters"
                });
        }
        console.log("password long enough");
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice"
                })
        }
        console.log("password and password verify match");
        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists"
                })
        }
        const existingUserName = await User.findOne({ userName: userName });
        console.log("existingUser: " + existingUserName);
        if (existingUserName) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this User Name  already exists"
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash: " + passwordHash);

        const newUser = new User({
            userName,firstName, lastName, email, passwordHash,interactions
        });
        const savedUser = await newUser.save();
        console.log("new user saved: " + savedUser._id);
        // LOGIN THE USER
        const token = auth.signToken(savedUser._id);
        console.log(token);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,  
                email: savedUser.email,
                userName: savedUser.userName,
                interactions:savedUser.interactions,           
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}