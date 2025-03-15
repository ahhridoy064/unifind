const express = require('express');
const router = express.Router();
const School = require("../models/School"); // Your Mongoose model


// New school add korar API
router.post('/add', async (req, res) => {
    try {
        const newSchool = new School(req.body); // Request body theke data niye object create kora
        await newSchool.save(); // Database e save kora
        res.status(201).json({ success: true, data: newSchool });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding university", error });
    }
});

// All Schools Fetch korar API
router.get("/", async (req, res) => {
    try {
        const { division, type, search } = req.query; // Query parameters
        let query = {}; // Empty query (mane shob data asbe)

        // Division filter (jodi "all" na hoy)
        if (division && division !== "all") {
            query.division = division;
        }

        // Type filter (jodi "all" na hoy)
        if (type && type !== "all") {
            query.type = type;
        }

        // Search filter
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        // MongoDB theke data fetch
        const schools = await School.find({ institution: { $eq: "univesity" } });
        console.log("Schools fetched:", schools); 
        res.json(schools);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});


// Get schools by division with filters
router.get("/:division", async (req, res) => {
    try {
        const { division } = req.params;
        const { type, search } = req.query;

        let query = { division }; // Division অনুযায়ী ফিল্টার

        // Type ফিল্টার (Government, Non-Government)
        if (type && type !== "All") {
            query.type = type; // `type` ফিল্টার অ্যাড
        }

        // Name দিয়ে Search
        if (search) {
            query.name = { $regex: search, $options: "i" }; // Case-insensitive search
        }

        const schools = await School.find(query);
        res.json(schools);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
