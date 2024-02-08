import React from "react";

const ToastMessage = ({
  type = "success", // warning | success | error | info,
  title = "",
  subTitle = "",
}) => {
  return (
    <div className="flex toast-box ml-2 items-start">
      {/* {type === "success" ? (
        <div>✔️</div>
      ) : type === "error" ? (
        <div>❌</div>
      ) : type === "warning" ? (
        <div>⚠️</div>
      ) : (
        <div>ℹ</div>
      )} */}
      <div className="message-body ml-3">
        {title && <h3 className={`${subTitle && "mb-1"}`}>{title}</h3>}
        {subTitle && <h3 className={`${!title && "text-sm"}`}>{subTitle}</h3>}
      </div>
    </div>
  );
};

export default ToastMessage;
