"use client";

import Link from "next/link";
import {
  Badge,
  Text,
  Checkbox,
  Tooltip,
  ActionIcon,
} from "rizzui";
import { routes } from "@/config/routes";
import PencilIcon from "@/components/icons/pencil";
import { UserList } from "@/services/types/user";
import DeletePopover from "@/components/delete-popover";
import EyeIcon from "@/components/icons/eye";
import { HeaderCell } from "@/components/table";

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
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: (
        <div className="w-full flex justify-center ">
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
        <div className="w-full flex justify-center">
        <div className="w-10 h-5 bg-gray-300 rounded-lg" />
      </div>
    ),
    render: (_: any, row: UserList) => (
      <div className="w-full flex justify-center">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.uuid)}
          {...(onChecked && { onChange: () => onChecked(row.uuid) })}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Prénom" />,
    dataIndex: "Prenom",
    key: "Prenom",
    width: 100,
    renderSkeleton: () => (
      <div className="animate-pulse flex items-center gap-3">
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-gray-300 rounded-lg" />
        </div>
      </div>
    ),
    render: (_: string, row: UserList) => (
      <div> {row.lastName}</div>

      // avatarProps={{
      //   name: row.name,
      //   size: "lg",
      //   className: "rounded-lg",
      // }}
      //   />
    ),
  },
  {
    title: <HeaderCell title="Nom" />,
    dataIndex: "Nom",
    key: "Nom",
    width: 100,
    renderSkeleton: () => (
      <div className="animate-pulse w-24 h-4 bg-gray-300 rounded-lg" />
    ),
    render: (_: string, row: UserList) => (
      <Text className="text-sm">{row.firstName}</Text>
    ),
  },
  {
    title: <HeaderCell title="Email" />,
    onHeaderCell: () => onHeaderCellClick("Email"),
    dataIndex: "Email",
    key: "Email",
    width: 120,
    renderSkeleton: () => (
      <div className="animate-pulse w-24 h-4 bg-gray-300 rounded-lg" />
    ),
    render: (_: string, row: UserList) => (
      <Text className="font-medium text-gray-700">{row.email}</Text>
    ),
  },
  // {
  //   title: <HeaderCell title="Permission(s)" />,
  //   dataIndex: "Permission",
  //   key: "Permission",
  //   width: 120,
  //   renderSkeleton: () => (
  //     <div className="animate-pulse w-24 h-4 bg-gray-300 rounded-lg" />
  //   ),
  //   render: (_: string, row: UserList) => (
  //     <div className="font-medium text-gray-700 flex gap-2">
  //       <div className="p-1 rounded-md  text-sm border border-1 ">Voir</div>
  //       <div className="p-1 rounded-md  text-sm border border-1 ">Ajouter</div>
  //       <div className="p-1 rounded-md  text-sm  border border-1">Modifier</div>
  //      </div>
  //   ),
  // },
  
  {
    title: <HeaderCell title="Rôle" />,
    onHeaderCell: () => onHeaderCellClick("Role"),
    dataIndex: "Rôle",
    key: "Rôle",
    width:80,
    renderSkeleton: () => (
      <div className="animate-pulse w-12 h-4 bg-gray-300 rounded-lg" />
    ),
    render: (_: string, row: UserList) => (
      <Text className="font-medium text-gray-700">{row.role}</Text>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    onHeaderCell: () => onHeaderCellClick("Status"),
    dataIndex: "Status",
    key: "Status",
    width: 50,
    renderSkeleton: () => (
      <div className="animate-pulse w-12 h-4 bg-gray-300 rounded-lg" />
    ),
    render: (_: string, row: UserList) => (
      <span className="flex items-center">
        {row.activated ? (
          <span className="text-green-500">
            <Badge renderAsDot color="success" /> Actif
          </span>
        ) : (
          <span className="text-red-500">
            <Badge renderAsDot color="danger" /> Inactif
          </span>
        )}
      </span>
    ),
  },


  {
    title: <HeaderCell title="Actions"  className="flex w-full items-center !justify-center px-3"/>,
    dataIndex: "Action",
    key: "Action",
    width: 80,
    renderSkeleton: () => (
      <div className="animate-pulse flex items-center justify-center gap-3 px-4">
        <div className="w-5 h-5 bg-gray-300 rounded-lg" />
        <div className="w-5 h-5 bg-gray-300 rounded-lg" />
        <div className="w-5 h-5 bg-gray-300 rounded-lg" />
      </div>
    ),
    render: (_: string, row: UserList) => {
      return (
        <div className="flex items-center justify-center gap-3 px-4">
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
                aria-label={"Edit Product"}
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={"Voir les détails de l'utilisateur"}
            placement="top"
            color="invert"
          >
            <Link href={routes.users.edit(row.uuid)}>
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={"Voir les détails de l'utilisateur"}
              >
                <EyeIcon className="h-4 w-4" />
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
              title={`Supprimer la L'utilisateur`}
              description={`Êtes-vous sûr de vouloir supprimer l'utilisateur ${row.firstName}?`}
              onDelete={() => onDeleteItem(row.uuid)}
            />
          </Tooltip>
        
        </div>
      );
    },
  },
];

 