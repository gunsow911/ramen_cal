import {ExerciseInput} from "@/hooks/useRamenData"
import {useFormContext, useWatch} from "react-hook-form"


const ExerciseControl = () => {

  const {register} = useFormContext<ExerciseInput>()
  const minutes = useWatch({name: "minutes"})

  return (
    <div className="leaflet-top leaflet-right mb-4">
      <div className="leaflet-control leaflet-bar p-2 bg-white text-gray-900" >
        <div className="pb-2">
          <div>
            <b>運動どのくらいがんばる？</b>
          </div>
          <div>
            {minutes} 分 
          </div>
          <div className="flex items-center">
            <input type="range" min="5" max="60" step="5" {...register("minutes")}  />
          </div>
        </div>
        <div className="pb-2">
          <div>
            <b>どう運動する？</b>
          </div>
          <div className="flex items-center">
            <input id="exercise-method-walking" type="radio" value="walking" {...register("method")} />
            <label htmlFor="exercise-method-walking" className="ms-1">ウォーキング(分速67m)</label>
          </div>
          <div className="flex items-center">
            <input id="exercise-method-jogging" type="radio" value="jogging" {...register("method")} />
            <label htmlFor="exercise-method-jogging" className="ms-1">ジョギング(分速106m)</label>
          </div>
          <div className="flex items-center">
            <input id="exercise-method-running" type="radio" value="running" {...register("method")} />
            <label htmlFor="exercise-method-running" className="ms-1">ランニング(分速134m)</label>
          </div>
          <div className="flex items-center">
            <input id="exercise-method-cycling" type="radio" value="cycling" {...register("method")} />
            <label htmlFor="exercise-method-cycling" className="ms-1">サイクリング(分速333m)</label>
          </div>
        </div>
        <div>
          <div>
            <b>往復？片道？</b>
          </div>
          <div>
            <input id="exercise-is-half" type="checkbox" {...register("isHalf")} />
            <label htmlFor="exercise-is-half" className="ms-1">片道</label>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ExerciseControl
