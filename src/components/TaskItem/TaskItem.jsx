import React, { useEffect, useState } from "react";
import cl from "./TaskItem.module.css";
import { Button, Modal, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { taskAPI } from "../../services/TasksService";
import dayjs from "dayjs";
import { esES } from "@mui/x-date-pickers";

const TaskItem = (props) => {
  const [modal, setModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedDesc, setEditedDesc] = useState(props.description);
  const [editedDate, setEditedDate] = useState(dayjs(props.date));
  const [updateTask, {}] = taskAPI.useUpdateTaskMutation();
  const [deleteTask, {}] = taskAPI.useDeleteTaskMutation();
  const [completeTask, {}] = taskAPI.useCompleteTaskMutation();
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const updateEditedTask = async () => {
    await updateTask({
      title: editedTitle,
      description: editedDesc,
      due_date: editedDate,
      id: props.id,
    });
    closeModal();
  };
  const deleteTaskItem = async () => {
    await deleteTask(props.id);
  };
  const finishTask = async () => {
    await completeTask({
      title: props.title,
      description: props.description,
      due_date: props.date,
      id: props.id,
    });
    await deleteTask(props.id);
  };

  return (
    <div className={cl.item__wrapper}>
      <h2 className={cl.item__title}>{props.title}</h2>
      <p className={cl.item__description}>{props.description}</p>
      <p className={cl.item__date}>{dayjs(props.date).format("DD/MM/YYYY")}</p>
      <div className={cl.task__item__buttons}>
        <Button color="success" variant="contained" onClick={finishTask}>
          Finish
        </Button>
        <Button variant="contained" onClick={openModal}>
          Edit
        </Button>
        <Button color="error" variant="contained" onClick={deleteTaskItem}>
          Delete
        </Button>
      </div>
      <Modal open={modal} onClose={closeModal}>
        <div className={cl.modal__wrapper}>
          <TextField
            size="small"
            type="text"
            placeholder="Title..."
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
          />
          <TextField
            size="small"
            type="text"
            placeholder="Description..."
            value={editedDesc}
            onChange={(event) => setEditedDesc(event.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due date"
              format="DD/MM/YYYY"
              value={editedDate}
              onChange={(newValue) => setEditedDate(newValue)}
            />
          </LocalizationProvider>
          {/* <input type="text" placeholder="Due date..." value={editedDate} onChange={(event) => setEditedDate(event.target.value)}/> */}
          <Button variant="contained" onClick={updateEditedTask}>
            Save
          </Button>
          <Button color="error" variant="contained" onClick={closeModal}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default TaskItem;
