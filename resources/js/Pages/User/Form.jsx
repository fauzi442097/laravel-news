import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Button from '@/Components/Button';

const ModalForm = ({ errors, data, handleCloseModal, handleStore, handleChange }) => {
    return (
        <>
            <input type="checkbox" id="modal-form" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box relative">
                    <label onClick={handleCloseModal} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-4" id="title-modal"> </h3>
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

                        <div className="mt-4">
                            <Label forInput="email" value="Email" />

                            <Input
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                handleChange={handleChange}
                            />
                            {errors.email && <span className='text-sm text-red-500 mt-2'> {errors.email} </span>}
                        </div>

                        <div className="flex items-center justify-end mt-4">

                            <Button className="ml-4 bg-blue-400 hover:bg-blue-500">
                                Simpan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalForm;
