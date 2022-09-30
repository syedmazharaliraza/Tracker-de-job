import { Button, Modal, Select, Textarea, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateApplication } from "../../store/slice/applicationSlice";

const EditApplicationModal = ({ opened, setOpened, editId }) => {
  const dispatch = useDispatch();
  const { applications } = useSelector((state) => state.application);
  const selectedApplication = applications.find((app) => app.id === editId);
  const [company, setCompany] = useState();
  const [jobLink, setJobLink] = useState(selectedApplication?.jobLink);
  const [jobRole, setJobRole] = useState(selectedApplication?.jobRole);
  const [status, setStatus] = useState(selectedApplication?.status);
  const [note, setNote] = useState(selectedApplication?.note);
  const initialJobRoles = useSelector((state) => state.application.jobRoles);
  const initialStatuses = useSelector((state) => state.application.statuses);
  const [jobRoles, setJobRoles] = useState(initialJobRoles);
  const [statuses, setStatuses] = useState(initialStatuses);

  useEffect(() => {
    setCompany(selectedApplication?.company);
    setJobLink(selectedApplication?.jobLink);
    setJobRole(selectedApplication?.jobRole);
    setStatus(selectedApplication?.status);
    setNote(selectedApplication?.note);
  }, [selectedApplication]);

  function editApplicationHandler(e) {
    e.preventDefault();
    if (!company || !jobRole || !status) {
      return;
    } else {
      dispatch(
        updateApplication({
          id: editId,
          updatedApplication: {
            company:
              company.charAt(0).toUpperCase() + company.slice(1).toLowerCase(),
            jobLink,
            jobRole:
              jobRole.charAt(0).toUpperCase() + jobRole.slice(1).toLowerCase(),
            status:
              status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
            note,
          },
        })
      );
      setOpened(false);
    }
  }

  return (
    <Modal
      centered
      overlayOpacity={0.55}
      opened={opened}
      overlayBlur={3}
      onClose={() => setOpened(false)}
      title='Edit job application'
    >
      <TextInput
        value={company}
        label='Company name'
        onChange={(event) => setCompany(event.currentTarget.value)}
        withAsterisk
        className='mb-3'
      />
      <TextInput
        value={jobLink}
        label='Job link'
        onChange={(event) => setJobLink(event.currentTarget.value)}
        className='mb-3'
      />
      <Select
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => {
          const item = { value: query, label: query };
          setJobRoles((current) => [...current, item]);
          return item;
        }}
        label='Job role'
        searchable
        onSearchChange={setJobRole}
        searchValue={jobRole}
        value={jobRole}
        onChange={setJobRole}
        data={jobRoles}
        withAsterisk
        className='mb-3'
      />
      <Select
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => {
          const item = { value: query, label: query };
          setStatuses((current) => [...current, item]);
          return item;
        }}
        label='Change status'
        searchable
        onSearchChange={setStatus}
        searchValue={status}
        value={status}
        onChange={setStatus}
        data={statuses}
        withAsterisk
        className='mb-3'
      />
      <Textarea
        placeholder='Add note related to current status'
        label='Note'
        className='mb-3'
        value={note}
        onChange={(event) => setNote(event.currentTarget.value)}
      />
      <Button variant='light' onClick={editApplicationHandler}>
        Update
      </Button>
    </Modal>
  );
};

export default EditApplicationModal;
