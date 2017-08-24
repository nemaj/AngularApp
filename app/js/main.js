'use strict';

var app = angular.module('JamenApp', [
    'app'
]);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('index');

    $urlRouterProvider.when('/index', '/index/home');

    $stateProvider
        .state('index', {
            abstract: true,
            url: '/index',
            templateUrl: 'views/index.html',
            controller: 'MainCtrl'
        })
        .state('index.home', {
            url: '/home',
            templateUrl: 'views/home/home.html',
            controller: 'HomeCtrl'
        });

});