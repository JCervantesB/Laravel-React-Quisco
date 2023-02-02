
export default function Alerta({children}) {
    return (
      <div className="text-center my-2 bg-green-200 text-green-600 border border-green-600 font-bold p-3 uppercase">
          {children}
      </div>
    )
  }