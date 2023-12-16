import React from 'react'

function StudentList({ students }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Subject Name</th>
          <th>Created Date</th>
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
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

export default StudentList
