const { useLoader } = require('html-chunk-loader');

const loader = useLoader({
	pathRoot: '__fixtures__',
	templates: 'views'
});

console.log(loader.template('home', { title: 'Page Title'}));

// console.log('todo: ssg mono tests');
