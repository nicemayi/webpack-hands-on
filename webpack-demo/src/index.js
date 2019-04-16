import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.js';
import createAvatar from './createAvatar';
import styles from './index.scss';
import file from './Dota2.jpg';
import './style.css';




console.log(file, '1111');

const arr = [
    new Promise(() => { }),
    new Promise(() => { }),
];

arr.map(each => console.log(each));

createAvatar();

const img = new Image();
img.src = file;
img.classList.add(styles['avatar']);

const root = document.getElementById('root')

// const html = document.getElementsByTagName('html');


root.append(img)

new App();

var btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);
btn.onclick = function () { 
    var div = document.createElement('div');
    div.innerHTML = 'item';
    document.body.appendChild(div);
}

ReactDOM.render(<App />, document.getElementById('root'));