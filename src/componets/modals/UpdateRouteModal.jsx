import React, { useState, useEffect} from "react";
import Modal from "../../partials/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { editRoute } from "../../services/routeService";

export const UpdateRouteModal = ({show, onHide, terminals, routeId, data, callBack}) => {
    const [values, setValues] = useState({
        distance: 'nill',
        to: '',
        from: '',
        estimateArrival: 'nill',
        name: '',
        country: ''
    })
    const [saving, setSaving] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };
      const handleUpdateRoute = () => {
       console.log(values, 'see values');
        if (Object.values(values).some((o) => o === "") ) {
          toast.warn("kindly make sure all fields are filled");
          return false;
        }
        setSaving(true);
        // setTimeout(() => {
            editRoute({ ...values, routeId})
          .then(async () => {
            toast.success("Route updated successfully");
            callBack()
            onHide();
          })
          .catch(() => toast.error("Oops! something went wrong"))
          .finally(() => setSaving(false))
        // }, 2000);
        
      };
      useEffect(() => {
        console.log(data, 'data');
        setValues({
            // email: datas?.email || "",
            name: data?.name || "",
            country: data?.country || "",
            to: data?.to._id || '',
            from: data?.from._id || ''
            // terminals: datas?.terminals ? datas?.terminals.map((el) => el._id) : []
        })
      
      }, [data])
  return (
    <>
      <ToastContainer />
      <Modal show={show} size="md" onHide={onHide} width="50%">
      <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
           Name
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={values.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>
       
        <div className="mb-4">
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            htmlFor="country"
          >
            Country
          </label>

          <select
            className="block w-full px-4 py-2 pr-8 mb-1 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
            value={values.country}
            name="country"
            onChange={handleInputChange}
          >
            <option value="" disabled={true} hidden={true}>
              {" "}
              select Country
            </option>
            <option value="Nigeria">
              {" "}
              Nigeria
            </option>
            
          </select>
        </div>
        
        <div className="mb-4">
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            htmlFor="from"
          >
            From
          </label>

          <select
            className="block w-full px-4 py-2 pr-8 mb-1 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
            value={values.from}
            name="from"
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
                  {terminal?.city} {terminal?.locationName}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
            htmlFor="to"
          >
            To
          </label>

          <select
            className="block w-full px-4 py-2 pr-8 mb-1 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
            value={values.to}
            name="to"
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
                  {terminal?.city} {terminal?.locationName}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="flex justify-between px-4 py-5 bg-gray-50 sm:px-6 sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handleUpdateRoute()}
          >
            {saving ? "Saving..." : "Update"}
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

// export default CreateRouteModal;
