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
  }
}

export default API;
