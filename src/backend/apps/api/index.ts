import { LOG, OK } from "../../_shared/log/log";
import { getProjects } from "./../../result/result";

// LOG(OK, 'API is running...more!!!');

export const random = () => {};
const fs = require('fs');

const config = require("./../../../../project.config.js");

const projects = getProjects([]);

// TODO: make watch just re-cycle once
fs.writeFileSync(`${config.DATA_PATH}/tag.json`, JSON.stringify(projects));