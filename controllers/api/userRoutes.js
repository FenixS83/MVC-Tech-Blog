const router = require("express").Router();
const { User } = require("../../models");
// route for creatign a session with a user
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res.status(400).json({ message: "Need username and password" });
            return;
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
//route for creating a user
router.post("/", async (req, res) => {
    try {
        const { email, userName, password } = req.body;

        if ( !email || !userName || !password ) res.status(400).send("Need username, email and password");

        const userData = await User.create({ email, userName, password });

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
//route for logging out
router.post("/logout", async (req, res) => {
    console.log(res.session)
    try {
        if(req.session.logged_in = true) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;