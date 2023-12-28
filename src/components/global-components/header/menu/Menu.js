

import React from 'react'
import AboutMe from '../../../pages/page-aboutme/AboutMe'
import Contact from '../../../pages/page-contact/Contact'
import Home from '../../../pages/page-home/Home'
import MenuItem from './MenuItem'

function Menu() {
  return (
    <div>

      <ul>
        <MenuItem page={<Home />} text="Anasayfa" href="#anasayfa" />
        <MenuItem page={<AboutMe />} text="Hakkımda" href="#hakkımda" />
        <MenuItem page={<Contact />} text="İletişim" href="#iletişim" />
      </ul>
    </div>
  )
}

export default Menu