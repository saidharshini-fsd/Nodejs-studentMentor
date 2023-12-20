import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, FormGroup, Input, Label, List } from 'reactstrap';

const Student = () => {
    const [studentState, setstudentState] = useState();
    const [studentList,setstudentList]=useState([]);

    const handleSubmit =async ()=>{
        let lastId;
        await   axios.get("https://nodejs-student-mentor-task-3.vercel.app/students").then((data)=>{
        const arrayLength=data.data.length;
            if(arrayLength === 0){
                lastId=1;
            }else{
                lastId =data.data[arrayLength-1].id;
            }
         }).catch((err)=>{
            console.log(err);
         })
        await axios.post("https://nodejs-student-mentor-task-3.vercel.app/students",
        [{id: `${+lastId+1}`,
            name:studentState,
            who:"mentor"}]
        ).then((data)=>{
            console.log(data);
            handleGetStudent();
            setstudentState("");
        })
    }
  
   const handleGetStudent = async () =>{
    await   axios.get("https://nodejs-student-mentor-task-3.vercel.app/students").then((data)=>{
             setstudentList(data.data)
         }).catch((err)=>{
            console.log(err);
         })
   }

   const handleDelete = async (id)=>{
    await   axios.delete(`https://nodejs-student-mentor-task-3.vercel.app/students/${id}`).then((data)=>{
        handleGetStudent();
        console.log(data);
    }).catch((err)=>{
       console.log(err);
    })
   }

  return (
    <div style={{padding:'30px' , textAlign:"left"}}>
        <h3>Student</h3>
        <Form>
            <FormGroup>
                <Label for='students'>
                    Enter Student Name To Add :
                </Label>
                <Input
                  id="students"
                  name="studentName"
                  type="text"
                  value={studentState}
                  onChange={(e)=>setstudentState(e.target.value)}
                />
                <br/>
                <Button onClick={handleSubmit}>
                    Add 
                </Button>
            </FormGroup>
        </Form>
        <hr/>
        
        <Button onClick={handleGetStudent}>Get Student</Button>
        <br/>
        <br/>
        <List>
        {studentList.map((e)=>(
            <li key={e.id}>
                {e.name} &nbsp;
                <Button onClick={()=>{
                    console.log(String(e.id));
                    handleDelete(String(e.id))
                }} size="sm" color='danger'>del</Button>
            </li>
        ))}
        </List>
    </div>
  )
}

export default Student ;