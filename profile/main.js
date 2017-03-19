require.config({
paths: {
'angular':'js/angular.min',
'app':'app/app',
'coreModule':'app/coreModule',
'angularRoute':'js/angular-route',
'angularMaterial':'js/angular-material.min'
},
shim:{
'app': {
deps: ['angular','coreModule']
},
'coreModule': {
deps: ['angular','angularRoute']
},
'angularMaterial': {
deps: ['angular']
},
'angularRoute': {
deps: ['angular']
}
}
});

require(['app'], function() {
angular.bootstrap(document, ['app']);
});