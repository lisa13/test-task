"use strict";

export default class MainController {

    static async getItems(req, res) {
        try {
            const items = [{a: 1}, {b: 2}];

            res.json(items);
        } catch (err) {
            res.status(err.statusCode || 400).json({message: err.message || err});
        }
    }
}