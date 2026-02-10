const fs = require('fs');
const path = require('path');

const statsFilePath = path.join(__dirname, '../data/stats.json');

// Ensure data directory and file exist
if (!fs.existsSync(path.dirname(statsFilePath))) {
    fs.mkdirSync(path.dirname(statsFilePath), { recursive: true });
}

if (!fs.existsSync(statsFilePath)) {
    fs.writeFileSync(statsFilePath, JSON.stringify({ visits: 1050 })); // Starting count
}

exports.getVisits = (req, res) => {
    try {
        const stats = JSON.parse(fs.readFileSync(statsFilePath, 'utf8'));
        res.json(stats);
    } catch (error) {
        console.error('Error reading stats:', error);
        res.status(500).json({ message: 'Error al obtener estadísticas' });
    }
};

exports.incrementVisits = (req, res) => {
    try {
        const stats = JSON.parse(fs.readFileSync(statsFilePath, 'utf8'));
        stats.visits += 1;
        fs.writeFileSync(statsFilePath, JSON.stringify(stats));
        res.json(stats);
    } catch (error) {
        console.error('Error updating stats:', error);
        res.status(500).json({ message: 'Error al actualizar estadísticas' });
    }
};
