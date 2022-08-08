import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Textarea from '@/Components/Textarea';
import { useState, useEffect } from "react";
import AlertModal from '@/Components/AlertModal';

export default (props) => {

    const { data, setData, errors, reset, post, get } = useForm({
        id: '',
        title: '',
        description: '',
        published_at: '',
        category_id: '',
        tags: ''
    });

    const [showError, setShowError] = useState(false);

    const handleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        let url = route('posts.store');
        post(url, {
            onSuccess: (response) => {
            },
            onError: (errors) => {
                console.log('error');
                console.log(errors.error);
                if (errors.error) setShowError(true);
            }
        });
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {
                        showError && (
                            <div className="alert alert-error shadow-md  mb-5 text-white p-2 text-sm bg-red-500 font-semibold">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Terjadi kesalahan. Silakan coba beberapa saat lagi</span>
                                </div>
                            </div>
                        )
                    }

                    <div className="bg-white overflow-hidden m:rounded-lg">
                        <div className="flex justify-between flex-wrap  border-gray-200">
                            <div className="px-6 bg-white text-lg bold">Create Post</div>
                            <div className="px-6">
                                {/* <button
                                    className="mx-2 py-2 px-4 bg-indigo-50 border-indigo-500 hover:bg-indigo-500 rounded-lg text-indigo-500 hover:text-white text-sm"
                                    onClick={() => get(route('posts.index'))}> Kembali </button> */}
                            </div>
                        </div>

                        <div className="px-6 mt-6 pb-6">
                            <div className='shadow-lg p-6'>
                                <form onSubmit={submit} noValidate>

                                    <Input
                                        type='hidden'
                                        name="post_id"
                                        value={data.id} />

                                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                        <div>
                                            <Label forInput="title" value="Title" />

                                            <Input
                                                type='text'
                                                name="title"
                                                value={data.title}
                                                className="mt-1 block w-full"
                                                autoComplete={"off"}
                                                isFocused={true}
                                                handleChange={handleChange}
                                            />
                                            {errors.title && <span className='text-sm text-red-500 mt-2'> {errors.title} </span>}
                                        </div>

                                        <div>
                                            <Label forInput="published_at" value="Tanggal Publish" />

                                            <Input
                                                type='date'
                                                name="published_at"
                                                value={data.title}
                                                className="mt-1 block w-full"
                                                autoComplete={"off"}
                                                isFocused={true}
                                                handleChange={handleChange}
                                            />
                                        </div>

                                         <div>
                                            <Label forInput="category" value="Kategori" />

                                            <Input
                                                type='text'
                                                name="category_id"
                                                value={data.category_id}
                                                className="mt-1 block w-full"
                                                autoComplete={"off"}
                                                isFocused={true}
                                                handleChange={handleChange}
                                            />
                                            {errors.category_id && <span className='text-sm text-red-500 mt-2'> {errors.category_id} </span>}
                                        </div>

                                        <div>
                                            <Label forInput="deskripsi" value="Deskripsi" />

                                            <Textarea
                                                value={data.description}
                                                name="description"
                                                className="mt-1 block w-full"
                                                autoComplete={"off"}
                                                rows="5"
                                                handleChange={handleChange}
                                            />
                                            {errors.description && <span className='text-sm text-red-500 mt-2'> {errors.description} </span>}
                                        </div>

                                        <div>
                                            <Label forInput="tags" value="Tags" />

                                            <Input
                                                type='text'
                                                name="tags"
                                                value={data.tags}
                                                className="mt-1 block w-full"
                                                autoComplete={"off"}
                                                handleChange={handleChange}
                                            />
                                            {errors.tags && <span className='text-sm text-red-500 mt-2'> {errors.tags} </span>}
                                        </div>

                                        <div>
                                            <Label forInput="thumbnail" value="Thumbnail" />

                                            <Input
                                                type='file'
                                                name="thumbnail"
                                                value={data.thumbnail}
                                                className="mt-1 block w-full"
                                                handleChange={handleChange}
                                            />
                                        </div>

                                    </div>

                                    <div className='my-4 text-right'>
                                        <button
                                            type='submit'
                                            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm"> Simpan </button>
                                    </div>

                                </form>
                            </div>
                        </div>

                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
