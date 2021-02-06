import React, { } from 'react';

import classes from './Toolbar.css';
//import Logo from '../../UI/Logo/Logo';
//import { connect } from 'react-redux';
//import Spinner from '../../UI/Spinner/Spinner';
import NavigationItem from '../NavigationItem/NavigationItem';



const toolbar = (props) => {


    //const style = props.loadingDB ? classes.ActiveToolbar : classes.Toolbar;

    return (
        <div>

            <div className={classes.Toolbar}>

                <div className={classes.NavigationItems}><NavigationItem link="/" exact>ADD</NavigationItem></div>


                <div className={classes.NavigationItems}><NavigationItem link="/Bucket">BUCKETS</NavigationItem></div>


            </div>
        </div>
    )
};



//export default React.memo(connect(mapStateToProps)(toolbar));
export default toolbar;