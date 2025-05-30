import ReactJson from 'react-json-view';

export default function ResultsDisplay({ data }) {
  return (
    <div className="results-container">
      <h3>✅ Processing completed!</h3>
      <div className="json-viewer">
        <ReactJson 
          src={data}
          theme="monokai"
          collapsed={1}
          displayDataTypes={false}
        />
      </div>
    </div>
  );
}