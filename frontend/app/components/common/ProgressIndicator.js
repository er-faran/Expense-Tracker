import React from "react";

const ProgressIndicator = ({ label = "Item Name", value = 50 }) => {
  const progressBarStyle = {
    width: `${value}%`,
  };
  return (
    <div>
      <div className="flex justify-between text-primary-background font-semibold text-md">
        <div>{label}</div>
        <div>{value}%</div>
      </div>
      <div>
        <div className="flex flex-col">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="flex-1 mr-2">
                <div className="w-full bg-gray-200 rounded-full">
                  <div
                    className="text-xs leading-none py-1 text-center text-white rounded-full bg-primary-progress"
                    style={progressBarStyle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
