import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DashboardHeader from '../../components/DashboardHeader';
import TaskModal from '../../components/TaskModal';
import TaskCard from './components/TaskCard';
import ProgressStats from './components/ProgressStats';
import FilterControls from './components/FilterControls';
import EmptyState from './components/EmptyState';

const MainDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePriority, setActivePriority] = useState('all');

  useEffect(() => {
    if (location?.state?.user) {
      setUser(location?.state?.user);
    } else {
      navigate('/authentication');
    }
  }, [location, navigate]);

  useEffect(() => {
    const mockTasks = [
      {
        id: 1,
        title: "A random task test",
        description: "Urgent",
        priority: "urgent",
        dueDate: "2026-01-13",
        status: "in-progress",
        createdAt: new Date("2026-01-10")
      },
      {
        id: 2,
        title: "Another task example",
        description: "High priority task example for testing.",
        priority: "high",
        dueDate: "2026-01-14",
        status: "pending",
        createdAt: new Date("2026-01-11")
      },
      {
        id: 3,
        title: "Medium Priority Task",
        description: "  This is a medium priority task for demonstration purposes.",
        priority: "medium",
        dueDate: "2026-01-16",
        status: "pending",
        createdAt: new Date("2026-01-12")
      },
      {
        id: 4,
        title: "Same high priority task",
        description: "Another high priority task with the same due date for sorting test.",
        priority: "high",
        dueDate: "2026-01-15",
        status: "pending",
        createdAt: new Date("2026-01-12")
      },
      {
        id: 5,
        title: "Just adding random tasks out of boredom T-T",
        description: "Pls pretend it's not here.",
        priority: "low",
        dueDate: "2026-01-20",
        status: "pending",
        createdAt: new Date("2026-01-10")
      },
      {
        id: 6,
        title: "Numero 6",
        description: "This is task number six in the list for testing purposes.",
        priority: "urgent",
        dueDate: "2026-01-11",
        status: "completed",
        createdAt: new Date("2026-01-09")
      },
      {
        id: 7,
        title: " ",
        description: "  ",
        priority: "medium",
        dueDate: "2027-01-18",
        status: "pending",
        createdAt: new Date("2026-01-11")
      },
      {
        id: 8,
        title: "Last one",
        description: "The higher one was to see what happens if i put only space",
        priority: "high",
        dueDate: "2027-02-17",
        status: "in-progress",
        createdAt: new Date("2026-01-10")
      }
    ];
    setTasks(mockTasks);
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate('/authentication');
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleTaskSubmit = (taskData) => {
    if (editingTask) {
      setTasks(prevTasks =>
        prevTasks?.map(task =>
          task?.id === editingTask?.id
            ? { ...task, ...taskData }
            : task
        )
      );
    } else {
      const newTask = {
        id: Date.now(),
        ...taskData,
        createdAt: new Date()
      };
      setTasks(prevTasks => [newTask, ...prevTasks]);
    }
    handleModalClose();
  };

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks?.map(task =>
        task?.id === taskId
          ? {
              ...task,
              status: task?.status === 'completed' ? 'pending' : 'completed'
            }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => prevTasks?.filter(task => task?.id !== taskId));
    }
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    if (activeFilter !== 'all') {
      filtered = filtered?.filter(task => task?.status === activeFilter);
    }

    if (activePriority !== 'all') {
      filtered = filtered?.filter(task => task?.priority === activePriority);
    }

    filtered?.sort((a, b) => {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      const priorityDiff = priorityOrder?.[a?.priority] - priorityOrder?.[b?.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    return filtered;
  };

  const filteredTasks = getFilteredTasks();
  const hasActiveFilters = activeFilter !== 'all' || activePriority !== 'all';

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} onLogout={handleLogout} />
      <main className="pt-[76px] pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-6 md:py-8 lg:py-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Manage your tasks and track your progress
                </p>
              </div>
              
              <Button
                variant="default"
                onClick={handleAddTask}
                iconName="Plus"
                iconPosition="left"
                className="sm:flex-shrink-0"
              >
                Add Task
              </Button>
            </div>

            <div className="space-y-6 md:space-y-8">
              <ProgressStats tasks={tasks} />

              <FilterControls
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                activePriority={activePriority}
                onPriorityChange={setActivePriority}
              />

              <div>
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                    {hasActiveFilters ? 'Filtered Tasks' : 'All Tasks'}
                  </h2>
                  <span className="text-sm md:text-base text-muted-foreground">
                    {filteredTasks?.length} {filteredTasks?.length === 1 ? 'task' : 'tasks'}
                  </span>
                </div>

                {filteredTasks?.length === 0 ? (
                  <EmptyState 
                    onAddTask={handleAddTask} 
                    hasFilters={hasActiveFilters}
                  />
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {filteredTasks?.map(task => (
                      <TaskCard
                        key={task?.id}
                        task={task}
                        onToggleComplete={handleToggleComplete}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <button
        onClick={handleAddTask}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-large flex items-center justify-center transition-all duration-250 hover:scale-110 active:scale-95 z-50"
        style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
        aria-label="Add new task"
      >
        <Icon name="Plus" size={28} color="#FFFFFF" />
      </button>
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleTaskSubmit}
        taskData={editingTask}
        mode={editingTask ? 'edit' : 'add'}
      />
    </div>
  );
};

export default MainDashboard;