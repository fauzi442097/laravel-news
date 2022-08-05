import "../../../css/my.css";

const List = ({ roles, handleShowModal, handleShowAlert }) => {

    return (
        <table className="w-full" id="table-data">
            <thead className="bg-gray-200">
                <tr>
                    <td className="py-4 text-center rounded-l-md font-semibold">No</td>
                    <td className="py-4 font-semibold">Name</td>
                    <td className="py-4 font-semibold text-center rounded-r-md">Action</td>
                </tr>
            </thead>
            <tbody>
                {
                    roles ?
                        (
                            roles.map((value, index) => {
                                return (
                                    <tr key={index} className="hover:shadow-lg hover:rounded-xl row-table">
                                        <td className="border-b border-gray-100 text-center p-5">{++index}</td>
                                        <td className="border-b border-gray-100">{value.name}</td>
                                        <td align="center" className="border-b border-gray-100">
                                            <button
                                                onClick={() => handleShowModal(value.id)}
                                                className="mx-2 py-2 px-4 bg-indigo-50 border-indigo-500 hover:bg-indigo-500 rounded-lg text-indigo-500 hover:text-white text-sm"> Edit </button>

                                            <button
                                                onClick={() => handleShowAlert(value.id)}
                                                className="mx-2 py-2 px-4 bg-gray-100 border-indigo-500 hover:bg-indigo-500 rounded-lg text-indigo-500 hover:text-white text-sm"> Hapus </button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) :
                        (
                            <tr>
                                <td colSpan={3} align="center" className="py-2"> Data tidak tersedia </td>
                            </tr>
                        )
                }
            </tbody>
        </table>
    )
}

export default List;

