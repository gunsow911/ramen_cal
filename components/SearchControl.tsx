import {useEffect, useRef} from "react"
import L from "leaflet";

const SearchControl = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const disableClickPropagation = L.DomEvent.disableClickPropagation;
      disableClickPropagation(ref.current);
    }
  }, []);

  return (
    <div ref={ref} className="leaflet-control leaflet-bar w-full p-1 bg-white text-gray-900" >
      <input type="search" className="py-2 px-1 w-full text-lg outline-none" placeholder="ラーメン店を検索" />
    </div>
  )
}


export default SearchControl
