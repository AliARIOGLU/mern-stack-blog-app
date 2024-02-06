/* eslint-disable */

import { HiArrowNarrowUp, HiArrowNarrowDown } from "react-icons/hi";

import { LoadingArea } from "./LoadingArea";

export const TotalCard = ({
  totalTitle,
  totalDataCount,
  icon: Icon,
  lastMonthData,
  thisMonthData,
  isLoading,
}) => {
  const status = thisMonthData > lastMonthData;

  return (
    <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
      {isLoading ? (
        <LoadingArea />
      ) : (
        <>
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">{totalTitle}</h3>
              <p className="text-2xl">{totalDataCount}</p>
            </div>
            <Icon className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span
              className={`flex items-center ${
                status ? "text-green-500" : "text-red-500"
              }`}
            >
              {status ? <HiArrowNarrowUp /> : <HiArrowNarrowDown />}
              {thisMonthData - lastMonthData}
            </span>
            <div className="text-gray-500">for last month</div>
          </div>
        </>
      )}
    </div>
  );
};
