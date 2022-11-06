
const initalState = {
  userInfo: {},
  carts: [],
  productObject: {
    rows: [],
    pageNumber: 0,
    pageSize: 20,
    totalElements: 100,
    s: ''
  },
  toastObject: {
    show: false,
    content: '',
    type: ''
  },
  totalCart: 0,
  pageNumber: 0,
  searchValue: ''
};

export const storeReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'addCart':
      return {
        ...state,
        carts: [...state.carts, action.newCart]
      }

    case 'getCart':
      return {
        ...state,
        carts: action.carts
      }

    case 'deleteCart':
      let result = [...state.carts];
      result.splice(action.currentIndex, 1);

      return {
        ...state,
        carts: result
      }

    case 'updateCart':
      let carts = [...state.carts];
      carts[action.index] = {
        ...carts[action.index],
        quantity: action.quantity
      }

      return {
        ...state,
        carts: carts
      }

    case 'showToast':
      return {
        ...state,
        toastObject: action.toastObject
      }

    case 'setUserInfo':
      return {
        ...state,
        userInfo: action.userInfo
      }

    case 'getProducts':
      return {
        ...state,
        productObject: action.productObject
      }

    case 'updateTotalCart':
      return {
        ...state,
        totalCart: action.totalCart
      }

    case 'setSearchValue':
      return {
        ...state,
        searchValue: action.searchValue
      }

    case 'changePageProduct':
      return {
        ...state,
        pageNumber: action.pageNumber
      }

    default:
      return {...state}

  }
}