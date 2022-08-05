import { useState, useEffect } from "react";
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import List from "./List";


export default (props) => {

    const { get } = useForm();
    const [posts, setPosts] = useState(props.posts);

    useEffect(() => {
        console.log(posts);
    }, []);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Create Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden m:rounded-lg">
                        <div className="flex justify-between flex-wrap  border-gray-200">
                            <div className="px-6 bg-white text-lg bold">Post List</div>
                            <div className="px-6">
                                <button
                                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm"
                                    onClick={() => get(route('posts.create'))}> Tambah </button>
                            </div>
                        </div>

                        <div className="px-6 mt-6 pb-6">
                            <List posts={posts}
                                />
                        </div>

                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
