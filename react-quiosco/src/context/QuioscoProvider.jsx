import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {
   
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [nuevoProductoModal, setNuevoProductoModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalPedido = pedido.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
        setTotal(totalPedido);
    }, [pedido])

    const obtenerCategoria = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const {data} = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            setCategorias(data.data);
            setCategoriaActual(data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerCategoria();
    }, [])
    
    const handleClickCategoria = (id) => {
       const categoria = categorias.filter(categoria => categoria.id === id)[0]
       setCategoriaActual(categoria);
    }

    const handleClickModal = () => {
        setModal(!modal);
    }

    const handleClickNuevoProductoModal = () => {
        setNuevoProductoModal(!nuevoProductoModal);
    }

    const handleSetProducto = (producto) => {
        setProducto(producto);
    }

    const handleAgregarPedido = ({categoria_id, ...producto}) => {
        if(pedido.some( pedidoState => pedidoState.id === producto.id )) {
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState);
            setPedido(pedidoActualizado);
            toast.success('Producto actualizado correctamente');
        } else {
            setPedido([...pedido, producto])
            toast.success('Producto agregado al pedido');
        }
    }

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(pedidoState => pedidoState.id === id)[0];
        setProducto(productoActualizar);
        setModal(!modal);
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(pedidoState => pedidoState.id !== id);
        setPedido(pedidoActualizado);
        toast.success('Producto eliminado del pedido');
    }

    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const {data} = await clienteAxios.post('/api/pedidos', 
            {
                total,
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                } )
            },
            {
                headers: {                
                    Authorization: `Bearer ${token}`,
                }
            });
            toast.success(data.message);
            setTimeout(() => {
                setPedido([]);
            }, 1000);    
            
            // Cerrar la sesion del usuario
            setTimeout(() => {
                // Remover el Token
                localStorage.removeItem('AUTH_TOKEN');
                logout();
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    const handleClickCompletarPedido = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        // enviar peticion al servidor y mostrar un toast de exito
        try{
            await clienteAxios.put(`/api/pedidos/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Pedido completado correctamente');
        }
        catch(error) {
            console.log(error);
        }        
    }

    const handleClickProductoAgotado = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try{
            await clienteAxios.put(`/api/productos/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        catch(error) {
            console.log(error);
        }        
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado,
                nuevoProductoModal,
                handleClickNuevoProductoModal
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export { 
    QuioscoProvider
}
export default QuioscoContext