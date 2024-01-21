import Image from "next/image"
import {ReactNode} from "react"


type Props = {
  children: ReactNode
}
const Title = (props: Props) => {
  return (
    <>
      <div className="flex">
        <Image className="mr-2" src="/icons/ramen.png" style={{maxHeight: 32}} alt="loading" width={32} height={32} layout="fixed" />
        <div className="font-semibold text-3xl my-auto">
          {props.children}
        </div>
      </div>
      <hr className="border-4 border-dashed mt-1 border-[#ff0000]" />
    </>
  )
}


export default Title
