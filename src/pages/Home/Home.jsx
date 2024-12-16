// Home.jsx
import './Home.css';
import DistrictGardenSelect from '../../components/DistrictGardenSelect/DistrictGardenSelect';
import TeachingTools from '../../components/TeachingTools/TeachingTools';
import { useAuth } from '../../context/AuthContext';


function Home() {

  const { logout, user } = useAuth();

  console.log(user);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <main className="home">
      <div className="divTitleApp">
        <h1>TODOS LOS JARDINES DE LA REGIÓN 4</h1>
        <p>En la mejor página para maestras jardineras</p>
      </div>
      {/*  */}
        <div className="w-full max-w-xs m-auto text-black">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-xl mb-4">welcome {user.displayName || user.email}</p>
          <button
            className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      </div>
      {/*  */}
      <section className='componentsHome'>
        <DistrictGardenSelect />
        <TeachingTools />
      </section>
    </main>
  );
}

export default Home;
