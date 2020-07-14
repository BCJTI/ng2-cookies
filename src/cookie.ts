import { Injectable } from '@angular/core';

@Injectable()
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
		if (typeof document === "undefined") return false;  // Check if document exist avoiding issues on server side prerendering
		name = encodeURIComponent(name);
		const regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
		return (regexp.test(document.cookie));
	}

	/**
	 * Retrieves a single cookie by it's name
	 *
	 * @param  {string} name Identification of the Cookie
	 * @returns The Cookie's value
	 */
	public get(name: string): string {
		if (this.check(name)) {
			name = encodeURIComponent(name);
			const regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
			const result = regexp.exec(document.cookie);
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

		if (!path) {
			path = '/';
		}
		cookieStr += 'path=' + path + ';';
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

}

export const Cookie = new CookieService();
