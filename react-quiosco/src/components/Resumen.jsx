import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco"
import {useAuth} from "../hooks/useAuth";
import ResumenProducto from "./ResumenProducto";

export default function Resumen() {
  const { pedido, total, handleSubmitNuevaOrden } = useQuiosco();
  const { logout } = useAuth({});

  const comprobarPedido = () => pedido.length === 0;    

  const handleSubmit = e => {
    e.preventDefault();
    handleSubmitNuevaOrden(logout);    
  }

  return (
    <aside className="md:w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">
        Mi Pedido
      </h1>
      <p className="text-lg my-5">
        Aquí podras ver el resumen y totales de tu pedido
      </p>

      <div className="py-10">
        {pedido.length === 0 ? (
          <p className="text-center text-2xl">
            No hay productos en el pedido aún
          </p>
        ) : (
          pedido.map(producto => (
            <ResumenProducto 
              key={producto.id}
              producto={producto}
            />
          ))
        )}
      </div>

      <p className="text-2xl font-bold mt-10 text-end">
        Total: {formatearDinero(total)}        
      </p>

      <form 
        className="w-full"
        onSubmit={handleSubmit}
      >
        <div className="m-5">
          <input 
            type="submit"
            className={`${comprobarPedido() ? 
              'bg-indigo-100' : 
              'bg-indigo-600 hover:bg-indigo-800'}
              px-5 py-2 rounded-xl uppercase font-bold text-white text-center w-full cursor-pointer`}
            value='Confirmar Pedido'
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </aside>
  )
}
