import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
            <div className="max-w-7xl mx-auto p-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} HealthFlow Management Solutions. All Rights Reserved.
                </p>
                <div className="space-x-4 text-sm mt-3 sm:mt-0">
                    <a href="/privacy" className="hover:text-indigo-400 transition">Privacy Policy</a>
                    <a href="/terms" className="hover:text-indigo-400 transition">Terms of Service</a>
                    <a href="/contact" className="hover:text-indigo-400 transition">Contact Us</a>
                </div>
            </div>
        </footer>
  )
}

export default Footer