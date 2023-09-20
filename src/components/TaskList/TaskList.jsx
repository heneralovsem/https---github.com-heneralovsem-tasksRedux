import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "../TaskItem/TaskItem";
import { Button, Modal, TextField } from "@mui/material";
import cl from "./TaskList.module.css";
import { taskSlice } from "../../store/reducers/TaskSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../store/reducers/ActionCreators";
import { taskAPI } from "../../services/TasksService";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const TaskList = () => {
  const { data: tasks, error, isLoading } = taskAPI.useFetchAllTasksQuery("");
  const [createTask, {}] = taskAPI.useCreateTaskMutation();
  const [modal, setModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDate, setTaskDate] = useState(dayjs());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortingType, setSortingType] = useState("due_date");

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const addTask = async () => {
    if (taskTitle.trim() !== "" && taskDesc.trim() !== "")
      await createTask({
        title: taskTitle,
        description: taskDesc,
        due_date: taskDate,
      });
    closeModal();
  };
  const filterByDescription = () => {
    setSortingType("description");
  };
  const filterByTitle = () => {
    setSortingType("title");
  };
  const filterByDate = () => {
    setSortingType("due_date");
  };

  return (
    <div className={cl.tasklist__wrapper}>
      <h1>Tasks</h1>
      <Button
        className={cl.tasklist__add__button}
        onClick={openModal}
        variant="contained"
      >
        Add task
      </Button>
      <div className={cl.filters__wrapper}>
        <p>Sort:</p>
        <Button
          className={cl.tasklist__filter__button}
          variant="contained"
          size="small"
          onClick={filterByTitle}
        >
          By title
        </Button>
        <Button
          className={cl.tasklist__filter__button}
          variant="contained"
          size="small"
          onClick={filterByDescription}
        >
          By description
        </Button>
        <Button
          className={cl.tasklist__filter__button}
          variant="contained"
          size="small"
          onClick={filterByDate}
        >
          By date
        </Button>
      </div>
      <div className={cl.search__wrapper}>
        <p>Search by title:</p>
        <TextField
          size="small"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Modal open={modal} onClose={closeModal}>
        <div className={cl.modal__wrapper}>
          <TextField
            size="small"
            type="text"
            placeholder="Title..."
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
          />
          <TextField
            type="text"
            placeholder="Description..."
            value={taskDesc}
            onChange={(event) => setTaskDesc(event.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due date"
              format="DD/MM/YYYY"
              value={taskDate}
              onChange={(newValue) => setTaskDate(newValue)}
            />
          </LocalizationProvider>
          <Button variant="contained" onClick={addTask}>
            Add
          </Button>
          <Button color="error" variant="contained" onClick={closeModal}>
            Close
          </Button>
        </div>
      </Modal>
      <div className={cl.tasks__wrapper}>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Error</h1>}
        {tasks &&
          sortingType !== "due_date" &&
          [...tasks]
            .sort((a, b) => a[sortingType].localeCompare(b[sortingType]))
            .filter((task) =>
              task.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                description={task.description}
                date={task.due_date}
                id={task.id}
              />
            ))}
        {tasks &&
          sortingType === "due_date" &&
          [...tasks]
            .sort((a, b) => new Date(a[sortingType]) - new Date(b[sortingType]))
            .filter((task) =>
              task.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                description={task.description}
                date={task.due_date}
                id={task.id}
              />
            ))}
      </div>
    </div>
  );
};
export default TaskList;
