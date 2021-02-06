import React, { useEffect } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import ToDo from './Container/toDo/toDo';
import Bucket from './Container/Bucket/Bucket';
import { connect } from 'react-redux';
import * as actions from "./Reducer/actions"

const app = props => {

  useEffect(() => {
    props.setBuckets();

  }, [props.toDoList]);
  let routes = (
    <Switch>
      <Route path="/Bucket" render={() => <Bucket buckets={props.buckets} />} />
      <Route path="/" exact render={() => <ToDo />} />
      <Redirect to="/" />
    </Switch>
  );


  return (
    <Layout>
      {routes}
    </Layout>
  );

}

const mapStateToProps = state => {
  return {
    buckets: state.buckets,
    toDoList: state.toDoList
  }
}

const mapDipatchToProps = dispatch => {
  return {
    setBuckets: () => dispatch(actions.setBuckets()),
    setToDo: () => dispatch(actions.setToDo())
  }
}
export default connect(mapStateToProps, mapDipatchToProps)(withRouter(app));
//export default app;
