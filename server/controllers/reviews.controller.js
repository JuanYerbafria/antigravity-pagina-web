const axios = require('axios');

const getGoogleReviews = async (req, res) => {
    try {
        // Use the Place ID found for the most active branch (La Pradera)
        const PLACE_ID = 'ChIJ6Via8KNd04URZsDpAV9euHI';
        const API_KEY = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyCDz1ixZ23tPb1tS-av2ob3LdhEby1D0zU';
        
        // Using the PLACES API (NEW) as requested by the error message
        // Endpoint: https://places.googleapis.com/v1/places/{PLACE_ID}
        const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=reviews,rating,userRatingCount,displayName&key=${API_KEY}&languageCode=es`;
        
        const response = await axios.get(url);
        
        if (response.data && response.data.reviews) {
            const reviews = response.data.reviews || [];
            
            // Format reviews for the frontend
            const formattedReviews = reviews.map(review => ({
                id: review.name, // Review name is the unique id in New API
                author_name: review.authorAttribution?.displayName || 'Cliente',
                author_photo: review.authorAttribution?.photoUri,
                rating: review.rating,
                text: review.text?.text || '',
                time_description: review.relativePublishTimeDescription,
            }));
            
            res.json({
                success: true,
                reviews: formattedReviews,
                total_rating: response.data.rating,
                user_ratings_total: response.data.userRatingCount,
                display_name: response.data.displayName?.text
            });
        } else {
            console.error('Google API Error:', response.data);
            res.status(500).json({ 
                success: false, 
                message: 'No se pudieron obtener los comentarios del nuevo servicio de Google.',
                error: response.data
            });
        }
    } catch (error) {
        console.error('Error in reviews controller:', error.response?.data || error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Error interno al obtener los comentarios.',
            details: error.response?.data || error.message
        });
    }
};

module.exports = {
    getGoogleReviews
};
