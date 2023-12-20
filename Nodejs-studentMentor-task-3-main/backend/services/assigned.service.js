import { client } from '../index.js';

export function sendingStudentsBack(students) {
  return client.db("mentor-stud").collection("students").insertMany(students);
}
export function sendingMentorBack(mentor) {
  return client.db("mentor-stud").collection("mentors").insertOne(mentor);
}
export async function getAssigned(idIn) {
  return await client.db("mentor-stud").collection("assigned").findOneAndDelete({ id: idIn });
}
export function postAssigned(studArray, id, mentord) {
  return client.db("mentor-stud").collection("assigned").insertOne({
    students: studArray,
    id: id,
    mentor: mentord.value
  });
}
export async function setStudent(students, i) {
  return await client.db("mentor-stud").collection("students").findOneAndDelete({ "id": students[i] });
}
export async function getMentor(mentor) {
  return await client.db('mentor-stud').collection("mentors").findOneAndDelete({ "id": mentor });
}
export function getAssignedData() {
  return client.db("mentor-stud").collection("assigned").find({}).toArray();
}
