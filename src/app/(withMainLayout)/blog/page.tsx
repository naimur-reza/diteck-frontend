import { TBlog } from '@/types';
import getAllBlogs from '@/utils/fetchData/getAllBlogs';
import React from 'react';
import { BlogCard } from './_components/BlogCard';
import { SectionTitle } from '@/components/common';

const BlogPage = async () => {
    const { data: blogs = [] }: { data: TBlog[] } = await getAllBlogs();
    return (
        <div className='container mx-auto'>
            <SectionTitle
                buttonText="All Posts"
                title="Latest news and industry insights"
            />
            <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10'>
                {blogs?.map((blog, idx) => (
                    <BlogCard blog={blog} key={idx} />
                ))}
            </div>
        </div>
    );
};

export default BlogPage;