require.config({
paths: {
	'angular':'js/angular.min',
	'app':'app/app',
	'coreModule':'app/coreModule',
	'angularRoute':'js/angular-route'
},
shim:{
	'app': {
	deps: ['angular','coreModule']
	},
	'coreModule': {
	deps: ['angular','angularRoute']
	},
	'angularRoute': {
	deps: ['angular']
	}
}
});

require(['app'], function() {
angular.bootstrap(document, ['app']);
});