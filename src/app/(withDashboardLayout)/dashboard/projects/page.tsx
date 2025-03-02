"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal/Modal';
import { useModal } from '@/hooks/useModal';
import { Plus } from 'lucide-react';
import CreateProject from './components/CreateProject';

const ProjectPage = () => {
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <div>
            <div className='flex justify-between items-center mb-10'>
                <h2 className='text-2xl font-medium'>Projects</h2>
                <Button onClick={openModal} className='cursor-pointer'><Plus className="size-4" /> New Project</Button>
                <Modal isOpen={isOpen} onClose={closeModal} title='Add New Project'>
                    <CreateProject />
                </Modal>
            </div>
        </div>
    );
};

export default ProjectPage;