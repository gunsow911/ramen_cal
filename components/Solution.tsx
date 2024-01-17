import React from 'react';
import 'leaflet/dist/leaflet.css'
import Title from '@/components/Title';
import Description from './Description';

export default function Solution() {
  return (
  <>
    <Title>ウォーキングでラーメン食べても罪滅ぼし！</Title>
    <Description>
      <div className="text-lg mb-1 font-semibold">
        そんな罪悪感を払拭するためには体を動かしたらいいのでは！？
      </div>
      <div className="text-lg mb-1 font-semibold">
        そこで、山口県が公開するラーメン店のオープンデータを活用して、「ラーメン食べても罪滅ぼしウォーキング」を作成しました！
      </div>
      <div className="text-lg mb-1 font-semibold">
        目的のラーメン店を中心に、どこからウォーキング、ランニング等をすればいいかを可視化しました。
      </div>
      <div className="text-lg mb-1 font-semibold">
        そこからラーメン店を往復すればなんとラーメンの満足感を得ながら、ゼロカロリー！
      </div>
      <div className="text-lg mb-1 font-semibold">
        地域の食産業を支えながら、健康も増進、山口県の文化財にも触れて一石三鳥！！
      </div>
    </Description>
  </>

  )
}
