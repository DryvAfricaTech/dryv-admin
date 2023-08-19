import React from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-03.svg";
import EditMenu from "../EditMenu";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";

function DashboardCardYearly({ data }) {
  const chartData = {
    labels: [
      "12-01-2020",
      "01-01-2021",
      "02-01-2021",
      "03-01-2021",
      "04-01-2021",
      "05-01-2021",
      "06-01-2021",
      "07-01-2021",
      "08-01-2021",
      "09-01-2021",
      "10-01-2021",
      "11-01-2021",
      "12-01-2021",
      "01-01-2022",
      "02-01-2022",
      "03-01-2022",
      "04-01-2022",
      "05-01-2022",
      "06-01-2022",
      "07-01-2022",
      "08-01-2022",
      "09-01-2022",
      "10-01-2022",
      "11-01-2022",
      "12-01-2022",
      "01-01-2023",
    ],
    datasets: [
      // Indigo line
      {
        data: [
          622, 622, 426, 471, 365, 365, 238, 324, 288, 206, 324, 324, 500, 409,
          409, 273, 232, 273, 500, 570, 767, 808, 685, 767, 685, 685,
        ],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
      // Gray line
      {
        data: [
          732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192,
          154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
        ],
        borderColor: tailwindConfig().theme.colors.slate[300],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.slate[300],
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col pb-3 bg-white border rounded-sm shadow-lg col-span-full sm:col-span-4 xl:col-span-3 border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex items-start justify-between mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 004" />
          {/* Menu button */}
          {/* <EditMenu className="relative inline-flex">
            <li>
              <Link className="flex px-3 py-1 text-sm font-medium text-slate-600 hover:text-slate-800" to="#0">Option 1</Link>
            </li>
            <li>
              <Link className="flex px-3 py-1 text-sm font-medium text-slate-600 hover:text-slate-800" to="#0">Option 2</Link>
            </li>
            <li>
              <Link className="flex px-3 py-1 text-sm font-medium text-rose-500 hover:text-rose-600" to="#0">Remove</Link>
            </li>
          </EditMenu> */}
        </header>
        <h2 className="mb-2 text-lg font-semibold text-slate-800">
        Yearly Sales
        </h2>
        <h3 className="mb-3">Amount: #{data?.completed?.totalAmountYearly || 0}</h3>
        {/* <div className="mb-1 text-xs font-semibold uppercase text-slate-400">
          Statistics
        </div> */}

        {/* <div className="py-2 bg-green-50">
          <h2 className="mb-2 text-lg font-semibold text-slate-800">
            Completed Booking
          </h2>

          <h2 className="font-semibold text-md text-slate-800">
            Total: {data?.completed?.weekTotal}
          </h2>
          <div className="flex items-center">
            <span>Amount:</span>
            <div className="ml-2 mr-2 text-xl font-bold text-slate-800">
              #{data?.completed?.totalAmountWeekly}
            </div>
          </div>
        </div> */}
        {/* <div className="py-2 mt-2 bg-yellow-50">
          <h2 className="mb-2 text-lg font-semibold text-slate-800">
            Pending Booking
          </h2>

          <h2 className="font-semibold text-md text-slate-800">
            Total: {data?.pending?.weekTotal}
          </h2>
          <div className="flex items-center">
            <span>Amount:</span>
            <div className="ml-2 mr-2 text-xl font-bold text-slate-800">
              #{data?.pending?.totalAmountWeekly}
            </div>
           
          </div>
        </div> */}
        {/* <div className="py-2 mt-2 bg-red-50">
          <h2 className="mb-2 text-lg font-semibold text-slate-800">
            Cancelled Booking
          </h2>

          <h2 className="font-semibold text-md text-slate-800">
            Total: {data?.canceled?.weekTotal}
          </h2>
          <div className="flex items-center">
            <span>Amount:</span>
            <div className="ml-2 mr-2 text-xl font-bold text-slate-800">
              #{data?.canceled?.totalAmountWeekly}
            </div>
           
          </div>
        </div> */}
      </div>
      {/* Chart built with Chart.js 3 */}
      {/* <div className="grow"> */}
      {/* Change the height attribute to adjust the chart height */}
      {/* <LineChart data={chartData} width={389} height={128} /> */}
      {/* </div> */}
    </div>
  );
}

export default DashboardCardYearly;
