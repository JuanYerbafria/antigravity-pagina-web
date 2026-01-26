import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, User } from 'lucide-react';

const Blog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/blog');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12 text-primary">Blog y Consejos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="h-48 bg-gray-200">
                                {post.image_url ? (
                                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">Sin Imagen</div>
                                )}
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-3 text-dark hover:text-accent cursor-pointer">{post.title}</h2>
                                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                    <span className="flex items-center"><Calendar size={14} className="mr-1" /> {new Date(post.published_at).toLocaleDateString()}</span>
                                    <span className="flex items-center"><User size={14} className="mr-1" /> {post.author || 'Admin'}</span>
                                </div>
                                <p className="text-gray-600 line-clamp-3 mb-4">
                                    {post.content}
                                </p>
                                <Link to={`/blog/${post.id}`} className="text-accent font-bold hover:underline inline-block">Leer más →</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-12">
                        <p className="text-gray-500">No hay artículos publicados aún.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
