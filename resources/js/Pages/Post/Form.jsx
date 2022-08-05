import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Textarea from '@/Components/Textarea';

export default (props) => {

    const { data, setData, errors, reset, post, get } = useForm({
        id: '',
        title: '',
        description: '',
        published_at: '',
        category_id: '',
        tags: ''
    });

    const handleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const handleStore = (e) => {
        e.eventPreventDefault();
        alert('tes');
        let url = route('posts.store');
        post(url);
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                <form onSubmit={handleStore} noValidate>

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
                                            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm"
                                            type='submit'> Simpan </button>
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
