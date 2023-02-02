import useSWR from 'swr';
import clienteAxios from '../config/axios';
import Producto from '../components/Producto';
import Spinner from '../components/Spinner';

export default function Productos() {
    const token = localStorage.getItem('AUTH_TOKEN');
    const fetcher = () => clienteAxios('/api/productos', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(datos => datos.data);

    const {data, error, isLoading} = useSWR('/api/productos', fetcher, {refreshInterval: 10000});

    if(isLoading) return (
        <Spinner />
    )

    const productosDisponibles = (data.data.filter(producto => producto.disponible === 1));

  return (
    <div>
        <div className='flex flex-col md:flex-row items-center md:justify-between mb-5'>
            <div className='self-start'>
                <h1 className='text-4xl font-black'>Productos</h1>
                <p>Maneja la disponibilidad desde aquí</p>
            </div>
            <button  className='flex mt-3 md:mt-0 items-center p-3 rounded-lg text-slate-800 font-bold bg-green-500 hover:bg-green-700 uppercase hover:text-white transition-colors ease-in-out'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>Agregar Producto
            </button>
        </div>

        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
            {productosDisponibles.map(producto => (
            <Producto
                key={producto.imagen}
                producto={producto}
                botonDisponible={true}
            />
            ))}
        </div>
    </div>
  )
}
