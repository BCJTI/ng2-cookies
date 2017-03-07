/**
 * Class Cookie - Holds static functions to deal with Cookies
 */
export class Cookie {

	/**
	 * Checks the existence of a single cookie by it's name
	 * 
	 * @param  {string} name Identification of the cookie
	 * @returns existence of the cookie
	 */
	public static check(name: string): boolean {
		name = encodeURIComponent(name);
		let regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
		let exists = regexp.test(document.cookie);
		return exists;
	}

	/**
	 * Retrieves a single cookie by it's name
	 *
	 * @param  {string} name Identification of the Cookie
	 * @returns The Cookie's value
	 */
	public static get(name: string): string  {
		if (Cookie.check(name)) {
			name = encodeURIComponent(name);
			let regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
			let result = regexp.exec(document.cookie);
			return decodeURIComponent(result[1]);
		} else {
			return '';
		}	
	}

	/**
	 * Retrieves a a list of all cookie avaiable
	 *
	 * @returns Object with all Cookies
	 */
	public static getAll(): any {
		let cookies: any = {};

		if (document.cookie && document.cookie != '') {
			let split = document.cookie.split(';');
			for (let i = 0; i < split.length; i++) {
				let currCookie = split[i].split('=');
				currCookie[0] = currCookie[0].replace(/^ /, '');
				cookies[decodeURIComponent(currCookie[0])] = decodeURIComponent(currCookie[1]);
			}
		}

		return cookies;
	}

	/**
	 * Save the Cookie
	 *
	 * @param  {string} name Cookie's identification
	 * @param  {string} value Cookie's value
	 * @param  {number} expires Cookie's expiration date in days from now or at a specific date from a Date object. If it's undefined the cookie is a session Cookie
	 * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
	 * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
	 * @param  {boolean} secure If true, the cookie will only be available through a secured connection
	 */
	public static set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean) {
		let cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

		if (expires) {
			if (typeof expires === 'number') {
				let dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
				cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
			} else {
				cookieStr += 'expires=' + expires.toUTCString() + ';';
			}
		}
		 
		if (path) {
			cookieStr += 'path=' + path + ';';
		}
		if (domain) {
			cookieStr += 'domain=' + domain + ';';
		}
		if (secure) {
			cookieStr += 'secure;';
		}

		// console.log(cookieStr);
		document.cookie = cookieStr;
	}

	/**
	 * Removes specified Cookie
	 *
	 * @param  {string} name Cookie's identification
	 * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
	 * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
	 */
	public static delete(name: string, path?: string, domain?: string) {
		// If the cookie exists
		if (Cookie.get(name)) {
			Cookie.set(name, '', -1, path, domain);
		}
	}

	/**
	 * Delete all cookie avaiable
	 */
	public static deleteAll(path?: string, domain?: string): any {
		let cookies: any = Cookie.getAll();

		for (let cookieName in cookies) {
			Cookie.delete(cookieName, path, domain);
		}

	}


}
