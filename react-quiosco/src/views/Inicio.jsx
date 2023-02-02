import  useSWR  from 'swr';
import Producto from '../components/Producto';
import clienteAxios from '../config/axios';
import useQuiosco from '../hooks/useQuiosco';
import Spinner from '../components/Spinner';

export default function Inicio() {

  const { categoriaActual } = useQuiosco();
  const token = localStorage.getItem('AUTH_TOKEN');

  // Consulta SWR
  const fetcher = () => clienteAxios('/api/productos',{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(data => data.data);
  const {data, error, isLoading} = useSWR('/api/productos', fetcher, {
    refreshInterval: 1000
  });

  if(!data) return null;
  // Spinner
  if(isLoading) return (
    <Spinner />
  )

  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id && producto.disponible === 1)
 
  return (
    <>
      <h1 className='text-4xl font-black'>{categoriaActual.nombre}</h1>
      <p>
        Elige y personaliza tu pedido a continuación
      </p>

      <div className='grid gap-4 grid-cols-1 md:gird-cols-2 xl:grid-cols-3 mt-3'>
        {productos.map(producto => (
          <Producto
            key={producto.imagen}
            producto={producto}
            botonAgregar={true}
          />
        ))}
      </div>
    </>
  )
}
