const db = require('../db');

const UserController = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const limit = req.query.limit || 2;
            const page = req.query.page || 1;
            const offset = (page - 1) * limit;
            const search = req.query.search || '';

            let sql_count = `SELECT COUNT(*) AS total FROM users`;
            if(search) {
                sql_count += ` WHERE name LIKE '%${search}%'`;
            }

            const [rows_count] = await db.query(sql_count);
            const total = rows_count[0].total;
            const total_pages = Math.ceil(total / limit);

            const sort = req.query.sort || 'name';
            const order = req.query.order || 'ASC';

            let sql = `SELECT * FROM users`;
            if(search) {
                sql += ` WHERE name LIKE '%${search}%'`;
            }
            sql += ` ORDER BY ${sort} ${order}`;
            sql += ` LIMIT ${limit} OFFSET ${offset}`;

            // console.log("sql_query-->>",sql);
            const [rows] = await db.query(sql);

            if(rows.length === 0) {
                return res.status(404).json({ error: 'NO DATA' });
            }

            res.json({ rows, total, total_pages, page });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getUserById(req, res) {
        // Get user by id
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
        // Create user
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
        // Update user
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
        // Delete user
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