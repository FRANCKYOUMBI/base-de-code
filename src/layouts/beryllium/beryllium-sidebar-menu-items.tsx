import { routes } from '@/config/routes';
import {
  PiSquaresFour,
  PiChartLineUp,
  PiUserGear,
  PiBellSimpleRinging,
  PiUser,
  PiEnvelopeSimpleOpen,
  PiFolders,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const berylliumSidebarMenuItems = [
  // label start
  {
    name: 'Overview',
  },
  // label end
  {
    name: 'File Manager',
    href: '/',
    icon: <PiFolders />,
  },
  // label start
  {
    name: 'Widgets',
  },
  // label end
  {
    name: 'Cards',
    href: routes.widgets.cards,
    icon: <PiSquaresFour />,
  },
  {
    name: 'Charts',
    href: routes.widgets.charts,
    icon: <PiChartLineUp />,
  },
  // label start
  {
    name: 'Forms',
  },
  // label end
  {
    name: 'Account Settings',
    href: routes.profile.profileSettings,
    icon: <PiUserGear />,
  },
  {
    name: 'Notification Preference',
    href: routes.profile.notificationPreference,
    icon: <PiBellSimpleRinging />,
  },
  {
    name: 'Personal Information',
    href: routes.profile.personalInformation,
    icon: <PiUser />,
  },
  {
    name: 'Newsletter',
    href: routes.profile.newsletter,
    icon: <PiEnvelopeSimpleOpen />,
  }
];
