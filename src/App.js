import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import ReviewPage from './pages/ReviewPage';
import ViewerPage from './pages/ViewerPage';
import { demoProject } from './data/mockProject';

const emptyProject = {
  title: '',
  coupleNames: '',
  photos: [],
  memories: []
};

const DashboardRoute = ({ onCreateNew, onOpenDemo }) => {
  const navigate = useNavigate();

  return (
    <DashboardPage
      onCreateNew={() => {
        onCreateNew();
        navigate('/upload');
      }}
      onOpenDemo={() => {
        onOpenDemo();
        navigate('/upload');
      }}
    />
  );
};

const App = () => {
  // Store all project data in React state for the prototype.
  const [project, setProject] = useState(emptyProject);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardRoute
              onCreateNew={() => setProject(emptyProject)}
              onOpenDemo={() => setProject(demoProject)}
            />
          }
        />
        <Route
          path="/upload"
          element={<UploadPage project={project} setProject={setProject} />}
        />
        <Route path="/review" element={<ReviewPage project={project} />} />
        <Route path="/viewer" element={<ViewerPage project={project} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
