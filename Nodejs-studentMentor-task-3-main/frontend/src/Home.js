import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'reactstrap'

export const Home = () => {
  return (
    <div>
        <List>
            <li>
                <Link to="/mentor" >Mentor</Link>
            </li>
            <li>
                <Link to="/student" >Students</Link>
            </li>
            <li>
                <Link to="/assigned" >Assigned</Link>
            </li>
        </List>
    </div>
  )
}
