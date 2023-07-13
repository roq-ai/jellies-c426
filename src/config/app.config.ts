interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Admin'],
  customerRoles: [],
  tenantRoles: ['Accountant', 'Customer Support', 'Admin', 'Driver'],
  tenantName: 'Company',
  applicationName: 'Jellies ',
  addOns: ['chat', 'notifications', 'file'],
};
