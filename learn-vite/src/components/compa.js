import compCss from './compa.module.css';
const foo = document.createElement('div');
console.log('[compCss]: ', compCss);
foo.className = compCss.fooBox;

document.body.appendChild(foo);
