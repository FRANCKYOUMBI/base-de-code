import { routes } from '@/config/routes';
// Note: do not add href in the label object, it is rendering as label
export const pageLinks = [
  // label start
  {
    name: 'Home',
  },
  // label end
  {
    name: 'Apps',
  },
  // label end

  // label start
  {
    name: 'Widgets',
  },
  // label end
  {
    name: 'Cards',
    href: routes.widgets.cards,
  },

  {
    name: 'Charts',
    href: routes.widgets.charts,
  },
  // {
  //   name: 'Banners',
  //   href: routes.widgets.banners,
  // },

  // label start
  {
    name: 'Forms',
  },
  // label end
  {
    name: 'Profile Settings',
    href: routes.profile.profileSettings,
  },
  {
    name: 'Notification Preference',
    href: routes.profile.notificationPreference,
  },
  {
    name: 'Personal Information',
    href: routes.profile.personalInformation,
  },
  // label start
  {
    name: 'Pages',
  },
  // label end
  {
    name: 'Profile',
    href: routes.profile,
  },
  {
    name: 'Access Denied',
    href: routes.accessDenied,
  },
  {
    name: 'Not Found',
    href: routes.notFound,
  },
 
  {
    name: 'Authentication',
  },
  // label end
  {
    name: 'Modern Sign Up',
    href: routes.auth.register,
  },
  {
    name: 'Modern Sign In',
    href: routes.signIn,
  },
  {
    name: 'Modern Forgot Password',
    href: routes.auth.forgotPassword,
  },

  {
    name: 'Modern OTP Page',
    href: routes.auth.otp,
  },
];
