import React, { useState } from "react";
import classes from "./toDoList.css";
import Input from "../../../Component/UI/Input/Input";
import Submit from "../../../Component/UI/Button/AddButton";
import * as actions from "../../../Reducer/actions";
import { connect } from 'react-redux';

const toDoList = props => {
    console.log(props.toDoId);
    console.log(props.buckId);

    const [detail, setdetail] = useState({
        elementType: 'textarea',
        value: props.toDo.detail,
        validations: {
            required: true,

        },
        valid: true,
        touched: false,
        elementConfig: {
            placeholder: 'ToDo Description'
        }
    });

    const [done, setdone] = useState({
        elementType: 'select',
        value: props.toDo.done,
        validations: {
            required: true,
            maxLength: 20
        },
        valid: true,
        touched: false,
        elementConfig: {
            options: [{ name: "done", bucketId: 1 }, { name: "Not Done", bucketId: 2 }]
        }
    });
    const updateObject = (oldObject, updatedProperties) => {
        return {
            ...oldObject,
            ...updatedProperties
        };
    };
    const [errorMsg, seterrorMsg] = useState('');

    const validateForm = (value, validations) => {
        let isValid = true;

        if (!validations) {
            return true;
        }
        if (validations.required) {
            isValid = value.trim() !== '' && isValid;
            if (value.length === 0) {
                seterrorMsg('! please Enter value');
            }
            if (value.trim().length > 0 && value.trim().length < 13) {
                seterrorMsg('');
            }


        }
        if (validations.maxLength) {
            isValid = value.trim().length <= validations.maxLength && isValid;
            if (value.trim().length > validations.maxLength) {

                seterrorMsg(" ! value must be less then 21 characters");

            }
            else if (value.trim().length !== 0) {
                seterrorMsg('');
            }
        }


        return isValid;

    }
    const onchangeHandler = (event, element) => {

        if (element.elementType === 'input') {
            const updateformData = updateObject(detail, {
                ...detail,
                value: event.target.value,
                touched: true
            });

            const updatedForm = updateObject(updateformData,
                updateObject(updateformData, {
                    valid: validateForm(event.target.value, element.validations)
                })
            );

            setdetail(updatedForm);
        }
        else if (element.elementType === 'textarea') {
            const updateformData = updateObject(detail, {
                ...detail,
                value: event.target.value,
                touched: true
            });
            const updatedForm = updateObject(updateformData,
                updateObject(updateformData, {
                    valid: validateForm(event.target.value, element.validations)
                })
            );
            setdetail(updatedForm);
        }
        else {
            const updateformData = updateObject(done, {
                ...done,
                value: event.target.value,
                touched: true
            });
            const updatedForm = updateObject(updateformData,
                updateObject(updateformData, {
                    valid: validateForm(event.target.value, element.validations)
                })
            );
            setdone(updatedForm);
        }



    }

    const submitHandler = (event) => {
        event.preventDefault();

        const formDataFinal = {
            toDoName: props.toDo.toDoName,
            detail: detail.value,
            bucketName: props.toDo.bucketName,
            done: done.value
        }
        //  console.log(toDo.valid, detail.valid, bucketName.valid);
        if (detail.valid) {
            console.log("INSIDE");
            props.updateToDo(formDataFinal, props.buckId, props.toDoId);

        }
        else {
            alert(' Fill Details !!');
        }



    }
    const DeleteHandler = () => {
        props.deleteToDo(props.toDo, props.buckId, props.toDoId);
    }
    const form = (<div><form >
        <div className={classes.formS}>
            <label>Details  </label>
            <Input
                elementType={detail.elementType}
                invalid={!detail.valid}
                shouldValidate={detail.validations}
                touched={detail.touched}
                value={detail.value}
                changed={(event) => onchangeHandler(event, detail)}
                elementConfig={detail.elementConfig}
            /></div>
        <p>Status  <Input
            elementType={done.elementType}
            invalid={!done.valid}
            shouldValidate={done.validations}
            touched={done.touched}
            changed={(event) => onchangeHandler(event, done)}
            elementConfig={done.elementConfig}
        /></p>
        <Submit clicked={(event) => submitHandler(event)} taskName="Update" />

    </form>
        <Submit clicked={(event) => DeleteHandler(event)} taskName="Delete" />
    </div>)
    return (
        <div className={classes.toDoList}>
            <u><h3>ToDo : {props.toDo.toDoName}</h3></u>
            <h6>{errorMsg}</h6>
            {form}
        </div>
    );
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
        updateToDo: (toDo, buckId, toDoId) => dispatch(actions.updateToDo(toDo, buckId, toDoId)),
        deleteToDo: (toDo, buckId, toDoId) => dispatch(actions.deleteToDo(toDo, buckId, toDoId))

    }
}
export default connect(mapStateToProps, mapDipatchToProps)(toDoList);