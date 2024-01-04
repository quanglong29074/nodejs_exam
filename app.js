const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/song',);

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    size: { type: Number, required: true },
    views: { type: Number, default: 0 },
});

const Song = mongoose.model('Song', songSchema);

app.use(bodyParser.json());

// Tạo điểm cuối API để thêm bài hát mới (POST /songs).
app.post('/api/songs', async (req, res) => {
    try {
        const newSong = await Song.create(req.body);
        res.json(newSong);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tạo điểm cuối API để lấy tất cả các bài hát (GET /songs).
app.get('/api/songs', async (req, res) => {
    try {
        const allSongs = await Song.find();
        res.json(allSongs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tạo điểm cuối API để lấy bài hát cụ thể theo ID (GET /songs/:id).
app.get('/api/songs/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ error: 'Not Found' });
        }
        res.json(song);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tạo điểm cuối API để cập nhật bài hát theo ID (PUT /songs/:id).
app.put('/api/songs/:id', async (req, res) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedSong) {
            return res.status(404).json({ error: 'Not Found' });
        }
        res.json(updatedSong);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tạo điểm cuối API để xóa bài hát theo ID (DELETE /songs/:id).
app.delete('/api/songs/:id', async (req, res) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.id);
        if (!deletedSong) {
            return res.status(404).json({ error: 'Not Found' });
        }
        res.json(deletedSong);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
