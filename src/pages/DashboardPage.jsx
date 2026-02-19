import React from 'react';

const DashboardPage = ({ onCreateNew, onOpenDemo }) => (
  <div className="app-shell">
    <h1 className="page-title">Memoria Archive - 3D Memory Room</h1>
    <p className="page-subtitle">
      Start a new memory room or explore a prefilled demo project.
    </p>
    <div className="section">
      <div className="button-row">
        <button className="button primary" onClick={onCreateNew} type="button">
          Create New Project
        </button>
        <button className="button" onClick={onOpenDemo} type="button">
          Open Demo Project
        </button>
      </div>
    </div>
  </div>
);

export default DashboardPage;
