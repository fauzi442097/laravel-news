import { useState, useEffect } from "react";
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import List from "./List";
import AlertModal from '@/Components/AlertModal';
import ModalForm from "./Form";
import axios from "axios";

export default (props) => {

    const { data, setData, get, errors, setError, clearErrors, reset, post, put } = useForm({
        id: '',
        name: '',
    });

    const [roles, setRoles] = useState(props.roles);
    const [showModalAlert, setShowModalAlert] = useState(false);
    const [titleAlert, setTitleAlert] = useState("");
    const [bodyAlert, setBodyAlert] = useState("");
    const [buttonAlertName, setButtonAlertName] = useState("");
    const [userIdSelected, setUserIdSelected] = useState("");
    const [showError, setShowError] = useState(false);
    const [alertType, setAlertType] = useState("");

    useEffect(() => {
        console.log(alertType);
        if (alertType == 'success') {
            setTitleAlert("Sukses");
            setBodyAlert("Data berhasil disimpan");
        }
    }, [alertType]);

    const showModal = async (role_id) => {
        try {
            document.getElementById("modal-form").checked = true;
            document.getElementById("title-modal").innerText = "Tambah Role";

            if (role_id) {
                document.getElementById("title-modal").innerText = "Edit Role";
                let url = route('roles.show', { 'id': role_id });
                let response = await axios.get(url);
                let data = response.data;
                let role = data.role;

                setData({
                    id: role.id,
                    name: role.name,
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
            let url = route('roles.update', {'id' : data.id});
            if (isValid) {
                put(url, {
                    onSuccess: (response) => {
                        closeModal();
                        setAlertType("success");
                        setShowModalAlert(true);
                        setRoles(response.props.roles);
                    },
                    onError: (errors) => {
                        console.log('error');
                        console.log(errors.error);
                        if (errors.error) setShowError(true);
                    }
                })
            }
        } else {
            let url = route('roles.store');
            if (isValid) {
                post(url, {
                    onSuccess: (response) => {
                        closeModal();
                        setAlertType("success");
                        setShowModalAlert(true);
                        setRoles(response.props.roles);
                    },
                    onError: (errors) => {
                        console.log('error');
                        console.log(errors.error);
                        if (errors.error) setShowError(true);
                    }
                });
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

    const showAlertDelete = (user_id) => {
        setTitleAlert("Delete role");
        setBodyAlert("Anda yakin akan menghapus role ini?");
        setButtonAlertName("Hapus");

        setAlertType("confirm");
        setShowModalAlert(true);
        setUserIdSelected(user_id);
    }

    const deleteRole = async () => {
        try {
            setShowModalAlert(false);
            let url = route('roles.delete', { id: userIdSelected });
            let response = await axios.delete(url);

            console.log(response);

            if (response.data.code != 200) {
                setAlertType("warning");
                setTitleAlert("Warning");
                setShowModalAlert(true);
                setBodyAlert(response.data.message);
            } else {
                setAlertType("success");
                setTitleAlert("Sukses");
                setShowModalAlert(true);
                setBodyAlert(response.data.message);
                setRoles(response.data.roles);
            }
        } catch (errors) {
            console.log('error');
            console.log(errors.error);
        }
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
                errorResponse={showError}
             />

             {
                showModalAlert &&
                <AlertModal
                    typeAlert={alertType}
                    showAlert={showModalAlert}
                    id={userIdSelected}
                    setShowAlert={setShowModalAlert}
                    title={titleAlert}
                    body={bodyAlert}
                    buttonName={buttonAlertName}
                    handleAction={deleteRole}
                />
            }

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden m:rounded-lg">
                        <div className="flex justify-between flex-wrap  border-gray-200">
                            <div className="px-6 bg-white text-lg bold">Role List</div>
                            <div className="px-6">
                                <button
                                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm"
                                    onClick={() => showModal()}> Tambah </button>
                            </div>
                        </div>

                        <div className="px-6 mt-6 pb-6">
                            <List roles={roles}
                                handleShowModal={showModal}
                                handleShowAlert={showAlertDelete}
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
