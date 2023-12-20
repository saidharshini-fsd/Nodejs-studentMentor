import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Input, Label, List } from 'reactstrap';

const Assigned = () => {
    const [mentorList,setMentorList] =useState([]);
    const [students,setStudents]= useState([]);
    const [studentsToAdd,SetStudentsToAdd]=useState([]);
    let [mentorToShow,setMentorToShow] = useState([]);
    let [studentToShow,setStudentToShow]= useState([]);
    let [dataTemp,setDataTemp]= useState({});
    let [groups,setGroups]= useState([]);
    let [idToDel,setIdToDel]=useState();

    
    const handleGetMentors = async () =>{
        await   axios.get("https://nodejs-student-mentor-task-3.vercel.app/mentors").then((data)=>{
                 setMentorList(data.data)
             }).catch((err)=>{
                console.log(err);
             })
       }
    const handleGetStudents = async () =>{
        await   axios.get("https://nodejs-student-mentor-task-3.vercel.app/students").then((data)=>{
                 setStudents(data.data)
             }).catch((err)=>{
                console.log(err);
             })
       }

     const handleCreateGroup = async () =>{
        axios.get("https://nodejs-student-mentor-task-3.vercel.app/assigned").then((data)=>{
            console.log();
            if(data.data.length == 0){
                axios.post("https://nodejs-student-mentor-task-3.vercel.app/assigned",{
                    id:"1",
                    students:studentToShow.map((e)=>e.id),
                    mentor:mentorToShow.id
                }).then((data)=>console.log(data))
            }else{
                const id=data.data[data.data.length-1].id;
                console.log(id);
                axios.post("https://nodejs-student-mentor-task-3.vercel.app/assigned",{
                    id:`${id+1}`,
                    students:studentToShow.map((e)=>e.id),
                    mentor:mentorToShow.id
                }).then((data)=>console.log(data))
            }
        })
     } 
     
     const handleGetAssigned = () =>{
        axios.get("https://nodejs-student-mentor-task-3.vercel.app/assigned").then((data)=>{
            setGroups(data.data)
     })
     } 

     const removeFromList = (e)=>{
        const filteredData = studentToShow.filter((data)=>data.id !== e);
        setStudentToShow(filteredData);
     }
     const handleDeleteGroup = () =>{
             if(idToDel !== undefined){
                 axios.delete(`https://nodejs-student-mentor-task-3.vercel.app/assigned/${idToDel}`).then((data)=>{
                     console.log(data.data);
                    })
                }
     }

  return (
    <div style={{padding:'30px' , textAlign:"left"}}>
        <h3>Assigned</h3>
        <Form>
            <Label>
                Select Mentor
            </Label>
            <Input type='select' onClick={(e)=>{
                handleGetMentors() 
            }}
            onChange={(e)=>{
                const data = e.target.value.split(",")
                const dataInObj ={
                    id:data[0],
                    name:data[1],
                    who:data[2]
                }
                setMentorToShow(dataInObj)
            }}
            >
                <option></option>
                {mentorList.map((e)=><option key={e.id} value={[e.id,e.name,e.who]}>{e.name}</option>)}
            </Input>
            <h5>Mentor: {mentorToShow.name}</h5>
            <br/>
            <Label>
                Select Students
            </Label>
            {/* ! student selecting part started */}
            <Input type='select' onClick={(e)=>{
                handleGetStudents()
                 dataTemp.data = e.target.value.split(",")
                 setDataTemp(dataTemp.data)
            }}
            onChange={(e)=>SetStudentsToAdd([...studentsToAdd,e.target.value])}
            >
                <option></option>
                {students.map((e)=><option key={e.id} value={[e.id,e.name,e.who]}>{e.name}</option>)}
            </Input>
            <br/>
            <Button color='primary' onClick={()=>{
                const dataInObj ={
                    id:dataTemp[0],
                    name:dataTemp[1],
                    who:dataTemp[2]
                }
                let flag=true;
                for(let i of studentToShow){
                    console.log(i);
                    if(i.id == dataInObj.id ){
                        flag=false;
                        break
                    }
                }
                if(flag && dataInObj.id !== ""){
                    setStudentToShow([...studentToShow,dataInObj])
                }

            }}>Add To List</Button>
            <h5>Students List:</h5>
            <List>
                {studentToShow.map((e)=><li key={e.id}>{e.name}&nbsp;<Button color='danger' onClick={()=>removeFromList(e.id)}>del</Button></li>)}         
            </List>
            <Button color='success' onClick={handleCreateGroup}>Create Group</Button>
            <br/>
            <hr/>
            <h5>Assigned group</h5>
            <Button onClick={()=>handleGetAssigned()}>Get All Assigned</Button>
           {groups.map((e)=>{
            console.log();
            return <div>
                <h3>Group id: {e.id}</h3>
                <h6>Mentor Name : {e.mentor.name}</h6>
                <h3>Students</h3>
                <List>
                    {e.students.map((data)=><li>{data.name}</li>)}
                </List>
            <hr/>
            </div>
           })}
           <h3>Enter Group id to Delete Group</h3>
           <Input onChange={(e)=>{

            console.log(e.target.value);
            setIdToDel(e.target.value)
           }} type='select' onClick={handleGetAssigned}>
            <option></option>
            {groups.map((e)=><option key={e.id}>{e.id}</option>)}
           </Input>
           <Button onClick={handleDeleteGroup}>Delete Group</Button>
        </Form>
    </div>
  )
}

export default Assigned ;