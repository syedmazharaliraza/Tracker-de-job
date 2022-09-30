import React, { useState } from "react";
import { Table } from "@mantine/core";
import { FaRegEdit } from "react-icons/fa";
import { MdTimeline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditApplicationModal from "../../Modal/EditApplicationModal";
import { useDispatch, useSelector } from "react-redux";
import { removeApplication } from "../../../store/slice/applicationSlice";

const AllTable = () => {
  const dispatch = useDispatch();
  const [openedEditModal, setOpenedEditModal] = useState(false);
  const [editId, setEditId] = useState("");
  let { applications } = useSelector((state) => state.application);
  const { showRejectedApps, filters } = useSelector((state) => state.filter);
  if (!showRejectedApps) {
    applications = applications.filter((app) => app.status !== "Rejected");
  }
  if (filters.status) {
    applications = applications.filter((app) => app.status === filters.status);
  }
  if (filters.jobRole) {
    applications = applications.filter(
      (app) => app.jobRole === filters.jobRole
    );
  }
  if (filters.company) {
    applications = applications.filter(
      (app) => app.company === filters.company
    );
  }

  return (
    <>
      <Table striped verticalSpacing='md'>
        <thead>
          <tr>
            <th>Company</th>
            <th>Job Link</th>
            <th>Job Role</th>
            <th>Status</th>
            <th>Note</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.company}</td>
              <td>{application.jobLink}</td>
              <td>{application.jobRole}</td>
              <td>{application.status}</td>
              <td>{application.note}</td>
              <td style={{ width: "120px" }}>
                <MdTimeline className='mx-2' style={{ cursor: "pointer" }} />
                <FaRegEdit
                  className='mx-2'
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setEditId(application.id);
                    setOpenedEditModal(true);
                  }}
                />
                <RiDeleteBin6Line
                  className='mx-2'
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(removeApplication(application.id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditApplicationModal
        opened={openedEditModal}
        setOpened={setOpenedEditModal}
        editId={editId}
      />
    </>
  );
};

export default AllTable;
