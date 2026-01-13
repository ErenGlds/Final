import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';
import Authentication from './pages/authentication';
import MainDashboard from './pages/main-dashboard';
import AddTaskModal from './pages/add-task-modal';
import EditTaskModal from './pages/edit-task-modal';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<Authentication />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/add-task-modal" element={<AddTaskModal />} />
        <Route path="/edit-task-modal" element={<EditTaskModal />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;