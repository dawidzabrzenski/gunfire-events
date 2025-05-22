export default function DetectLocationButton({ isLoading, onClick }) {
  return (
    <button onClick={onClick} disabled={isLoading}>
      {isLoading ? "Ładowanie..." : "Wykryj moją lokalizację"}
    </button>
  );
}
