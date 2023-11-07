import React, { useState, useEffect, useCallback, useRef} from "react";
import Modal from "../../partials/modal/Modal";
import { enumToArray } from "../../utils/helper";
import { busClassEnum, busTypeEnum } from "../../utils/enum";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { ToastContainer, toast } from "react-toastify";
import { editBus, addBus } from "../../services/busService";

export const EditTripModal = ({ show, onHide, id,callBack, terminals, routes, datas }) => {
    const dateRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [isnew, setIsnew] = useState(false);
  const [values, setValues] = useState({
    clas: "",
    type: "",
    route: "",
    departureTime: "",
    expectedArrival: "",
    numberOfSeats: 0,
    availableSeats: [],
    occupiedSeat: [],
    companyId: "",
    busImage: "",
    price: "",
    departureTerminal: "",
    arrivalTerminal: "",
    hasAC: false,
    status: false,
    departureDate: ''
  });
  const [departDates, setDepartDates] = useState([]);

  const busType = enumToArray(busTypeEnum);
  const busClass = enumToArray(busClassEnum);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let newAvailableSeat = values.availableSeats;
    if (name === "numberOfSeats") {
      newAvailableSeat = Array.from({ length: parseInt(value) }, (_, i) =>
        (i + 1).toString()
      );
    }
    setValues({
      ...values,
      [name]: type === "checkbox" ? e.target.checked : value,
      availableSeats: newAvailableSeat,
    });
  };

  function scrollToSection(ref) {
    if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
        ref.current.focus()
    }
}

const selectIsNew = () => {
    setIsnew(!isnew)
    if(!isnew){
        scrollToSection(dateRef)
    }
}

  const handleSelectSeat = useCallback(
    (e, type) => {
      if (type === "occupied") {
        if (values.occupiedSeat.includes(e.target.value)) {
          return;
        }
        const newAvailable = values.availableSeats.filter(
          (el) => el !== e.target.value
        );
        const newOccupied = [...values.occupiedSeat, e.target.value];
        setValues({
          ...values,
          occupiedSeat: newOccupied,
          availableSeats: newAvailable,
        });
      }
      if (type === "available") {
        if (values.availableSeats.includes(e.target.value)) {
          return;
        }
        const newOccupied = values.occupiedSeat.filter(
          (el) => el !== e.target.value
        );
        const newAvailable = [...values.availableSeats, e.target.value];
        setValues({
          ...values,
          occupiedSeat: newOccupied,
          availableSeats: newAvailable,
        });
      }
    },
    [values.numberOfSeats, values.availableSeats, values.occupiedSeat]
  );

  const deleteSeat = (ix) => {
    // values.seatNumbers.splice(ix, 1)
    const seatno = values.occupiedSeat.filter((el) => el !== ix);
    setValues({
      ...values,
      occupiedSeat: [...seatno],
      availableSeats: [...values.availableSeats, ix],
    });
  };

  const handleEditTrip = () => {
    if (
      Object.values(values).some((o) => o === "")
    )
      return false;
    if (values.departureTerminal === values.arrivalTerminal) {
      toast.warn(
        "you selected same terminal for depature and arrival, kindly change"
      );
      return;
    }
    setSaving(true);
    
    editBus({
      ...values,
      busId: datas?._id
    })
      .then(async () => {
        toast.success("Bus edited successfully");
        await callBack();
        onHide();
      })
      .catch(() => toast.error("Oops! something went wrong"))
      .finally(() => setSaving(false));
  };

  const handleCreateTrip = () => {
    const newDepatureDate = departDates.map((item) =>
      item.format("YYYY-MM-DD")
    );
   
    if (
      Object.values(values).some((o) => o === "") &&
      !departDates.length
    )
      return false;
    if (values.departureTerminal === values.arrivalTerminal) {
      toast.warn(
        "you selected same terminal for depature and arrival, kindly change"
      );
      return;
    }
    setSaving(true);
    
    addBus({
      ...values,
      departureDate: newDepatureDate,
    })
      .then(async () => {
        toast.success("Bus added successfully");
        await callBack();
        onHide();
      })
      .catch(() => toast.error("Oops! something went wrong"))
      .finally(() => setSaving(false));
  };
  useEffect(() => {
    setValues({
      clas: datas?.class || "",
      type: datas?.type || "",
      route: datas?.route?._id || "",
      departureTime: datas?.departureTime || "",
      expectedArrival: datas?.expectedArrival || "nill",
      numberOfSeats: datas?.numberOfSeats || 0,
      availableSeats: datas?.availableSeats || [],
      occupiedSeat: datas?.occupiedSeat || [],
      companyId: id,
      busImage: datas?.busImage || "",
      price: datas?.price || "",
      departureTerminal: datas?.departureTerminal || "",
      arrivalTerminal: datas?.arrivalTerminal || "",
      hasAC: datas?.hasAC || false,
      status: false,
      departureDate: datas?.departureDate
    });
   
  }, [datas]);
  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={onHide}>
        <p>Edit this Trip</p>
        <div className="flex items-center mt-3 mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="isnew"
            >
              would you like to create a copy of this trips for future dates?
            </label>
            <input
              type="checkbox"
              className="w-5 h-5 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
              checked={isnew}
              onChange={() => selectIsNew()}
              id="isnew"
            />
          </div>
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="type"
            >
              Bus type
            </label>
            <select
              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.type || "true"}
              onChange={handleInputChange}
              name="type"
            >
              <option value="">select type</option>
              {busType.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.text}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="class"
            >
              Bus class
            </label>
            <select
              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.clas}
              onChange={handleInputChange}
              name="clas"
            >
              <option value="">select class</option>
              {busClass.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.text}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="route"
            >
              Route
            </label>
            <select
              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.route || "true"}
              onChange={handleInputChange}
              name="route"
            >
              <option value="">select a route</option>
              {routes?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="time"
            >
              Depature Time
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="time"
              type="time"
              value={values.departureTime}
              onChange={handleInputChange}
              name="departureTime"
            />
          </div>
          <div className={`${isnew ? ' hidden' : 'block'} mb-4`}>
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="date"
            >
              Depature Date
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              value={values.departureDate}
              onChange={handleInputChange}
              name="departureDate"
            />
          </div>
          <div className={`mb-4 ${isnew ? 'block' : ' hidden'}`} ref={dateRef}>
            <label
              className={`block mb-2 text-sm font-bold text-blue-700`}
              htmlFor="date"
            >
              Depature Date(select multiple dates)
            </label>

            <DatePicker
              minDate={new DateObject().subtract(0, "days")}
              containerClassName=" w-full"
              inputClass="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              multiple
              value={departDates}
              onChange={setDepartDates}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="estimated-time"
            >
              expected Arrival Time
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="estimated-time"
              type="time"
              value={values.expectedArrival}
              onChange={handleInputChange}
              name="expectedArrival"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="numberofseats"
            >
              number Of Seats
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="numberofseats"
              type="number"
              value={values.numberOfSeats}
              onChange={handleInputChange}
              name="numberOfSeats"
              min={0}
            />
          </div>
          {/* occupied seats  */}

          <div className="mb-4">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="occupiedseat"
            >
              occupied Seat
            </label>

            <select
              className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="occupiedseat"
              value=""
              name="occupiedSeat"
              onChange={(e) => {
                handleSelectSeat(e, "occupied");
                // handlePrice(e.target.value)
              }}
            >
              <option value="" disabled={true} hidden={true}>
                {" "}
                select occupied seats
              </option>
              {!values?.numberOfSeats || !values?.numberOfSeats.length ? (
                <option value={""} disabled={true}>
                  No Seat Occupied
                </option>
              ) : (
                [...Array(Number(values?.numberOfSeats)).keys()].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))
              )}
            </select>
            {values?.occupiedSeat.length
              ? values.occupiedSeat.map((item, i) => (
                  <span
                    onClick={() => deleteSeat(item)}
                    className="px-2 mr-1 text-sm text-white bg-blue-500 rounded-md cursor-pointer"
                    key={i}
                  >
                    {item}
                  </span>
                ))
              : ""}
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="price"
              type="text"
              placeholder="20000"
              value={values.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="departureTerminal"
            >
              Select Depature Terminals
            </label>

            <select
              className="block w-full px-4 py-2 pr-8 mb-1 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.departureTerminal}
              name="departureTerminal"
              onChange={handleInputChange}
            >
              <option value="" disabled={true} hidden={true}>
                {" "}
                select terminal
              </option>
              {!terminals || !terminals.length ? (
                <option value={""} disabled={true}>
                  No Terminal Available
                </option>
              ) : (
                terminals?.map((terminal, i) => (
                  <option key={i} value={terminal?._id}>
                    {terminal?.city} {terminal?.locationCode}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="arrivalTerminal"
            >
              Select Arrival Terminals
            </label>

            <select
              className="block w-full px-4 py-2 pr-8 mb-1 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.arrivalTerminal}
              name="arrivalTerminal"
              onChange={handleInputChange}
            >
              <option value="" disabled={true} hidden={true}>
                {" "}
                select terminal
              </option>
              {!terminals || !terminals.length ? (
                <option value={""} disabled={true}>
                  No Terminal Available
                </option>
              ) : (
                terminals?.map((terminal, i) => (
                  <option key={i} value={terminal?._id}>
                    {terminal?.city} {terminal?.locationCode}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="hasac"
            >
              Does Bus Have AC?
            </label>
            <input
              type="checkbox"
              className="w-5 h-5 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
              checked={values.hasAC}
              onChange={handleInputChange}
              name="hasAC"
              id="hasAC"
            />
          </div>
        </div>
        <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
          {
            isnew ? (
                <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handleCreateTrip()}
          >
            {saving ? "Creating..." : "Create New"}
          </button>
            )
            : (
                <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handleEditTrip()}
          >
            {saving ? "Saving..." : "Edit"}
          </button>
            )
          }
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onHide}
          >
            close
          </button>
        </div>
      </Modal>
    </>
  );
};
