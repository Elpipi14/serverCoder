export const validateLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/login');
    console.log("Inicia session para entrar a profile");
  }
};
export const loginRoute = (req, res, next) => {
  if (req.session && req.session.user) {
    res.redirect('/profile');
    console.log("Session ya iniciada");
  } else {
    next();
  }
};


