var src = './',
    dest = './build';

function buildSources(sources) {
    if (!sources) {
        return '';
    }
    if (Array.isArray(sources)) {
        sources.forEach(function (elm) {
            elm = '' + src + elm;
        });
        return sources;
    }
    sources = '' + src + sources;
    return sources;
}
module.exports = {
    task: {
        src: '',
        dest: '',
        options: {}
    },
    bundles: {
        someTasks: ['task']
    }
};
