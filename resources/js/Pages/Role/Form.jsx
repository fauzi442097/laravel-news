import Input from '@/Components/Input';
import Label from '@/Components/Label';

const ModalForm = ({ errors, data, handleCloseModal, handleStore, handleChange, errorResponse }) => {
    return (
        <>
            <input type="checkbox" id="modal-form" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box relative">
                    <label onClick={handleCloseModal} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-4" id="title-modal"> </h3>

                    {
                        errorResponse && (
                            <div className="alert alert-error shadow-md  mb-5 text-white p-2 text-sm bg-red-500 font-semibold">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Terjadi kesalahan. Silakan coba beberapa saat lagi</span>
                                </div>
                            </div>
                        )
                    }

                    <form onSubmit={handleStore} noValidate>
                        <Input type="hidden"
                            name="user_id"
                            value={data.user_id}
                        />

                        <div>
                            <Label forInput="name" value="Name" />

                            <Input
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                isFocused={true}
                                handleChange={handleChange}
                            />
                            {errors.name && <span className='text-sm text-red-500 mt-2'> {errors.name} </span>}
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <button
                                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm"> Simpan </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalForm;
