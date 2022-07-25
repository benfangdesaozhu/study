import Vue from 'vue'
import qs from 'qs'
// import md5 from '~/utils/md5'

const showToast = (type, msg = '') => {
  if (process.client) {
    if (type === 'pc') {
      Vue.$message({
        message: msg || '网络异常，请稍后重试',
        type: 'warning',
      })
    } else if (type === 'mobile') {
      Vue.$toast({
        text: '网络异常，请稍后重试',
      })
    }
  }
}

export default function ({ $axios }) {
  /**
   * 普通接口 get
   * @param {String} url 地址
   * @param {Object} data 数据
   * @param {String} type 判断是pc端还是移动端
   */
  $axios.geting = (url, data, type) => {
    return $axios(url, {
      method: 'get',
      params: data,
    })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err, '这是错误信息')
        showToast(type)
      })
  }

  /**
   * 普通接口 post
   * @param {String} url 地址
   * @param {Object} data 数据
   * @param {String} type 判断是pc端还是移动端
   */
  $axios.posting = (url, data, type) => {
    return $axios(url, {
      method: 'post',
      data: qs.stringify({ ...data }),
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log(err, '这是错误信息')
        showToast(type)
      })
  }
}
