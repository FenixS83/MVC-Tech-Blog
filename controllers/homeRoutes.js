const router = require("express").Router();
const { Post, User } = require("../models");
// get route for rendering homepage
router.get("/", async (req, res) => {
    try {
        const blogData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["userName"]
                }
            ]
        });

        const posts = blogData.map((post) => post.get({ plain: true }));

        res.render("homepage", {
            posts,
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        res.status(500).json(err);
    }
});
// get route for rendering post page for commenting
router.get("/comment/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, 
            {
                include: [
                    {
                        model: User,
                        attributes: ["userName"]
                    }
                ]
            });

        const post = postData.get({ plain: true });

        res.render("comment", {
            post,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);

    }
});


router.get("/login", async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect("/");
        } else {
            res.render("login");
        }
    } catch (err) {
        res.status(500).json(err);

    }
});
// get route for rendering dashboard page
router.get("/dashboard", async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: {
                userId: req.session.userId
            }
        });

        const posts = userPosts.map((post) => post.get({ plain: true }));

        res.render("dashboard", {
            posts,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// get route for viewing post
router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        const post = postData.get({ plain: true });

        res.render("editPost", {
            post,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);

    }
});

module.exports = router;