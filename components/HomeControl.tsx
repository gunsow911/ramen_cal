import Link from "next/link"
import {useEffect, useRef} from "react";
import L from "leaflet";

const HomeControl = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const disableClickPropagation = L.DomEvent.disableClickPropagation;
      disableClickPropagation(ref.current);
    }
  }, []);

  return (
    <div ref={ref} className="leaflet-control leaflet-bar bg-white text-gray-900">
      <Link className="leaflet-mainpage-link" href="/" passHref>ページに戻る</Link>
    </div>
  )
}

export default HomeControl
