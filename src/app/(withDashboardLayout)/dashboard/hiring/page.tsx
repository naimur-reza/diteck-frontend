"use client";
import Modal from '@/components/ui/modal/Modal';
import { useModal } from '@/hooks/useModal';
import React from 'react';
import CreateHiringPost from './components/CreateHiringPost';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import HiringTable from './components/HiringTable';

const HiringPage = () => {
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <section>
            <div className='flex justify-between items-center mb-10'>
                <h2 className='text-2xl font-medium'>Hiring Posts</h2>
                <Button onClick={openModal} className='cursor-pointer'><Plus className="size-4" /> New Hiring</Button>
                <Modal isOpen={isOpen} onClose={closeModal} title='New Hiring'>
                    <CreateHiringPost />
                </Modal>
            </div>
            <HiringTable />
        </section>
    );
};

export default HiringPage;