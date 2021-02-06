import React from "react";
import classes from "../todo/toDoCreate.css";
import { useEffect, useState } from "react";
import Input from "../UI/Input/Input";
import Submit from "../UI/Button/AddButton";
import * as actions from "../../Reducer/actions";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

const toDoCreate = (props) => {
    // console.log(props.buckets, props);
    const [toDo, setoDo] = useState({
        elementType: 'input',
        value: '',
        validations: {
            required: true,
            maxLength: 20
        },
        valid: false,
        touched: false,
        elementConfig: {
            placeholder: 'toDo Name'
        }
    });

    const [detail, setdetail] = useState({
        elementType: 'textarea',
        value: '',
        validations: {
            required: true,

        },
        valid: false,
        touched: false,
        elementConfig: {
            placeholder: 'ToDo Description'
        }
    });

    const [bucketName, setbucketName] = useState({
        elementType: 'select',
        value: 'default',
        validations: {
            required: true,
            maxLength: 20
        },
        valid: true,
        touched: false,
        elementConfig: {
            options: [{ name: "default" }].concat(props.buckets)
        }
    });

    useEffect(() => {
        //  console.log(props.buc);
        setbucketName({
            elementType: 'select',
            value: 'default',
            validations: {
                required: true,
                maxLength: 20
            },
            valid: true,
            touched: false,
            elementConfig: {
                options: props.buckets === null ? [{ name: "default" }] : [{ name: "default" }].concat(props.buckets)
            }
        })
    }, [props.buckets])




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

    const updateObject = (oldObject, updatedProperties) => {
        return {
            ...oldObject,
            ...updatedProperties
        };
    };

    const onchangeHandler = (event, element) => {

        if (element.elementType === 'input') {
            const updateformData = updateObject(toDo, {
                ...toDo,
                value: event.target.value,
                touched: true
            });

            const updatedForm = updateObject(updateformData,
                updateObject(updateformData, {
                    valid: validateForm(event.target.value, element.validations)
                })
            );

            setoDo(updatedForm);
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
            const updateformData = updateObject(bucketName, {
                ...bucketName,
                value: event.target.value,
                touched: true
            });
            const updatedForm = updateObject(updateformData,
                updateObject(updateformData, {
                    valid: validateForm(event.target.value, element.validations)
                })
            );
            setbucketName(updatedForm);
        }



    }

    const submitHandler = (event, bucket) => {
        event.preventDefault();

        const formDataFinal = {
            toDoName: toDo.value,
            detail: detail.value,
            bucketName: bucketName.value,
            done: "Not Done"
        }
        //  console.log(toDo.valid, detail.valid, bucketName.valid);
        if (toDo.valid && detail.valid && bucketName.valid) {
            props.addToDo(formDataFinal, props.buckets);
            // props.addingTask();
            if (props.error === '') {

                props.history.push("/Bucket");
            }

        }
        else {
            alert(' Fill Details !!');
        }



    }

    let form = <form>
        <Input
            elementType={toDo.elementType}
            invalid={!toDo.valid}
            shouldValidate={toDo.validations}
            touched={toDo.touched}
            changed={(event) => onchangeHandler(event, toDo)}
            elementConfig={toDo.elementConfig}
        />
        <Input
            elementType={detail.elementType}
            invalid={!detail.valid}
            shouldValidate={detail.validations}
            touched={detail.touched}
            changed={(event) => onchangeHandler(event, detail)}
            elementConfig={detail.elementConfig}
        />
        <Input
            elementType={bucketName.elementType}
            invalid={!bucketName.valid}
            shouldValidate={bucketName.validations}
            touched={bucketName.touched}
            changed={(event) => onchangeHandler(event, bucketName)}
            elementConfig={bucketName.elementConfig}
        />
        <Submit clicked={(event) => submitHandler(event, bucketName)} taskName="Submit" />
    </form>

    return (
        <div className={classes.toDoCreate}>
            <h1>ADD ToDo</h1>
            <h6>{errorMsg}</h6>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        buckets: state.buckets,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToDo: (toDoData, buckets) => dispatch(actions.addToDo(toDoData, buckets))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(toDoCreate));
