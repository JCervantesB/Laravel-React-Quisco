import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import Mensaje from "../components/Mensaje";

export default function Recuperar() {
    // leer la url del navegador y obtener el token
    const urlParams = new URLSearchParams(window.location.search);
    const passwordRef = createRef();
    const recoveryToken = urlParams.get('token');
    const [errores, setErrores] = useState([]);
    const [exito, setExito] = useState(false)
    const {recuperar} = useAuth({middleware: 'guest', url: '/'});

    //validar si la url tiene un token y si no redireccionar a login
    if(!recoveryToken) {
        window.location.href = '/auth/login';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datos = {
            recoveryToken,
            password: passwordRef.current.value,
        };

        recuperar(datos, setErrores, setExito);
    }
    

  return (
    <>    
      <h1 className="text-4xl font-black">Nueva Contraseña</h1>
      <p>Ingresa una nueva contraseña para recuperar tu cuenta</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
        >         
        {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
        {exito ? <Mensaje>Se ha cambiado la constraseña con exito</Mensaje> : null}
          <div className={`${exito ? 'hidden' : 'mb-4'}`}>
            <label 
              className="text-slate-800"
              htmlFor="password"
            >Password:</label>
            <input 
              className="mt-2 w-full p-3 bg-gray-50"
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              ref={passwordRef}
            />
          </div>     
          <input 
            type="submit" 
            value="Cambiar contraseña"
            className={`${exito ? 'hidden' : 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md w-full uppercase'}`}
          />     
        </form>
      </div>
      <nav className="flex flex-col mt-5">
        <Link to="/auth/registro">
          ¿No tienes cuenta? Crea una aquí
        </Link>
        <Link to="/auth/login">
          ¿Ya tienes cuenta? Inicia sesión aquí
        </Link>
      </nav>
    </>
  )
}
