import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/blog/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog post:', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-dark mb-4">Artículo no encontrado</h2>
                <Link to="/blog" className="text-accent hover:underline">Volver al Blog</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-accent mb-8 transition-colors">
                <ArrowLeft size={20} className="mr-2" /> Volver al Blog
            </Link>

            <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="w-full">
                    {post.image_url ? (
                        <img src={post.image_url} alt={post.title} className="w-full h-auto" />
                    ) : (
                        <div className="w-full h-64 flex items-center justify-center text-gray-400 bg-gray-200">Sin Imagen</div>
                    )}
                </div>

                <div className="p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">{post.title}</h1>

                    <div className="flex items-center text-gray-500 mb-8 space-x-6 border-b border-gray-100 pb-8">
                        <span className="flex items-center"><Calendar size={18} className="mr-2" /> {new Date(post.published_at).toLocaleDateString()}</span>
                        <span className="flex items-center"><User size={18} className="mr-2" /> {post.author || 'Admin'}</span>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
                        {post.content}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
