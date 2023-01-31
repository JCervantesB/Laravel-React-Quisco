import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function Registro() {

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const [errores, setErrores] = useState([]);
  const {registro} = useAuth({middleware: 'guest', url: '/'});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    };
    
    registro(datos, setErrores);
  }

  return (
    <>
      <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
      <p>Crea tu Cuenta llenando el formulario</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
          <div className="mb-4">
            <label 
              className="text-slate-800"
              htmlFor="name"
            >Nombre:</label>
            <input 
              className="mt-2 w-full p-3 bg-gray-50"
              type="text"
              id="name"
              name="name"
              placeholder="Tu Nombre"
              ref={nameRef}
            />
          </div>
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
          <div className="mb-4">
            <label 
              className="text-slate-800"
              htmlFor="password_confirmation"
            >Repetir Password:</label>
            <input 
              className="mt-2 w-full p-3 bg-gray-50"
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Repetir Password"
              ref={passwordConfirmationRef}
            />
          </div>
          <input 
            type="submit" 
            value="Crear Cuenta"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md w-full uppercase"
          />
        </form>
      </div>
      <nav className="mt-5">
        <Link to="/auth/login">
          ¿Ya tienes cuenta? Inicia sesión aquí
        </Link>
      </nav>
    </>
  )
}
