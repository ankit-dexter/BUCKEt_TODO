import React from "react";
import classes from "./Buk.css";
import ToDoList from '../toDoList/toDoList';


const buk = props => {
    console.log(Object.keys(props.bucket.toDo));
    const list = props.bucket.toDo[0] === 'n' ? null : Object.keys(props.bucket.toDo).map(key => {
        console.log(key);
        if (props.bucket.toDo[key] === null) {
            return null;
        } else {
            return <ToDoList
                key={key}
                toDoId={key}
                toDo={props.bucket.toDo[key]}
                buckId={props.buckId} />
        }

    });
    return (
        <div className={classes.buk}>
            <h3>{props.bucket.name}</h3>
            {list}
        </div>
    );
}

export default buk;