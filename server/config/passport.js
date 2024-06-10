const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Customer = require('../models/customer'); // Adjust the path as necessary

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (token, tokenSecret, profile, done) => {
    try {
      // Find or create a customer based on Google profile information
      let customer = await Customer.findOne({ googleId: profile.id });
      if (!customer) {
        customer = new Customer({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        });
        await customer.save();
      }
      return done(null, customer);
    } catch (err) {
      return done(err, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Customer.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
