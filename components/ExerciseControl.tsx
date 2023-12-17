import {useFormContext} from "react-hook-form"


const ExerciseControl = () => {

  const {register} = useFormContext()

  return (
    <div className="leaflet-top leaflet-right mb-4">
      <div className="leaflet-control leaflet-bar p-2 bg-white text-gray-900" >
        <div className="pb-2">
          <div>
            <b>運動どのくらいがんばる？</b>
          </div>
          <div className="flex items-center">
            <input id="exercise-pow-high" type="radio" value="high" {...register("power")} />
            <label htmlFor="exercise-pow-high" className="ms-1">がっつり！</label>
          </div>
          <div className="flex items-center">
            <input id="exercise-pow-low" type="radio" value="low" {...register("power")} />
            <label htmlFor="exercise-pow-low" className="ms-1">ほどほど</label>
          </div>
        </div>
        <div className="">
          <div>
            <b>どう運動する？</b>
          </div>
          <div className="flex items-center">
            <input id="exercise-method-walking" type="radio" value="walking" {...register("method")} />
            <label htmlFor="exercise-method-walking" className="ms-1">ウォーキング</label>
          </div>
          <div className="flex items-center">
            <input id="exercise-method-jogging" type="radio" value="jogging" {...register("method")} />
            <label htmlFor="exercise-method-jogging" className="ms-1">ジョギング</label>
          </div>
          <div className="flex items-center">
            <input id="exercise-method-cycling" type="radio" value="cycling" {...register("method")} />
            <label htmlFor="exercise-method-cycling" className="ms-1">サイクリング</label>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ExerciseControl
