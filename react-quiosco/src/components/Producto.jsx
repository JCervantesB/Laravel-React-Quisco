import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

export default function Producto({producto, botonAgregar = false, botonDisponible = false, botonHabilitar = false}) {
    const { handleClickModal, handleSetProducto, handleClickProductoAgotado } = useQuiosco();
    const { imagen, nombre, precio, disponible } = producto;
  return (
    <div className="flex flex-col justify-between border p-3 shadow bg-white rounded-xl">
        <img 
            className="w-full rounded-tl-3xl rounded-br-3xl"
            src={`/img/${imagen}.jpg`} 
            alt={`Imagen ${nombre}`} 
        />
        <div className="p-5">
            <h3 className="text-2xl font-bold">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>

            {botonAgregar && (
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold p-3 w-full mt-5 uppercase rounded-xl"
                    onClick={() => {
                        handleClickModal();
                        handleSetProducto(producto);
                    }}
                >
                    Agregar
                </button>
            )}
            {botonDisponible && (
                <button
                type="button"
                // className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold p-3 w-full mt-5 uppercase rounded-xl"
                className={`${disponible ? 'bg-red-600 hover:bg-red-800' : 'bg-green-600 hover:bg-green-800'} text-white font-bold p-3 w-full mt-5 uppercase rounded-xl`}
                onClick={() => handleClickProductoAgotado(producto.id)}
            >
                {botonHabilitar ? 'Habilitar Producto' : 'Marcar como Agotado'}
            </button>
            )}
        </div>
    </div>
  )
}
