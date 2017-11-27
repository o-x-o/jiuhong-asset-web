/* global plupload Uploader */

export default function () {
	/*
	 * //获取policy路径
	 * serverUrl
	 *
	 * //选择文件
	 * Uploader.select(function(file, files){})
	 *
	 * //执行上传
	 * Uploader.upload(function(fileName, file, info){})
	 *
	 * */
	const serverUrl = 'http://192.168.1.113:7090/';
	let accessid = '';
	let host = '';
	let policyBase64 = '';
	let signature = '';
	let callbackbody = '';
	let key = '';
	let expire = 0;
	let g_object_name = '';
	let g_object_name_type = '';

	function check_object_radio() {
		g_object_name_type = 'random_name';
	}

	function send_request() {
		let xmlhttp = null;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		}
		if (xmlhttp != null) {
			xmlhttp.open('GET', serverUrl, false);
			xmlhttp.send(null);
			return xmlhttp.responseText;
		}
		return null;
	}

	function get_signature() {
		// 可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下 3s 做为缓冲
		const now = Date.parse(new Date()) / 1000;

		if (expire < (now + 3)) {
			const body = send_request();
			const obj = JSON.parse(body);
			host = obj.host;
			policyBase64 = obj.policy;
			accessid = obj.accessid;
			signature = obj.signature;
			expire = parseInt(obj.expire, 10);
			callbackbody = obj.callback;
			key = obj.dir; // 后端传来的文件路径
			return true;
		}
		return false;
	}

	function random_string(len = 32) {
		len = len || 32;
		const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		let pwd = '';
		for (let i = 0; i < len; i++) {
			pwd += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return pwd;
	}

	function get_suffix(filename) {
		const pos = filename.lastIndexOf('.')
		let suffix = ''
		if (pos !== -1) {
			suffix = filename.substring(pos)
		}
		return suffix;
	}

	function calculate_object_name(filename) {
		if (g_object_name_type === 'local_name') {
			g_object_name += '{{filename}}';
		} else if (g_object_name_type === 'random_name') {
			const suffix = get_suffix(filename)
			g_object_name = `${key}/${random_string(10)}${suffix}`;
		}
		return g_object_name;
	}

	function get_uploaded_object_name(filename) {
		if (g_object_name_type === 'local_name') {
			let tmp_name = g_object_name
			tmp_name = tmp_name.replace('{{filename}}', filename);
			return tmp_name;
		}
		return g_object_name;
	}

	function set_upload_param(up, filename, ret) {
		if (ret === false) {
			ret = get_signature()
		}
		g_object_name = key;
		if (filename !== '') {
			calculate_object_name(filename)
		}
		const new_multipart_params = {
			key: g_object_name,
			policy: policyBase64,
			OSSAccessKeyId: accessid,
			success_action_status: '200', // 让服务端返回200,不然，默认会返回204
			callback: callbackbody,
			signature
		};

		up.setOption({
			url: host,
			multipart_params: new_multipart_params
		});

		up.start();
	}

	const selectBtn = document.createElement('button');

	window.Uploader = new plupload.Uploader({
		runtimes: 'html5,flash,silverlight,html4',
		browse_button: selectBtn,
		// multi_selection: false,
		url: 'http://oss.aliyuncs.com',

		filters: {
			/*
			mime_types : [ //只允许上传图片和zip,rar文件
			{ title : "Image files", extensions : "jpg,gif,png,bmp,jpeg" },
			{ title : "Zip files", extensions : "zip,rar" }
			],
			*/
			max_file_size: '10mb', // 最大只能上传10mb的文件
			prevent_duplicates: true // 不允许选取重复文件
		},

		init: {
			FilesAdded(up, files) {
				plupload.each(files, (file) => {
					Uploader.ready(file, files);
					// file.id,   file.name,   plupload.formatSize(file.size)
				});
			},

			BeforeUpload(up, file) {
				check_object_radio();
				set_upload_param(up, file.name, true);
			},

			UploadProgress(up, file) {
				// file.percent,
				Uploader.process(get_uploaded_object_name(file.name), file);
			},

			FileUploaded(up, file, info) {
				if (info.status === 200) {
					Uploader.callback(get_uploaded_object_name(file.name), file, info);
					// get_uploaded_object_name(file.name)
				} else {
					Uploader.callback(get_uploaded_object_name(file.name), file, info);
					// info.response
				}
			},

			Error(up, err) {
				if (err.code === -600) {
					alert('选择的文件太大了');
					// "\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"
				} else if (err.code === -601) {
					alert('选择的文件后缀不对');
					// "\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型"
				} else if (err.code === -602) {
					alert('这个文件已经上传过一遍了');
					// "\n这个文件已经上传过一遍了"
				} else {
					// "\nError xml:" + err.response
				}
			}
		}
	});

	Uploader.init();
	Uploader.select = function (ready) {
		Uploader.ready = (ready || function () { });
		selectBtn.click();
	};
	Uploader.upload = function (callback, process) {
		Uploader.callback = (callback || function () { });
		Uploader.process = (process || function () { });
		set_upload_param(Uploader, '', false);
	};
}
