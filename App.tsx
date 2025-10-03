import React, { useState, useEffect, useCallback } from 'react';
import { MOCK_PROJECTS, MOCK_AUTHORS } from './constants';
import { Project, Category, Campus, Status, User, Role, Author, Comment } from './types';
import Header from './src/components/ui/Header';
import FilterBar from './src/components/ui/FilterBar';
import ProjectGrid from './src/components/projects/ProjectGrid';
import ProjectModal from './src/components/projects/ProjectModal';
import SubmitProjectModal from './src/components/projects/SubmitProjectModal';
import LoginPage from './src/components/auth/LoginPage';
import AdminDashboard from './src/components/admin/AdminDashboard';
import ProfileModal from './src/components/projects/ProfileModal';
import users from './src/data/users.json';

export type NewProjectData = Omit<Project, 'id' | 'status' | 'views' | 'rating' | 'ratingsCount' | 'submissionDate' | 'approvalHistory' | 'comments'>;


const App: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(MOCK_PROJECTS);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
    const [selectedCampus, setSelectedCampus] = useState<Campus | 'all'>('all');
    
    const filterProjects = useCallback(() => {
        let tempProjects = [...projects];

        if (searchTerm) {
            tempProjects = tempProjects.filter(project =>
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (selectedCategory !== 'all') {
            tempProjects = tempProjects.filter(project => project.category === selectedCategory);
        }

        if (selectedCampus !== 'all') {
            tempProjects = tempProjects.filter(project => project.campus === selectedCampus);
        }
        
        setFilteredProjects(tempProjects.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()));
    }, [projects, searchTerm, selectedCategory, selectedCampus]);

    useEffect(() => {
    users.forEach(user => {
        if (!MOCK_AUTHORS.find(a => a.name === user.username)) {
            MOCK_AUTHORS.push({
                name: user.username,
                description: user.description,
                avatarUrl: user.avatarUrl
            });
        }
    });
        
        filterProjects();
    }, [filterProjects]);

    const handleSelectProject = (project: Project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };
    
    const handleSelectAuthor = (authorName: string) => {
        const author = MOCK_AUTHORS.find(a => a.name === authorName);
        if (author) {
            setSelectedAuthor(author);
        }
    };

    const handleCloseProfileModal = () => {
        setSelectedAuthor(null);
    };

    const handleLogin = (user: User) => {
        setCurrentUser(user);
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const handleOpenSubmitModal = () => {
        setIsSubmitModalOpen(true);
    };

    const handleCloseSubmitModal = () => {
        setIsSubmitModalOpen(false);
    };

    const handleProjectSubmit = (newProjectData: NewProjectData) => {
        const newProject: Project = {
            ...newProjectData,
            id: Math.max(...projects.map(p => p.id), 0) + 1,
            status: Status.Uploaded,
            views: 0,
            rating: 0,
            ratingsCount: 0,
            submissionDate: new Date().toISOString().split('T')[0],
            approvalHistory: [
                { status: Status.Uploaded, date: new Date().toISOString().split('T')[0] }
            ],
            comments: [],
        };
        setProjects(prevProjects => [newProject, ...prevProjects]);
        setIsSubmitModalOpen(false);
    };
    
    const handleUpdateProjectStatus = (projectId: number, newStatus: Status) => {
        setProjects(prevProjects => {
            const updatedProjects = prevProjects.map(p => {
                if (p.id === projectId && p.status !== newStatus) {
                    const newHistoryEntry = { status: newStatus, date: new Date().toISOString().split('T')[0] };
                    const historyExists = p.approvalHistory.some(h => h.status === newStatus && h.date === newHistoryEntry.date);
                    return {
                        ...p,
                        status: newStatus,
                        approvalHistory: historyExists ? p.approvalHistory : [...p.approvalHistory, newHistoryEntry]
                    };
                }
                return p;
            });
            return updatedProjects;
        });

        if (selectedProject && selectedProject.id === projectId) {
            setSelectedProject(prev => {
                if (!prev) return null;
                const newHistoryEntry = { status: newStatus, date: new Date().toISOString().split('T')[0] };
                const historyExists = prev.approvalHistory.some(h => h.status === newStatus && h.date === newHistoryEntry.date);
                return {
                    ...prev,
                    status: newStatus,
                    approvalHistory: historyExists ? prev.approvalHistory : [...prev.approvalHistory, newHistoryEntry],
                };
            });
        }
    };
    
    const handleRateProject = (projectId: number, newRating: number) => {
        const updateProject = (p: Project) => {
            const totalRating = p.rating * p.ratingsCount;
            const newRatingsCount = p.ratingsCount + 1;
            const newAverageRating = (totalRating + newRating) / newRatingsCount;
            return {
                ...p,
                rating: newAverageRating,
                ratingsCount: newRatingsCount,
            };
        };

        setProjects(prevProjects => 
            prevProjects.map(p => (p.id === projectId ? updateProject(p) : p))
        );
        
        if (selectedProject && selectedProject.id === projectId) {
            setSelectedProject(prev => prev ? updateProject(prev) : null);
        }
    };
    
    const handleAddNewComment = (projectId: number, text: string, parentId?: string) => {
        if (!currentUser) return;

        const newComment: Comment = {
            id: `c${Date.now()}`,
            author: currentUser.username,
            text,
            timestamp: new Date().toISOString(),
            replies: [],
        };

        const addReply = (comments: Comment[]): Comment[] => {
            return comments.map(comment => {
                if (comment.id === parentId) {
                    return { ...comment, replies: [...(comment.replies || []), newComment] };
                }
                if (comment.replies) {
                    return { ...comment, replies: addReply(comment.replies) };
                }
                return comment;
            });
        };

        const updateProjectComments = (project: Project) => {
            const existingComments = project.comments || [];
            if (parentId) {
                return { ...project, comments: addReply(existingComments) };
            } else {
                return { ...project, comments: [...existingComments, newComment] };
            }
        };
        
        setProjects(prevProjects =>
            prevProjects.map(p => (p.id === projectId ? updateProjectComments(p) : p))
        );

        if (selectedProject && selectedProject.id === projectId) {
            setSelectedProject(prev => (prev ? updateProjectComments(prev) : null));
        }
    };


    if (!currentUser) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
           <Header 
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenSubmitModal={handleOpenSubmitModal}
            onOpenProfile={() => {
                const author = MOCK_AUTHORS.find(a => a.name === currentUser.username);
                if (author) setSelectedAuthor(author);
            }}
/>
            {currentUser.role === Role.Admin ? (
                <AdminDashboard 
                    projects={projects}
                    onSelectProject={handleSelectProject}
                    onSelectAuthor={handleSelectAuthor}
                />
            ) : (
                <main className="container mx-auto px-4 py-8">
                    <FilterBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedCampus={selectedCampus}
                        setSelectedCampus={setSelectedCampus}
                    />
                    <ProjectGrid projects={filteredProjects} onSelectProject={handleSelectProject} onSelectAuthor={handleSelectAuthor} />
                </main>
            )}
            
            {selectedProject && (
                <ProjectModal 
                    project={selectedProject} 
                    onClose={handleCloseModal}
                    currentUser={currentUser}
                    onUpdateStatus={handleUpdateProjectStatus}
                    onRateProject={handleRateProject}
                    onSelectAuthor={handleSelectAuthor}
                    onAddNewComment={handleAddNewComment}
                />
            )}
            {isSubmitModalOpen && (
                <SubmitProjectModal onClose={handleCloseSubmitModal} onSubmit={handleProjectSubmit} />
            )}
            {selectedAuthor && (
                <ProfileModal
                    author={selectedAuthor}
                    projects={projects.filter(p => p.author === selectedAuthor.name)}
                    onClose={handleCloseProfileModal}
                    onSelectProject={handleSelectProject}
                />
            )}
        </div>
    );
};

export default App;