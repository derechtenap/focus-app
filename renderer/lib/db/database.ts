import Dexie, { type EntityTable } from "dexie";

import { APP_NAME } from "utils/constants";

const lowerCasedAppName = APP_NAME.toLowerCase();

const database = new Dexie(lowerCasedAppName) as Dexie & {
  profiles: EntityTable<Profile>;
};

// @see Documentation: https://dexie.org/docs/Version/Version.stores()
database.version(1).stores({
  profiles: "&uuid", // UUID is the unique index
});

export default database;
