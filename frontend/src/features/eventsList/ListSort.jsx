function ListSort({ sortBy, sortOrder, onChange }) {
  return (
    <div className="flex items-center gap-2 py-4">
      <p>Sortuj:</p>
      <select
        className="border-1 rounded-lg border-stone-300 px-2 py-2"
        value={sortBy}
        onChange={(e) => onChange("sortBy", e.target.value)}
      >
        <option value="date">Data</option>
        <option value="title">Tytuł</option>
        <option value="fee">Wpisowe</option>
      </select>

      <select
        className="border-1 rounded-lg border-stone-300 px-2 py-2"
        value={sortOrder}
        onChange={(e) => onChange("sortOrder", e.target.value)}
      >
        <option value="ASC">Rosnąco</option>
        <option value="DESC">Malejąco</option>
      </select>
    </div>
  );
}

export default ListSort;
