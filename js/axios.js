class axios {
  static get (url, data) {
    return axios.http('get', url, data)
  }

  static post (url, data) {
    return axios.http('post', url, data)
  }

  static http (type, url, data) {
    let params = null
    if (data) {
      // 临时在 params 中保存数组数据
      params = []
      // 迭代 data 对象中各属性 例：{username: 'admin', password: 'admin'}
      for (const key in data) {
        params.push(`${key}=${data[key]}`) // ['username=admin', 'password=admin']
      }
      // 将数组中每个元素以 `&` 符号拼接，生成查询字符串结构
      params = params.join('&'); // username=admin&password=admin
    }
    // 如果是 GET 数据，并存在向后端发送的数据，则将查询字符串以 ? 号拼接在 URL 后
    if (type === 'GET' && params) {
      url += `?${params}`
      params = null
    }

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(type, url);
      // post 需要设置头部
      type == 'post' && xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.send(params);
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            // 成功
            resolve(xhr.response)
          } else {
            // 失败
            reject('服务器错误');
          }

          // console.log(xhr.response);

        }
      }

    })
  }
}

function $ (tag) {
  return document.querySelector(tag)
}