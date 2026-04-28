const fs = require('fs');
const path = require('path');

const statsFilePath = path.join(__dirname, '../data/stats.json');

// Ensure data directory and file exist safely without crashing the server
try {
    if (!fs.existsSync(path.dirname(statsFilePath))) {
        fs.mkdirSync(path.dirname(statsFilePath), { recursive: true });
    }
    if (!fs.existsSync(statsFilePath)) {
        fs.writeFileSync(statsFilePath, JSON.stringify({ visits: 0 }));
    }
} catch (error) {
    console.error('Warning: Could not initialize stats file. Make sure the data folder has write permissions.', error.message);
}

exports.getVisits = (req, res) => {
    try {
        if (fs.existsSync(statsFilePath)) {
            const stats = JSON.parse(fs.readFileSync(statsFilePath, 'utf8'));
            return res.json(stats);
        }
        res.json({ visits: 0 });
    } catch (error) {
        console.error('Error reading stats:', error);
        res.status(500).json({ message: 'Error al obtener estadísticas' });
    }
};

exports.incrementVisits = (req, res) => {
    try {
        let stats = { visits: 0 };
        if (fs.existsSync(statsFilePath)) {
            stats = JSON.parse(fs.readFileSync(statsFilePath, 'utf8'));
        }
        stats.visits += 1;
        fs.writeFileSync(statsFilePath, JSON.stringify(stats));
        res.json(stats);
    } catch (error) {
        console.error('Error updating stats:', error.message);
        // Don't throw 500 if it's just a write permission error, just return the current (or 0) count
        res.json({ visits: 0, error: 'Read-only mode' });
    }
};
