import { openDatabase, enablePromise } from 'react-native-sqlite-storage';

enablePromise(true);

const DATABASE_NAME = "COMP1786_ReactNative";
const TABLE_NAME = "Trips";
const COLUMN_ID = "id";
const COLUMN_NAME = "name";
const COLUMN_DESTINATION = "destination";
const COLUMN_DATE = "date";
const COLUMN_RISKASSESSMENT = "riskAssessment";
const COLUMN_DESCRIPTION = "description";


export async function getDbConnection() {
  const db = openDatabase({ name: DATABASE_NAME, location: 'default' });
  return db;
}

export async function createTable(db) {
  const query = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
  (
    ${COLUMN_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${COLUMN_NAME} VARCHAR(255),
    ${COLUMN_DESTINATION} VARCHAR(255),
    ${COLUMN_DATE} VARCHAR(255),
    ${COLUMN_RISKASSESSMENT}  VARCHAR(255),
    ${COLUMN_DESCRIPTION} VARCHAR(255)
  )`;
  return db.executeSql(query);
}

export async function initDatabase() {
  const db = await getDbConnection();
  await createTable(db);
  db.close();
}

export async function insertTrip(db, name, destination, date, risk, description) {
  const insertQuery = `INSERT INTO ${TABLE_NAME}
  (
    ${COLUMN_NAME},
    ${COLUMN_DESTINATION},
    ${COLUMN_DATE},
    ${COLUMN_RISKASSESSMENT},
    ${COLUMN_DESCRIPTION}
  )
  VALUES ("${name}","${destination}","${date}","${risk}","${description}")`;
  return db.executeSql(insertQuery);
}

export async function getTrips(db) {
  const trip = [];
  const results = await db.executeSql(`SELECT * FROM ${TABLE_NAME}`);
  results.forEach(function (resultSet) {
    for (let i = 0; i < resultSet.rows.length; i++) {
      trip.push(resultSet.rows.item(i));
    }
  });
  return trip;
}

export async function updateTrip(db, name, destination, date, risk, description, id) {
  const insertQuery = `
  UPDATE ${TABLE_NAME}
  SET
    ${COLUMN_NAME} = "${name}",
    ${COLUMN_DESTINATION} = "${destination}",
    ${COLUMN_DATE} = "${date}",
    ${COLUMN_RISKASSESSMENT} = "${risk}",
    ${COLUMN_DESCRIPTION} = "${description}"
  WHERE ${COLUMN_ID} = ${id}`;
  return db.executeSql(insertQuery);
}

export async function getTripById(db, id) {
  const result = await db.executeSql(`SELECT * FROM ${TABLE_NAME} WHERE ${COLUMN_ID} = ${id}`);
  return result[0].rows.item(0);
}

export async function deleteTrip(db, id) {
  const deleteQuery = `DELETE FROM ${TABLE_NAME} WHERE ${COLUMN_ID} = ${id}`;
  return db.executeSql(deleteQuery);
}

export async function deleteAll(db) {
  const deleteAllQuery = `DELETE FROM ${TABLE_NAME}`;
  return db.executeSql(deleteAllQuery);
}
