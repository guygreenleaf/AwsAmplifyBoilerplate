import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PinMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly friends?: (string | null)[];
  readonly friendRequestsSent?: (string | null)[];
  readonly friendRequestsReceieved?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Pin {
  readonly id: string;
  readonly location: string;
  readonly description: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Pin, PinMetaData>);
  static copyOf(source: Pin, mutator: (draft: MutableModel<Pin, PinMetaData>) => MutableModel<Pin, PinMetaData> | void): Pin;
}