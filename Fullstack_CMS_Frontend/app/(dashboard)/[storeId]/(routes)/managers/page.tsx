"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReadManagersComponent from "./components/ReadManagersComponent";
import CreateManagersComponent from "./components/CreateManagersComponent";
import ManagerDetailsComponent from "./components/PreviewManagersComponent";
import UpdateManagersComponent from "./components/UpdateManagersComponent";
import DeleteManagersComponent from "./components/DeleteManagersComponent";


import { Button } from "@/components/ui/button";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

const ManagersPage = () => {
  return (
    <Router>
      <>
        <div className="flex items-center py-7 px-4 mx-4 justify-between">
          <Heading title="Managers" description="List of managers by store." />
          <Link to="/:storeId/managers/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </Link>
        </div>
        <Separator />
      <div className="flex items-center py-4">
{/*         <Input
          placeholder="Search"
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
      </div>
      <div className="rounded-md border">
      <Routes>
  <Route path="/:storeId/managers" element={<ReadManagersComponent />} />
  <Route path="/:storeId/managers/create" element={<CreateManagersComponent />} />
  <Route path="/:id/details" element={<ManagerDetailsComponent />} />
   <Route path="/:id/update" element={<UpdateManagersComponent />} />
  <Route path="/:id/delete" element={<DeleteManagersComponent onCancel={() => {}} onConfirm={() => {}} />} />
</Routes>

        </div>
      </>

    </Router>
  );
};

export default ManagersPage;
