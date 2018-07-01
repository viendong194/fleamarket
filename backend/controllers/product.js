import Product from '../models/Product';
import cloudinary from 'cloudinary';

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function addProduct(req, res, next) {
  let { text, title, like, description, price } = req.body;
  if (req.files.image) {
    cloudinary.uploader.upload(
      req.files.image.path,
      (result) => {
        let obj = {
          text,
          title,
          like,
          description,
          price,
          feature_img: result.url != null ? result.url : ''
        };
        saveProduct(obj);
      },
      {
        resource_type: 'image',
        eager: [{ effect: 'sepia' }]
      }
    );
  } else {
    saveProduct({ text, title, like, description, price, feature_img: '' });
  }
  function saveProduct(obj) {
    new Product(obj).save((err, product) => {
      if (err) res.send(err);
      else if (!product) res.status(400);
      else {
        return product.addSeller(req.body.author_id).then((_product) => {
          return res.send(_product);
        });
      }
      next();
    });
  }
}
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function getAll(req, res, next) {
  Product.find(req.params.id)
    .populate('seller')
    .populate('comments.author')
    .exec((err, product) => {
      if (err) res.send(err);
      else if (!product) res.status(404);
      else res.send(product);
      next();
    });
}
/**
 *
 * @param {product id} req
 * @param {*} res
 * @param {*} next
 */
export function likeProduct(req, res, next) {
  Product.findById(req.body.product_id)
    .then((product) => {
      return product.like_it().then(() => {
        return res.json({ msg: 'Like!!' });
      });
    })
    .catch(next);
}

export function commentProduct(req, res, next) {
  Product.findById(req.body.product_id)
    .then((product) => {
      return product
        .comment({
          author: req.body.author_id,
          text: req.body.comment
        })
        .then(() => {
          return res.json({ msg: 'Done' });
        });
    })
    .catch(next);
}

/**
 * get Product
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function getProduct(req, res, next) {
  Product.findById(req.params.id)
    .populate('seller')
    .populate('comments.author')
    .exec((err, product) => {
      if (err) res.send(err);
      else if (!product) res.status(404);
      else res.send(product);
      next();
    });
}
