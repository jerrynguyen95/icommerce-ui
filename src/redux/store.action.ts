const GET_PRODUCT = 'getProducts';
const UPDATE_CART = 'updateCart';
const UDPATE_TOTAL_CART = 'updateTotalCart';
const SET_SEARCH_VALUE = 'setSearchValue';

export const getProducts = (productObject: any) => ({
  type: GET_PRODUCT,
  productObject
});

export const updateCart = (index: number, quantity: number) => ({
  type: UPDATE_CART,
  index,
  quantity
});

export const updateTotalCart = (totalCart: number) => ({
  type: UDPATE_TOTAL_CART,
  totalCart
})

export const updateSearchValue = (searchValue: string) => ({
  type: SET_SEARCH_VALUE,
  searchValue: searchValue
});

export const addCart = (res: any) => ({
  type: 'addCart',
  newCart: res
});

export const deleteCart = (currentIndex: number) => ({
  type: 'deleteCart',
  currentIndex
});

export const showToast = (show: boolean, content: string, type: string) => ({
  type: 'showToast',
  toastObject: {
    show, content, type
  }
});

export const getCart = (res: any) => ({
  type: 'getCart',
  carts: res
});

export const setUserInfo = (res: any) => ({
  type: 'setUserInfo',
  userInfo: res
});

export const changePageProduct = (pageNumber: number) => ({
  type: 'changePageProduct',
  pageNumber
});