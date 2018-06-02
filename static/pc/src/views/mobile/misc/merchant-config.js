
const config = [
  {
    id:1,
    name:'千赢国际',
    logo: require('./qianying-logo.png')
  }
]

/**
 * 获取商户基本信息
 * @param id
 * @returns {*}
 */
const getDeail = (id) => {
  return config.find((item) => {
    return item.id === Number(id)
  })
}

export default {
  config,
  getDeail
}