import { useState } from "react";
import { Popover } from "@headlessui/react";
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
            <Popover.Button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-left shadow-sm transition hover:ring-2 hover:ring-blue-500">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Zakres dat
              </span>
              <span className="text-gray-900">
                {dateFrom && dateTo ? (
                  `${dateFrom} - ${dateTo}`
                ) : (
                  <span className="text-gray-400">Wybierz zakres</span>
                )}
              </span>
            </Popover.Button>

            <Popover.Panel className="animate-fade-in animate-duration-100 absolute z-20 mt-2 flex w-[28rem] flex-col justify-center gap-4 rounded-lg bg-white p-4 shadow-lg">
              <div className="flex gap-4">
                <div className="flex w-1/2 flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
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
                    className="w-full rounded border border-gray-300 px-3 py-2"
                    autoFocus
                  />
                </div>

                <div className="flex w-1/2 flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
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
                    className="w-full rounded border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => applyRange(close)}
                  className="self-end rounded bg-stone-400 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                  Wyczyść
                </button>

                <button
                  onClick={() => applyRange(close)}
                  className="self-end rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                  Zastosuj
                </button>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  );
}

export default DatePopover;
