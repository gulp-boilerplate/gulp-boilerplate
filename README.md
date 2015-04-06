#gulp-boilerplate

Easy way of proyect workflow house keeping.

##Motivation
Most of the time I spent in a project is creating the necessary workflow. Although I pretty much remember, have a working understanding of the tool I use and this task doesn't represents a big challenge in current times (until something changes again and we'll need to learn something new), is still an amount of time I rather use in actual creative work.

Sometimes, when working in a project, I made a discovery, find a simpler way of doing thing or simply start using a new tool and I wish it still available to other projects.

Wouldn't be great if:

1. With just one command and a few lines of code we could have the whole workflow (or most of it) working
2. Easily share code between projects.

Basically this is the problem that solves tools like npm, bower and yeoman

I always loved [Grunt's](grunt) configuration over code style. But the (literally) flowing way of declaring thing to do in [Gulp](gulp) is way too powerful, easy and beautiful. So I tried here to combine the two things.

##Basic Usage

Install with npm

```sh
$ npm install gulp-boilerplate
```

Create your gulpfile and require gulp-boilerplate with your tasks configuration:

```javascript
var gulp-tasks = require('gulp-boilerplate')
```

Configure and load your tasks:

```javascript
var tasks = {
    task1: {
        src: ['./task1src/folder'],
        dest: './dist/task1dest/file',
        options: {
            task1option1: 'option'
        }
    },
    task2: {
        src: ['./task2src/folder'],
        dest: './dist/task2dest/file',
        options: {
            task2option1: 'option'
        }
    }
}

gulp = gulp-tasks(tasks);
```

Now you are ready to do:

```sh
$ gulp task1 task2
```

***gulp*** is still ***gulp***, so you still can define new tasks, bundles, etc:

```javascript

// declare a new task 'task3' dependent of 'task1' and 'task2'
gulp.task('task3', ['task1', 'task2']);

// declare a new task 'task4'
gulp.task('task4', function(){
    ...
});

// declare a new synchronous task 'task5' dependent of 'task1' and 'task4'
gulp.task('task5', ['task1', 'task4'], function(cb){
    ...
    cb();
});
```

## Extending and creating new tasks:
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
        .pipe(gulp.dest(config.dest));
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
    task1: {
        src: ['./task1src/folder'],
        dest: './dist/task1dest/file',
        options: {
            task1option1: 'option'
        }
    },
    task2: {
        src: ['./task2src/folder'],
        dest: './dist/task2dest/file',
        options: {
            task2option1: 'option'
        }
    }
}
```

In `gulpfile.js`

```javascript
var tasks = require('./config.js'),
    gulp = require('gulp-boilerplate')('tasks')
```

[grunt]:http://gruntjs.com/sample-gruntfile
[gulp]:http://gulpjs.com/
