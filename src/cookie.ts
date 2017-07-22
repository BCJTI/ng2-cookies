
/**
 * Class Cookie - Holds static functions to deal with Cookies
 */
export class CookieService {

	/**
	 * Checks the existence of a single cookie by it's name
	 *
	 * @param  {string} name Identification of the cookie
	 * @returns existence of the cookie
	 */
	public check(name: string): boolean {
		// Check if document exist avoiding issues on server side prerendering
		if (typeof document === "undefined") return false;
		return this.cookieHandler(name, 'test');
	}

	/**
	 * Retrieves a single cookie by it's name
	 *
	 * @param  {string} name Identification of the Cookie
	 * @returns The Cookie's value
	 */
	public get(name: string): string {
		if (this.check(name)) {
			return decodeURIComponent(this.cookieHandler(name, 'exec')[1]);
		}
		return '';
	}

	/**
	 * Retrieves a a list of all cookie avaiable
	 *
	 * @returns Object with all Cookies
	 */
	public getAll(): any {
		let cookies: any = {};

		// tslint:disable-next-line:triple-equals
		if (document.cookie && document.cookie != '') {
			let split = document.cookie.split(';');
			for (let s of split) {
				let currCookie = s.split('=');
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
	public set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean) {
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

		document.cookie = cookieStr;
	}

	/**
	 * Removes specified Cookie
	 *
	 * @param  {string} name Cookie's identification
	 * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
	 * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
	 */
	public delete(name: string, path?: string, domain?: string): void {
		this.set(name, '', -1, path, domain);
	}

	/**
	 * Delete all cookie avaiable
	 */
	public deleteAll(path?: string, domain?: string): void {
		let cookies: any = this.getAll();

		for (let cookieName of Object.keys(cookies)) {
			this.delete(cookieName, path, domain);
		}
	}

	/**
	 * @private
	 * Cookie Handler - Reusable Method
	 *
	 * @param  {string} name Cookie's identification
	 * @param  {string} methodName Method to be called
	 */
	private cookieHandler(name: string, methodName: string): any {
		name = encodeURIComponent(name);
		return (new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g') as any)
		[methodName](document.cookie);
	}
}

export const Cookie = new CookieService();
