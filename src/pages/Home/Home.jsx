// Home.jsx
import './Home.css';
import DistrictGardenSelect from '../../components/DistrictGardenSelect/DistrictGardenSelect';
import TeachingTools from '../../components/TeachingTools/TeachingTools';


function Home() {



  return (
    <div className="home">
      <div className="divTitleApp">
        <h1>TODOS LOS JARDINES DE LA REGIÓN 4</h1>
        <p>En la mejor página para maestras jardineras</p>
      </div>
      <DistrictGardenSelect />
      <TeachingTools />
    </div>
  );
}

export default Home;
