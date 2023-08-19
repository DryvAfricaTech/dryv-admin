import React, { useState } from "react";
import Modal from "../../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { cancelConfirmBooking } from "../../../services/bookingsService";

export const ToggleStatusModal = ({ show, onHide, id, callBack, status }) => {
  const [saving,  setSaving] = useState(false)
  const handlBookingStatus = (id, status) => {
    setSaving(true)
    cancelConfirmBooking({
      bookingId: id,
      status: status,
    })
      .then(async (r) => {
        toast.success(
          `${
            status == "cancelled"
              ? "Booking cancelled succesfully"
              : "Booking Confirmed"
          }`
        );
        // setId("");
        await callBack();
        onHide()
      })
      .catch(() => toast.error("Oops! something went wrong"))
     .finally(() =>  setSaving(false))
  };


  return (
    <>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide} width="30%">
        <p> Do you want to {status === 'cancelled' ? 'Cancel' : 'Confirm'} this booking?</p>
        <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handlBookingStatus(id, status)}
          >
           {saving ? 'Submiting...' : 'Submit'}
          </button>
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
