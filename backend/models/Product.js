import mongoose from 'mongoose';

let ProductSchema = new mongoose.Schema({
  text: String,
  title: String,
  description: String,
  feature_img: String,
  like: Number,
  price: Number,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: String
    }
  ]
});
ProductSchema.methods.like_it = function() {
  this.like++;
  return this.save();
};
ProductSchema.methods.comment = function(c) {
  this.comments.push(c);
  return this.save();
};
ProductSchema.methods.addSeller = function(seller_id) {
  this.seller = seller_id;
  return this.save();
};
ProductSchema.methods.getSeller = function(_id) {
  Product.find({ seller: _id }).then((product) => {
    return product;
  });
};
export default mongoose.model('Product', ProductSchema);
