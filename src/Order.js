'use strict'
import Vue from 'vue'
const Order = new Vue()

const Fun = {
  get (url) {
    return new Promise((resolve, reject) => {
      const obj = new XMLHttpRequest()
      obj.open('GET', url, true)
      obj.onreadystatechange = () => {
        if (obj.readyState !== 4) return
        if (obj.status === 304 || obj.status === 200) {
          const responseText = obj.responseText
          resolve(JSON.parse(responseText))
        } else {
          reject(obj)
        }
      }
      obj.send(null)
    })
  },
  post (url, data, fn) {
    // 发起post请求
    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: JSON.stringify(data)
    }
    fetch(url, fetchConfig).then((res) => {
      if (res.ok) { // 请求成功执行回掉
        res.json().then((data) => {
          fn && fn(data)
        })
      } else if (res.status === 401) {
        alert('Oops! You are not authorized.')
      }
    }, (e) => {
      console.error('[POST]请求失败！')
      fn && fn({err: 400, type: e})
    })
  },
  // 深拷贝
  deepClone (obj) {
    if (obj == null || typeof obj !== 'object') {
      return obj
    }
    switch (Object.prototype.toString.call(obj)) {
      case '[object Array]': {
        const result = new Array(obj.length)
        for (let i = 0; i < result.length; ++i) {
          result[i] = this.deepClone(obj[i])
        }
        return result
      }
      // Object.prototype.toString.call(new XxxError) returns '[object Error]'
      case '[object Error]': {
        const result = new obj.constructor(obj.message)
        result.stack = obj.stack // hack...
        return result
      }
      case '[object Date]':
      case '[object RegExp]':
      case '[object Int8Array]':
      case '[object Uint8Array]':
      case '[object Uint8ClampedArray]':
      case '[object Int16Array]':
      case '[object Uint16Array]':
      case '[object Int32Array]':
      case '[object Uint32Array]':
      case '[object Float32Array]':
      case '[object Float64Array]':
      case '[object Map]':
      case '[object Set]':
        return new obj.constructor(obj)
      case '[object Object]': {
        const keys = Object.keys(obj)
        const result = {}
        for (let i = 0; i < keys.length; ++i) {
          const key = keys[i]
          result[key] = this.deepClone(obj[key])
        }
        return result
      }
      default: {
        throw new Error("Unable to copy obj! Its type isn't supported.")
      }
    }
  },
  // 数据重置为默认值 
  resetData ($data, fieldList) {
    if (!fieldList) return
    let isObject = Object.prototype.toString.call(fieldList)
    if (!(isObject === '[object Object]')) return
    for (let key in fieldList) {
      let item = fieldList[key]
      $data[key] = item
    }
  }
}

const Config = {
  serve: 'http://192.168.1.120/kan/public/index.php?s=index/group'
}

export { Order, Fun, Config }
