import Link from "next/link"

const HomeControl = () => {
  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar bg-white text-gray-900">
        <Link className="leaflet-landing-link" href="/" passHref>ページに戻る</Link>
      </div>
    </div>
  )
}

export default HomeControl
