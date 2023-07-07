import React from "react";
import dayjs from "dayjs";

const CompletedItem = (props) => {
    return (
        <div><p>{props.title}</p>
        <p>{props.description}</p>
        <p>{dayjs(props.date).format('DD/MM/YYYY')}</p></div>
    )
}
export default CompletedItem