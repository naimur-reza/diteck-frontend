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
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Hiring Posts</h1>
                    <p className="text-muted-foreground">Manage your Hiring Posts.</p>
                </div>
                <Button onClick={openModal} className='cursor-pointer'><Plus className="size-4" /> New Hiring</Button>
                <Modal isOpen={isOpen} onClose={closeModal} title='Add New Hiring Post'>
                    <CreateHiringPost closeModal={closeModal} />
                </Modal>
            </div>
            <HiringTable />
        </section>
    );
};

export default HiringPage;