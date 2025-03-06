import { ActionIcon } from "rizzui";
import ProfileMenu from "@/layouts/profile-menu";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import MoonSolidIcon from "@/components/icons/moon-solid";
import SunSolidIcon from "@/components/icons/sun-solid";
import { updateThemeColor } from "@/ui/update-theme-color.ts";
import { presetDark, presetLight } from "@/config/color-presets.ts";
import { useColorPresetName } from "@/ui/use-theme-color";

export default function HeaderMenuRight({ lang }: { lang?: string }) {
  const { theme, setTheme } = useTheme();
  const { colorPresetName } = useColorPresetName();

  useEffect(() => {
    if (theme === "light" && colorPresetName === "black") {
      updateThemeColor(
        presetLight.lighter,
        presetLight.light,
        presetLight.default,
        presetLight.dark,
        presetLight.foreground
      );
    }
    if (theme === "dark" && colorPresetName === "black") {
      updateThemeColor(
        presetDark.lighter,
        presetDark.light,
        presetDark.default,
        presetDark.dark,
        presetDark.foreground
      );
    }
  }, [theme, colorPresetName]);

  return (
    <div className="flex items-center justify-end space-x-4">
      <ActionIcon
        aria-label="Thème"
        variant="text"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
      >
        {theme === "light" ? (
          <MoonSolidIcon className="h-[18px] w-auto" />
        ) : (
          <SunSolidIcon className="h-[18px] w-auto" />
        )}
      </ActionIcon>
      <ProfileMenu lang={lang} />
    </div>
  );
}
