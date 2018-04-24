---
[![npm version](https://badge.fury.io/js/malta-pug.svg)](http://badge.fury.io/js/malta-pug)
[![Dependencies](https://david-dm.org/fedeghe/malta-pug.svg)](https://david-dm.org/fedeghe/malta-pug)
[![npm downloads](https://img.shields.io/npm/dt/malta-pug.svg)](https://npmjs.org/package/malta-pug)
[![npm downloads](https://img.shields.io/npm/dm/malta-pug.svg)](https://npmjs.org/package/malta-pug)  
---  

This plugin can be used on: **.pug** files

Options : no options  

Sample usage:  
```
malta app/source/home.pug public -plugins=malta-pug
```
or in the .json file :  
```
"app/source/home.pug" : "public -plugins=malta-pug"
```
or in a script :  
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/home.pug',
    'public',
    '-plugins=malta-pug',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```