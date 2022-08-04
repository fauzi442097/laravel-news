<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Route Group with Controller
    Route::controller(UserController::class)->group(function () {
        Route::get('/users', 'index')->name('users');
        Route::get('/users/{user}', 'show')->name('users.show', ['user' => 'user']);
        Route::get('/users/{user}/setActive', 'setActive')->name('users.setActive', ['user' => 'user']);
        Route::post('/users', 'store')->name('users.store');
        Route::put('/users/{user}', 'update')->name('users.update', ['user' => 'user']);
    });

    Route::controller(RoleController::class)->group(function() {
        Route::get('/roles', 'index')->name('roles');
        Route::post('/roles', 'store')->name('roles.store');
        Route::put('/roles/{role}', 'update')->name('roles.update');
        Route::get('/roles/{role}', 'show')->name('roles.show', ['role' => 'role']);
    });


});

require __DIR__ . '/auth.php';
