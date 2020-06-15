import axios from 'axios'
// 默认参数
let siteCode = ''
switch (process.env.NODE_ENV) {
	case 'fr':
		siteCode = 'scsfr'
		break
	case 'ko':
		siteCode = 'scsko'
		break
	case 'deyu':
		siteCode = 'scsdy'
		break
	case 'ja':
		siteCode = 'scsja'
		break
	case 'xibanyayu':
		siteCode = 'scsxby'
		break
}
let defaultParams = {
	siteCode,
	lang: process.env.NODE_ENV
}
const baseUrl = 'http://www.tsichuan.com/govapi/api/'

export default function ajax(p) {
	let c = Object.assign({
		baseURL: baseUrl,
		method: 'GET',
		url: '',
		params: {}
	}, p)
	let options = Object.assign(c.params, defaultParams)
	if (c.method === 'get' || c.method === 'GET') {
		return new Promise((resolve, reject) => {
			axios({
				method: 'get',
				baseURL: c.baseURL,
				url: c.url,
				params: options
			}).then(response => {
				resolve(response.data)
			}).catch(error => {
				reject(error)
			})
		})
	} else if (c.method === 'post' || c.method === 'POST') {
		return new Promise((resolve, reject) => {
			axios({
				method: 'post',
				baseURL: c.baseURL,
				url: c.url,
				data: options
			}).then(response => {
				resolve(response.data)
			}).catch(error => {
				reject(error)
			})
		})
	}
}