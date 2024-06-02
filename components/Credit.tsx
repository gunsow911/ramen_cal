import Description from "./Description"
import Title from "./Title"

type Sns = {
  icon: string
  url: string
}

const Credit = () => {
  const list: {name: string, snsList?: Sns[]}[] = [
    {
      name: "Tatsuya Fukuda(油そば派)",
      snsList: [
        {
          icon: "i-simple-icons-github",
          url: "https://github.com/gunsow911"
        },
        {
          icon: "i-simple-icons-facebook",
          url: "https://www.facebook.com/tatsuya.fukuda.35"
        },
      ]
    },
    {
      name: "Nobufumi Yoshida(いりこそば派)",
      snsList: [
        {
          icon: "i-simple-icons-x",
          url: "https://twitter.com/nobufumiyoshida"
        }
      ]
    },
    {
      name: "Tatsuya Yamada(とんこつ派)",
    },
    {
      name: "Hiroyasu Hirano(煮干し出汁派)",
    },
  ]

  return <>
    <Title>その他</Title>
    <Description>
      <div className="mb-2 font-semibold">ラーメン食べて罪滅ぼしウォーキングを作った人たち</div>
      <div className="grid gap-y-1 grid-cols-1">
        {list.map(({name, snsList}, index) => (
          <div key={index} className="flex items-start">
            <div className="mr-1">{name}</div>
            {snsList?.map((sns, i) => (
              <a key={i} href={sns.url} className="mr-1" target="_blank" rel="noopener noreferrer">
                <div className={`${sns.icon} h-6 w-6`} />
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="mb-2 mt-3 font-semibold flex items-start">
        <div className="mr-1">開発リポジトリ</div>
        <a href="https://github.com/gunsow911/ramen_cal" className="mr-1" target="_blank" rel="noopener noreferrer">
          <div className={`i-simple-icons-github h-6 w-6`} />
        </a>
      </div>
    </Description>
  </>
}
export default Credit
