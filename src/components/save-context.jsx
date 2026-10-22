import React, { useState } from "react";

const { shell } = require("electron");
const path = require("path");
const app = path.join(
  "D:/SteamLibrary/steamapps/common/HollowKnight/hollow_knight.exe"
);
// Open a local file in the default app

function doSomething() {
  shell.openExternal(app);
}
