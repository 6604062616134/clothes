const db = require('../db');

const UserController = {
    async getAllUsers(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM users');
            res.json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getUserById(req, res) {
        try {
            const id = req.params.id;
            const [rows] = await db.query('SELECT * FROM users WHERE id = ?', id);
            if (rows.length === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createUser(req, res) {
        try {
            console.log(req.body);
            const { name, email, password } = req.body;
            const created = new Date();
            const modified = new Date();

            const sql_params = [name, email, password, created, modified];

            await db.query(`INSERT INTO users (name, email, password, created, modified) VALUES (?, ?, ?, ?, ?)`, sql_params);
            res.status(201).json({ message: 'User created' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateUser(req, res) {
        try {
            console.log(req.params);
            const id = req.params.id;
            const { name, email, password } = req.body;
            
            const modified = new Date();

            const sql_params = [name, email, password, modified];
            
            if(!name || !email || !password) {
                return res.status(400).json({ error: 'Invalid request' });
            } else {
                sql_params.push(id);
            }
            
            await db.query('UPDATE users SET name = ?, email = ?, password = ?, modified = ? WHERE id = ?', sql_params);
            res.json({ message: 'User updated' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteUser(req, res) {
        const id = req.params.id;
        try {
            await db.query('DELETE FROM users WHERE id = ?', id);
            res.json({ message: 'User deleted' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = UserController;