"use client"

import React, { useState, useLayoutEffect, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

interface NavLink {
  path: string
  label: string
}

const NAV_LINKS: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/about', label: 'About' },
]

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        isMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const navStyles = {
    wrapper: "bg-[#b22222] px-4 py-4 md:px-16 md:py-8 flex justify-between items-center",
    logoText: "text-white text-xl font-bold",
    menuToggle: "md:hidden z-[60] relative",
    menuContainer: `
      fixed md:static bg-[#b22222]/80 md:bg-[#b22222] 
      transition-[right] duration-500 ease-in-out
      min-w-[65vw] md:min-w-fit h-screen md:h-auto 
      top-0 pt-20 md:pt-0 z-50
      ${isMenuOpen ? 'right-0' : '-right-full md:right-0'}
      border-l border-white/20 md:border-0 
      backdrop-blur-sm md:backdrop-blur-none
    `,
    linksList: "flex flex-col md:flex-row gap-4 md:gap-12 p-4 md:p-0",
    linkItem: "text-white",
    linkStyle: (isActive: boolean) => `
      ${isActive ? 'border-b-2 border-white' : 'border-b-2 border-transparent'} 
      transition-all duration-500 hover:opacity-80
    `
  }

  return (
    <div className={navStyles.wrapper}>
      <div className={navStyles.logoText}>
        <Link href="/">JagoRumah</Link>
      </div>
      
      <div className={navStyles.menuToggle}>
        <button 
          ref={buttonRef}
          className={styles.hamburgerMenu}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.line} ${isMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.line} ${isMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.line} ${isMenuOpen ? styles.open : ''}`}></span>
        </button>
      </div>

      {isMounted && (
        <div ref={navRef} className={navStyles.menuContainer}>
          <ul className={navStyles.linksList}>
            {NAV_LINKS.map(({ path, label }) => (
              <li key={path} className={navStyles.linkItem}>
                <Link 
                  href={path}
                  className={navStyles.linkStyle(pathname === path)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar
