var variables = (function() {

	var init = (function() {

		var accesToken = '?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b';
		var userApi = 'https://api.instagram.com/v1/users/';
		var mediaApi = 'https://api.instagram.com/v1/media/';
		var popularMediaApi = 'https://api.instagram.com/v1/media/popular';
		var tagApi = 'https://api.instagram.com/v1/tags/';

		return {
			accesToken,
			userApi,
			mediaApi,
			popularMediaApi,
			tagApi
		}

	})();

	return {
		init
	}

})();