const { getSheetData, parseSheetData } = require('../utils/googleSheets');

// Helper to parse Google's "Date(y,m,d,h,m,s)" format
const parseGoogleDate = (dateVal) => {
    if (!dateVal) return new Date().toISOString();

    // Check if it's the "Date(...)" string format
    if (typeof dateVal === 'string' && dateVal.startsWith('Date(')) {
        const nums = dateVal.match(/\d+/g);
        if (nums && nums.length >= 3) {
            // Month is 0-indexed in Google's Date format
            return new Date(
                parseInt(nums[0]),
                parseInt(nums[1]),
                parseInt(nums[2]),
                parseInt(nums[3] || 0),
                parseInt(nums[4] || 0),
                parseInt(nums[5] || 0)
            ).toISOString();
        }
    }

    // Otherwise try standard parsing
    return new Date(dateVal).toISOString();
};

exports.getPosts = async (req, res) => {
    try {
        const sheetData = await getSheetData('BLOG');

        if (!sheetData) {
            return res.status(500).json({ message: 'Error al obtener datos de Google Sheets' });
        }

        const rawPosts = parseSheetData(sheetData);

        // Map and clean up the data
        const posts = rawPosts.map(post => ({
            id: parseInt(post.id) || Math.random(),
            title: post.title || 'Sin título',
            content: post.content || '',
            author: post.author || 'Anónimo',
            image_url: post.image_url || 'https://placehold.co/600x400?text=Blog',
            published_at: parseGoogleDate(post.published_at)
        }));

        // Sort by date descending (assuming published_at is a date string)
        posts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error al obtener artículos' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const sheetData = await getSheetData('BLOG');

        if (!sheetData) {
            return res.status(500).json({ message: 'Error al obtener datos de Google Sheets' });
        }

        const rawPosts = parseSheetData(sheetData);

        // Find the specific post
        // Note: Google Sheets returns strings mostly, ensure loose equality or parsing
        const post = rawPosts.find(p => parseInt(p.id) === postId);

        if (!post) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        // Map the single post
        const mappedPost = {
            id: parseInt(post.id),
            title: post.title || 'Sin título',
            content: post.content || '',
            author: post.author || 'Anónimo',
            image_url: post.image_url || 'https://placehold.co/600x400?text=Blog',
            published_at: parseGoogleDate(post.published_at)
        };

        res.json(mappedPost);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Error al obtener el artículo' });
    }
};
