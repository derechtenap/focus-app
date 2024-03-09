export const createDatabaseSessionObject = (data: FocusSession) => {
  if (window.indexedDB) {
    const dbOpen = indexedDB.open("focus", 1);

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
      }
    };

    dbOpen.onsuccess = () => {
      const db = dbOpen.result;

      const write = db.transaction("sessions", "readwrite");
      const session = write.objectStore("sessions");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const insert = session.add(data);
    };
  } else {
    console.error("IndexedDB is not supported.");
  }
};
