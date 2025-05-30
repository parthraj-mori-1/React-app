import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/immigration.css';
import ImmigrationExtractor from '../components/immigration';


function ImmigrationInfo() {
  return (
    <div className="container mt-5">
      <ImmigrationExtractor />
    </div>
  );
}

export default ImmigrationInfo;
