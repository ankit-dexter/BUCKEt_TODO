import * as actionTypes from './actionTypes';

import axios from 'axios';



const addTaskSuccess = (bucket) => {
    return {
        type: actionTypes.ADD_BUCKET_SUCCESS,
        buck: bucket
    }
}

const addTaskFailed = (error) => {
    return {
        type: actionTypes.ADD_BUCKET_FAILED,
        loading: false,
        error: error
    }
}

export const addBucket = (bucket, previousBucket) => {

    return dispatch => {
        //   console.log(bucket, previousBucket, !previousBucket, previousBucket === null, previousBucket === []);
        let duplicate = false;
        if (!previousBucket || previousBucket === null || previousBucket === []) {
            axios.post('https://to-do-listing-default-rtdb.firebaseio.com/bucket.json', bucket)
                .then(response => {
                    console.log(response.data);
                    const bucketObj = {
                        ...bucket,
                        bucketId: response.data.name
                    }
                    alert('Bucket Added');
                    dispatch(addTaskSuccess(bucketObj));

                })
                .catch(err => dispatch(addTaskFailed(err)))
        }
        else {
            //    console.log("[ action ]")
            duplicate = Object.keys(previousBucket).find(prevTaskKey => {

                return bucket.name === previousBucket[prevTaskKey].name;
            })

            if (!duplicate) {
                axios.post('https://to-do-listing-default-rtdb.firebaseio.com/bucket.json', bucket)
                    .then(response => {
                        console.log(response.data);
                        const bucketObj = {
                            ...bucket,
                            bucketId: response.data.name
                        }
                        alert('Bucket Added');
                        dispatch(addTaskSuccess(bucketObj));


                    })
                    .catch(err => dispatch(addTaskFailed(err)))
            }
            else {
                dispatch(addTaskFailed({ message: bucket.name + " already present" }));
            }
        }


    };
}


const addToDoSuccess = (toDo) => {
    return {
        type: actionTypes.ADD_TODO_SUCCESS,
        toDo: toDo
    }
}

const addToDoFailed = (error) => {
    return {
        type: actionTypes.ADD_TODO_FAILED,
        loading: false,
        error: error
    }
}

export const addToDo = (toDoData, buckets) => {

    return dispatch => {
        console.log(toDoData, buckets);
        const buckId = buckets.find(buck => buck.name === toDoData.bucketName);
        console.log(buckId.bucketId);
        axios.post('https://to-do-listing-default-rtdb.firebaseio.com/bucket/' + buckId.bucketId + '/toDo.json', toDoData)
            .then(response => {
                const obj = {
                    ...toDoData,
                    toDoKey: response.data.name
                }
                console.log(response.data);
                alert('ToDo Added !!');
                dispatch(addToDoSuccess(obj));

            })
            .catch(err => dispatch(addToDoFailed(err)))



    };
}

const setBucketsuccess = (buckets) => {
    return {
        type: actionTypes.SET_BUCKET_SUCCESS,
        buckets: buckets

    }
}
const setBucketsFailed = (error) => {
    return {
        type: actionTypes.SET_BUCKET_FAILED,
        error: error,
    }
}

export const setBuckets = () => {

    return dispatch => {



        axios.get('https://to-do-listing-default-rtdb.firebaseio.com/bucket.json')
            .then(response => {
                if (response.data !== null) {
                    //    console.log(response.data);
                    const bucket = [];
                    for (let key in response.data) {
                        bucket.push({
                            ...response.data[key],
                            toDo: { ...response.data[key].toDo },
                            bucketId: key
                        });
                    }
                    dispatch(setBucketsuccess(bucket));


                }
                else {
                    dispatch(setBucketsuccess({ name: "please create Bucket First" }));

                }

            })
            .catch(err => dispatch(setBucketsFailed(err)));
    }
}


const settoDosuccess = (toDo) => {
    return {
        type: actionTypes.SET_BUCKET_SUCCESS,
        toDoList: toDo

    }
}
const settoDoFailed = (error) => {
    return {
        type: actionTypes.SET_BUCKET_FAILED,
        error: error,
    }
}
export const setToDo = () => {

    return dispatch => {



        axios.get('https://to-do-listing-default-rtdb.firebaseio.com/toDo.json')
            .then(response => {
                if (response.data !== null) {
                    //    console.log(response.data);
                    const toDoList = [];
                    for (let key in response.data) {

                        toDoList.push({
                            ...response.data[key],
                            toDotId: key
                        });
                    }
                    dispatch(settoDosuccess(toDoList));


                }
                else {
                    dispatch(settoDosuccess({ name: "please create Bucket First" }));

                }

            })
            .catch(err => dispatch(settoDoFailed(err)));
    }
}

export const resetError = () => {
    return {
        type: actionTypes.RESET_ERROR,
        loading: false
    }
}

export const setError = (error) => {
    return {
        type: actionTypes.RESET_ERROR,
        error: error
    }
}

export const setSelectedBucket = (buck) => {
    return {
        type: actionTypes.RESET_ERROR,
        buck: buck
    }
}

export const resetSelectedBucket = (buck) => {
    return {
        type: actionTypes.RESET_ERROR,
        buck: ''
    }
}

const updatetoDosuccess = (toDo) => {
    return {
        type: actionTypes.UPDATE_TODO_SUCCESS,
        toDoList: toDo

    }
}
const updatetoDoFailed = (error) => {
    return {
        type: actionTypes.UPDATE_TODO_FAILED,
        error: error,
    }
}

export const updateToDo = (toDo, buckId, toDoId) => {

    return dispatch => {
        console.log("INSIDE me", toDo);
        const link = 'https://to-do-listing-default-rtdb.firebaseio.com/bucket/' + buckId + '/toDo/' + toDoId + '.json';
        axios.put(link, toDo)
            .then(response => {
                console.log("INSIDE me", 'https://to-do-listing-default-rtdb.firebaseio.com/bucket/' + buckId + "/toDo/" + toDoId + ".json");
                if (response.data !== null) {
                    //    console.log(response.data);
                    const toDoList = [];
                    for (let key in response.data) {
                        toDoList.push({
                            ...response.data[key],
                            toDotId: key
                        });
                    }
                    alert('ToDo Updated');
                    dispatch(updatetoDosuccess(toDoList));


                }
                else {
                    dispatch(updatetoDosuccess({ name: "please create Bucket First" }));

                }

            })
            .catch(err => dispatch(updatetoDoFailed(err)));
    }
}

export const deleteToDo = (toDo, buckId, toDoId) => {
    return dispatch => {
        console.log('[INSIDE DELETE TODO]');

        const link = 'https://to-do-listing-default-rtdb.firebaseio.com/bucket/' + buckId + '/toDo/' + toDoId + '.json';
        axios.delete(link).then(response => {
            console.log(response);
            alert('toDo Deleted');
            dispatch(setBuckets());
        }).catch(err => dispatch(setBucketsFailed(err)));
    }
}