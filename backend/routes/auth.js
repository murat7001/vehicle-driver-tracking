const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Driver = require('../models/Driver');

// Giriş
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await Driver.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Email bulunamadı' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Şifre hatalı' });

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1d' }
    );

    res.json({ token });
});

module.exports = router;
