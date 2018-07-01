import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProducts } from '../redux/actions/actions';
import AsideFeed from './AsideFeed';

const mapStateToProps = (state) => {
  return {
    products: state.products.products
  };
};

class Feed extends Component {

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const products = this.props.products.reverse().map((product) => (
      <div className="post-panel">
        <div className="post-metadata">
          <img
            alt=""
            className="avatar-image"
            src={product.seller.provider_pic}
            height="40"
            width="40"
          />
          <div className="post-info">
            <div data-react-className="PopoverLink">
              <span className="popover-link" data-reactroot="">
                <a href={`/profile/${product.seller._id}`}>
                  {product.seller.name}
                </a>
              </span>
            </div>
            <small>Posted • A must read</small>
          </div>
        </div>

        {product.feature_img.length > 0 ? (
          <div class="post-picture-wrapper">
            <img src={product.feature_img} alt="Thumb" />
          </div>
        ) : (
          ''
        )}

        <div className="main-body">
          <h3 className="post-title">
            <a href={`/productview/${product._id}`}>{product.title}</a>
          </h3>
          <div className="post-body">
            <p
              className=""
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
          <a className="read-more" href={`/productview/${product._id}`}>
            Read more
          </a>
        </div>

        <div className="post-stats clearfix">
          <div className="pull-left">
            <div className="like-button-wrapper">
              <form className="button_to" method="get" action="">
                <button
                  className="like-button"
                  data-behavior="trigger-overlay"
                  type="submit">
                  <i className="fa fa-heart-o" />
                  <span className="hide-text">Like</span>
                </button>
              </form>
              <span className="like-count">{product.like}</span>
            </div>
          </div>

          <div className="pull-right">
            <div className="bookmark-button-wrapper">
              <form className="button_to" method="get" action="">
                <button
                  className="bookmark-button"
                  data-behavior="trigger-overlay"
                  type="submit">
                  {' '}
                  <span className="icon-bookmark-o" />
                  <span className="hide-text">Wishlist</span>
                </button>
              </form>
            </div>
          </div>

          <div className="response-count pull-right" />
        </div>
      </div>
    ));

    return (
      <div>
        <div className="container-fluid main-container">
          <div className="col-md-6 col-md-offset-1 dashboard-main-content">
            <div
              className="posts-wrapper animated fadeInUp"
              data-behavior="endless-scroll"
              data-animation="fadeInUp-fadeOutDown">
              {products}
            </div>
          </div>
          {this.props.products ? (
            <AsideFeed _products={this.props.products} />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { loadProducts }
)(Feed);
