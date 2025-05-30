import VoivodeshipsOptions from "../../utils/VoivodeshipsOptions";

function ListFilter({ onChange }) {
  return (
    <div className="flex items-center gap-2 py-4">
      <p>Wybierz województwo: </p>
      <select
        defaultValue=""
        className="border-1 border-border-surface rounded-lg px-2 py-2"
        onChange={(e) => onChange("voivodeship_id", e.target.value)}
      >
        <option value="">Wszystkie</option>
        <VoivodeshipsOptions />
      </select>
    </div>
  );
}

export default ListFilter;
