import {
  getUser,
  getUserProfile,
  addUser,
  followUser
} from '../controllers/user';

export default (router) => {
  /**
   * get a user
   */
  router.route('/user/:id').get(getUser);

  /**
   * get a user profile
   */
  router.route('/user/profile/:id').get(getUserProfile);

  /**
   * adds a user
   */
  router.route('/user').post(addUser);

  /**
   * follow a user
   */
  router.route('/user/follow').post(followUser);
};
