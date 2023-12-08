export const validateLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};
export const loginRoute = (req, res, next) => {
  if (req.session && req.session.user) {
    res.redirect('/profile');
  } else {
    next();
  }
};


