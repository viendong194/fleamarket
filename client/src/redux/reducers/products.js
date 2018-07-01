const initialState = {
  products: [],
  product: {}
}
export default (state=initialState, action) => {
  switch (action.type) {
      case 'LOAD_PRODUCTS' :
      return {
          ...state,
          products: action.products
      }
      case 'VIEW_PRODUCT':
      return {
          ...state,
          product: action.product
      }
      case 'LIKE_PRODUCT':
      let product = Object.assign({}, state.product)
      product.like++
      console.log(product)
      return {
          ...state,
          product: product
      }
      default:
          return state
  }
}