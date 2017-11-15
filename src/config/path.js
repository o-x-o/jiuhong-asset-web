const PATH = {};
const API = {};

if (process.env.NODE_ENV === 'development') {
	PATH.baseURL = '';
} else {
	API.baseURL = '';
}

export {
	PATH,
	API
};