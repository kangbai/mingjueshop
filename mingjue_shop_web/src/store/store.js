import * as Types from './types';
import { getDeviceInfo } from '@/util/storage';
export const initialState = {
  isLoadding: false,
  toastTitle: ''
  // deviceInfo: getDeviceInfo()
}

export const actions = {
  changeToast ({ commit }, title) {
    console.log(title);
    commit(Types.TOAST, title)
  }
}

export const mutations = {
  [Types.TOAST] (state, title) {
    state.toastTitle = title;
  }
}

