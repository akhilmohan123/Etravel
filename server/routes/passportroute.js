const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");

router.get("/login/success", async(req, res) => {
	if (req.user) {
		let id=req.user.id
		const user=await User.findOne({Googleid:id})
		console.log(user)
		res.status(200).json(user);
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL +"/auth/redirect",
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;