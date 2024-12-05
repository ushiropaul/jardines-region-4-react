
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function RegisForm() {

  const [user, setUser] = useState({
    email: '',
    password: '',
    FirstName: '',
    LastName: ''
  })


  const {signup} = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();



  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };


  const handleSubmit = async e => {
    e.preventDefault()

    try {
      console.log(user)
      await signup(user.email, user.password, user.FirstName, user.LastName)
      navigate('/')
    } catch (error) {
      // if(error.code === "auth/internal-error"){
      //   setError('Correo invalido')
      // }
      setError(error.message)
    }

  }

  return (
    <div className="regis-form">
      {error && <p>{error}</p>}
      <h2>Crear cuenta</h2>
      <p>¿Ya tenés una cuenta? <Link to="/auth">Iniciar sesión</Link></p>
      <form onSubmit={handleSubmit}>
        <input type='text' id="FirstName" name="FirstName" placeholder='Nombre' required onChange={handleChange}/>
        <input type='text' id="LastName" name="LastName" placeholder='Apellido' required onChange={handleChange} />
        <input type="email" id="email" name="email" placeholder='Correo electrónico' onChange={handleChange} required />
        <input type="password" id="password" name="password" placeholder='Contraseña' onChange={handleChange} required />

        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
}

export default RegisForm;