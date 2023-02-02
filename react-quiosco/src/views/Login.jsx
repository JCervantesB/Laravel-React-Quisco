import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import Spinner from "../components/Spinner";

export default function Login() {

  const emailRef = createRef();
  const passwordRef = createRef();

  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    
    setCargando(true);
    login(datos, setErrores, setCargando);
  }

  return (
    <>    
      <h1 className="text-4xl font-black">Inicia Sesión</h1>
      <p>Para crear un pedido debes iniciar sesión</p>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
        >         

        {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
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
          <div className="mb-4">
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
            value="Iniciar Sesión"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md w-full uppercase"
          />     
          {cargando ? <Spinner /> : null}
        </form>
      </div>
      <nav className="mt-5">
      <nav className="flex flex-col mt-5">
        <Link to="/auth/registro">
          ¿No tienes cuenta? Crea una aquí
        </Link>
        <Link to="/auth/olvide">
          ¿Problemas de acceso? Recupera tu cuenta
        </Link>
      </nav>
      </nav>
    </>
  )
}
