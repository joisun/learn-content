import compCss from './compb.module.css';
const foo = document.createElement('div');
foo.className = compCss['foo'];

document.body.appendChild(foo);
