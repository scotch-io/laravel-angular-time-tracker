<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function() 
{
	return view('index');
});

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

// A route group allows us to have a prefix, in this case api
Route::group(array('prefix' => 'api'), function()
{
	Route::resource('time', 'TimeEntriesController');
	Route::resource('users', 'UsersController');
});
