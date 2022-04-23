import React, {useState, useRef} from 'react';
import { Row, Col } from 'reactstrap';
import MainNavbar from '../../components/main-navbar';
import {AiOutlineClose} from "react-icons/ai";
import {MdRestoreFromTrash} from "react-icons/md";
import { useContextHook } from '../../hook/useContext';
import { useFirestore } from '../../hook/useFirestore';
import { useCollection } from '../../hook/useCollection';

export default function Goal() {

  const [goal, setGoal] = useState('')
  const [textUpdate, setTextUpdate] = useState('')
  const [isEdit, setEdit] = useState({
    edit:false,
    data:{}
  })
  const {edit, data} = isEdit
  const {user} = useContextHook()
  let inputGoal= useRef(null)
  const {addData, updateData, deleteData, state} = useFirestore('goal')

  const {document, emptyData, isPending} = useCollection(
    'goal',
    ["user_id", "==", user.uid],
    ["createdAt", "desc"]
  )
  const onSubmitGoal = (e) =>{
    e.preventDefault()
  
    addData(goal)
    setGoal('')
    inputGoal.current.focus()
  }

  const onEdit = (value, id) =>{
    setEdit({edit :true, data:{goal: value, id}})
    setTextUpdate(value)
  }

  const onUpdateGoal = (e) =>{
    e.preventDefault()

    updateData({goal: textUpdate}, data.id).then(() => setEdit({edit:false, data:{}}))
  }
  const onDelete = (id) =>{
    deleteData(id)
    setEdit({edit :false})
  } 

  return (
    <>
      <MainNavbar />
      <div className="overview-page">
        <div className="title-page">
          <span>Welcome {user && user.displayName}</span>
        </div>
        <div className="detail">
          <p>Goal Dashboards</p>
        </div>
        {edit && (
          <form onSubmit={onUpdateGoal}>
            <div>
              <label>Update Goal</label>
              <input type="text" autoFocus ref={inputGoal} value={textUpdate} onChange={(e) =>{setTextUpdate(e.target.value)}} required />
            </div>
            {state.isPending ? <button className='btn-update'>Updating Goal...</button>: <button className='btn-update'>Update Goal</button>}
          </form>
        )}
        {!edit && (
          <form onSubmit={onSubmitGoal}>
            <div>
              <label>Goal</label>
              <input type="text" ref={inputGoal} value={goal} onChange={(e) =>{setGoal(e.target.value)}} required />
            </div>
            {state.isPending ? <button>Adding Goal...</button>: <button>Add Goal</button>}
          </form>
        )}
        <div className="list-goals">
          <Row>
            {isPending && <span>Loading...!</span>}
              {document && document.map((val, ind) =>(
                <Col xl="6" lg="6" key={ind} style={{marginBottom:"25px"}}>
                  <div className="left-box">
                    <span>{val.createdAt.toDate().toLocaleString('en-us')}</span>
                    <h3>{val.goal.length > 15 ? `${val.goal.substr(0, 15)}...` : val.goal}</h3>
                    <div className="sign-close">
                      <span><MdRestoreFromTrash onClick={() =>{onEdit(val.goal, val.id)}} /></span>
                      <span><AiOutlineClose onClick={() =>{onDelete(val.id)}} /></span>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
        {emptyData && (
          <div className="message" style={{marginTop:"-5px"}}><span>You have not set any of goals</span></div>
        )}
      </div>
    </>
  );
}
