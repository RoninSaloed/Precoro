export class AppResources {
  static readonly USERS = "users";
  static readonly DATA = "data";
  static readonly UPDATE = "update";

  static readonly getUsers = (): string => {
    return `${AppResources.USERS}`;
  };

  static readonly getApprovers = (): string => {
    return `${AppResources.DATA}`;
  };

  static readonly updateDocument = (): string => {
    return `${AppResources.UPDATE}`;
  };
}
