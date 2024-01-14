import React from 'react';
import 'leaflet/dist/leaflet.css'
import Image from 'next/image';
import Introduction from '@/components/Introduction';
import ButtonLink from '@/components/ButtonLink';
import OpenDataReference from '@/components/OpenDataReference';

export default function MainPage() {
  return (
    <main>
      <div className="container bg-white mx-auto px-5 py-5">
        <div>
          <Image className="m-auto" src="/title.png" alt="ラーメン食べても罪滅ぼしウォーキング" width={512} height={512} objectFit="contain"></Image>
        </div>
        <div className='py-4'>
          <ButtonLink href='/map'>マップを見る</ButtonLink>
        </div>
        <div className='py-4'>
          <Introduction />
        </div>
        <div className='py-4'>
          <OpenDataReference />
        </div>
      </div>
    </main>
  )
}
