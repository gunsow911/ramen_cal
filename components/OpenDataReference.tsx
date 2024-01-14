import Description from "./Description"
import Title from "./Title"

const OpenDataReference = () => {
  const list: {name: string, url: string}[] = [
    {
      name: "【山口県】ラーメン事情アンケート結果およびラーメン店情報",
      url: "https://yamaguchi-opendata.jp/ckan/dataset/noodle_ybase",
    },
    {
      name: "【山口県】文化財一覧",
      url: "https://yamaguchi-opendata.jp/ckan/dataset/cultural_property",
    },
  ]

  return <>
    <Title>オープンデータ</Title>
    <Description>
      <div className="text-lg mb-2 font-semibold">ラーメン食べて罪滅ぼしウォーキングは、以下のオープンデータを使って作られました</div>
      <div className="grid gap-x-4 grid-cols-1 sm:grid-cols-1">
        {list.map(({name, url}) => (
          <div key={url} className="mb-1">
            ・<a className="mt-0 hover:underline" href={url} rel="nofollow noopener" target="_blank">{name}</a>
          </div>
        ))}
      </div>
    </Description>
  </>
}
export default OpenDataReference
