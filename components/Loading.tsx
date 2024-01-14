import Image from "next/image"

const Loading = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
          <div className="text-xl">ラーメンマップ準備中…</div>
          <Image className="m-auto" src="/icons/ramen.png" alt="loading" width={128} height={128}></Image>
      </div>
    </div>
  )
}


export default Loading
