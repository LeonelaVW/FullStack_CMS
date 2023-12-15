import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function CreateManagersComponent() {
  const [manager, setManager] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const { firstName, lastName, emailId } = manager;
  const { storeId } = useParams();
  const navigate = useNavigate();
  const onInputChange = (e) => {
    setManager({ ...manager, [e.target.name]: e.target.value });
  };

  const saveManager = async () => {
    try {
      await axios.post("http://localhost:8080/managers", manager);
      console.log("Manager saved => " + JSON.stringify(manager));
      alert("Manager saved successfully!");
      const redirectPath = `/${storeId}/managers`;
      navigate(redirectPath); 
    } catch (error) {
      console.error("Error saving manager:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    saveManager();
  };

  const onCancel = () => {
    navigate(`/${storeId}/managers`);
  };

  return (
    <div className="container">
      <div className="px-4 row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center"> New Manager Info</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3 py-6">
              <label htmlFor="Name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="New manager's first name"
                name="firstName"
                value={firstName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="LastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="New manager's last name"
                name="lastName"
                value={lastName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3 py-6">
              <label htmlFor="Email" className="form-label">
                E-Mail
              </label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="New manager's e-mail"
                name="emailId"
                value={emailId}
                onChange={onInputChange}
              />
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}