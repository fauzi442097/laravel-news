import { useEffect, useState } from "react"

const AlertModal = ({showAlert, title, body, handleAction, buttonName}) => {

    console.log(showAlert);

    const [show, setShow] = useState(showAlert);

    const closeModalAlert = () => {
        document.getElementById("modal-alert").checked = false;
        setShow(false);
    }

    useEffect(() => {
        if ( show ) {
            document.getElementById("modal-alert").checked = true;
        }
    }, [show])


    return (
        <>
            <input type="checkbox" id="modal-alert" className="modal-toggle" />
            <div className="modal">
                <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-xl font-semibold text-indigo-500" id="modal-title">{title}</h3>
                                <div className="my-4">
                                    <p className="text-gray-500">{body}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={handleAction} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">{buttonName}</button>
                        <button onClick={closeModalAlert}  type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Batal</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlertModal
