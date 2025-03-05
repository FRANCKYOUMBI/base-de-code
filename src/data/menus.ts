export interface Menu {
    title: string,
    href: string,
}

export const hotelMenus: Menu[] = [
    {
        title: "Nouvelle requête",
        href: '/app'
    },
    {
        title: 'Historique missions',
        href: '/app/historique-missions'
    },
    {
        title: "Documents",
        href: '/app/document'
    },
    {
        title: "Profile",
        href: '/app/profile'
    }
]

export const extraMenus: Menu[] = [
    {
        title: "Mon profile",
        href: '/app/profile'
    },
    // {
    //     title: "Historique missions",
    //     href: '/app/historique-missions'
    // },
    {
        title: 'Missions',
        href: '/app/missions'
    },
    // {
    //     title: "Parainage",
    //     href: "/app/parainage"
    // },
    {
        title: "Formations",
        href: "/app/formations"
    }
]

export const adminMenus: Menu[] = [
    {
        title: "Requêtes",
        href: '/app/requetes'
    },
    {
        title: "Extras",
        href: '/app/extras'
    },
    {
        title: 'Hôtels',
        href: '/app/hotels'
    },
    {
        title: 'Historique missions',
        href: '/app/historique-missions'
    },
    {
        title: 'Facturation',
        href: '/app/facturation'
    },
    {
        title: 'Calendrier',
        href: '/app/calendrier'
    },
    {
        title: 'Rapport',
        href: '/app/rapport'
    },
]