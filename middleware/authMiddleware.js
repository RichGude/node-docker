const protect = (req, res, next) => {
    const {user} = req.session;

    // Confirm user is logged in
    if (!user) {
        return res.status(401).json({ status: "fail", message: "unauthorized"});
    };
    // Save user variable to easier-to-obtain variable
    req.user = user;

    // Send the session to the controller or the next middleware in the stack
    next();
}

module.exports = protect;