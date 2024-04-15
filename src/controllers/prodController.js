const db = require('../db');

const prodController = {
    // Get all products
    async getAllprods(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM product');
            res.json(rows);
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getprodsById(req, res) {
        // Get product by id
        try {
            const prodid = req.params.prodID;
            const [rows] = await db.query('SELECT * FROM product WHERE prodID = ?', prodid);
            if (rows.length === 0) {
                res.status(404).json({ error: 'product not found' });
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createProd(req, res) {
        // Create product
        try {
            console.log(req.body);
            const { prodName, price, cateID, quantity, image, descript } = req.body;

            const sql_params = [prodName, price, cateID, quantity, image, descript];

            await db.query(`INSERT INTO product (prodName, price, cateID, quantity, image, descript) VALUES (?,?,?,?,?,?)`, sql_params);
            res.status(201).json({ message: 'product created' });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateProd(req, res) {
        // Update product
        try {
            console.log(req.params);
            const prodid = req.params.prodID;
            const { prodName, price, cateID, quantity, image, descript } = req.body;

            const sql_params = [prodName, price, cateID, quantity, image, descript];
            
            if(!prodName || !price || !cateID || !quantity || !image || !descript) {
                return res.status(400).json({ error: 'Invalid request' });
            } else {
                sql_params.push(prodid);
            }
            
            await db.query('UPDATE product SET prodName = ?, price = ?, cateID = ?,quantity = ?, image = ?, descript = ? WHERE prodID = ?', sql_params);
            res.json({ message: 'product updated' });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteProd(req, res) {
        // Delete category
        const prodid = req.params.prodID;
        try {
            await db.query('DELETE FROM product WHERE prodID = ?', prodid);
            res.json({ message: 'product deleted' });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = prodController;