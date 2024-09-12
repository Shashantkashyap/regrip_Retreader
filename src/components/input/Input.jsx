import React from "react";

const Input = React.forwardRef(function (
  { type = "text", placeholder = "", label = "", className = "", ...props },
  ref
) {
  return (
    <div className="flex justify-center">
      {label && <label className="text-sm font-medium">{label}</label>}

      <input
        type={type}
        placeholder={placeholder}
        className={`p-1 w-[90%] text-black ${className} px-2`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
