# ng2-cookies

Simple library to deal with cookies in Angular2.

## Installation

To install this library, run:

```bash
$ npm install ng2-cookies
```

Usage:

```typescript
import { Cookie } from 'ng2-cookies/ng2-cookies';

Cookie.setCookie('cookieName', 'cookieValue');
Cookie.setCookie('cookieName', 'cookieValue', 10 /*days from now*/);
Cookie.setCookie('cookieName', 'cookieValue', 10, '/myapp/', 'mydomain.com');

let myCookie = Cookie.getCookie('cookieName');

Cookie.deleteCookie('cookieName');
```


## License

MIT © [Felipe Rebelo Lopes](http://github.com/carcamano)

