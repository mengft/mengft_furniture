import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { TempScreen } from '../containers'

class Routes extends Component {
  render () {
    return (
      <BrowserRouter>
        <Route path={'/'} component={TempScreen} />
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispath => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
