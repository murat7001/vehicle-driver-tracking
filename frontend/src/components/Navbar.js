import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const navItems = [
        { name: "Dashboard", path: "/" },
        { name: "Drivers", path: "/drivers" },
        { name: "Vehicles", path: "/vehicles" }
    ];

    const handleLogoutConfirm = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
            <nav className="bg-blue-600 px-6 py-4 text-white shadow-md">
                <div className="flex justify-between items-center">
                    <Link to="/">
                        <h1 className="text-2xl font-bold hover:text-blue-200 transition">🚛 Vehicle & Driver Panel</h1>
                    </Link>

                    <div className="flex items-center gap-6">
                        <ul className="flex gap-6">
                            {navItems.map((item) => (
                                <li key={item.name} className="text-lg hover:text-blue-200 transition">
                                    <Link to={item.path}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => setOpen(true)}
                            className="ml-4 bg-white text-blue-600 px-4 py-1.5 rounded-md font-semibold hover:bg-blue-100 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Confirmation Dialog */}
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
