import React from 'react';
import 'leaflet/dist/leaflet.css'
import Title from '@/components/Title';
import Description from './Description';

export default function Introduction() {
  return (
  <>
    <Title>ラーメン それはとても罪な料理</Title>
    <Description>
      <div className="text-lg mb-2 font-semibold">ラーメンは脳が「美味しい」と感じる各種栄養素がたくさん入っています</div>
      <div className="text-lg mb-2 font-semibold">例えば…</div>
      <div className="mb-3">
        <ul>
          <li>・油</li>
          <li>・砂糖</li>
          <li>・旨味調味料(アミノ酸)</li>
          <li>・食塩</li>
        </ul>
      </div>

      <div className="text-lg mb-2 font-semibold">
        私たちは、ラーメンを食べることで、<span className='text-2xl'>大きな満足感</span>を得ることができます。<br />
        しかし、その満足感と引き換えに…
      </div>
      <div className="text-lg mb-2 font-semibold">
        <span className='text-xl text-orange-600'>糖質</span>、
        <span className='text-xl text-cyan-600'>塩分</span>、
        <span className='text-xl text-green-600'>カロリー</span>、
        そして、なんとなく感じてしまう<span className='text-3xl text-red-600'>罪悪感</span>…
      </div>
      <div className="text-lg font-semibold">
        あぁ、ラーメンはなんて罪な料理なんでしょう…
      </div>
    </Description>
  </>

  )
}
