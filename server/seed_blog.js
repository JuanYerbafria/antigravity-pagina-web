const db = require('./db');

async function seedBlog() {
    try {
        const title = '5 Consejos para alargar la vida de tus llantas';
        const content = '1. Revisa la presión de aire mensualmente.\n2. Realiza rotación cada 10,000 km.\n3. No olvides la alineación y balanceo.\n4. Evita frenazos bruscos.\n5. Revisa el desgaste regularmente.';
        const author = 'Equipo Noguez';
        const image_url = 'https://images.unsplash.com/photo-1578844251758-2f71da645217?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

        await db.query(
            'INSERT INTO blog_posts (title, content, author, image_url) VALUES (?, ?, ?, ?)',
            [title, content, author, image_url]
        );

        console.log('Blog post inserted successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error inserting blog post:', error);
        process.exit(1);
    }
}

seedBlog();
