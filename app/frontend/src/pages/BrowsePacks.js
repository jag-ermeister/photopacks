import React from 'react'
import FilterablePhotoPacks from '../components/Sections/FilterablePhotoPacks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'

function BrowsePacks() {
  return (
    <div>
      <FilterablePhotoPacks />
    </div>
  )
}

export default withAuthenticatedLayout(BrowsePacks, true)
