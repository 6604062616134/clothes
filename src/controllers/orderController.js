const db = require('../db');

const orderController = {
    // Get all orders
    async getAllorders(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM `order`');
            res.json(rows);
        } catch (error) {
            console.error('Error fetching order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getOrdersById(req, res) {
        // Get order by id
        try {
            const orderid = req.params.orderID;
            const [rows] = await db.query('SELECT * FROM `order` WHERE orderID = ?', orderid);
            if (rows.length === 0) {
                res.status(404).json({ error: 'order not found' });
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            console.error('Error fetching order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createOrder(req, res) {
        // Create order
        try {
            console.log(req.body);
            const { cusID, prodID, orderQuan, status } = req.body;
            const created_date = new Date();
            const modified_date = new Date();

            const sql_params = [cusID, prodID, orderQuan, status, created_date, modified_date];

            await db.query('INSERT INTO `order` (cusID, prodID, orderQuan, status, created_date, modified_date) VALUES (?, ?, ?, ?, ?, ?)', sql_params);
            res.status(201).json({ message: 'order created' });
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateOrder(req, res) {
        // Update order
        try {
            console.log(req.params);
            const orderid = req.params.orderID;
            const { cusID, prodID, orderQuan, status } = req.body;
            
            const modified_date = new Date();

            const sql_params = [cusID, prodID, orderQuan, status, modified_date];
            
            if(!cusID || !prodID || !orderQuan || !status) {
                return res.status(400).json({ error: 'Invalid request' });
            } else {
                sql_params.push(orderid);
            }
            
            await db.query('UPDATE order SET cusID = ?, prodID = ?, orderQuan = ?,status = ?, modified_date = ?  WHERE orderID = ?', sql_params);
            res.json({ message: 'order updated' });
        } catch (error) {
            console.error('Error updating order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteOrder(req, res) {
        // Delete order
        const orderid = req.params.orderID;
        try {
            await db.query('DELETE FROM category WHERE orderID = ?', orderid);
            res.json({ message: 'order deleted' });
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = orderController;