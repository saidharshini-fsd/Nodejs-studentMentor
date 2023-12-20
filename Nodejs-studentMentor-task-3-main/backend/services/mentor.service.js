import { client } from '../index.js';

export async function deleteMentorFromDB(id) {
    return await client.db("mentor-stud").collection("mentors").deleteOne({ "id": `${id}` });
}
export async function postMentorToDB(data) {
    return await client.db("mentor-stud").collection("mentors").insertMany(data);
}
export async function putMentorFromDB(id, data) {
    return await client.db("mentor-stud").collection("mentors").updateOne({ id: id }, { $set: data });
}
export async function getMentorFromDB() {
    return await client.db("mentor-stud").collection("mentors").find({}).toArray();
}
