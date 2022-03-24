const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/campgrounds');
  }
  res.render('users/register');
}

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) return next();
      req.flash('success', 'Welcome to Yelp Camp!');
      res.redirect('/campgrounds');
    })
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/register');
  }
}

module.exports.renderLogin = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/campgrounds');
  }
  res.render('users/login');
}

module.exports.login = (req, res) => {
  req.flash('success', 'welcome back!');
  // console.log(req.session.returnTo);
  const redirectTo = req.session.returnTo || '/campgrounds';
  res.redirect(redirectTo);
}

module.exports.logout = (req, res) => {
  req.logOut();
  req.flash('success', 'Goodbye!');
  res.redirect('/campgrounds');
}