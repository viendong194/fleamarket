import {
  getAll,
  getProduct,
  addProduct,
  likeProduct,
  commentProduct
} from '../controllers/product';
import multipart from 'connect-multiparty';
const multipartWare = multipart();

export default (router) => {
  /**
   * get all products
   */
  router.route('/products').get(getAll);

  /**
   * add an product
   */
  router.route('/product').post(multipartWare, addProduct);

  /**
   * clap on an product
   */
  router.route('/product/clap').post(likeProduct);

  /**
   * comment on an product
   */
  router.route('/product/comment').post(commentProduct);

  /**
   * get a particlular product to view
   */
  router.route('/product/:id').get(getProduct);
};
