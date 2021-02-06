import React from "react";
import classes from "./Bucket.css";
import Buk from "./Buk/Buk";
import { connect } from 'react-redux';
import * as actions from "../../Reducer/actions";

const bucket = props => {

    const showToDo = (buckName) => {
        props.setSelectedBucket(buckName);
    }
    console.log(typeof props.buckets);
    const transBucket = Object.keys(props.buckets).map(index => {
        return (<Buk
            key={index}
            buckId={props.buckets[index].bucketId}
            bucket={props.buckets[index]}
            onClick={(event) => showToDo(props.buckets[index])}
        />);
    });



    return (<div className={classes.buckets} >



        {transBucket}

    </div>);
}
const mapStateToProps = state => {
    return {
        buckets: state.buckets,
        SelectedBucket: state.selectedBucket,
        toDoList: state.toDoList
    }
}

const mapDipatchToProps = dispatch => {
    return {
        setBuckets: () => dispatch(actions.setBuckets()),
        setSelectedBucket: (bucketName) => dispatch(actions.setSelectedBucket(bucketName)),
        resetSelectedBucket: () => dispatch(actions.resetSelectedBucket())
    }
}
export default connect(mapStateToProps, mapDipatchToProps)(bucket);