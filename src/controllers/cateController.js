const db = require('../db');

const cateController = {
    // Get all category
    async getAllCates(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM category');
            res.json(rows);
        } catch (error) {
            console.error('Error fetching category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getCatesById(req, res) {
        // Get category by id
        try {
            const cateid = req.params.cateID;
            const [rows] = await db.query('SELECT * FROM category WHERE cateID = ?', cateid);
            if (rows.length === 0) {
                res.status(404).json({ error: 'category not found' });
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            console.error('Error fetching category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createCate(req, res) {
        // Create category
        try {
            console.log(req.body);
            const { cateName } = req.body;

            const sql_params = [cateName];

            await db.query(`INSERT INTO category (cateName) VALUES (?)`, sql_params);
            res.status(201).json({ message: 'category created' });
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateCate(req, res) {
        // Update category
        try {
            console.log(req.params);
            const cateid = req.params.cateID;
            const { cateName } = req.body;

            const sql_params = [cateName];
            
            if(!cateName) {
                return res.status(400).json({ error: 'Invalid request' });
            } else {
                sql_params.push(cateid);
            }
            
            await db.query('UPDATE category SET cateName = ? WHERE cateID = ?', sql_params);
            res.json({ message: 'category updated' });
        } catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteCate(req, res) {
        // Delete category
        const cateid = req.params.cateID;
        try {
            await db.query('DELETE FROM category WHERE cateID = ?', cateid);
            res.json({ message: 'category deleted' });
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = cateController;