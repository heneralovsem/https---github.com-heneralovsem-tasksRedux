import React, { useState } from "react";
import { taskAPI } from "../../services/TasksService";
import CompletedItem from "../CompletedItem/CompletedItem";
import cl from "./CompletedList.module.css";
import { Button, TextField } from "@mui/material";

const CompletedList = () => {
  const {
    data: completedTasks,
    error,
    isLoading,
  } = taskAPI.useFetchCompletedTasksQuery("");
  console.log(completedTasks);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortingType, setSortingType] = useState("due_date");

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
      <h1>Completed tasks</h1>
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
      <div className={cl.tasks__wrapper}>
        {completedTasks &&
          sortingType !== "due_date" &&
          [...completedTasks]
            .sort((a, b) => a[sortingType].localeCompare(b[sortingType]))
            .filter((task) =>
              task.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((task) => (
              <CompletedItem
                key={task.id}
                title={task.title}
                description={task.description}
                date={task.due_date}
                id={task.id}
              />
            ))}
        {completedTasks &&
          sortingType === "due_date" &&
          [...completedTasks]
            .sort((a, b) => new Date(a[sortingType]) - new Date(b[sortingType]))
            .filter((task) =>
              task.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((task) => (
              <CompletedItem
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
export default CompletedList;
