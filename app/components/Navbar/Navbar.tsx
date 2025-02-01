"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [isMobileView, setIsMobileView] = useState(true)

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 768)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`${styles.navbarWrapper} flex justify-between items-center`}>
      <div className='logo'>
        JagoRumah
      </div>
      {isMobileView && <div>
        <Image
          src="/images/burger-icon.svg"
          alt="burger icon"
          width={24}
          height={24}
        />
      </div>}
      <div className='navigation'>
        <ul className={`flex ${isMobileView ? 'flex-col absolute right-full' : 'flex-row static'}`}>
          <li>
            Home
          </li>
          <li>
            Products
          </li>
          <li>
            About
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar