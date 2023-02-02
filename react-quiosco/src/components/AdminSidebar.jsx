import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import SubMenu from "./SubMenu"

export default function AdminSidebar() {
    const { logout, user } = useAuth({middleware: 'auth'});
    console.log(user);
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
            <div className="font-bold text-lg">
            Admin: {user ? user.name : ''}
            </div>
            <SubMenu to="/admin" text="Ordenes" />
            <SubMenu to="#" text="Productos">
                <SubMenu to="/admin/productos" text="Disponibles" />
                <SubMenu to="/admin/productos/agotados" text="Agotados" />
            </SubMenu>
            <SubMenu to="#" text="Usuarios">
                <SubMenu to="/admin/usuarios" text="Todos" />
                <SubMenu to="/admin/usuarios/administradores" text="Administradores" />
            </SubMenu>
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
