import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserSquare2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReadManagersComponent() {
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    readManagers();
  }, []);

  const readManagers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/managers");
      console.log(result.data);
      setManagers(result.data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  const redirectToManagerDetails = (managerId) => {
    navigate(`/${managerId}/details`);
  };

  return (
    <div>
      <Table>
        <TableCaption>List of managers by store.</TableCaption>

        <div className="row"></div>
        
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>E-Mail</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="w-[80px]">
          {managers.map((manager) => (
            <TableRow key={manager.id}>
              <TableCell>{manager.id}</TableCell>
              <TableCell>{manager.firstName}</TableCell>
              <TableCell>{manager.lastName}</TableCell>
              <TableCell>{manager.emailId}</TableCell>
              <TableCell>
                <TableRow key={manager.id}>
                  <UserSquare2 className="flex"
                  onClick={() => redirectToManagerDetails(manager.id)} /> 
                </TableRow>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
