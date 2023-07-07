import React from "react";
import { taskAPI } from "../../services/TasksService";
import CompletedItem from "../CompletedItem/CompletedItem";

const CompletedList = () => {
  const {
    data: completedTasks,
    error,
    isLoading,
  } = taskAPI.useFetchCompletedTasksQuery('');
  console.log(completedTasks)
  return (
    <div>
      <h1>Completed</h1>
      {completedTasks &&
        completedTasks.map((task) => (
          <CompletedItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.due_date}
            id={task.id}
          />
        ))}
    </div>
  );
};
export default CompletedList;
