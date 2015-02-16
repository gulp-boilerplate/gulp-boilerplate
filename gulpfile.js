var config = require('./gulp/config'),
	tasks = config.tasks,
	bundles = config.bundles,
	gulp = require('./gulp')(Object.keys(tasks), tasks);
