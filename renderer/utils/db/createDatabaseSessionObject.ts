// https://www.sitepoint.com/indexeddb-store-unlimited-data/

import { DATABASE_VERSION } from "@utils/constants";

export const createDatabaseSessionObject = (data: FocusSession) => {
  if (window.indexedDB) {
    // ! Increase the DATABASE_VERSION when changing the db schema
    const dbOpen = indexedDB.open("focus", DATABASE_VERSION);

    dbOpen.onupgradeneeded = (event) => {
      console.info(
        `upgrading database from ${event.oldVersion} to ${
          event.newVersion as number
        }...`
      );

      const db = dbOpen.result;

      switch (event.oldVersion) {
        case 0: {
          const session = db.createObjectStore("sessions", {
            keyPath: "id",
            autoIncrement: true,
          });

          session.createIndex("dateIdx", "date", { unique: false });
        }
        // Add you database schema changes below, as a new case...
      }
    };

    dbOpen.onsuccess = () => {
      const db = dbOpen.result;

      const write = db.transaction("sessions", "readwrite");
      const session = write.objectStore("sessions");

      const insert = session.add(data);

      insert.onerror = () => {
        console.error("session insert failure:", insert.error);
      };
    };
  } else {
    console.error("IndexedDB is not supported.");
  }
};
