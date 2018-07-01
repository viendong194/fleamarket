//const url = "http://localhost:5000/api/"
const url =
  process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:5000/api/';

export function loadProducts() {
  return (dispatch) => {
    fetch(`${url}products`)
      .then(res=>res.json())
      .then((res) => {
        let products = res;
        console.log(products)
        dispatch({ type: 'LOAD_PRODUCTS', products });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function getUser(_id) {
  return fetch(`${url}user/${_id}`)
    .then(res=>res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export function getUserProfile(_id) {
  return (dispatch) => {
    fetch(`${url}user/profile/${_id}`)
      .then(res=>res.json())
      .then((res) => {
        let profile = res;
        dispatch({ type: 'SET_PROFILE', profile });
      })
      .catch((err) => console.log(err));
  };
}

export function getProduct(product_id) {
  return (dispatch) => {
    fetch(`${url}product/${product_id}`)
      .then(res=>res.json())
      .then((res) => {
        let product = res;
        dispatch({ type: 'VIEW_PRODUCT', product });
      })
      .catch((err) => console.log(err));
  };
}
// article_id, author_id, comment
export function comment() {
  return (dispatch) => {};
}
//req.body.article_id
export function like(product_id) {
  return (dispatch) => {
    console.log('like...');
    fetch(`${url}product/like`, {
      method: 'post',
      body: JSON.stringify(product_id),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        dispatch({ type: 'LIKE_PRODUCT' });
      })
      .catch((err) => console.log(err));
  };
}
//id, user_id
export function follow(id, user_id) {
  console.log(`${id} following ${user_id}`);
  return (dispatch) => {
    fetch(`${url}user/follow`, {
      method: 'post',
      body: JSON.stringify({ id, user_id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        dispatch({ type: 'FOLLOW_USER', user_id });
      })
      .catch((err) => console.log(err));
  };
}

export function SignInUser(user_data) {
  return (dispatch) => {
    console.log('adding us..');
    console.log(user_data)
    fetch(`${url}user`, {
      method: 'post',
      body: JSON.stringify(user_data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res=>res.json())
      .then((res) => {
        let user = res;
        console.log('==================signin=======');
        console.log(user);
        console.log('==================signin=======');
        localStorage.setItem('Auth', JSON.stringify(user));
        dispatch({ type: 'SET_USER', user });
      })
      .catch((err) => console.log(err));
  };
}

export function toggleClose() {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_MODAL', modalMode: false });
  };
}
export function toggleOpen() {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_MODAL', modalMode: true });
  };
}
