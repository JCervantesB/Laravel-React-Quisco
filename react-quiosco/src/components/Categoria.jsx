import useQuiosco from "../hooks/useQuiosco";

export default function Categoria({categoria}) {

    const { handleClickCategoria, categoriaActual } = useQuiosco();
    const { icono, id, nombre } = categoria;
    const resaltarCategoriaActual = () => categoriaActual.id === id ? "bg-amber-400" : "bg-white";

  return (
    <div className={`${resaltarCategoriaActual()} flex items-center gap-4 border w-full p-3 transition-colors ease-in duration-300 hover:bg-amber-400 cursor-pointer first-of-type:rounded-tr-xl last-of-type:rounded-br-xl last-of-type:shadow-md hover:scale-105 `} onClick={() => handleClickCategoria(id)}  >
        <img 
            src={`/img/icono_${icono}.svg`}
            alt="Imagen Icono"
            className="w-12"
        />
        <p 
          className="text-lg font-bold cursor-pointer truncate"                       
        >{nombre}
        </p>
    </div>
  )
}
