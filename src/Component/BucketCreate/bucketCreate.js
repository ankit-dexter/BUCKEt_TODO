import React, { useState } from "react";
import classes from "./bucketCreate.css";
import Input from "../UI/Input/Input";
import Submit from "../UI/Button/AddButton";
import * as actions from "../../Reducer/actions";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

const bucketCreate = props => {


    const [bucketName, setbucket] = useState({
        elementType: 'input',
        value: '',
        validations: {
            required: true,
            maxLength: 20
        },
        valid: false,
        touched: false,
        elementConfig: {
            placeholder: 'Bucket Name'
        }
    });

    const [errorMsg, seterrorMsg] = useState('')

    const validateForm = (value, validations) => {
        let isValid = true;

        if (!validations) {
            return true;
        }
        if (validations.required) {
            isValid = value.trim() !== '' && isValid;
            if (value.length === 0) {
                seterrorMsg('! please Enter Bucket Name');
            }
            if (value.trim().length > 0 && value.trim().length < 13) {
                seterrorMsg('');
            }


        }
        if (validations.maxLength) {
            isValid = value.trim().length <= validations.maxLength && isValid;
            if (value.trim().length > validations.maxLength) {

                seterrorMsg(" ! Bucket name must be less then 21 characters");

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
        const updatedName = updateObject(bucketName, {
            ...bucketName,
            value: event.target.value,
            touched: true
        })

        const updatedForm = updateObject(updatedName,
            updateObject(updatedName, {
                valid: validateForm(event.target.value, element.validations)
            })
        )

        setbucket(updatedForm);
    }

    const submitHandler = (event, bucket) => {
        event.preventDefault();

        const bucketObj = {
            name: bucket.value,
            toDo: 'none'
        }

        if (bucket.valid) {
            props.addBucket(bucketObj, props.buckets);
            // props.addingTask();
            props.history.push("/Bucket");
            if (props.error === '') {
                props.history.push("/Bucket");
            }

        }
        else if (bucket.value.trim().length === 0) {

            alert("PLEASE ! Enter Bucket Name");
        }



    }

    let form = <form>
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
        <div className={classes.bucketCreate}>
            <h1>ADD BUCKET</h1>
            <h6>{errorMsg}</h6>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        buckets: state.buckets,
        error: state.error

    };
};

const mapDispatchToProps = dispatch => {
    return {
        addBucket: (bucket, prevBucket) => dispatch(actions.addBucket(bucket, prevBucket))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(bucketCreate));