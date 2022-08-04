import { useForm } from "@inertiajs/inertia-react";
import "../../../css/my.css";

const List = ({ users, handleShowModal, handleShowAlert }) => {

    return (
        <table className="w-full" id="table-data">
            <thead className="bg-gray-200">
                <tr>
                    <td className="py-4 text-center rounded-l-md font-semibold">No</td>
                    <td className="py-4 font-semibold">Name</td>
                    <td className="py-4 font-semibold">Email</td>
                    <td className="py-4 font-semibold">Role</td>
                    <td className="py-4 font-semibold text-center">Status</td>
                    <td className="py-4 font-semibold text-center rounded-r-md">Action</td>
                </tr>
            </thead>
            <tbody>
                {
                    users ?
                        (
                            users.map((value, index) => {
                                return (
                                    <tr key={index} className="hover:shadow-lg hover:rounded-xl row-table">
                                        <td className="border-b border-gray-100 text-center p-5">{++index}</td>
                                        <td className="border-b border-gray-100">{value.name}</td>
                                        <td className="border-b border-gray-100">{value.email}</td>
                                        <td className="border-b border-gray-100">{value.role.name}</td>
                                        <td className="border-b border-gray-100 text-center">
                                            {
                                                value.is_active ?  (<span className="text-xs bg-indigo-500 py-1 px-6 text-white rounded-full"> Aktif </span>)
                                                : (<span className="text-xs bg-gray-400 py-1 px-3 text-white rounded-full"> Non Aktif </span>)
                                            }

                                        </td>
                                        <td align="center" className="border-b border-gray-100">
                                            <button
                                                onClick={() => handleShowModal(value.id)}
                                                className="mx-2 py-2 px-4 bg-indigo-50 border-indigo-500 hover:bg-indigo-500 rounded-lg text-indigo-500 hover:text-white text-sm"> Edit </button>
                                             <button className={value.is_active
                                                    ? "py-2 px-4 border  bg-white hover:bg-gray-400 rounded-lg text-grey hover:text-white text-sm"
                                                    : "py-2 px-4 border border-gray-400 bg-gray-400 hover:bg-gray-500 rounded-lg text-white text-sm"
                                                }
                                                onClick={() => handleShowAlert(value.id, value.is_active)}> {value.is_active ? 'Non Aktif' : 'Aktif'} </button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) :
                        (
                            <tr>
                                <td colSpan={5} align="center" className="py-2"> Data tidak tersedia </td>
                            </tr>
                        )
                }
            </tbody>
        </table>
    )
}

export default List;

