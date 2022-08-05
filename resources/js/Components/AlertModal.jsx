import { useEffect, useState } from "react"
import AlertModalConfirm from "./AlertModalConfirm";
import AlertModalSuccess from "./AlertModalSuccess";
import AlertModalWarning from "./AlertModalWarning";

const AlertModal = ({typeAlert, showAlert, setShowAlert, id, title, body, handleAction, buttonName}) => {

    const [show, setShow] = useState(showAlert);
    const closeModalAlert = () => {
        setShow(false);
        document.getElementById("modal-alert").checked = false;
        setShowAlert(false);
    }

    useEffect(() => {
        if ( show ) {
            document.getElementById("modal-alert").checked = true;
        }
    });

    if (typeAlert == 'confirm') {
        return (
            <>
                <input type="checkbox" id="modal-alert" className="modal-toggle" />
                <div className="modal">
                    <AlertModalConfirm
                        body={body}
                        title={title}
                        id={id}
                        handleAction={handleAction}
                        closeModalAlert={closeModalAlert}
                        buttonName={buttonName}
                    />
                </div>
            </>
        )
    } else if (typeAlert == 'success') {
        return (
            <>
                <input type="checkbox" id="modal-alert" className="modal-toggle" />
                <div className="modal">
                    <AlertModalSuccess
                        body={body}
                        title={title}
                        closeModalAlert={closeModalAlert}
                    />
                </div>
            </>
        )
    } else if (typeAlert == 'warning') {
        return (
            <>
                <input type="checkbox" id="modal-alert" className="modal-toggle" />
                <div className="modal">
                    <AlertModalWarning
                        body={body}
                        title={title}
                        closeModalAlert={closeModalAlert}
                    />
                </div>
            </>
        )
    }

}

export default AlertModal
