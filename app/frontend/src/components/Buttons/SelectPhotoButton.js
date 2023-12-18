import React from 'react'

const SelectPhotosButton = ({ onChange }) => {
  return (
    <>
      <input
        id="images"
        type="file"
        name="images"
        multiple
        accept="image/*"
        className="sr-only"
        onChange={onChange}
      />
      <label
        htmlFor="images"
        className="flex justify-center bg-pretty-green hover:bg-light-green active:bg-dark-green rounded-xl px-4 py-3 font-medium font-ubuntu no-underline border border-pretty-green inline-block w-full text-center items-center"
      >
        Select photos&nbsp;
        <img height="16" width="16" src="/images/arrow_icon.svg" alt="go" />
      </label>
    </>
  )
}

export default SelectPhotosButton
