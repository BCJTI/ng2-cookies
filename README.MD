

# ng2-cookies

Simple library to deal with cookies in Angular2.

## Compatibility Break v0 to v1

Replaced deprecated window.escape to encodeURIComponent


## Installation

To install this library, run:

```bash
$ npm install ng2-cookies
```

Usage:

```typescript
import { Cookie } from 'ng2-cookies/ng2-cookies';

Cookie.set('cookieName', 'cookieValue');
Cookie.set('cookieName', 'cookieValue', 10 /*days from now*/);
Cookie.set('cookieName', 'cookieValue', 10, '/myapp/', 'mydomain.com', true /* https only */ );

Cookie.check('cookieName'); 

let myCookie = Cookie.get('cookieName');

/*
* List of cookies as Object, like: { cookieName: "cookieValue", cookieName2: "cookieValue2" ... etc }
*/
let cookielist = Cookie.getAll();

Cookie.delete('cookieName');
Cookie.deleteAll();

```


# Contributors
[<img alt="carcamano" src="https://avatars.githubusercontent.com/u/11354012?v=3&s=117" width="117">](https://github.com/carcamano) |[<img alt="Bigous" src="https://avatars.githubusercontent.com/u/6886560?v=3&s=117" width="117">](https://github.com/bigous) |[<img alt="sasidhar" src="https://avatars.githubusercontent.com/u/897339?v=3&s=117" width="117">](https://github.com/sasidhar) |[<img alt="iloveyo123u1" src="https://avatars.githubusercontent.com/u/6580897?v=3&s=117" width="117">](https://github.com/iloveyo123u1) |[<img alt="etwillbefine" src="https://avatars.githubusercontent.com/u/6608072?v=3&s=117" width="117">](https://github.com/etwillbefine) |[<img alt="josx" src="https://avatars.githubusercontent.com/u/791137?v=3&s=117" width="117">](https://github.com/josx) |[<img alt="tyxz" src="https://avatars2.githubusercontent.com/u/7293989?v=3&s=117" width="117">](https://github.com/tyxz) |
:---: |:---: |:---: |:---: |:---: |:---: |:---: |
[Carcamano](https://github.com/carcamano) |[Bigous](https://github.com/bigous) |[Sasidhar](https://github.com/sasidhar) |[Iloveyo123u1](https://github.com/iloveyo123u1) |[Etwillbefine](https://github.com/etwillbefine) |[Josx](https://github.com/josx)|[Tyx](https://github.com/tyxz) |

## License
MIT © [Felipe Rebelo Lopes](http://github.com/carcamano)

