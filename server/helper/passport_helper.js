const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		async function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
			try {
				let email=profile.emails[0].value
				let name=profile.displayName
				let photo=profile.photos[0].value
				let id=profile.id
				console.log(typeof(photo))
				let existsuser= User.findOne({Googleid:id})
				if(!existsuser){
					const user =new User({
						Username:name,
						Googleid:id,
						Googlephoto:photo,
						Email:email,
						isGoogleuser:true,
						Loginmethod:"google"
					  })
					  user.save()
				}else{
					callback(null,profile)
				}
				
			} catch (error) {
				console.log(error)
			}
		
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});