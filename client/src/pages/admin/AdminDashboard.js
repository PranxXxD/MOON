import React from "react";

const AdminDashboard = () => {
  const mystyle = {
    marginLeft: "500px",
    paddingTop: "10px",
    fontWeight: "bold",
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col" style={{ height: "500px" }}>
          <h4 style={mystyle}>Admin Dashboard</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
