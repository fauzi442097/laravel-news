<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use App\Models\Category;
use App\Models\Tags;
use Inertia\Inertia;
use Auth;
use DB;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

        $param['posts'] = Post::latest('id')->with(['user', 'category'])->get();
        return Inertia::render('Post/Index', $param);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Post/Form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePostRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostRequest $request)
    {
        DB::beginTransaction();
        try {




            // Create or get category
            $category = Category::whereRaw("LOWER(name) LIKE '%" . strtolower($request->category_id) . "%'")->first();
            if (is_null($category)) {
                $category = Category::create(['name' => $request->category_id]);
            }
            $request->category_id = $category->id;

            // Store Post
            $post = Post::create([
                'title' => $request->title,
                'description' => $request->description,
                'published_at' => date('Y-m-d'),
                'is_active' => true,
                'category_id' => $request->category_id,
                'user_id' => Auth::user()->id
            ]);

            if ($request->hasFile('thumbnail')) {
                $file = $request->file('thumbnail');
                $randomFileName = $file->hashName();
                $extension = $file->extension();
                $path = Storage::putFile('public', $file);
                $post->image()->create(['url' => $path]);
            }

            // store tags
            $tags = explode(',', $request->tags);
            foreach ($tags as $tagName) {
                $tag = Tags::whereRaw("LOWER(name) LIKE '%" . strtolower(trim($tagName)) . "%'")->first();
                if (is_null($tag)) {
                    // store tags
                    $tag = Tags::create([
                        'name' => $tagName,
                        'is_active' => 't',
                        'user_id' => Auth::user()->id
                    ]);
                }

                $post->tags()->save($tag);
            }

            DB::commit();
            return redirect()->route('posts.index');
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
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePostRequest  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }
}
