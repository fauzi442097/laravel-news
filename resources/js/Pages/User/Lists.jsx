import { useForm } from "@inertiajs/inertia-react";

const List = ({ users, handleShowModal }) => {

    return (
        <table className="w-full">
            <thead className="bg-gray-200">
                <tr>
                    <th className="p-2 rounded-l-md">No</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Role</th>
                    <th className="p-2 rounded-r-md">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users ?
                        (
                            users.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="border-b text-center">{++index}</td>
                                        <td className="border-b">{value.name}</td>
                                        <td className="border-b">{value.email}</td>
                                        <td className="border-b">{value.role.name}</td>
                                        <td align="center" className="border-b">
                                            <button onClick={() => handleShowModal(value.id)} className="py-2 px-4 bg-blue-400 hover:bg-blue-500 m-2 rounded text-white text-sm"> Edit </button>
                                            <button className="py-2 px-4 bg-red-400 hover:bg-red-500 rounded bg-gray-100 text-white text-sm"> Non Aktif </button>
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

