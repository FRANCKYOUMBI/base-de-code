import { Title, Text, ActionIcon, Button, Popover, ActionIconProps } from "rizzui";
import TrashIcon from "@/components/icons/trash";
import { PiTrashFill } from "react-icons/pi";
import { useTranslation } from "@/app/i18n/client";

type DeletePopoverProps = {
  title: string;
  description: string;
  onDelete?: () => void;
  lang?: string;
  size?: ActionIconProps["size"]
};

export default function DeletePopover({
  title,
  description,
  lang,
  onDelete,
}: DeletePopoverProps) {
  const { t } = useTranslation(lang || "fr", "table");

  return (
    <Popover placement="left">
      <Popover.Trigger>
        <ActionIcon
          size="lg"
          variant="outline"
          aria-label={'Delete Item'}
          className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
        >
          <TrashIcon className="h-4 w-4" />
        </ActionIcon>
      </Popover.Trigger>
      <Popover.Content className="z-10">
        {({ setOpen }) => (
          <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
            <Title
              as="h6"
              className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
            >
              <PiTrashFill className="me-1 h-[17px] w-[17px]" /> {t(title)}
            </Title>
            <Text className="mb-2 leading-relaxed text-gray-500">
              {description}
            </Text>
            <div className="flex items-center justify-end">
              <Button
                size="sm"
                className="me-1.5 h-7"
                onClick={() => {
                  setOpen(false);
                  if (onDelete) {
                    onDelete();
                  }
                }}
              >
                Oui
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7"
                onClick={() => setOpen(false)}
              >
                Non
              </Button>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
