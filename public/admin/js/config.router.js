'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(['$rootScope', '$state', '$stateParams','authorization', 'principal',
    function($rootScope, $state, $stateParams, authorization, principal) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        // track the state the user wants to go to; authorization service needs this
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;
        // if the principal is resolved, do an authorization check immediately. otherwise,
        // it'll be done when the state it resolved.
        if (principal.isIdentityResolved()) authorization.authorize();
      });
    }]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {

          $urlRouterProvider
              .otherwise('/app/dashboard-v1');
          $stateProvider.state('site', {
                abstract: true,
                template: '<ui-view/>',
                resolve: {
                  authorize: ['authorization',
                    function(authorization) {
                      return authorization.authorize();
                    }
                  ]
                }
              })
              .state('app', {
                  abstract : true,
                  url: '/app',
                  templateUrl: 'tpl/app.html',
                  data: {
                    roles: ['Admin']
                  },
                  parent : 'site'
              })
              .state('app.dashboard-v1', {
                  url: '/dashboard-v1',
                  templateUrl: 'tpl/app_dashboard_v1.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/chart.js']);
                    }]
                  }
              })
              .state('app.menu_1', {
                  url: '/menu_tree_1',
                  templateUrl: 'tpl/menuTree.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('ui.tree').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/menuTree.js');
                              }
                          );
                        }
                      ]
                  }
              })
              .state('app.menu_2', {
                  url: '/menu_tree_2',
                  templateUrl: 'tpl/ui_tree.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('angularBootstrapNavTree').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/tree.js');
                              }
                          );
                        }
                      ]
                  }
              })

            }
        ]
  );
