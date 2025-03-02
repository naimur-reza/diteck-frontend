"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal/Modal';
import { useModal } from '@/hooks/useModal';
import { Plus } from 'lucide-react';
import CreateBlog from './components/CreateBlog';
import BlogTable from './components/BlogTable';

const BlogsPage = () => {
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <div>
            <div className='flex justify-between items-center mb-5'>
                {/* <h2 className='text-2xl font-medium'>Blogs</h2> */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Blogs</h1>
                    <p className="text-muted-foreground">Manage your blogs.</p>
                </div>
                <Button onClick={openModal} className='cursor-pointer'><Plus className="size-4" /> New Blog</Button>
                <Modal isOpen={isOpen} onClose={closeModal} title='Add New Blog'>
                    <CreateBlog />
                </Modal>
            </div>

            <BlogTable />
        </div>
    );
};

export default BlogsPage;