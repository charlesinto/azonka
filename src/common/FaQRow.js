import React, { useState } from "react";
import "../css/update.css";

export const FaQRow = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="box-shadow white-box py-4 px-4 rounded-box mb-3">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4
          className="heavy-title"
          style={{
            fontSize: "1.5rem",
            marginBottom: 0,
            marginRight: 10,
            lineHeight: "20px",
          }}
        >
          {title}
        </h4>
        <div
          className={`${isOpen ? "arrow-up yellow-bg-arrow-up" : "arrow-down"}`}
        ></div>
      </div>
      {content && content.trim() !== "" && isOpen && (
        <div>
          <p>
            <h4
              style={{ letterSpacing: 0, fontSize: 14, marginTop: 16 }}
              className="article"
            >
              {content}
            </h4>
          </p>
        </div>
      )}
    </div>
  );
};
