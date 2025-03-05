"use client"
import React, { useState, createContext, ReactNode, useContext } from 'react';

type ModalContextType = {
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
};

const ModalContext:React.Context<ModalContextType | undefined> = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = (): ModalContextType => {
    const context:ModalContextType|undefined = useContext(ModalContext);
    if (!context) {
        throw new Error(
            "useModalContext must be used within a ModalProvider"
        )
    }
    return context
}

type ModalProviderProps = {
    children: ReactNode;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);

    const openModal = (content: ReactNode) => {
        setModalContent(content);
    };

    const closeModal = () => {
        setModalContent(null);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalContent &&
                modalContent
            }
        </ModalContext.Provider>
    );
};