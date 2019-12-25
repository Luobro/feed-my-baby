import * as api from '@/common/api'

export default {
  state: {
    list: [],
  },
  getters: {
    // dayList: state => state.list,
    // 当前 wepy 的版本，getters 有问题。
  },
  mutations: {
    init(state, list) {
      state.list = list;
    },
    addRecord(state, { index, record }) {
      state.list.splice(index, 0, record);
    },
    editRecord(state, { index, record }) {
      state.list.splice(index, 1, record);
    },
    removeRecord(state, index) {
      state.list.splice(index, 1);
    }
  },
  actions: {
    init({ commit }) {
      const list = wx.getStorageSync('list');
      if (list) {
        commit('init', list);
      }
    },
    async addRecord({ commit, state }, { index, record }) {
      commit('addRecord', { index, record });
      wx.setStorageSync('list', state.list);
      
      const result = await api.addRecord(record);
      
      record._id = result._id;
      commit('editRecord', { index, record });

      wx.showToast({
        title: '添加成功', //提示的内容,
        duration: 2000, //延迟时间,
        mask: false, //显示透明蒙层，防止触摸穿透,
      });
    },
    async editRecord({ commit, state }, { index, record }) {
      commit('editRecord', { index, record });
      wx.setStorageSync('list', state.list);

      const result = await api.updateRecord(record);
      wx.showToast({
        title: '编辑成功', //提示的内容,
        duration: 2000, //延迟时间,
        mask: false, //显示透明蒙层，防止触摸穿透,
      });
    },
    async removeRecord({ commit, state }, { index, id }) {
      commit('removeRecord', index);
      wx.setStorageSync('list', state.list);

      const result = await api.deleteRecord(id);

      wx.showToast({
        title: '删除成功', //提示的内容,
        duration: 2000, //延迟时间,
        mask: false, //显示透明蒙层，防止触摸穿透,
      });
    }
  }
};