import axios from "axios";

const API = {

  async getList(){
    return axios({
      method: 'get',
      url: '/api/getHomeInfo',
      // url: 'https://tiktok-2gdyda5xaa901b00-1259343309.ap-shanghai.app.tcloudbase.com/getHomeInfo',
    })
  },

  async getAttention(_id, user_id) {
    return axios({
      method: 'get',
      url: '/api/getAttention' + '?' + '_id=' + _id + '&user_id=' + user_id,
      // url: '
      // https://tiktok-2gdyda5xaa901b00-1259343309.ap-shanghai.app.tcloudbase.com/getAttention?' + '_id=' + _id + '&user_id=' + user_id,
    });
  },

  async cancelAttentions(_id, user_id) {
    return axios({
      method: 'get',
      url: '/api/cancelAttentions' + '?' + '_id=' + _id + '&user_id=' + user_id,
    });
  },

  async getFans(_id, user_id) {
    return axios({
      method: 'get',
      url: '/api/getFans' + '?' + '_id=' + _id + '&user_id=' + user_id,
    });
  },

  async getComment() {
    return axios({
      method: 'get',
      url: '/api/getComment',
    });
  },

  async wirteVideoCom(_id, user_id, v_com) {
    return axios({
      method: 'get',
      url: '/api/wirteVideoCom' + '?' + '_id=' + _id + '&user_id=' + user_id + '&v_com=' + v_com,
    });
  },

  async getComTotal(v_id) {
    return axios({
      method: 'get',
      url: '/api/getComTotal' + '?' + 'v_id=' + v_id,
    });
  }
}

export default API;
