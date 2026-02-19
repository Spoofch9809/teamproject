import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadPage = ({ project, setProject }) => {
  const navigate = useNavigate();
  const [memoryTitle, setMemoryTitle] = useState('');
  const [memoryDescription, setMemoryDescription] = useState('');

  const updateField = (field, value) => {
    setProject((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const newPhotos = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      name: file.name,
      source: 'upload'
    }));

    setProject((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }));
  };

  const handleAddMemory = () => {
    if (!memoryTitle.trim()) return;

    setProject((prev) => ({
      ...prev,
      memories: [
        ...prev.memories,
        {
          id: `${Date.now()}`,
          title: memoryTitle,
          description: memoryDescription
        }
      ]
    }));

    setMemoryTitle('');
    setMemoryDescription('');
  };

  return (
    <div className="app-shell">
      <h1 className="page-title">Upload Project Details</h1>
      <p className="page-subtitle">
        Capture the essentials for the memory room before generating the 3D view.
      </p>

      <div className="section">
        <div className="form-grid">
          <div className="field">
            <label htmlFor="projectTitle">Project Title</label>
            <input
              id="projectTitle"
              type="text"
              placeholder="e.g. Our First Year"
              value={project.title}
              onChange={(event) => updateField('title', event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="coupleNames">Couple Names</label>
            <input
              id="coupleNames"
              type="text"
              placeholder="e.g. Ava & Liam"
              value={project.coupleNames}
              onChange={(event) => updateField('coupleNames', event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Upload Photos</h2>
        <p className="helper">Add multiple images. These will become the room frames.</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
        />
        <div className="photo-grid" style={{ marginTop: '16px' }}>
          {project.photos.map((photo) => (
            <div className="photo-thumb" key={photo.id}>
              <img src={photo.url} alt={photo.name} />
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Add Text Memories</h2>
        <div className="field">
          <label htmlFor="memoryTitle">Memory Title</label>
          <input
            id="memoryTitle"
            type="text"
            placeholder="e.g. First Dance"
            value={memoryTitle}
            onChange={(event) => setMemoryTitle(event.target.value)}
          />
        </div>
        <div className="field" style={{ marginTop: '16px' }}>
          <label htmlFor="memoryDescription">Short Description</label>
          <textarea
            id="memoryDescription"
            rows={3}
            placeholder="Write a brief note about the moment"
            value={memoryDescription}
            onChange={(event) => setMemoryDescription(event.target.value)}
          />
        </div>
        <div className="button-row" style={{ marginTop: '16px' }}>
          <button className="button" type="button" onClick={handleAddMemory}>
            Add Memory
          </button>
        </div>
        <div className="memory-list" style={{ marginTop: '16px' }}>
          {project.memories.map((memory, index) => (
            <div className="memory-card" key={memory.id}>
              <div className="list-item">
                <span className="order-tag">#{index + 1}</span>
                <strong>{memory.title}</strong>
              </div>
              <div className="small-note">{memory.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="button-row">
        <button className="button primary" type="button" onClick={() => navigate('/review')}>
          Save &amp; Review
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
