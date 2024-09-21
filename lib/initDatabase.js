const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
        username TEXT,
        hash TEXT,
        salt TEXT
    )
`

async function main() {
    console.log("seeding....");
    const client = new Client({
        connectionString: process.argv[2],
    });

    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("done");
}

main();