import React from 'react'
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const navItems = [
        { name: "Dashboard", path: "/" },
        { name: "Drivers", path: "/drivers" },
        { name: "Vehicles", path: "/vehicles" }
    ];

    return (
        <nav className='bg-blue-600 px-8 py-10 text-white '>
            <div className='flex justify-between '>
                <Link to={"/"}>
                    <h1 className="text-2xl font-bold">🚛 Vehicle & Driver Panel</h1>
                </Link>
                <ul className='flex gap-6'>
                    {
                        navItems.map((item) => (
                            <li className='text-lg' key={item.name}>
                                <Link to={item.path}>
                                    {item.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}
