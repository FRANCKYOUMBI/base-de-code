"use client";

import Header from "@/layouts/beryllium/beryllium-header";
import BerylliumLeftSidebarFixed from "@/layouts/beryllium/beryllium-left-sidebar-fixed";
import cn from "@/ui/class-names";
import SidebarExpandable from "@/layouts/beryllium/beryllium-sidebar-expanded";
import { useBerylliumSidebars } from "@/layouts/beryllium/beryllium-utils";
import { Role } from "@/services/types/role-permissions";
import { useSession } from "next-auth/react";
import { UserList } from "@/services/types/user";

export default function BerylliumLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang?: string;
}) {

  const { expandedLeft } = useBerylliumSidebars();

  const { data } = useSession();
  const user: UserList = data?.user as UserList;
  const userRole = user?.role as Role;
  return (
    <main className={cn("flex min-h-screen flex-grow")}>
      <BerylliumLeftSidebarFixed lang={lang} userRole={userRole as Role} />
      <SidebarExpandable lang={lang} />
      <div className="flex w-full flex-col ">
        <Header className="xl:ms-[88px]" lang={lang} />
        <div
          className={cn(
            "flex flex-grow flex-col gap-4 px-4 pb-6 duration-200 md:px-5 lg:pb-8  xl:pe-8 ",
            expandedLeft ? "xl:ps-[414px]" : "xl:ps-[110px]"
          )}
        >
          <div className="grow xl:mt-4">{children}</div>
        </div>
      </div>
    </main>
  );
}
