import React from 'react';
import '../CSS_files/Graph.css';

const Graph = () => {
  return (
    <div className="graphs-container">
      <h1 className="page-title">Data Visualizations</h1>
      <p className="support-text-graph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, amet. Repellat temporibus sunt rerum deserunt adipisci facilis doloremque numquam quae.</p>
      <div className="graph-wrapper">
        <div className="graph-card">
          <div className="graph-placeholder">
            {/* Placeholder for graph 1 */}
            <p>Graph 1</p>
          </div>
          <p className="graph-label">Label for Graph 1</p>
        </div>
        
        <div className="graph-card">
          <div className="graph-placeholder">
            {/* Placeholder for graph 2 */}
            <p>Graph 2</p>
          </div>
          <p className="graph-label">Label for Graph 2</p>
        </div>
        
        <div className="graph-card">
          <div className="graph-placeholder">
            {/* Placeholder for graph 3 */}
            <p>Graph 3</p>
          </div>
          <p className="graph-label">Label for Graph 3</p>
        </div>
        
        <div className="graph-card">
          <div className="graph-placeholder">
            {/* Placeholder for graph 4 */}
            <p>Graph 4</p>
          </div>
          <p className="graph-label">Label for Graph 4</p>
        </div>
        
        <div className="graph-card">
          <div className="graph-placeholder">
            {/* Placeholder for graph 5 */}
            <p>Graph 5</p>
          </div>
          <p className="graph-label">Label for Graph 5</p>
        </div>
        
        <div className="graph-card">
          <div className="graph-placeholder">
            {/* Placeholder for graph 6 */}
            <p>Graph 6</p>
          </div>
          <p className="graph-label">Label for Graph 6</p>
        </div>
      </div>
    </div>
  );
};

export default Graph;
