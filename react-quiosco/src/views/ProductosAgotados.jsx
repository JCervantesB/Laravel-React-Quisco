import useSWR from 'swr';
import clienteAxios from '../config/axios';
import Producto from '../components/Producto';
import Spinner from '../components/Spinner';

export default function ProductosAgotados() {
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

    const productosFiltrados = data.data.filter(producto => producto.disponible === 0);

  return (
    <div>
        <h1 className='text-4xl font-black'>Productos Agotados</h1>
        <p>
        Maneja la disponibilidad desde aquí, agrega productos al listado de productos disponibles
        </p>

        <div className='grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4'>
            {productosFiltrados.map(producto => (
            <Producto
                key={producto.imagen}
                producto={producto}
                botonDisponible={true}
                botonHabilitar={true}
            />
            ))}
        </div>
    </div>
  )
}