import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function AdminSidebar() {
    const { logout } = useAuth({middleware: 'auth'})
  return (
    <aside className="md:w-72 md:h-screen">
        <div className="p-4">
            <img 
                className="w-40"
                src="/img/logo.svg" 
                alt="Imagen Logotipo" 
            />
        </div>
        <nav className="flex flex-col p-4 gap-4 border w-full">
            <Link to="/admin" className="font-bold text-lg hover:scale-105">Ordenes</Link>
            <Link to="/admin/productos" className="font-bold text-lg border-t pt-3 hover:scale-105">Productos Disponibles</Link>
            <Link to="/admin/productos/agotados" className="font-bold text-lg border-t pt-3 hover:scale-105">Productos Agotados</Link>
        </nav>

        <div className="my-5 px-5">
            <button 
                className="text-center bg-red-500 hover:bg-red-600 text-white font-bold p-3 w-full rounded-xl uppercase truncate"
                onClick={logout}
            >
                Cerrar Sesión
            </button>
        </div>
    </aside>
  )
}
