export default function Stats({ items }) {
  if (!items.length) {
    return <div className="stats">
      add something ❤️
    </div>
  }
  const count = items.filter(i => i.packed).length

  return <div className="stats">
    {
      items.length === count ? 'packed complete' : `have ${items.length} items on your list, already packed ${count}
      `
    }
  </div>
}