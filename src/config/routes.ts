
export const routes = {
    home: "/",
    admin: "/admin",
    hero_top: {
        about: "/home_page/hero_top/about",
        services: "/home_page/hero_top/services",
        career: "/home_page/hero_top/career",
        legal: "/home_page/hero_top/legal" //Not implemented
    },

    signIn: "/auth/login",
    auth: {
        register: "/auth/register",
        forgotPassword: "/auth/forgot-password",
        otp: "/auth/otp"
    },
    users: {
        listing: "/admin/users",
        create: "/admin/users/create",
        edit: (id: string) => `/admin/users/${id}/edit`,
        detailUser: (uuid: string) => `/admin/users/${uuid}`,
        roles: {
            listing: "/admin/users/roles",
        },
    },

    widgets: {
        cards: "/widgets/cards",
        charts: "/widgets/charts",
        banners: "/widgets/banners",
    },

    accessDenied: "/access-denied",
    dashboard: "/dashboard",
    notFound: "/not-found",
    profile: {
        view: "/admin/forms/profile",
        profileSettings: "/admin/forms/profile-settings",
        notificationPreference: "/admin/forms/profile-settings/notification",
        personalInformation: "/admin/forms/profile-settings/profile",
        newsletter: "/admin/forms/newsletter",
    }
}