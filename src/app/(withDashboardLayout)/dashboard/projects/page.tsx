"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal/Modal';
import { useModal } from '@/hooks/useModal';
import { Plus } from 'lucide-react';
import CreateProject from './components/CreateProject';
import ProjectTable from './components/ProjectTable';

const ProjectPage = () => {
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <div>
            <div className='flex justify-between items-center mb-10'>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground">Manage your projects.</p>
                </div>
                <Button onClick={openModal} className='cursor-pointer'><Plus className="size-4" /> New Project</Button>
                <Modal isOpen={isOpen} onClose={closeModal} title='Add New Project'>
                    <CreateProject />
                </Modal>
            </div>
            <ProjectTable />
        </div>
    );
};

export default ProjectPage;