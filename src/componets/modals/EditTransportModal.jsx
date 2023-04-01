import React, { useState, useEffect } from "react";
import Modal from "../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { updateTransport } from "../../services/transporterService";

export const EditTransportModal = ({ show, onHide, id, callBack, datas }) => {

const [saving,  setSaving] = useState(false)
  const [values, setValues] = useState({
    email:  "",
    name:  "",
    address:  "",
    website: "",
    contactPhoneNumber: "",
    status:  "true",
    // transporterId: 'guo',
    // terminals: datas?.terminals || '629cb14b66e7a3bcc6f7212c'
  });

  useEffect(() => {
    setValues({
        email: datas?.email || "",
        name: datas?.name || "",
        address: datas?.address || "",
        website: datas?.website || "",
        contactPhoneNumber: datas?.contactPhoneNumber || "",
        status: datas?.status || "true",
    })

    console.log(datas, 'dats');
  
  }, [datas])
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleUpdateTranport = (id) => {
    if (Object.values(values).some((o) => o === "")) return false;
    setSaving(!saving)
    updateTransport({
      ...values,
      transporterId: id,
      logo: datas?.logo,
      terminals: "62f112c985493aecdd3b071e",
    })
      .then(async () => {
        toast.success("Transport updated successfully");
        setValues({
          email: "",
          name: "",
          address: "",
          website: "",
          contactPhoneNumber: "",
          logo: "",
          status: "true",
          transporterId: "guo",
        });
        await callBack();
        onHide();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Oops! something went wrong");
      });
      setSaving(!saving)
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide}>
        <p>Edit this Company</p>
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              company name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="name"
              value={values.name || ""}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="website"
            >
              company website
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="website"
              type="text"
              placeholder="website"
              value={values.website || ""}
              onChange={handleInputChange}
              name="website"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="address"
            >
              company address
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="address"
              value={values.address || ""}
              onChange={handleInputChange}
              name="address"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              company email
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="email"
              value={values.email || ""}
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="phone"
            >
              company Phone
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="phone number"
              value={values.contactPhoneNumber || ""}
              onChange={handleInputChange}
              name="contactPhoneNumber"
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="status"
            >
              company status
            </label>
            <select
              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={values.status || "true"}
              onChange={handleInputChange}
              name="status"
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handleUpdateTranport(id)}
          >
            { saving ? 'Saving...' : 'Edit' }
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