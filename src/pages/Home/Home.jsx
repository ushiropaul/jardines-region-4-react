// Home.jsx
import './Home.css';
import DistrictGardenSelect from '../../components/DistrictGardenSelect/DistrictGardenSelect';
import TeachingTools from '../../components/TeachingTools/TeachingTools';
import SubHeader from '../../components/SubHeader/SubHeader';


function Home() {


  return (
    <main className="home">
      <SubHeader/>
      <div className="divTitleApp">
        <h1>TODOS LOS JARDINES DE LA REGIÓN 4</h1>
        <p>En la mejor página para maestras jardineras</p>
      </div>
      <section className='componentsHome'>
        <DistrictGardenSelect />
        <TeachingTools />
      </section>
    </main>
  );
}

export default Home;
