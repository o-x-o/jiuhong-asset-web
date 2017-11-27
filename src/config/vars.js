/* eslint no-underscore-dangle: 0 */

const _ = {
	_: 'src/',
	_S: 'static/',
	_A: 'src/assets/',
	_C: 'src/components',
	_P: 'src/pages'
};

const pre = {
	imgPre: `${_._S}img/`
};

const path = {
	trans1x1: `${pre.imgPre}transparent_1x1.gif`
};

Object.assign(path, pre, _);

const api = {};

if (process.env.NODE_ENV === 'development') {
	path.baseURL = '';
} else {
	path.baseURL = '';
}

export {
	path,
	api
};
