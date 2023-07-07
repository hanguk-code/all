<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('login', [ 'as' => 'login', 'uses' => 'LoginController@login']);
//Route::post('login', 'LoginController@login');
Route::post('register', 'RegisterController@register');
Route::apiResource('users', 'UserController');
Route::group(['middleware' => ['auth:api']], function () {
    Route::get('user', 'AuthenticationController@user');
    Route::post('logout', 'LoginController@logout');

    
    Route::get('users/check/me', 'UserController@meUser');
    Route::get('users/create/data', 'UserController@createData');
    Route::get('users/update/data', 'UserController@updateData');

    Route::apiResource('roles', 'RoleController');
    Route::get('roles/create/data', 'RoleController@createData');
    Route::get('roles/update/data/{id}', 'RoleController@updateData');
});

Route::apiResource('categories', 'CategoryController');

Route::apiResource('orders', 'OrderController');
Route::get('orders/options/data', 'OrderController@optionsData');

Route::apiResource('logs', 'LogController');

Route::apiResource('media','MediaController');
Route::post('media/sort','MediaController@sort');
Route::post('upload/media', 'MediaController@uploadProductMedia');
Route::post('files/delete', 'MediaController@deleteFile');