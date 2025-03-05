import './globals.css';
import './calendar.css';
import './timepicker.css';

import React from "react";
import moment from "moment";
import 'moment/locale/fr'
import { Providers } from './providers';


moment.locale('fr')

export const metadata = {
    title: 'Vquarius Vgency',
    description: 'Recrutez et gérez des extras en un clic',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {


    return (
        <html lang="fr" className={''}>
            <body className={`bg-white`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
