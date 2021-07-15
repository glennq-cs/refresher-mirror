<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function() use ($router) {
    $router->group(['middleware' => 'jwt.auth'],
        function() use ($router) {
            $router->get('users', [
                'uses' => 'UserController@showAllUsers'
            ]);

            $router->get('categories', [
                'uses' => 'CategoryController@showAllCategories'
            ]);
            
            $router->post('categories', [
                'uses' => 'CategoryController@create'
            ]);

            $router->put('categories/{id}', [
                'uses' => 'CategoryController@update'
            ]);

            $router->delete('categories/{id}', [
                'uses' => 'CategoryController@delete'
            ]);
        });

    // $router->get('users', [
    //     'uses' => 'AuthorController@showAllUsers'
    // ]);

    $router->post('auth/login', [
        'uses' => 'AuthController@authenticate'
    ]);
    
});



