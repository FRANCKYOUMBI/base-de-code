import { User } from "next-auth";
import {
  Role,
  Software,
  Storage,
  UsersOnSkills,
  UserStatus,
} from "@prisma/client";
import { DateTime } from "next-auth/providers/kakao";

export interface FakeMissionType {
  status: "primary" | "green" | "orange";
  title: string;
  date: Date;
  reference: string;
  userName?: string;
  userImageUrl?: string;
}

export interface MissionsStatistics {
  done: number;
  confirmed: number;
  waiting: number;
  executed: number;
}

export interface MissionRequestedExtrasType {
  extra: UserType;
  extraId: string;
  mission: MissionType;
  missionId: string;
  assignedAt: DateTime;
  assignedBy: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface MissionType {
  uuid?: string;
  reference: string;
  key: string;
  from: string | Date;
  to: string | Date;
  hours: number;
  status: "PERFORM" | "WAITING" | "CONFIRM" | "EXECUTE" | "CANCEL" | "DONE";
  shift: "MORNING" | "AFTERNOON" | "NIGHT";
  hotel?: UserType;
  acceptedBy?: UserType;
  acceptedAt?: string | Date;
  requestedExtras: MissionRequestedExtrasType[];
  review: Review[];
  createdAt?: number | Date;
  updatedAt?: string | Date;
}

export interface Review {
  uuid: string;
  mission?: MissionType;
  missionId: string;
  user?: User;
  userId: string;
  reviewBy?: "HOTEL" | "EXTRA";
  reviewValue: number;
  reviewText: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankInfoType {
  uuid?: string;
  rib: string | null;
  paypal: string | null;
  userId: string | undefined;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface UserType {
  uuid?: string;
  phoneNumber: string;
  firstName: string | null;
  lastName: string | null;
  hotelName: string | null;
  identifiant: string | null;
  email: string;
  address?: string | null;
  role: Role;
  skills?: UsersOnSkills[];
  software?: Software[];
  softwares?: HotelsHaveSoftwaresType[];
  documents?: DocumentsType[];
  avatar?: Storage;
  missionsAccepted?: MissionType[];
  missionsCreated?: MissionType[];
  missionsRequested?: MissionRequestedExtrasType[];
  reviews?: Review[];
  extraBankInfo?: BankInfoType;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface UsersOnSkillsType {
  id?: string;
  user?: UserType;
  skill?: SkillType;
  percent?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface SkillType {
  uuid?: string;
  name: string;
  users?: UsersOnSkillsType[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface PasswordForm {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface SoftwareType {
  uuid?: string;
  name: string;
  hotels?: HotelsHaveSoftwaresType[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
export interface HotelsHaveSoftwaresType {
  user?: UserType;
  userId?: string;
  software?: SoftwareType;
  softwareId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface DocumentsType {
  uuid?: string;
  name?: string;
  file?: Storage;
  hotel?: UserType;
  hotelId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
