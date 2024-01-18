import React from 'react';
import 'leaflet/dist/leaflet.css'
import Title from '@/components/Title';
import Description from './Description';
import Image from 'next/image';

export default function Solution() {
  return (
  <>
    <Title>ウォーキングでラーメン食べても罪滅ぼし！</Title>
    <Description>
      <div className="text-lg mb-2">
        そんな罪悪感を払拭するためには体を動かしたらいいのでは！？<br />
        そこで、山口県が公開するラーメン店のオープンデータを活用して、「ラーメン食べても罪滅ぼしウォーキング」を作成しました！
      </div>
      <div className='my-2'>
        <Image className='mx-auto' src="/map.jpg" alt="ラーメンマップ" width={900} height={900} layout="fixed" ></Image>
      </div>
      <div className="text-lg mb-2">
        目的のラーメン店を中心に、どこからウォーキング、ランニング等をすればいいかを可視化しました。
      </div>
      <div className="text-lg mb-2">
        ラーメンのアイコンを押すとラーメン店から行ける場所が青い円が表示されます。<br />
        運動する時間や運動方法を選ぶと、青い円も大きさが変わります。<br />
        また、青い円の中には山口県の文化財情報も一緒に表示されます。<br />
        文化財を触れた後、運動がてら、ちょっと離れたラーメン店へ行こうかな？という使い方もできます！<br />
      </div>
      <div className="text-lg mb-2">
        赤い円は0キロカロリー地点！<br />
        ここまで運動すればなんと<span className='text-2xl text-red-600'>ラーメン食べても0キロカロリー！</span>
      </div>
      <div className="text-lg mb-2">
        地域のラーメンを食べながら、健康も増進、山口県の文化財にも触れて一石三鳥！！<br />
        山口県にお越しの際はぜひ、「ラーメン食べても罪滅ぼしウォーキング」を使ってみてください！
      </div>
    </Description>
  </>

  )
}
