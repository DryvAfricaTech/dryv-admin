import React, { useEffect, useState } from "react";
import { getRoute } from "../services/routeService";
import { Card } from "../partials/card/Card";
import Page from "../partials/page";
import { Table } from "../partials/table";
import DropDown from "../partials/DropDown";
import { Link, useParams } from "react-router-dom";
import Loader from "../partials/Loader";

const Route = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [tableLoad, setTableLoad] = useState(true);
  const [data, setData] = useState(null);
  const [fetched, setFetched] = useState(false);

  const SingleRoute = async () => {
    const { data, loading, errors } = await getRoute(id);
    if (data) {
      setData(data?.getRoute);
      setFetched(true);
      setTableLoad(false)
    }
  };

  const onPrevPage = () => {};

  const onNextPage = () => {};

  useEffect(() => {
    SingleRoute();
  }, []);

  const tableHeader = [
    "Brand",
    "Model",
    "Plate Number",
    "No of Seats",
  ];

  const tableRow = (buses) => {
    return (
      <tr key={buses?._id} className="border-b-2 border-slate-200">
        <td>{buses?.vehicleBrand}</td>
        <td>{buses?.vehicleModel}</td>
        <td>{buses?.vehicleNo}</td>
        <td>{buses?.numberOfSeats} Seats</td>
        <td>{buses?.name}</td>
        {/* <td>
          <DropDown
            links={[
              //   {
              //     name: "View Route",
              //     isLink: true,
              //     onclick: () => {},
              //     link: `/route/${routes?._id}`,
              //   },
              {
                name: "View Bus",
                isLink: false,
                onclick: () => {
                  toggleAddBusRouteModal(buses?._id);
                },
                link: "",
              },

              {
                name: "Delete Bus",
                isLink: false,
                // onclick: () => {
                //   toggleDeactivateModal();
                //   setId(datas?._id);
                // },
                link: "",
              },
            ]}
          />
        </td> */}
      </tr>
    );
  };

  if (!data) {
    return <div className="flex items-center justify-center w-full h-screen ">
        <Loader />
    </div>;
  }
  if (fetched && !data) {
    return <div>Something went wrong</div>;
  }
  return (
    <Page>
      {/* <ToastContainer /> */}
      <div>
        <Link to={"/transport_companies"}>
          <button className="py-3 mb-3 text-black rounded-lg shadow-md bg-slate-200 mr-7 w-52 focus:border-0 focus:outline-none hover:bg-slate-300">
            Back
          </button>
        </Link>
      </div>
      <h2 className="text-xl font-semibold text-sky-800">
        Welcome to {data?.name || "Your"} Route
      </h2>
      <div className="w-full mt-8 mb-10 mr-auto xl:w-4/5">
        <Card width="w-full">
         
            <div className="grid grid-cols-2 gap-4 ml-3 ">
              <h5 className="w-1/2 mb-4 text-slate-600">
                <span> Route name</span>
                <br />
                <span className=" text-slate-900">{data?.name}</span>
              </h5>
              <h5 className="w-1/2 mb-4 text-slate-600">
                <span> To</span>
                <br />
                <span className=" text-slate-900">{data?.to?.city}, {data?.to?.locationName}</span>
              </h5>
              <h5 className="w-1/2 mb-4 text-slate-600">
                <span>Fro</span>
                <br />
                <span className=" text-slate-900">{data?.from?.city}, {data?.from?.locationName}</span>
              </h5>
              <h5 className="w-1/2 mb-4 text-slate-600">
                <span> Departure Time</span>
                <br />
                <span className=" text-slate-900">{data?.departureTime}</span>
              </h5>
             
            </div>
        </Card>
      </div>

      <Card description={"view route Buses"} width="w-full">
        <div className="mt-10 ">
          <Table
            data={data.buses}
            onNext={onNextPage}
            onPrev={onPrevPage}
            currentPage={currentPage}
            totalPages={1}
            emptyMessage="No Bus"
            loadingText="Loading Buses..."
            loading={tableLoad}
            rowFormat={tableRow}
            headers={tableHeader}
            paginated={false}
          />
        </div>
      </Card>
    </Page>
  );
};

export default Route;
