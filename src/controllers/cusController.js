const db = require('../db');

const cusController = {
    // Get all customers
    async getAllcus(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM customer');
            res.json(rows);
        } catch (error) {
            console.error('Error fetching customer:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getcusById(req, res) {
        // Get customers by id
        try {
            const cusid = req.params.cusID;
            const [rows] = await db.query('SELECT * FROM customer WHERE cusID = ?', cusid);
            if (rows.length === 0) {
                res.status(404).json({ error: 'customer not found' });
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            console.error('Error fetching customer:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createCus(req, res) {
        // Create customer
        try {
            console.log(req.body);
            const { role, address, tel, username, password, credit, cusFName, cusLName } = req.body;

            const sql_params = [role, address, tel, username, password, credit, cusFName, cusLName];

            await db.query(`INSERT INTO customer (role, address, tel, username, password, credit, cusFName, cusLName) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, sql_params);
            res.status(201).json({ message: 'customer created' });
        } catch (error) {
            console.error('Error creating customer:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateCus(req, res) {
        // Update customer
        try {
            console.log(req.params);
            const cusid = req.params.cusID;
            const { 
                role,
                address,
                tel,
                username,
                password,
                credit,
                cusFName,
                cusLName
            } = req.body;

            const sql_params = [role, address, tel, username, password, credit, cusFName, cusLName];
            
            if(!role || !address || !tel || !username || !password || !credit || !cusFName || !cusLName) {
                return res.status(400).json({ error: 'Invalid request' });
            } else {
                sql_params.push(cusid);
            }
            
            await db.query('UPDATE customer SET role = ?, address = ?, tel = ?, username = ?, password = ?, credit = ?, cusFName = ?,  cusLName = ? WHERE cusID = ?', sql_params);
            res.json({ message: 'customer updated' });
        } catch (error) {
            console.error('Error updating customer:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteCus(req, res) {
        // Delete customer
        const cusid = req.params.cusID;
        try {
            await db.query('DELETE FROM customer WHERE cusID = ?', cusid);
            res.json({ message: 'customer deleted' });
        } catch (error) {
            console.error('Error deleting customer:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = cusController;