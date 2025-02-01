import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-[#b22222] text-white px-4 py-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Company Info */}
          <div className="text-left space-y-3">
            <h3 className="text-xl font-bold">JagoRumah</h3>
            <p className="text-sm">
              Your trusted partner in finding the perfect home solution.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-left space-y-3">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:underline block py-1">Home</Link></li>
              <li><Link href="/products" className="text-sm hover:underline block py-1">Products</Link></li>
              <li><Link href="/about" className="text-sm hover:underline block py-1">About</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-left space-y-3">
            <h4 className="text-lg font-semibold">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm">Email: info@jagorumah.com</li>
              <li className="text-sm">Phone: +62 123 456 789</li>
              <li className="text-sm">Address: Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-white/20">
          <p className="text-sm">&copy; {new Date().getFullYear()} JagoRumah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer