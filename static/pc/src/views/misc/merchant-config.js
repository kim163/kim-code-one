
const config = [
  {
    merchantId:100108,
    name:'千赢国际',
    logo: require('./images/qianYing-logo.png'),
    short:'千赢',
    prefix:'qy'
  },
  {
    merchantId:100104,
    name:'亚虎国际',
    logo: require('./images/qianYing-logo.png'),
    short:'亚虎',
    prefix:'yh'
  },
  {
    merchantId:100108,
    name:'千赢国际',
    logo: require('./images/qianYing-logo.png'),
    short:'千赢',
    prefix:'qy'
  },
  {
    merchantId:100108,
    name:'千赢国际',
    logo: require('./images/qianYing-logo.png'),
    short:'千赢',
    prefix:'qy'
  },
  {
    merchantId:100108,
    name:'千赢国际',
    logo: require('./images/qianYing-logo.png'),
    short:'千赢',
    prefix:'qy'
  },
  {
    merchantId:100108,
    name:'千赢国际',
    logo: require('./images/qianYing-logo.png'),
    short:'千赢',
    prefix:'qy'
  },
  {
    merchantId:100108,
    name:'千赢国际',
    logo: require('./images/qianYing-logo.png'),
    short:'千赢',
    prefix:'qy'
  },
  {
    merchantId:100108,
    name:'千赢国际',
    logo: require('./images/qianYing-logo.png'),
    short:'千赢',
    prefix:'qy'
  },
  {
    merchantId:100108,
    name:'千赢国际',
    logo: require('./images/qianYing-logo.png'),
    short:'千赢',
    prefix:'qy'
  },
  {
    merchantId:100108,
    name:'千赢国际',
    logo: require('./images/qianYing-logo.png'),
    short:'千赢',
    prefix:'qy'
  },
  {
    merchantId:100108,
    name:'千赢国际',
    logo: require('./images/qianYing-logo.png'),
    short:'千赢',
    prefix:'qy'
  }
]

/**
 * 获取商户基本信息
 * @param id
 * @returns {*}
 */
const getDeail = (id) => {
  return config.find((item) => {
    return item.merchantId === Number(id)
  })
}

export default {
  config,
  getDeail
}