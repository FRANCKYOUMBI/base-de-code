"use client";

import Link from "next/link";
import {
  Text,
  Checkbox,
  Tooltip,
  ActionIcon,
} from "rizzui";
import { routes } from "@/config/routes";
import { RoleType } from "@/services/types/user";
import { HeaderCell } from "@/components/table";
import PencilIcon from "@/components/icons/pencil";
import DeletePopover from "@/components/delete-popover";

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  checkedItems,
  onDeleteItem,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: (
      <div className="ps-3.5">
        <Checkbox
          title={"Select All"}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: "Cocher",
    key: "Cocher",
    width: 30,
    renderSkeleton: (_: any, __: any) => (
      <div className="inline-flex ps-3.5">
        <div className="w-5 h-5 bg-gray-300 rounded-lg" />
      </div>
    ),
    render: (_: any, row: RoleType) => (
      <div className="inline-flex ps-3.5">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.uuid)}
          {...(onChecked && { onChange: () => onChecked(row.uuid) })}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Nom du rôle " />,
    dataIndex: "Nom du rôle",
    key: "Nom du rôle",
    width: 150,
    renderSkeleton: () => (
      <div className="animate-pulse flex items-center gap-3">
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-gray-300 rounded-lg" />
        </div>
      </div>
    ),
    render: (_: string, row: RoleType) => (
      <div> {row.name}</div>

    ),
  },
  {
    title: <HeaderCell title="Description" />,
    dataIndex: "Description",
    key: "Description",
    width: 150,
    renderSkeleton: () => (
      <div className="animate-pulse w-24 h-4 bg-gray-300 rounded-lg" />
    ),
    render: (_: string, row: RoleType) => (
      <Text className="text-sm">{row.description}</Text>
    ),
  },

  {
    title: (
      <HeaderCell
        title="Actions"
        className="flex items-center justify-end mr-5"
      />
    ),
    dataIndex: "Action",
    key: "Action",
    width: 120,
    renderSkeleton: () => (
      <div className="animate-pulse flex items-center justify-end gap-3 p-4">
        <div className="w-5 h-5 bg-gray-300 rounded-lg" />
        <div className="w-5 h-5 bg-gray-300 rounded-lg" />
      </div>
    ),
    render: (_: string, row: RoleType) => {
      return (
        <div className="flex items-center justify-end gap-3 pe-4">
          <Tooltip
            size="sm"
            content={"Editer l'utilisateur"}
            placement="top"
            color="invert"
          >
            <Link href={routes.users.edit(row.uuid)}>
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={"Editer l'utilisateur"}
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={"Supprimer l'utilisateur"}
            placement="top"
            color="invert"
          >
            <DeletePopover
              title={`Supprimer le rôle`}
              description={`Êtes-vous sûr de vouloir supprimer le rôle ${row.name}?`}
              onDelete={() => onDeleteItem(row.uuid)}
            />
          </Tooltip>
        </div>
      );
    },
  },
];
