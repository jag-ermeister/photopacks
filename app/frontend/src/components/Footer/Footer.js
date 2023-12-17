import React from 'react'
import { Footer as FbFooter } from 'flowbite-react'
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from 'react-icons/bs'

function Footer() {
  return (
    <FbFooter bgDark>
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <FbFooter.Title title="Company" />
            <FbFooter.LinkGroup col>
              <FbFooter.Link href="#">About</FbFooter.Link>
              <FbFooter.Link href="#">Careers</FbFooter.Link>
              <FbFooter.Link href="#">Brand Center</FbFooter.Link>
              <FbFooter.Link href="#">Blog</FbFooter.Link>
            </FbFooter.LinkGroup>
          </div>
          <div>
            <FbFooter.Title title="help center" />
            <FbFooter.LinkGroup col>
              <FbFooter.Link href="#">Discord Server</FbFooter.Link>
              <FbFooter.Link href="#">Twitter</FbFooter.Link>
              <FbFooter.Link href="#">Facebook</FbFooter.Link>
              <FbFooter.Link href="#">Contact Us</FbFooter.Link>
            </FbFooter.LinkGroup>
          </div>
          <div>
            <FbFooter.Title title="legal" />
            <FbFooter.LinkGroup col>
              <FbFooter.Link href="#">Privacy Policy</FbFooter.Link>
              <FbFooter.Link href="#">Licensing</FbFooter.Link>
              <FbFooter.Link href="#">Terms &amp; Conditions</FbFooter.Link>
            </FbFooter.LinkGroup>
          </div>
          <div>
            <FbFooter.Title title="download" />
            <FbFooter.LinkGroup col>
              <FbFooter.Link href="#">iOS</FbFooter.Link>
              <FbFooter.Link href="#">Android</FbFooter.Link>
              <FbFooter.Link href="#">Windows</FbFooter.Link>
              <FbFooter.Link href="#">MacOS</FbFooter.Link>
            </FbFooter.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <FbFooter.Copyright href="#" by="Flowbite™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FbFooter.Icon href="#" icon={BsFacebook} />
            <FbFooter.Icon href="#" icon={BsInstagram} />
            <FbFooter.Icon href="#" icon={BsTwitter} />
            <FbFooter.Icon href="#" icon={BsGithub} />
            <FbFooter.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </FbFooter>
  )
}

export default Footer
