// Home.jsx
import './Home.css';
import DistrictGardenSelect from '../../components/DistrictGardenSelect/DistrictGardenSelect';
import TeachingTools from '../../components/TeachingTools/TeachingTools';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

function Home() {

  // const { logout, user } = useAuth();

  // console.log(user);
  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     Navigate('/registrarse')
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };


  return (
    <main className="home">
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
