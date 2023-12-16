import React, { Component } from 'react'
import { Table } from 'reactstrap'
import NewStudentModal from './NewStudentModal'

import ConfirmRemovalModal from './ConfirmRemovalModal'

class StudentList extends Component {
  render() {
    const students = this.props.students
    return (
      <Table dark>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Subject Name</th>
            <th>Created Data</th>
            <th>Registration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!students || students.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.pk}>
                <td>{student.id}</td>
                <td>{student.user}</td>
                <td>{student.subject_name}</td>
                <td>{student.created_date}</td>
                <td align="center">
                  <NewStudentModal
                    create={false}
                    student={student}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={student.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    )
  }
}

export default StudentList
