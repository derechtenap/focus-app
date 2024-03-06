import { APP_NAME } from "@utils/constants";
import { ipcRenderer } from "electron";
import { existsSync, mkdirSync } from "fs";
import path from "path";

export const checkAppFolderPath = () => {
  try {
    ipcRenderer.send("get-app-folder");

    ipcRenderer.on("app-folder-response", (e, appPath) => {
      const appRootPath = path.join(appPath as string, APP_NAME);

      if (!existsSync(path.join(appRootPath, "/sessions"))) {
        mkdirSync(path.join("/sessions"));
      }
    });
  } catch {
    throw new Error("Unable to check app folder paths!");
  } finally {
    console.info("Check app folder path finished...");
  }
};
