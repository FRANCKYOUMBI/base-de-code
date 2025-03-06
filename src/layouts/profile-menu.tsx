"use client";

import { Title, Text, Avatar, Button, Popover, Loader } from "rizzui";
import { routes } from "@/config/routes";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import avatarImg from '@public/avatars/avatar-12.webp';
import {User} from "@/services/types/user.ts";
import cn from "@/ui/class-names";
import { useModal } from "@/components/modal-views/use-modal";

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false,
  lang,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
  lang?: string;
}) {
  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
          className={cn(
            "w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10",
            buttonClassName
          )}
        >
          <Avatar
            src={'/avatars/avatar-12.webp'}
            name="John Doe"
            className={cn("!h-9 w-9 sm:!h-10 sm:!w-10 ring-2 ring-primary", avatarClassName)}
          />
          {!!username && (
            <span className="username hidden text-gray-200 dark:text-gray-700 md:inline-flex">
              Hi, Andry
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu lang={lang} />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}

const menuItems = [
  {
    name: "Mon compte",
    href: routes.profile.view,
  },
  {
    name: "Paramètres du profil",
    href: routes.profile.personalInformation,
  },
];

function LogoutConfirmationModal() {
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut({
        redirect: true,
        callbackUrl: routes.home
      });
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="mb-4 text-2xl font-semibold">Confirmer la déconnexion</h2>
      <p className="mb-6 text-gray-500">
        Êtes-vous sûr de vouloir vous déconnecter ?
      </p>
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleLogout}
          className="min-w-[120px]"
          type="submit"
          size="lg"
          disabled={loading}
        >
          {loading ? <Loader variant="spinner" /> : "Confirmer"}
        </Button>
        <Button
          onClick={closeModal}
          className="min-w-[120px]"
          variant="outline"
          size="lg"
        >
          Annuler
        </Button>
      </div>
    </div>
  );
}

function DropdownMenu({ lang }: { lang?: string }) {
  const { t } = useTranslation(lang!);
  const { data } = useSession();
  const { openModal } = useModal();
  const user: User = data?.user as User;

  const handleLogoutClick = () => {
    openModal({
      view: <LogoutConfirmationModal />,
      size: 'md',
    });
  };

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src={'/avatars/avatar-12.webp'}
          name="Albert Flores"
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {`${user?.firstName} ${user?.lastName}`}
          </Title>
          <Text className="text-gray-600">{user.email}</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={`/${lang}${item.href}`}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {t(item.name)}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={handleLogoutClick}
        >
          Se déconnecter
        </Button>
      </div>
    </div>
  );
}
