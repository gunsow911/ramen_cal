import {ReactNode} from "react"

type Props = {
  children: ReactNode
}

/**
 * 説明
 */
const Description = (props : Props) => {
  return <div className="flex">
    <div className="mt-6 text-lg">
      {props.children}
    </div>
  </div>
}
export default Description

