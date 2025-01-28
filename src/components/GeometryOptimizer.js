import React, { useState, useCallback } from 'react';
import { Upload, FileText, AlertTriangle } from 'lucide-react';

const GeometryOptimizer = () => {
  const [file, setFile] = useState(null);
  const [triangleCount, setTriangleCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [optimizedModel, setOptimizedModel] = useState(null);

  const handleFileUpload = useCallback((event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.name.endsWith('.rvt')) {
      setFile(uploadedFile);
      setError(null);
      simulateProcessing(uploadedFile);
    } else {
      setError('Please upload a valid .rvt file');
    }
  }, []);

  const simulateProcessing = async (file) => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTriangleCount(75000);
      setIsProcessing(false);
    } catch (err) {
      setError('Error processing file');
      setIsProcessing(false);
    }
  };

  const optimizeGeometry = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setTriangleCount(45000);
      setOptimizedModel({
        name: 'optimized_model.obj',
        size: '2.5MB'
      });
      setIsProcessing(false);
    } catch (err) {
      setError('Error optimizing geometry');
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">3D Geometry Optimizer</h1>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <input
              type="file"
              accept=".rvt"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Select .rvt File
            </label>
            {file && (
              <div className="mt-4 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                <span>{file.name}</span>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              <span>{error}</span>
            </div>
          )}

          {triangleCount > 0 && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded">
                <p>Current triangle count: {triangleCount.toLocaleString()}</p>
                {triangleCount > 50000 && (
                  <p className="text-red-500">
                    Exceeds maximum limit of 50,000 triangles
                  </p>
                )}
              </div>

              {triangleCount > 50000 && (
                <button
                  onClick={optimizeGeometry}
                  disabled={isProcessing}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
                >
                  {isProcessing ? 'Optimizing...' : 'Optimize Geometry'}
                </button>
              )}

              {optimizedModel && (
                <div className="p-4 bg-green-100 rounded">
                  <p>Optimization complete!</p>
                  <p>New triangle count: {triangleCount.toLocaleString()}</p>
                  <button
                    onClick={() => {/* Add download logic */}}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Download Optimized Model
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeometryOptimizer;