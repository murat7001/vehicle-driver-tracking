import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState(null);
    const token = localStorage.getItem('token');

    
    useEffect(() => {
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1]));
                setRole(decoded.role);
            } catch (err) {
                console.error("Invalid token.");
                setRole(null);
            }
        }
    }, [token]);

    const handleLogoutConfirm = () => {
        localStorage.removeItem("token");
        setRole(null);
        navigate("/login");
        setOpen(false);
    };

    // Navigation options based on role
    const adminNavItems = [
        { name: "Dashboard", path: "/" },
        { name: "Drivers", path: "/drivers" },
        { name: "Vehicles", path: "/vehicles" }
    ];

    const driverNavItems = [
        { name: "My Vehicle", path: "/my-vehicle" }
    ];

    const navItems = role === 'admin' ? adminNavItems : role === 'driver' ? driverNavItems : [];

    return (
        <>
            <nav className="bg-blue-600 px-6 py-4 text-white shadow-md">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-14 w-14"
                        />
                        <h1 className="text-2xl font-bold hover:text-blue-200 transition">
                            FleetRadar
                        </h1>
                    </Link>

                    <div className="flex items-center gap-6">
                        <ul className="flex gap-6">
                            {navItems.map((item) => (
                                <li key={item.name} className="text-lg hover:text-blue-200 transition">
                                    <Link to={item.path}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>

                        {role && (
                            <button
                                onClick={() => setOpen(true)}
                                className="ml-4 bg-white text-blue-600 px-4 py-1.5 rounded-md font-semibold hover:bg-blue-100 transition"
                            >
                                Logout
                            </button>
                        )}

                    </div>
                </div>
            </nav>

            {/* Logout confirmation modal */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={handleLogoutConfirm} color="error" variant="contained">
                        Yes, Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
