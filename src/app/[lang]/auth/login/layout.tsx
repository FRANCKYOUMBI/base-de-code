'use client';

import BerylLiumLayoutLogin from '@/layouts/beryllium/beryllium-layout-login';

export default function DefaultLayout({

    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: {
        lang: string;
    };
}) {
    return <BerylLiumLayoutLogin lang={lang}>{children}</BerylLiumLayoutLogin>;
}



