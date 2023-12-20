import express from "express";
import { getMentorFromDB, putMentorFromDB, postMentorToDB, deleteMentorFromDB } from "../services/mentor.service.js";
const router = express.Router();


router.get("/",async function (request, response) {
    const dataD=await getMentorFromDB();
  response.send(dataD);
});

router.put("/:id",async function (request, response) {
    const data=request.body;
    const {id} =request.params ;
    const dataD=await putMentorFromDB(id, data)
  response.send(dataD);
});

router.post("/",async function (request, response) {
    const data =request.body;
    const d = await postMentorToDB(data);
  response.send({message:"datas added successfully"});
});

router.delete("/:id",async function (request, response) {
  const {id} =request.params ;
  const d = await deleteMentorFromDB(id);
  response.send(d);
});


export default router


