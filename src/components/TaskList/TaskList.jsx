import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "../TaskItem/TaskItem";
import { Button, Modal } from "@mui/material";
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
  // const count = useSelector((state) => state.taskReducer.count)
  // const {increment} = taskSlice.actions;
  // const dispatch = useDispatch()
  // const {tasks, isLoading, error} = useSelector((state) => state.taskReducer)
  const [limit, setLimit] = useState(8);
  const { data: tasks, error, isLoading } = taskAPI.useFetchAllTasksQuery("");
  const [createTask, {}] = taskAPI.useCreateTaskMutation();
  const [modal, setModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDate, setTaskDate] = useState(dayjs());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortingType, setSortingType] = useState("due_date");
  const [data, setData] = useState([]);
  // useEffect(() => {
  //     dispatch(fetchTasks())
  //     // getTasks().then(data => {
  //     //     setData(data)
  //     // })

  // }, []);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const addTask = async () => {
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
    //   const sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title))
    //   console.log(sortedTasks)
    setSortingType("title");
  };
  const filterByDate = () => {
    setSortingType("due_date");
  };
  // const sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title))
  // console.log(sortedTasks)

  // .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase))

  return (
    <div>
      {/* <h1>{count}</h1> */}
      {/* <button onClick={() => dispatch(increment(10))}>click</button> */}
      <h1>Tasks</h1>
      <button onClick={filterByTitle}>By title</button>
      <button onClick={filterByDescription}>By description</button>
      <button onClick={filterByDate}>By date</button>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={openModal} variant="outlined">
        Add task
      </Button>
      <Modal open={modal} onClose={closeModal}>
        <div className={cl.modal__wrapper}>
          <input
            type="text"
            placeholder="Title..."
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
          />
          <input
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
          <Button variant="outlined" onClick={addTask}>
            Add
          </Button>
        </div>
      </Modal>
      <div>
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
        {/* {users && users.map(user => (<TaskItem key={user.id} title={user.name} description={user.email}/>))} */}
      </div>
    </div>
  );
};
export default TaskList;
