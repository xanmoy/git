import React from 'react'
import Link from 'next/link'
import Image from 'next/image' // Import Next.js Image component

function Header() {
    return (
        <header className="text-white">
            <nav className="container mx-auto flex items-center gap-6 p-4">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.png" // Replace with your logo path
                            alt="Logo"
                            width={40} // Adjust size as needed
                            height={40}
                            className="mr-2"
                        />
                        <span className="text-xl font-semibold">Xanmoy</span>
                    </Link>
                </div>

                {/* Navigation links */}
                <div className="ml-auto flex gap-6">
                    <Link href="https://xanmoy.in/" className="text-lg hover:text-blue-400 transition duration-200">Work</Link>
                    
                </div>
            </nav>
        </header>
    )
}

export default Header
