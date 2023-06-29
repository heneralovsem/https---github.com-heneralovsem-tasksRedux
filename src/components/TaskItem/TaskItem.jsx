import React, { useEffect, useState } from "react";
import cl from './TaskItem.module.css'
import { Button, Modal } from "@mui/material";
import {DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { taskAPI } from "../../services/TasksService";
import dayjs from "dayjs";
import { esES } from "@mui/x-date-pickers";


const TaskItem = (props) => {
    const [modal, setModal] = useState(false)
    const [editedTitle, setEditedTitle] = useState(props.title)
    const [editedDesc, setEditedDesc] = useState(props.description)
    const [editedDate, setEditedDate] = useState(dayjs(props.date))
    const [updateTask, {}] = taskAPI.useUpdateTaskMutation()
    const [deleteTask, {}] = taskAPI.useDeleteTaskMutation()
    const openModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }
    const updateEditedTask = async () => {
       await updateTask({title: editedTitle, description: editedDesc, due_date: editedDate, id: props.id})
        closeModal()
    }
    const deleteTaskItem = async () => {
       await deleteTask(props.id)
    }
    
    return (
        <div className={cl.item__wrapper}>
            <p>{props.title}</p>
            <p>{props.description}</p>
            <p>{dayjs(props.date).format('DD/MM/YYYY')}</p>
            <Button variant="outlined" onClick={openModal}>Edit</Button>
            <Modal open={modal} onClose={closeModal}>
                <div className={cl.modal__wrapper}>
                    <input type="text" placeholder="Title..." value={editedTitle} onChange={(event) => setEditedTitle(event.target.value)} />
                    <input type="text" placeholder="Description..." value={editedDesc} onChange={(event) => setEditedDesc(event.target.value)}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label='Due date' format='DD/MM/YYYY' value={editedDate} onChange={(newValue) => setEditedDate(newValue)}/>
                    </LocalizationProvider>
                    {/* <input type="text" placeholder="Due date..." value={editedDate} onChange={(event) => setEditedDate(event.target.value)}/> */}
                    <Button variant="outlined" onClick={updateEditedTask}>Save</Button>
                </div>

            </Modal>
            <Button variant="outlined" onClick={deleteTaskItem}>Delete</Button>
        </div>
    )
}
export default TaskItem