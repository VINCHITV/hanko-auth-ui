import React, {ReactNode} from "react";
import {closeModal} from "@/utils/modal";

export const SavePasskeyModal = ({body, buttons, modalId, title, onClose}: {
    body: ReactNode;
    modalId: string;
    title?: string;
    buttons?: ReactNode;
    onClose?: () => void
}) => {
    return <>
        <input type="checkbox" id={modalId} className="modal-toggle"/>
        <div className="modal">
            <div className="modal-box relative">
                <button onClick={() => {
                    if (onClose) {
                        onClose();
                    }
                    closeModal(modalId);
                }} className="btn btn-sm btn-circle absolute right-2 top-2">✕
                </button>
                <h3 className="text-lg font-bold">{title ?? 'Alert'}</h3>
                {body}
                <div className="modal-action">
                    {buttons ?? null}
                </div>
            </div>
        </div>
    </>
};