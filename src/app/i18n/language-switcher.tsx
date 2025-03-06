"use client";

import { useTranslation } from "./client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import cn from "@/ui/class-names";
import { PiCaretDownBold } from "react-icons/pi";
import { FRFlag } from "@/components/icons/language/FRFlag.tsx";
import { USFlag } from "@/components/icons/language/USFlag";
import useQueryParams from "@/hooks/use-query-params";
import { Listbox, Transition } from "@headlessui/react";

type LanguageMenuProps = {
  id: string;
  name: string;
  value: string;
  icon: React.ReactNode;
};

const languageMenu: LanguageMenuProps[] = [
  {
    id: "fr",
    name: "Français - FR",
    value: "fr",
    icon: <FRFlag />
  },
  {
    id: "en",
    name: "English - EN",
    value: "en",
    icon: <USFlag />,
  },
];

export default function LanguageSwitcher({
  lang,
  className,
  iconClassName,
  variant = "icon",
}: {
  lang: string;
  className?: string;
  iconClassName?: string;
  variant?: "text" | "icon";
}) {
  const { t } = useTranslation(lang!);
  const router = useRouter();
  const pathname = usePathname();
  const pathnameSplit = pathname.split("/");
  const newPathname: string = pathnameSplit.slice(2, pathnameSplit.length).join("/");
  const { query } = useQueryParams(pathname ?? "/");
  const options = languageMenu;
  const currentSelectedItem = lang ? options.find((o) => o.value === lang)! : options[0];
  const [selectedItem, setSelectedItem] = useState(currentSelectedItem);

  function handleItemClick(values: any) {
    setSelectedItem(values);
    const pushPathname: string = `/${values.value}/${newPathname}${query}`;
    router.push(pushPathname);
  }

  return (
    <>
      <Listbox
        value={selectedItem}
        onChange={handleItemClick}
      >
        {({ open }) => (
          <div className="relative cursor-pointer z-10 lg:top-[1px] group">
            <div
              className={cn(
                "relative flex h-[34px] w-14 items-center justify-center rounded-md p-1 shadow backdrop-blur-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-opacity-50 hover:enabled:text-gray-1000 active:enabled:translate-y-px dark:bg-gray-100",
                className
              )}
            >
              {variant === "text" ? (
                <span className="block w-full truncate text-left uppercase underline underline-offset-4 rtl:text-right">
                  {t(selectedItem?.value)}
                </span>
              ) : (
                <div className="flex items-center justify-center gap-2 uppercase">
                  <span className={cn("h-4 w-5 shrink-0 overflow-hidden", iconClassName)}>
                    {selectedItem?.icon}
                  </span>
                  <PiCaretDownBold className="size-3.5" />
                </div>
              )}
            </div>
            <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute end-0 z-40 mt-1 max-h-[260px] w-full min-w-[165px] max-w-[165px] overflow-auto rounded-md border border-gray-100 bg-gray-0 p-2 outline-none ring-0 drop-shadow-lg focus:outline-none dark:bg-gray-100 transition-all duration-300 ease-out cursor-pointer">
              {options?.map((option) => (
                <button
                  key={option.id}
                  className="peer relative flex h-10 w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm leading-[40px] text-gray-900 transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-50"
                  onClick={() => handleItemClick(option)}
                >
                  <span className="flex items-center">
                    <span className="h-4 w-[22px]">{option?.icon}</span>
                    <span className={`${option.value === selectedItem.value ? "font-medium" : "font-normal"} block truncate pb-0.5 text-sm ltr:ml-1.5 rtl:mr-1.5`}>
                      {t(option?.name)}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </Listbox>

      {/* <SelectBox
        selectClassName="w-full shadow backdrop-blur-md dark:bg-gray-100 border-transparent"
        options={options}
        value={selectedItem}
        onChange={handleItemClick}
        getOptionValue={(option) => option}
        displayValue={(selected: any) =>
          options?.find((option) => option.value === selected?.value)?.name
        }
      /> */}
    </>
  );
}
