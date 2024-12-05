
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function AuthForm() {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })


  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();



  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };


  const handleSubmit = async e => {
    e.preventDefault()

    try {
      console.log(user)
      await login(user.email, user.password)
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
      <h2>Iniciar sesión</h2>
      <p>¿Ya tenés una cuenta? <Link to="/registrarse">Crear cuenta</Link></p>
      <form onSubmit={handleSubmit}>
        <input type="email" id="email" name="email" placeholder='Correo electrónico' onChange={handleChange} required />
        <input type="password" id="password" name="password" placeholder='Contraseña' onChange={handleChange} required />

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default AuthForm;