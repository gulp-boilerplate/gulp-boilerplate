#gulp-boilerplate

Easy way of project workflow house keeping.

##Motivation and inspiration
Most of the time I spent in a project is creating the necessary workflow. Although I pretty much remember, have a working understanding of the tool I use and this task doesn't represents a big challenge in current times (until something changes again and we'll need to learn something new), is still an amount of time I rather use in actual creative work.

Sometimes, when working in a project, I made a discovery, find a simpler way of doing thing or simply start using a new tool and I wish it still available to other projects.

Wouldn't be great if:

1. With just one command and a few lines of code we could have the whole workflow (or most of it) working
2. Easily share code between projects.

Basically this is the problem that solves tools like npm, bower and yeoman

I always loved [Grunt's](http://gruntjs.com/sample-gruntfile) configuration over code style. But the (literally) flowing way of declaring thing in [Gulp](http://gulpjs.com/) is way too powerful, easy and beautiful. So I tried here to combine the two  things.

###Update
Just before publishing this I was searching the npm to see if the name gulp-boilerplate would conflict with another project, the I found [boilerplate-gulp](https://github.com/oztu/boilerplate-gulp) which is a very clever way of reaching the same goals and he even came up with almost the same name I later took.

Instead of doing a monolithic repo (which was my initial idea) [@otzu](https://github.com/oztu) splits the tasks in smaller repos to require them as needed.

Still I like my approach better and I took some of his ideas about reorganizing code and reworked the whole thing.

Thanks [@otzu](https://github.com/oztu)!

##Basic Usage

Install `gulp-boilerplate` and `gulp-boilerplate-*` tasks with `npm`

```sh
$ npm install gulp-boilerplate gulp-boilerplate-copy gulp-boilerplate-clean
```

Create your gulpfile and require gulp-boilerplate with your tasks configuration:

```javascript
var gulp-tasks = require('gulp-boilerplate')
```

Configure and load your tasks:

```javascript
var tasks = {
    'copy': {
        def: 'gulp-boilerplate-copy',
        src: ['./task1src/folder'],
        dest: './dist/task1dest/file',
        options: {
            task1option1: 'option'
        }
    },
    'clean': {
        def: 'gulp-boilerplate-clean',
        src: ['./task2src/folder']
    }
}

gulp = gulp-tasks(tasks);
```

Now you are ready to do:

```sh
$ gulp clean copy
```

***gulp*** is still ***gulp***, so you still can define new tasks, bundles, etc:

```javascript

// declare a new task 'task3' dependent of 'task1' and 'task2'
gulp.task('dist', ['clean', 'copy']);

// declare a new task 'task4'
gulp.task('anotherTask', function(){
    ...
});

// declare a new synchronous task 'task5' dependent of 'task1' and 'task4'
gulp.task('yetAnotherTask', ['clean', 'otherTask'], function(cb){
    ...
    cb();
});
```

## Task definition and configuration
### Task Configuration Object (TCOb)
The TCOo is an object that declares and configures the task.
Each key of this object is the name of the task
each task has a set of properties:

####`def: <string>`
String with basically the same content for requiring the task. Is the task lives in `node_module` then you can pass the name of the module. Else you can pass a relative or absolute path

####`src: <string> or <array of strings>`
This is a gulp glob, the same used for gulp.src

####`dest: <string>`
Destination of the file(s)

####`options: <object>`
An arbitrary object to pass options for the task. Consider that this is not especific for one gulp-plugin so you can pass whatever needed with this object as long it complies with the task definition.

###Extending and defining new tasks:
Each task has its own file in the `tasks` folder with the task name as the file name and follows the same pattern:

```javascript
/*
 * Simplest possible task:
 * moving things around
 */
var gulp = require('gulp');

/* Wraps the function to keep the config object */
module.exports = function (config) {
    /*
     * If you need the task to be synchronous,
     * you can do:
     * function (cb) {
     *   ...
     *   cb();
     *  };
     */
    return function() { // returns the actual task
        gulp.src(config.src)
        .pipe(gulp.dest(config.dest)); //if the task requires a destination
    };
};
```

If you want to use the task, add a new property in the task object and you are set

##Tips and recipes:

### Easy task keeping
Keep your tasks in a separate module like a config.js and require it:

In `config.js`

```javascript
module.exports = {
    scripts: {
        def: 'gulp-boilerplate-scripts'
        src: ['./js/*.js'],
        dest: './dist/js/main.js'
    },
    css: {
        def: 'gulp-boilerplate-scripts'
        src: ['./less/**/*.less'],
        dest: './dist/css/site.css'
    }
}
```

In `gulpfile.js`

```javascript
var tasks = require('./config.js'),
    gulp = require('gulp-boilerplate')(tasks)
```

then you can call the gulp tasks in the console

```bash
$ gulp scripts css
```

### Define new tasks
You can define project specific tasks. I find useful to keep them in the task folder, so:

```
project
├── node_modules
│  └── ...
├── tasks
│  └── sometask
│     └─ index.js
├── config.json
├── index.js
├── gulpfile.js
└── package.json
```

then in your `config.js` you can do:

```javascript
module.exports = {
    sometask: {
        def: 'tasks/sometask'
        src: ['./js/*.js'],
        dest: './dist/js/main.js'
    }
}
```

and in your `gulpfile.js`

```javascript
var tasks = require('./config.js'),
    gulp = require('gulp-boilerplate')(tasks)

gulp.task('default', ['sometask'])
```
