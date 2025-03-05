import { routes } from '@/config/routes';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import PageHeader from '@/components/page-header';

const pageHeader = {
  title: 'text-account-settings',
  breadcrumb: [
    {
      href: '/',
      name: 'text-home',
    },
    {
      href: routes.profile.profileSettings,
      name: 'text-form',
    },
    {
      name: 'text-account-settings',
    },
  ],
};

export default function ProfileSettingsLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProfileSettingsNav />
      {children}
    </>
  );
}
