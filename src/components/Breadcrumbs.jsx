export default function Breadcrumbs({ items }) {
  return (
    <ul className="breadcrumbs">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
