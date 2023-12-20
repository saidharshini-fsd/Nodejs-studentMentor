import express from 'express';
import { getStudentsFromDB, putStudentsInDB, postStudentsToDB, deleteStudentFromDB } from '../services/student.service.js';
const router = express.Router();


//student
router.get("/",async function (request, response) {
    const dataD=await getStudentsFromDB();
  response.send(dataD);
});

router.put("/:id",async function (request, response) {
    const data=request.body;
    const {id} =request.params ;
    const dataD=await putStudentsInDB(id, data)
  response.send(dataD);
});

router.post("/",async function (request, response) {
    const data =request.body;
    const d = await postStudentsToDB(data);
  response.send({message:"datas added successfully"});
});

router.delete("/:id",async function (request, response) {
    const {id} =request.params ;
    const d = await deleteStudentFromDB(id);
  response.send(d);
});

export default router;


