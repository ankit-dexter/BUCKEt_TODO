import React, { useState } from 'react';
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Toolbar from '../../Component/Toolbar/Tollbar';
import { connect } from 'react-redux';
import Modal from '../../Component/UI/Modal/Modal';
import * as actions from '../../Reducer/actions';
//import SideDrawer from '../../Component/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const reset = () => {
        props.resetError();
    }



    return (
        <Aux>

            <Toolbar />

            {props.error ?
                <Modal popup={props.error} modalClosed={() => reset()} >
                    <h2 className={classes.ErrorMsg}>{props.error.message}</h2>
                </Modal>

                :
                <main className={classes.Content}>
                    {props.children}
                </main>
            }


        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        error: state.error,

    }
}

const mapDispatcherToProps = dispatch => {
    return {
        resetError: () => dispatch(actions.resetError())
    }
}
export default React.memo(connect(mapStateToProps, mapDispatcherToProps)(layout),
    (prevProps, nextProps) =>
        nextProps.children === prevProps.children
);