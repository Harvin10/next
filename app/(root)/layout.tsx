import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </main>
  )
}

export default layout