import {readFileSync} from "node:fs";
import {pool} from "../../database/database.js";

const requests = readFileSync(
    './scripts/SQL/initAndInsertDB.sql',
    {encoding: "utf-8"}
);

try {
    await pool.query(requests, []);
    console.log("done");
} catch (e) {
    console.error(e);
}