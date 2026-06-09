/**
 * Optional mock — use when MongoDB is not available locally.
 * Start with: node mock-db.js
 */
const { MongoMemoryServer } = require("mongodb-memory-server");

async function startMockDb() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.log(`Mock MongoDB running at: ${uri}`);
  console.log(`Set MONGODB_URL=${uri} in your .env file`);
}

startMockDb().catch(console.error);
