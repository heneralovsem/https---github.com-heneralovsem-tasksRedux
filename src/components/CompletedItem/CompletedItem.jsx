import React from "react";
import dayjs from "dayjs";
import cl from "./CompletedItem.module.css";

const CompletedItem = (props) => {
  return (
    <div className={cl.item__wrapper}>
      <h2 className={cl.item__title}>{props.title}</h2>
      <p className={cl.item__description}>{props.description}</p>
      <p className={cl.item__date}>{dayjs(props.date).format("DD/MM/YYYY")}</p>
    </div>
  );
};
export default CompletedItem;
