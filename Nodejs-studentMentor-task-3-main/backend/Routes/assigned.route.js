import express from "express";
import { getAssigned,getAssignedData, getMentor, setStudent, postAssigned, sendingMentorBack, sendingStudentsBack } from "../services/assigned.service.js";
const router = express.Router();



//Assigned
router.get("/",async function (request, response) {
    const dataD=await getAssignedData();
  response.send(dataD);
});

router.post("/",async function (request, response) {
    const data =request.body;
    const id=data.id;
    const mentor=data.mentor;
    const students=data.students;
    const mentord = await getMentor(mentor)
    let studArray=[];
      for(let i=0;i<students.length;i++){
        const data=await setStudent(students, i);
        studArray.push(data.value);
        if(students.length==i+1){
          const ins = await postAssigned(studArray, id, mentord)
          response.send(ins);
        }
        }
});

router.delete("/:id",async function (request, response) {
    const idIn =request.params.id ;
    const d = await getAssigned(idIn);
    let mentor=d.value.mentor;
    let students=d.value.students;
  
    const ment = await sendingMentorBack(mentor);
    const stud= await sendingStudentsBack(students);
  response.send({
    message:"data removed successfully."
  });
});

export default router ;


