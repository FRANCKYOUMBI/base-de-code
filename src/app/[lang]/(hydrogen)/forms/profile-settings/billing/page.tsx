import BillingSettingsView from '@/app/shared/account-settings/billing-settings';
import { metaObject } from '@/components/site.config';

export const metadata = {
  ...metaObject('Billing'),
};

export default function IntegrationSettingsFormPage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return <BillingSettingsView />;
}
