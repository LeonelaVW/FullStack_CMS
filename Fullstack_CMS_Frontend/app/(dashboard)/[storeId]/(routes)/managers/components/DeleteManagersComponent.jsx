import React from "react";
import { UserX2 } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteManagersComponent = ({ }) => {
    const { id } = useParams();
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(-2);
    
  };

  const onConfirm = async () => {
    try {
      // Realiza la solicitud DELETE al backend

      await axios.delete(`http://localhost:8080/managers/${id}`);
      console.log("Manager deleted");
      alert("Manager deleted successfully!");

      // Redirige a la página deseada (en este caso, -2)
      navigate(-2);
    } catch (error) {
      console.error("Error deleting manager:", error);
    }
  };

  return (
    <div className="border rounded p-4 mt-2 shadow">
      <p className="text-center mb-4">Are you sure you want to delete this manager?</p>
      <div className="flex items-center justify-end space-x-2">
        <button
          onClick={onCancel}
          className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
        >
          <UserX2 className="mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteManagersComponent;
