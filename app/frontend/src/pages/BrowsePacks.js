import React from 'react'
import PhotoPacks from '../components/Sections/PhotoPacks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'

function BrowsePacks() {
  return (
    <div>
      <PhotoPacks />
    </div>
  )
}

export default withAuthenticatedLayout(BrowsePacks, true)
