import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function DatePopover({ date, dateFrom, dateTo, onChange }) {
  const handleChangeDate = (selected) => {
    onChange("date", selected ? format(selected, "yyyy-MM-dd") : null);
  };

  const [localFrom, setLocalFrom] = useState(
    dateFrom ? new Date(dateFrom) : null,
  );
  const [localTo, setLocalTo] = useState(dateTo ? new Date(dateTo) : null);

  const applyRange = (close) => {
    onChange("date_from", localFrom ? format(localFrom, "yyyy-MM-dd") : null);
    onChange("date_to", localTo ? format(localTo, "yyyy-MM-dd") : null);
    close();
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* <Popover className="relative w-full max-w-xs">
        <Popover.Button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-left shadow-sm transition hover:ring-2 hover:ring-blue-500">
          <span className="mb-1 block text-sm font-medium text-gray-700">
            Data konkretna
          </span>
          <span className="text-gray-900">
            {date || <span className="text-gray-400">Wybierz datę</span>}
          </span>
        </Popover.Button>

        <Popover.Panel className="absolute z-20 mt-2 w-full max-w-xs rounded-lg bg-white p-4 shadow-lg">
          <DatePicker
            selected={date ? new Date(date) : null}
            onChange={handleChangeDate}
            dateFormat="yyyy-MM-dd"
            isClearable
            placeholderText="Wybierz datę"
            className="w-full rounded border border-gray-300 px-3 py-2"
            popperPlacement="bottom-start"
            autoFocus
          />
        </Popover.Panel>
      </Popover> */}

      <Popover className="relative w-full max-w-md">
        {({ close }) => (
          <>
            <PopoverButton className="border-border-surface w-full rounded-lg border px-4 py-2 text-left shadow-sm transition hover:ring-2 hover:ring-blue-500">
              <span className="text-text-main mb-1 block text-sm font-medium">
                Zakres dat
              </span>
              <span className="text-gray-900">
                {dateFrom && dateTo ? (
                  `${dateFrom} - ${dateTo}`
                ) : (
                  <span className="text-gray-400">Wybierz zakres</span>
                )}
              </span>
            </PopoverButton>

            <PopoverPanel className="animate-fade-in animate-duration-100 bg-bg-surface border-border-surface border-1 absolute z-20 mt-2 flex w-[28rem] flex-col justify-center gap-4 rounded-lg p-4 shadow-lg">
              <div className="flex gap-4">
                <div className="flex w-1/2 flex-col">
                  <label className="text-text-muted mb-1 text-sm font-medium">
                    Data od
                  </label>
                  <DatePicker
                    selected={localFrom}
                    onChange={setLocalFrom}
                    selectsStart
                    startDate={localFrom}
                    endDate={localTo}
                    dateFormat="yyyy-MM-dd"
                    isClearable
                    placeholderText="Data od"
                    className="border-border-surface w-full rounded border px-3 py-2"
                    autoFocus
                  />
                </div>

                <div className="flex w-1/2 flex-col">
                  <label className="text-text-muted mb-1 text-sm font-medium">
                    Data do
                  </label>
                  <DatePicker
                    selected={localTo}
                    onChange={setLocalTo}
                    selectsEnd
                    startDate={localFrom}
                    endDate={localTo}
                    minDate={localFrom}
                    dateFormat="yyyy-MM-dd"
                    isClearable
                    placeholderText="Data do"
                    className="border-border-surface w-full rounded border px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => applyRange(close)}
                  className="hover:bg-gunfire-orange-hover self-end rounded bg-stone-400 px-4 py-2 text-white transition"
                >
                  Wyczyść
                </button>

                <button
                  onClick={() => applyRange(close)}
                  className="bg-gunfire-orange hover:bg-gunfire-orange-hover self-end rounded px-4 py-2 text-white transition"
                >
                  Zastosuj
                </button>
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  );
}

export default DatePopover;
