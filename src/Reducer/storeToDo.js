import * as actionTypes from '../Reducer/actionTypes';
//import { updateObject } from '../../Utility/Utility';

const initialState = {
    buckets: [],
    toDoList: [],
    error: '',
    selectedBucket: ''


}

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
//==================================SET TDB ================================

const setADD_BUCKET_SUCCESS = (state, action) => {
    const newbucket = updateObject(state, { buckets: state.buckets.concat(action.buck) })
    //   console.log(newbucket);
    return updateObject(state, newbucket);
}

const setADD_BUCKET_FAILED = (state, action) => {
    console.log(action.error);
    return updateObject(state, { error: action.error });
}

const setADD_TODO_SUCCESS = (state, action) => {
    const newToDo = updateObject(state, { toDoList: state.toDoList.concat(action.toDo) })
    //   console.log(newToDo);
    return updateObject(state, newToDo);
}

const setADD_TODO_FAILED = (state, action) => {
    //  console.log(action.error);
    return updateObject(state, { error: action.error });
}

//===============================RESET ERROR==============================

const resetError = (state, action) => {
    return updateObject(state, { error: null });
}

const setError = (state, action) => {
    return updateObject(state, { error: action.error });
}

const setSET_BUCKET_SUCCESS = (state, action) => {

    return updateObject(state, { buckets: action.buckets });
}

const setSET_BUCKET_FAILED = (state, action) => {
    //  console.log(action.error);
    return updateObject(state, { error: action.error });
}

const setSET_TODO_SUCCESS = (state, action) => {

    return updateObject(state, { toDoList: action.toDoList });
}

const setSET_TODO_FAILED = (state, action) => {
    //  console.log(action.error);
    return updateObject(state, { error: action.error });
}

const setSELECTED_BUCKET = (state, action) => {

    return updateObject(state, { selectedBucket: action.buck });
}

const resetSELECTED_BUCKET = (state, action) => {

    return updateObject(state, { selectedBucket: action.buck });
}

const setUPDATE_TODO_SUCCESS = (state, action) => {
    const newToDo = updateObject(state, { toDoList: state.toDoList.concat(action.toDoList) })
    //   console.log(newToDo);
    return updateObject(state, newToDo);
}

const setUPDATE_TODO_FAILED = (state, action) => {
    console.log(action.error);
    return updateObject(state, { error: action.error });
}



const setDELETE_TODO_SUCCESS = (state, action) => {
    const newToDo = updateObject(state, { toDoList: state.toDoList.concat(action.toDoList) })
    //   console.log(newToDo);
    return updateObject(state, newToDo);
}

const setDELETE_TODO_FAILED = (state, action) => {
    console.log(action.error);
    return updateObject(state, { error: action.error });
}



const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_BUCKET_SUCCESS: return (setADD_BUCKET_SUCCESS(state, action));
        case actionTypes.ADD_BUCKET_FAILED: return (setADD_BUCKET_FAILED(state, action));

        case actionTypes.ADD_TODO_SUCCESS: return (setADD_TODO_SUCCESS(state, action));
        case actionTypes.ADD_TODO_FAILED: return (setADD_TODO_FAILED(state, action));

        case actionTypes.SET_BUCKET_SUCCESS: return (setSET_BUCKET_SUCCESS(state, action));
        case actionTypes.SET_BUCKET_FAILED: return (setSET_BUCKET_FAILED(state, action));

        case actionTypes.SET_TODO_SUCCESS: return (setSET_TODO_SUCCESS(state, action));
        case actionTypes.SET_TODO_FAILED: return (setSET_TODO_FAILED(state, action));

        case actionTypes.SET_ERROR: return (setError(state, action));
        case actionTypes.RESET_ERROR: return (resetError(state, action));

        case actionTypes.SET_SELECTED_BUCKET: return (setSELECTED_BUCKET(state, action));

        case actionTypes.RESET_SELECTED_BUCKET: return (resetSELECTED_BUCKET(state, action));

        case actionTypes.UPDATE_TODO_SUCCESS: return (setUPDATE_TODO_SUCCESS(state, action));
        case actionTypes.UPDATE_TODO_FAILED: return (setUPDATE_TODO_FAILED(state, action));

        case actionTypes.DELETE_TODO_SUCCESS: return (setDELETE_TODO_SUCCESS(state, action));
        case actionTypes.DELETE_TODO_FAILED: return (setDELETE_TODO_FAILED(state, action));

        default: return state;
    }
}

export default reducer;