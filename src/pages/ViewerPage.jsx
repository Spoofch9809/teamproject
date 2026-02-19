import React, { useMemo, useState } from 'react';
import ThreeRoom from '../components/ThreeRoom';
import Modal from '../components/Modal';
import { placeholderImages } from '../data/mockProject';

const ViewerPage = ({ project }) => {
  const [selectedFrame, setSelectedFrame] = useState(null);

  const frames = useMemo(() => {
    const output = [];
    for (let i = 0; i < 4; i += 1) {
      const photo = project.photos[i];
      const memory = project.memories[i];
      output.push({
        id: `frame-${i}`,
        image: photo?.url || placeholderImages[i],
        title: memory?.title || `Memory ${i + 1}`,
        description: memory?.description || 'No description added yet.'
      });
    }
    return output;
  }, [project]);

  return (
    <div className="app-shell">
      <h1 className="page-title">3D Memory Room</h1>
      <p className="page-subtitle">
        Orbit around the room and click any frame to open its memory.
      </p>

      <div className="viewer-layout">
        <ThreeRoom frames={frames} onFrameSelect={setSelectedFrame} />
        <aside className="viewer-panel">
          <h3>Frames</h3>
          <p className="helper">Order reflects your upload sequence.</p>
          <div className="memory-list">
            {frames.map((frame, index) => (
              <div className="memory-card" key={frame.id}>
                <div className="list-item">
                  <span className="order-tag">#{index + 1}</span>
                  <strong>{frame.title}</strong>
                </div>
                <div className="small-note">{frame.description}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <Modal
        isOpen={Boolean(selectedFrame)}
        onClose={() => setSelectedFrame(null)}
        image={selectedFrame?.image}
        title={selectedFrame?.title}
        description={selectedFrame?.description}
      />
    </div>
  );
};

export default ViewerPage;
