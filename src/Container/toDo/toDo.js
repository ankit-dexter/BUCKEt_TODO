import React from "react";
import classes from "./toDo.css";
import ToDoCreate from "../../Component/todo/toDoCreate";
import BucketCreate from "../../Component/BucketCreate/bucketCreate";


const toDo = props => {
    //  console.log(props.buckets);
    return (<div className={classes.toDo}>

        <ToDoCreate buckets={props.buckets} />
        <BucketCreate />

    </div>
    );
}

export default toDo;