/* 工具库 by JXL */

const tools =  {
	/* 替代eval */
	evil(fn) {
		const Fn = Function;
		return new Fn(`return ${fn}`)();
	},

	/* 添加Cookie $.addCookie("xxx","123",{expires:5});保存5秒 */
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
		const input = document.createElement('INPUT');
		input.type = 'file';
		input.accept = option.accept;
		if (option.multiple !== false) input.multiple = 'true';
		const log = option.log ? function (o) { console.log(o); } : function () { };
		input.onchange = function (e) {
			function saveImg(data) {
				option.load(data);
				if (option.url) {
					$.ajax({
						url: option.url,
						data: Object.assign(option.data, this.evil(`({${option.fileUrl}:data})`)()),
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
				if (option.size == null || files[i].size <= this.sizeToBytes(option.size)) {
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
				const res = JSON.parse(this.responseText);
				log('SimpleUpload load:');
				log(res);
				saveImg(res);
			}, false);
			xhr.addEventListener('error', function () {
				log('SimpleUpload error:');
				log(this.responseText);
			}, false);
			xhr.open('POST', 'file/upload.shtml', true);
			xhr.setRequestHeader('token', this.getCookie('token'));
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
}
