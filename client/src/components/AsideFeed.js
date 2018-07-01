import React, { Component } from 'react'

class AsideFeed extends Component {
    render () {
        const sellers = this.props._products
            .map((_product)=> {
                    return _product.seller.name
                }
            )
            .sort()
            .filter((a, b, self)=>{
                return self.indexOf(a) === b
            })
            .map((__product)=>
                <a href='javascript:void(0);' className="tag">{__product}</a>
            )
        const top_products = this.props._products.map((_product, i)=>

                    <li className="top-stories-list-item">
                        <div className="count-button-wrapper">
                            <span className="count-button">{i}</span>
                        </div>
                        <div className="top-stories-links">
                            <a className="post-title" href={`/productview/${_product._id}`}>{_product.title}</a><br/>
                            <small>
                              <div data-react-className="PopoverLink" data-react-props="">
                                <span className="popover-link" data-reactroot="">
                                    <a href={`/profile/${_product.seller._id}`}>{_product.seller.name}</a>
                                </span>
                              </div>
                            </small>
                        </div>
                    </li>

        )
        return (
    <div>
        <aside className="col-md-4 main-sidebar">
            <h4 className="small-heading border-top">Featured Authors</h4>
            <div data-react-className="TagList" data-react-props="">
                <div className="tags-wrapper undefined" data-reactroot="">
                    {sellers}
                </div>
            </div>


            <h4 className="small-heading border-top">Top stories</h4>
            <div className="sidebar-top-stories">
                <ul>
                    {top_products}
                </ul>
            </div>
        </aside>
</div>
        )
    }
}
export default AsideFeed