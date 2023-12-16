import React, { Component } from 'react'
import OrderList from './OrderList'

import BackendClient from "../client/BackendClient";

class Home extends Component {
  state = {
    students: [],
  }

  componentDidMount() {
    this.resetState()
  }

  getStudents = async () => {
    const orders = BackendClient.getOrders()
    this.setState({ students: orders.data })
  }

  resetState = () => {
    this.getStudents()
  }

  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <OrderList
          students={this.state.students}
          resetState={this.resetState}
        />
      </div>
    )
  }
}

export default Home
