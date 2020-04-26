import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import QuestionList from './pages/list'
import QuestionDetail from './pages/detail'
import Page404 from './pages/page404'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/questions'/>
        </Route>

        <Route exact path='/questions' component={ QuestionList }/>
        <Route path='/questions/:questionId' component={ QuestionDetail }/>

        <Route path="*" component={ Page404 }/>
      </Switch>
    </BrowserRouter>
  )
}
