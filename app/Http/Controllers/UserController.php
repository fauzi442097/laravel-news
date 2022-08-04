<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Hash;
use DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $param['users'] = User::with('role')->orderBy('id', 'DESC')->get();
        return Inertia::render('User/Index', $param);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUserRequest $request)
    {
        //
        DB::beginTransaction();
        try {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make('welcome1'),
                'role_id' => 2, // Role Author
                'is_active' => true
            ]);
            DB::commit();
            return redirect()->route('users');
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()->withErrors([
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
        $user->load('role');
        return response()->json(['user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
        DB::beginTransaction();
        try {
            $user->name = $request->name;
            $user->email = $request->email;
            $user->save();
            DB::commit();
            return redirect()->route('users');
        } catch ( \Exception $e ) {
            DB::rollback();
            return redirect()->back()->withErrors([
                'error' => $e->getMessage()
            ]);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }

    public function setActive(User $user)
    {
        DB::beginTransaction();
        try {

            $respMessage = ($user->is_active) ? 'User berhasil dinonaktifkan' : 'User berhasil diaktifkan kembali';
            $user->is_active = !$user->is_active;
            $user->save();
            DB::commit();

            return response()->json([
                'message' => $respMessage,
                'users' => User::with('role')->orderBy('id', 'DESC')->get()
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()->withErrors([
                'error' => $e
            ]);
        }
    }
}
