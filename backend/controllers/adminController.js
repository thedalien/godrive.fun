const models = require('../models');
const Car = models.cars;
const Book = models.bookings;
const User = models.users;

const getUsers = async (req, res) => {
    console.log('getUsers');
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.destroy({
            where: {
                id: userId,
            },
        });
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const blockUser = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.update({
            role: 'blocked',
        }, {
            where: {
                id: userId,
            },
        });
        return res.status(200).json({ message: 'User blocked successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const setUserRole = async (req, res) => {
    const { userId, role } = req.body;

    try {
        const user = await User.update({
            role: role,
        }, {
            where: {
                id: userId,
            },
        });
        return res.status(200).json({ message: 'User role updated successfully', user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}    


module.exports = {
    getUsers,
    deleteUser,
    blockUser,
    setUserRole,
};


