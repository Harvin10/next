"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [isMobileView, setIsMobileView] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 768)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`
      ${styles.navbarWrapper}
      ${isMobileView ? 'px-4 py-4' : 'px-16 py-8'}
      flex justify-between items-center 
    `}>
      <div className='logo text-white text-xl font-bold'>
        JagoRumah
      </div>
      {isMobileView && <div>
        <Image
          src="/images/burger-icon.svg"
          alt="burger icon"
          width={28}
          height={28}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>}
      <div className={`
        ${styles.navigation}
        ${isMobileView ? `${styles.navigationMobile} absolute top-0 h-screen` : 'static'}
        ${isMenuOpen ? 'right-0' : '-right-full'}
      `}>
        <ul className={`
          flex 
          ${isMobileView ? 'flex-col gap-4 p-4' : 'flex-row gap-12'}
        `}>
          <li className='text-white'>
            Home
          </li>
          <li className='text-white'>
            Products
          </li>
          <li className='text-white'>
            About
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar