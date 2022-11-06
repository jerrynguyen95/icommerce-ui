import {store} from '../index';

export const showToast = (show = false, content = '', type = '') => {
  store.dispatch({
    type: 'showToast',
    toastObject: {
      show, content, type
    }
  });

}