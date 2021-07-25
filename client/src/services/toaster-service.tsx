import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import React from "react";

let autoClose = 1000 * 5;
let options = {
    autoClose: autoClose,
    position: toast.POSITION.TOP_RIGHT,
    pauseOnFocusLoss: false,
    hideProgressBar: true
}


class ToasterService {

    static getMessageWithIcons(message: string, type: string) {
        switch (type) {
            case "success":
                return (<span><i className="fa fa-check-circle mr-1"/>{message}</span>)
            case "error":
                return (<span><i className="fa fa-exclamation-circle mr-1"/>{message}</span>)
            case "warn":
                return (<span><i className="fa fa-exclamation-circle mr-1"/>{message}</span>)
            case "info":
                return (<span><i className="fa fa-question-circle mr-1"/>{message}</span>)
            default:
                return message;
        }
    }

    static Configure() {
        toast.configure(options)
    }

    static Toast(message: any, type: string, autoclose?: number, customClass?: string, customOptions?: any, toastId?: any) {

        if (message instanceof Object) {
            message = JSON.stringify(message)
        }
        switch (type) {
            case "success":
                toast.success(this.getMessageWithIcons(message, type), {
                    ...(autoclose !== undefined && {
                        autoClose: autoclose
                    }),
                    ...(customClass && {
                        className: customClass
                    }),
                    ...customOptions
                })
                break;
            case "error":
                toast.error(this.getMessageWithIcons(message, type), {
                    ...(autoclose !== undefined && {
                        autoClose: autoclose
                    }),
                    ...(customClass && {
                        className: customClass
                    }),
                    ...customOptions
                })
                break;
            case "info":
                toast.info(this.getMessageWithIcons(message, type), {
                    ...(autoclose !== undefined && {
                        autoClose: autoclose
                    }),
                    ...(customClass && {
                        className: customClass
                    }),
                    ...customOptions
                })
                break;
            case "warn":
                toast.warn(this.getMessageWithIcons(message, type), {
                    ...(autoclose !== undefined && {
                        autoClose: autoclose
                    }),
                    ...(customClass && {
                        className: customClass
                    }),
                    ...customOptions
                })
                break;
            case "update":
                toast.update(toastId, {
                    ...(autoclose !== undefined && {
                        autoClose: autoclose
                    }),
                    ...(customClass && {
                        className: customClass
                    }),
                    ...customOptions
                })
                break;
            case "close":
                toast.dismiss(toastId);
                break;
            default:
                toast.success(this.getMessageWithIcons(message, type || 'success'), {
                    ...(autoclose !== undefined && {
                        autoClose: autoclose
                    }),
                    ...(customClass && {
                        className: customClass
                    }),
                    ...customOptions
                })
        }
    }
}

export default ToasterService;
