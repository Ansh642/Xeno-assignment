const express = require('express');
const { insertOrder, addCustomer, checkAudienceSize, saveAudienceCriteria } = require('../controllers/auth');
const router = express.Router();
const passport = require('passport');


router.post("/create-order",insertOrder);
router.post("/add-customer",addCustomer);

// Google OAuth login route
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
  
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/dashboard'); // Redirect to the frontend dashboard or desired route
    }
  );
  
  // Logout route
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });


router.post('/check',checkAudienceSize);
router.post('/save', saveAudienceCriteria);

module.exports = router;