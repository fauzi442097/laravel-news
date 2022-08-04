import { useState } from "react";
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import List from "@/Pages/User/Lists";
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Button from '@/Components/Button';
import AlertModal from '@/Components/AlertModal';
import ModalForm from "./Form";

export default (props) => {

    const { data, setData, get, errors, setError, clearErrors, reset, post, put } = useForm({
        id: '',
        name: '',
        email: '',
    });

    const [showModalAlert, setShowModalAlert] = useState(false);
    const [titleAlert, setTitleAlert] = useState("");
    const [bodyAlert, setBodyAlert] = useState("");
    const [buttonAlertName, setButtonAlertName] = useState("");
    const [userIdSelected, setUserIdSelected] = useState("");

    const showModal = async (user_id) => {
        try {
            console.log(user_id);
            document.getElementById("modal-form").checked = true;
            document.getElementById("title-modal").innerText = "Tambah User";

            if (user_id) {
                document.getElementById("title-modal").innerText = "Edit User";
                let url = route('users.show', { 'id': user_id });
                let response = await axios.get(url);
                let data = response.data;
                let user = data.user;

                setData({
                    id: user.id,
                    name: user.name,
                    email: user.email
                });
            }

        } catch (e) {
            console.log(e);
        }
    }

    const closeModal = () => {
        document.getElementById("modal-form").checked = false;
        reset();
        clearErrors();
    }

    const store = (e) => {
        e.preventDefault();
        let isValid = true;
        for (let error in errors) {
            if (errors[error] != '') {
                isValid = false;
                return
            }
        }

        if (data.id) {
            let url = route('users.update', {'id' : data.id});
            if (isValid) {
                put(url, {
                    onSuccess: () => {
                        closeModal();
                    }
                })
            }
        } else {
            let url = route('users.store');
            if (isValid) {
                post(url, {
                    onSuccess: () => {
                        closeModal();
                    }
                })
            }
        }
    }

    const onHandleChange = (event) => {
        validateForm(event);
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const validateForm = (event) => {
        let error = {};
        if (event.target.value == '') {
            error[event.target.name] = event.target.name + ' wajib diisi';
        } else {
            error[event.target.name] = '';
        }
        setError({ ...error });
    }

    const setActive = (user_id) => {
        let url = route('users.setActive', {id: user_id});
        get(url);
    }

    const showAlertModal = (user_id, is_active) => {
        if ( is_active ) {
            setTitleAlert("Non aktif user");
            setBodyAlert("Anda yakin akan mengubah status user ini menjadi non aktif?");
            setButtonAlertName("Non Aktif");
        } else {
            setTitleAlert("Aktif user");
            setBodyAlert("Anda yakin akan mengubah status user ini menjadi aktif kembali?");
            setButtonAlertName("Aktif");
        }
        setShowModalAlert(true);
        setUserIdSelected(user_id);
    }


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Users" />

            <ModalForm
                errors={errors}
                data={data}
                handleCloseModal={closeModal}
                handleStore={store}
                handleChange={onHandleChange}
             />

             {
                showModalAlert &&
                <AlertModal
                    showAlert={true}
                    id={userIdSelected}
                    setShowAlert={setShowModalAlert}
                    title={titleAlert}
                    body={bodyAlert}
                    buttonName={buttonAlertName}
                    handleAction={setActive}/>
            }

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden m:rounded-lg">
                        <div className="flex justify-between flex-wrap  border-gray-200">
                            <div className="px-6 bg-white text-lg bold">Users List</div>
                            <div className="px-6">
                                <button
                                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm"
                                    onClick={() => showModal()}> Tambah </button>
                            </div>
                        </div>

                        <div className="px-6 mt-6 pb-6">
                            <List users={props.users}
                                handleShowModal={showModal}
                                handleShowAlert={showAlertModal} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
