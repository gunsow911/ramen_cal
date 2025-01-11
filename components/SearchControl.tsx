import {useEffect, useRef} from "react"
import L from "leaflet";
import Image from "next/image";

type Props = {
  onClick?: () => void;
}

const SearchControl = (props: Props) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const disableClickPropagation = L.DomEvent.disableClickPropagation;
      disableClickPropagation(ref.current);
    }
  }, []);

  return (
    <div ref={ref} className="leaflet-control leaflet-bar bg-white w-[34px] h-[34px] text-center">
      <div onClick={props.onClick} role="button" className="w-full h-full">
        <Image className="m-auto pt-[5px]" src="/icons/search.png" alt="search" width={20} height={20} /> 
      </div>
    </div>
  )
}


export default SearchControl
