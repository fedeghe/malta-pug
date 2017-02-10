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