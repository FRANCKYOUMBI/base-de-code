import { permission } from "process";

export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  SALES = 'sales',
}

export enum Permission {
  VIEW_DASHBOARD = 'VIEW_DASHBOARD',
  MANAGE_PRODUCTS = 'MANAGE_PRODUCTS',
  MANAGE_USERS = 'MANAGE_USERS',
  MANAGE_TRANSACTIONS = 'MANAGE_TRANSACTIONS',
  VIEW_REPORTS = 'VIEW_REPORTS',
  MANAGE_INVENTORY = 'MANAGE_INVENTORY',
  CONFIGURE_SETTINGS = 'CONFIGURE_SETTINGS',
  MANAGE_ORDERS = 'MANAGE_ORDERS',
  MANAGE_PURCHASES = 'MANAGE_PURCHASES',
  MANAGE_CLIENTS = 'MANAGE_CLIENTS',
  MANAGE_STOCK = 'MANAGE_STOCK',
  MANAGE_PARTNERS = 'MANAGE_PARTNERS',
  MANAGE_ACCOUNITNG = 'MANAGE_ACCOUNITNG',
  MANAGE_MAINTAINANCE = 'MANAGE_MAINTAINANCE',
  MANAGE_SETTINGS = 'MANAGE_SETTINGS',
  MANAGE_PAYMENT_ACCOUNTS = 'MANAGE_PAYMENT_ACCOUNTS',
  VIEW_PRODUCTS = 'VIEW_PRODUCTS',
  VIEW_CONTABILITE = 'VIEW_CONTABILITE',

  // Ajoutez d'autres permissions selon vos besoins     
}

export const rolePermissions = {
  [Role.ADMIN]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_PRODUCTS,
    Permission.MANAGE_TRANSACTIONS,
    Permission.VIEW_REPORTS,
    Permission.MANAGE_USERS,
    Permission.MANAGE_INVENTORY,
    Permission.CONFIGURE_SETTINGS,
    Permission.MANAGE_ORDERS,
    Permission.MANAGE_PURCHASES,
    Permission.MANAGE_CLIENTS,
    Permission.MANAGE_STOCK,
    Permission.MANAGE_PARTNERS,
    Permission.CONFIGURE_SETTINGS,
    Permission.MANAGE_ACCOUNITNG,
    Permission.MANAGE_MAINTAINANCE,
    Permission.MANAGE_SETTINGS,
    Permission.MANAGE_PAYMENT_ACCOUNTS,
    Permission.VIEW_PRODUCTS,
    Permission.MANAGE_STOCK,
    Permission.MANAGE_PARTNERS,
    Permission.MANAGE_ACCOUNITNG,
    Permission.MANAGE_MAINTAINANCE,
    Permission.MANAGE_SETTINGS,
    Permission.MANAGE_PAYMENT_ACCOUNTS,
    Permission.VIEW_PRODUCTS,
    Permission.VIEW_CONTABILITE
  ],

  [Role.MANAGER]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_PRODUCTS,
    Permission.MANAGE_TRANSACTIONS,
    Permission.VIEW_REPORTS,
    Permission.MANAGE_ORDERS,
    Permission.MANAGE_PURCHASES,
    Permission.MANAGE_CLIENTS,
    Permission.MANAGE_PARTNERS,
    Permission.VIEW_PRODUCTS,  
    Permission.VIEW_CONTABILITE 
  ],
  
  [Role.SALES]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_TRANSACTIONS,
    Permission.MANAGE_PURCHASES,
    Permission.MANAGE_ORDERS,
    Permission.VIEW_PRODUCTS,
  ],
};