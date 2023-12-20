import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, FormGroup, Input, Label, List } from 'reactstrap';

const Mentor = () => {
    const [mentorState, setMentorState] = useState();
    const [mentorlist,setMentorList]=useState([]);

    const handleSubmit =async ()=>{
        let lastId;
        await   axios.get("https://nodejs-student-mentor-task-3.vercel.app/mentors").then((data)=>{
        const arrayLength=data.data.length;
             if(arrayLength ===0){
                lastId=0;
             }else{
             console.log(data.data[arrayLength-1]);
             lastId =data.data[arrayLength-1].id;
            }
         }).catch((err)=>{
            console.log(err);
         })
        await axios.post("https://nodejs-student-mentor-task-3.vercel.app/mentors",
        [{id: `${+lastId+1}`,
            name:mentorState,
            who:"mentor"}]
        ).then((data)=>{
            console.log(data);
            setMentorState("")
            handleGetMentors();
        })
    }
  
   const handleGetMentors = async () =>{
    await   axios.get("https://nodejs-student-mentor-task-3.vercel.app/mentors").then((data)=>{
             setMentorList(data.data)
         }).catch((err)=>{
            console.log(err);
         })
   }

   const handleDelete = async (id)=>{
    await   axios.delete(`https://nodejs-student-mentor-task-3.vercel.app/mentors/${id}`).then((data)=>{
        handleGetMentors();
        console.log(data);
    }).catch((err)=>{
       console.log(err);
    })
   }

  return (
    <div style={{padding:'30px' , textAlign:"left"}}>
        <h3>Mentors</h3>
        <Form>
            <FormGroup>
                <Label for='mentor'>
                    Enter Mentor Name To Add :
                </Label>
                <Input
                  id="mentor"
                  name="mentorName"
                  type="text"
                  value={mentorState}
                  onChange={(e)=>setMentorState(e.target.value)}
                />
                <br/>
                <Button onClick={handleSubmit}>
                    Add 
                </Button>
            </FormGroup>
        </Form>
        <hr/>
        <Button onClick={handleGetMentors}>Get Mentors</Button>
        <br/>
        <br/>
        <List>
        {mentorlist.map((e)=>(
            <li key={e.id}>
                {e.name} &nbsp;
                <Button onClick={()=>{
                    console.log(e.id);
                    handleDelete(e.id)
                }} size="sm" color='danger'>del</Button>
            </li>
        ))}
        </List>
    </div>
  )
}

export default Mentor ;