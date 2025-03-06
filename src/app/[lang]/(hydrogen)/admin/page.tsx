import { metaObject } from "@/components/site.config";
import AdminDashboard from "@/app/shared/admin_dashboard";

export const metadata = {
  ...metaObject("Admin dashboard"),
};

export default function AdminDashboardPage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return <AdminDashboard />;
}

