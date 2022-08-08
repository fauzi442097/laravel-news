const List = ({posts, handleRedirectPage, handleShowAlert}) => {
    return (
        <table className="w-full" id="table-data">
            <thead className="bg-gray-200">
                <tr>
                    <td className="py-4 text-center rounded-l-md font-semibold">No</td>
                    <td className="py-4 font-semibold">Judul</td>
                    <td className="py-4 font-semibold">Kategori</td>
                    <td className="py-4 font-semibold">Tanggal Publish</td>
                    <td className="py-4 font-semibold">Tanggal Buat</td>
                    <td className="py-4 font-semibold">Author</td>
                    <td className="py-4 font-semibold text-center">Status</td>
                    <td className="py-4 font-semibold text-center rounded-r-md">Action</td>
                </tr>
            </thead>
            <tbody>
                {
                    posts ?
                        (
                            posts.map((post, index) => {
                                return (
                                    <tr key={index} className="hover:shadow-lg hover:rounded-xl row-table">
                                        <td className="border-b border-gray-100 text-center p-5">{++index}</td>
                                        <td className="border-b border-gray-100">{post.title}</td>
                                        <td className="border-b border-gray-100">{post.category.name}</td>
                                        <td className="border-b border-gray-100">{new Date(post.published_at).toLocaleDateString()}</td>
                                        <td className="border-b border-gray-100">{ new Date(post.created_at).toLocaleDateString()}</td>
                                        <td className="border-b border-gray-100">{post.user.name}</td>
                                        <td className="border-b border-gray-100 text-center">
                                            {
                                                post.is_active ?  (<span className="text-xs bg-indigo-500 py-1 px-6 text-white rounded-full"> Aktif </span>)
                                                : (<span className="text-xs bg-gray-400 py-1 px-3 text-white rounded-full"> Non Aktif </span>)
                                            }
                                        </td>
                                        <td align="center" className="border-b border-gray-100">
                                        </td>
                                    </tr>
                                )
                            })
                        ) :
                        (
                            <tr>
                                <td colSpan={6} align="center" className="py-2"> Data tidak tersedia </td>
                            </tr>
                        )
                }
            </tbody>
        </table>
    )
}

export default List;
