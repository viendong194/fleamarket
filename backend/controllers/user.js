import User from '../models/User';
import Product from '../models/Product';

export function addUser(req, res, next) {
  console.log(req.body)
  new User(req.body).save((err, newUser) => {
    if (err) res.send(err);
    else if (!newUser) res.status(400);
    else res.json({newUser});
    next();
  });
}

export function getUser(req, res, next) {
  User.findById(req.params.id).then((err, user) => {
    if (err) res.send(err);
    else if (!user) res.status(404);
    else res.json({user});
    next();
  });
}

export function followUser(req, res, next) {
  User.findById(req.body.id)
    .then((user) => {
      return user.follow(req.body.user_id).then(() => {
        return res.json({ msg: 'followed' });
      });
    })
    .catch(next);
}
export function getUserProfile(req, res, next) {
  User.findById(req.params.id)
    .then((_user) => {
      return User.find({ following: req.params.id }).then((_users) => {
        _users.forEach((user_) => {
          _user.addFollower(user_);
        });
        return Product.find({ seller: req.params.id }).then((_product) => {
          return res.json({ seller: _user, products: _product });
        });
      });
    })
    .catch((err) => console.log(err));
}
