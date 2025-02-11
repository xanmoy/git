import React from 'react'
import Link from 'next/link'

function Footer() {
    return (
        <footer className="p-4 text-center text-gray-400 mt-4">
            <p>&copy; {new Date().getFullYear()} xanmoy. All rights reserved.</p>
            <p>
                <Link href="https://xanmoy.in" className="text-blue-400 hover:underline">About</Link> |{' '}
                <Link href="https://xanmoy.in/contact" className="text-blue-400 hover:underline">Contact</Link>
            </p>
        </footer>
    )
}

export default Footer
