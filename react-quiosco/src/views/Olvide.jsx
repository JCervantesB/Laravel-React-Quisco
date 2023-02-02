import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import Mensaje from "../components/Mensaje";
import { toast } from "react-toastify";

export default function Olvide() {

    const emailRef = createRef();
    const [errores, setErrores] = useState([]);
    const [exito, setExito] = useState(false)
    const {olvide} = useAuth({middleware: 'guest', url: '/'});

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const datos = {
          email: emailRef.current.value,
        };
        
        olvide(datos, setErrores, setExito);
      }

  return (
    <>    
      <h1 className="text-4xl font-black">Recupera tu cuenta</h1>
      <p>Recupera el acceso a tu cuenta con tu correo</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
        >         
        {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
        {exito ? <Mensaje>Se ha enviado un correo para reestablecer la contraseña</Mensaje> : null}
          <div className="mb-4">
            <label 
              className="text-slate-800"
              htmlFor="email"
            >Email:</label>
            <input 
              className="mt-2 w-full p-3 bg-gray-50"
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              ref={emailRef}
            />
          </div>   
          <input 
            type="submit" 
            value="Reestablecer contraseña"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md w-full uppercase"
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
