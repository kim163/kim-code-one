
export default {

  getUrlParam(name, href) { //获取get传参参数
    const params = {}
    const match = (href || window.location.href).match(/#?.*\?(.*)/)

    if (!match) {
      return match
    }

    match[1].split('&').forEach((arg) => {
      arg = arg.split('=')
      params[arg[0]] = decodeURI(arg[1])
    })

    if (name) {
      return params[name]
    }
    return params
  },
}