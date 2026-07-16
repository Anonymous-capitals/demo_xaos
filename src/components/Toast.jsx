import { useEffect } from "react";
import Icon from "./Icon";

const Toast = ({ msg, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="toast">
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "rgba(0, 180, 100, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon name="check" size={12} color="#00B464" />
      </div>
      {msg}
    </div>
  );
};

export default Toast;
