<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\Request;
use App\Models\Role;
use Inertia\Inertia;
use DB;

class RoleController extends Controller
{
    //

    public function index()
    {
        $param['roles'] = Role::latest('id')->get();
        return Inertia::render('Role/Index', $param);
    }

    public function store(CreateRoleRequest $request)
    {
        DB::beginTransaction();
        try {
            Role::create([
                'name' => $request->name
            ]);
            DB::commit();
            return redirect()->route('roles');
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()->withErrors([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function update(UpdateRoleRequest $request, Role $role)
    {
        DB::beginTransaction();
        try {
            $role->name = $request->name;
            $role->save();
            DB::commit();
            return redirect()->route('roles');

        } catch ( \Exception $e ) {
            DB::rollback();
            return redirect()->back()->withErrors([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function show(Role $role)
    {
        return response()->json(['role' => $role]);
    }

    public function destroy(Role $role)
    {
        DB::beginTransaction();
        try {

            $totalUser = $role->loadCount('users')->users_count;
            if ( $totalUser > 0 ) {
                return response()->json([
                    'code' => 300,
                    'message' => "Role tidak dapat dihapus. \n Terdapat user yang menggunakannya"
                ]);
            }

            $role->delete();
            DB::commit();

            return response()->json([
                'code' => 200,
                'message' => 'Role berhasil dihapus',
                'roles' => Role::latest('id')->get()
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()->withErrors([
                'error' => $e->getMessage()
            ]);
        }
    }


}
