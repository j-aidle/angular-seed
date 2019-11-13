'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'home',
    'header',
    'primary',
    'professors',
    'alumnes',
])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$mdThemingProvider',
        function ($stateProvider,
            $urlRouterProvider,
            $mdThemingProvider) {

            $stateProvider.state('layout', {
                url: '',
                views: {
                    'header': {
                        templateUrl: './header/header.template.html',
                        controller: 'headerController'
                    },
                    'menu': {
                        templateUrl: './header/menu.template.html',
                        controller: 'headerController'
                    },
                    'primary': {
                        templateUrl: './primary/primary.template.html',
                        controller: 'primaryController'
                    }
                }
            }).state('layout.professors', {
                url: '/professors',
                views: {
                    professors: {
                        templateUrl: './professors/professors.template.html',
                        controller: 'professorsController'
                    }
                }
            }).state('layout.home', {
                url: '/home',
                views: {
                    home: {
                        templateUrl: './home/home.template.html',
                        controller: 'homeController'
                    }
                }
            }).state('layout.alumnes', {
                url: '/alumnes',
                views: {
                    alumnes: {
                        templateUrl: './alumnes/alumnes.template.html',
                        controller: 'alumnesController'
                    }
                }
            });

            $urlRouterProvider.otherwise('home');

            
            $mdThemingProvider.theme('temaPrincipal').primaryPalette('blue')
                .accentPalette('yellow')
                .warnPalette('red')
                .backgroundPalette('grey');
            $mdThemingProvider.setDefaultTheme('temaPrincipal');
        }]);
