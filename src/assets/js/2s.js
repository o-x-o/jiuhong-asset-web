/*
	工具库 for jiuhongjinfu
	@author JXL 469810199@qq.com 2017/11/16
*/

/* global ActiveXObject */

const tools = {
	/* 替代eval */
	evil(fn) {
		const Fn = Function;
		return new Fn(`return ${fn}`)();
	},

	doms(txt) {
		if (txt instanceof HTMLElement) {
			return [txt];
		} else if ((typeof txt != 'string') && txt.length > 0) {
			return txt;
		}
		let dom;
		try {
			dom = new ActiveXObject('Microsoft.XMLDOM');
			dom.async = 'false';
			dom.loadXML(txt);
		} catch (e) {
			try {
				dom = new DOMParser().parseFromString(txt, 'text/html');
			} catch (error) {
				console.error(error);
			}
		}
		const x = [];
		const y = [];
		let a = dom.head.childNodes;
		let b = dom.body.childNodes;
		for (let i = 0; i < a.length; i++) {
			x.push(a[i]);
		}
		for (let j = 0; j < b.length; j++) {
			y.push(b[j]);
		}
		dom = null; a = null; b = null;
		return x.concat(y);
	},

	ajax(opt = {}) {
		opt.method = opt.method ? opt.method.toUpperCase() : 'POST';
		opt.url = opt.url || '';
		opt.async = opt.async || true;
		opt.data = opt.data || null;
		opt.success = opt.success || function () {};
		opt.error = opt.error || function () {};
		const xmlHttp = new XMLHttpRequest();
		const params = [];
		Object.getOwnPropertyNames(opt.data).forEach((key) => {
			params.push(`${key}=${opt.data[key]}`);
		});
		const postData = params.join('&');
		if (opt.method.toUpperCase() === 'POST') {
			xmlHttp.open(opt.method, opt.url, opt.async);
			xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
			xmlHttp.send(postData);
		} else if (opt.method.toUpperCase() === 'GET') {
			xmlHttp.open(opt.method, `${opt.url}?${postData}`, opt.async);
			xmlHttp.send(null);
		}
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
				opt.success(xmlHttp.responseText);
			} else {
				opt.error(xmlHttp.responseText);
			}
		};
	},

	/* 添加Cookie addCookie("xxx","123",{expires:5});保存5秒 */
	addCookie(name, value, options) {
		if (arguments.length > 1 && name != null) {
			if (options == null) {
				options = {};
			}
			if (value == null) {
				options.expires = -1;
			}
			if (typeof options.expires == 'number') {
				const time = options.expires;
				const expires = options.expires = new Date();
				expires.setTime(expires.getTime() + (time * 1000));
			}
			if (options.path == null) {
				options.path = '/';
			}
			if (options.domain == null) {
				options.domain = '';
			}
			document.cookie = `${encodeURIComponent(String(name))}=${encodeURIComponent(String(value)) + (options.expires != null ? `; expires=${options.expires.toUTCString()}` : '') + (options.path !== '' ? `; path=${options.path}` : '') + (options.domain !== '' ? `; domain=${options.domain}` : '') + (options.secure != null ? '; secure' : '')}`;
		}
	},
	/* 获取Cookie */
	getCookie(name) {
		let value;
		if (name != null) {
			value = new RegExp(`(?:^|; )${encodeURIComponent(String(name))}=([^;]*)`).exec(document.cookie);
		}
		return value ? decodeURIComponent(value[1]) : null;
	},
	/* 移除Cookie */
	removeCookie(name, options) {
		this.addCookie(name, null, options);
	},

	compressImg() {
	},

	adjustImg(url, kbs) {
		const quality = ((1 === 0) && kbs != null && kbs > 1024) ? (1024 / kbs) : 1;
		// 图片大于1M，判断是否需要压缩
		let img = document.createElement('IMG');
		img.onload = function () {
			// IOS 设备中，如果的照片是竖屏拍摄的，虽然实际在网页中显示出的方向也是垂直，但图片数据依然是以横屏方向展示
			const naturalWidth = this.naturalWidth; // 在没有加入文档前，可以通过原生属性来读取
			document.body.appendChild(img);
			const realityHeight = this.naturalHeight;
			document.body.removeChild(img);
			img = null;
			let angleOffset = 0;
			if (naturalWidth === realityHeight) {
				angleOffset = 90;
			}
			// 将图片进行调整
			img.src = this.compressImg(this, quality, angleOffset, null);
		};
		img.src = url;
	},

	preUpload({ load = () => { }, multiple = 'true', accept = 'image/jpg,image/jpeg,image/png,image/gif,image/tiff,image/bmp' }) {
		const input = document.createElement('INPUT');
		input.type = 'file';
		input.accept = accept;
		input.multiple = multiple;
		input.onchange = function (event) {
			const files = Array.from(this.files || event.target.files || event.dataTransfer.files);
			files.forEach((file) => {
				const fileReader = new FileReader();
				fileReader.onprogress = () => {
					/* console.log(`${file.name}/${file.type}:${(e.loaded / e.total * 100).toFixed()}%`); */
				};
				fileReader.onload = function () {
					load(this.result, file);
					// this.adjustImg(this.result, e.total / 1024);
				};
				fileReader.onerror = () => {
				};
				fileReader.readAsDataURL(file);
			});
		};
		input.click();
	},

	/* 上传 */
	upload(option = {
		/* 以下为默认值 */
		accept: 'image/jpg,image/jpeg,image/png,image/gif,image/tiff,image/bmp',		/* 上传文件类型 */
		multiple: 'true',		/* 多文件上传 */
		url: null,				/* 保存文件路径的请求地址 若为空则不去后台post */
		fileUrl: 'urls',		/* 保存文件路径的键名 也是load回调里的文件路径键名 */
		data: {},				/* 保存文件路径的附加参数 */
		type: 'post',			/* 保存文件路径的请求方式 */
		size: null,				/* 限制大小 可使用单位 纯数字代表b */
		start(/* files */) {	/* 开始上传执行的方法 */
		},
		process(/* e, files */) {	/* 执行上传过程中执行的方法(会被请求多次) */
		},
		load(/* data */) {		/* 传完图片之后的回调，参数为图片信息 */
		},
		callback(/* res */) {	/* 向后台post图片信息之后的回调 */
		},
		log: false				/* 打印日志 */
	}) {
		const $root = this;
		const input = document.createElement('INPUT');
		input.type = 'file';
		input.accept = option.accept;
		if (option.multiple !== false) input.multiple = 'true';
		const log = option.log ? function (o) { console.log(o); } : function () { };
		input.onchange = function (e) {
			function saveImg(data) {
				option.load(data);
				if (option.url) {
					$root.ajax({
						url: option.url,
						data: Object.assign(option.data, $root.evil(`({${option.fileUrl}:data})`)()),
						async: false,
						type: option.type,
						success(res) {
							log(res);
							log('SimpleUpload over.');
							option.callback(res);
						},
						error(res) {
							alert(res);
							log('SimpleUpload over.');
							option.callback(res);
						}
					});
				}
			}
			const files = e.target.files || e.dataTransfer.files;
			option.start(files);
			const xhr = new XMLHttpRequest();
			const data = new FormData();
			let over = false;
			for (let i = 0; i < files.length; i++) {
				if (option.size == null || files[i].size <= $root.sizeToBytes(option.size)) {
					data.append('files', files[i]);
				} else {
					over = true;
				}
			}
			xhr.upload.addEventListener('progress', (event) => {
				option.process(event, files);
				log(`${(event.loaded / event.total) * 100}%`);
			}, false);
			xhr.addEventListener('load', function () {
				// log(this.file.name);
				if (over) alert(`超过${option.size}的文件未上传`);
				let res = {}
				try {
					res = JSON.parse(this.responseText);
				} catch (error) {
					console.error(error);
				}
				log('SimpleUpload load:');
				log(res);
				saveImg(res);
			}, false);
			xhr.addEventListener('error', function () {
				log('SimpleUpload error:');
				log(this.responseText);
			}, false);
			xhr.open('POST', 'file/upload.shtml', true);
			xhr.setRequestHeader('token', $root.getCookie('token'));
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.send(data);
		};
		input.click();
		return input;
	},

	/* px，rem转换数字 */
	parsePix(x) {
		if (typeof x == 'string' && x.match(/^[.\d]*rem$/)) {
			x = parseFloat(x) * parseFloat(getComputedStyle(document.getElementsByTagName('html')[0]).fontSize);
		} else {
			x = parseFloat(x);
		}
		return x;
	},
	/* 文件大小单位转换 */
	bytesToSize(bytes) {
		if (bytes === 0) return '0 B';
		const k = 1024;
		const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${(bytes / (k ** i)).toPrecision(3)} ${unit[i]}`;
	},
	sizeToBytes(size) {
		const k = 1024;
		const unit = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
		for (let i = 0; i < unit.length; i++) {
			if (size.toUpperCase().indexOf(unit[i]) > 0) {
				return parseFloat(size) * (k ** (i + 1));
			}
		}
		return parseFloat(size);
	}
};

export default tools;
