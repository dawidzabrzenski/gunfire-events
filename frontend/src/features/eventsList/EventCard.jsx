import { Calendar, Ticket } from "lucide-react";

function EventCard({ title, description, date, fee, image_url }) {
  const fallbackImage =
    "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg";

  return (
    <div className="grid max-h-[250px] min-h-[200px] grid-cols-4 grid-rows-1 gap-4 rounded-xl border border-stone-300 bg-stone-50">
      <img
        src={image_url ? `http://localhost:8000${image_url}` : fallbackImage}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
        }}
        className="h-full w-full rounded-l-xl object-cover"
      />
      <div className="col-span-2 flex flex-col gap-2 py-2">
        <h3 className="text-2xl">{title}</h3>
        <p className="text-sm font-light">{description}</p>
      </div>
      <div className="flex flex-col items-end justify-between border-l border-stone-300 py-2 pr-2">
        <div className="flex flex-col items-end gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <p className="font-semibold">{date}</p>
          </div>

          <div>
            <p>Ząbkowice Śląskie</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4" />
            <p>Wpisowe: </p>
            <span className="font-semibold">{fee}zł</span>
          </div>
          <button className="rounded-xl bg-amber-400 px-4 py-2 font-semibold">
            Zobacz szczegóły
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
