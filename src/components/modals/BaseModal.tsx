import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
type ModalProps = {
    header?: string
    content: React.ReactNode;
    closeModal: () => void;
    type?: "primary" | "green" | "orange" | "black",
    width?: number
    title?: boolean,
};

export const BaseModal: React.FC<ModalProps> = ({
    content,
    closeModal, type = "black",
    header,
    width = 614,
    title,
}) => {
    const modalWidth = "max-w-[" + width.toString() + "px]";
    return (
        <Transition appear show={content !== null} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[#a19ead] bg-opacity-30 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center text-center p-[10px] md:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`w-[614px] transform overflow-hidden 
                                rounded-0  text-left align-middle  ${title?'':'shadow-md bg-white'}
                                transition-all`}
                            >
                                {
                                    title ?
                                        ""
                                        :
                                        (
                                            <Dialog.Title
                                                as="h3"
                                                className={`flex justify-between items-center text-lg font-medium leading-6 text-white bg-${type} px-6 py-3`}
                                            >
                                                {header ? header : "Action"}
                                                <button
                                                    onClick={closeModal}
                                                    className='outline-none border-solid border-[2px] border-white rounded-md'
                                                >
                                                    <svg
                                                        className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </Dialog.Title>
                                        )
                                }
                                <div className="mt-2">
                                    {content}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};