import { client } from '../index.js';

export function deleteStudentFromDB(id) {
  return client.db("mentor-stud").collection("students").deleteOne({ id: id });
}
export function postStudentsToDB(data) {
  return client.db("mentor-stud").collection("students").insertMany(data);
}
export function putStudentsInDB(id, data) {
  return client.db("mentor-stud").collection("students").updateOne({ id: id }, { $set: data });
}
export async function getStudentsFromDB() {
  return await client.db("mentor-stud").collection("students").find({}).toArray();
}
