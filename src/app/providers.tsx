"use client";
import React from 'react';

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from 'notistack';

type Props ={
    children?: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
    return (
        <SessionProvider>
            <SnackbarProvider 
                autoHideDuration={3000}
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom"
                }}>
                {children}
            </SnackbarProvider>
        </SessionProvider>
    );
};