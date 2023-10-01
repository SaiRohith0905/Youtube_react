import React, { useEffect, useState } from "react";
import { Toast } from "primereact/toast";
import { useRef } from "react";
const Toasting = () => {
  const toast = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: "Message Content",
    });
  }, showMessage);
  return (
    <div>
      <Toast ref={toast} />
    </div>
  );
};

export default Toasting;
