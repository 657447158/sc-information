const tools = {
  /**
   * 获取URL参数
   */
  getUrlParams (param) {
    let searchParams = window.location.search.slice(1)
    let array = []
    let v = ''
    if (searchParams) {
      array = searchParams.split('&')
    }
    array.map(item => {
      if (item.split('=')[0] === param) {
        v = item.split('=')[1]
      }
    })
    return v
  }
}

export default tools