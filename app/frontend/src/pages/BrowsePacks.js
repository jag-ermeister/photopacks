import React from 'react'
import PhotoPacks from '../components/PhotoPacks/PhotoPacks'
import withAuthenticatedLayout from '../components/hoc/withAuthenticatedLayout'

function BrowsePacks() {
  return (
    <div>
      <h1>Browse Packs</h1>
      <PhotoPacks />
    </div>
  )
}

export default withAuthenticatedLayout(BrowsePacks, true)
