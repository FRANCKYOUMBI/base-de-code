import ProfileSettingsView from '@/app/shared/account-settings/profile-settings';
import { metaObject } from '@/components/site.config';

export const metadata = {
  ...metaObject('Profile'),
};

export default function ProfileSettingsFormPage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return <ProfileSettingsView />;
}
