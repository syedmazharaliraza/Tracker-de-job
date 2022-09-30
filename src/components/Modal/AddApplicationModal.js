import { Button, Modal, Select, Textarea, TextInput } from "@mantine/core";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addApplication } from "../../store/slice/applicationSlice";

const AddApplicationModal = ({ opened, setOpened }) => {
  const dispatch = useDispatch();
  const [company, setCompany] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const initialJobRoles = useSelector((state) => state.application.jobRoles);
  const initialStatuses = useSelector((state) => state.application.statuses);
  const [jobRoles, setJobRoles] = useState(initialJobRoles);
  const [statuses, setStatuses] = useState(initialStatuses);

  function addApplicationHandler(e) {
    e.preventDefault();
    if (!company || !jobRole || !status) {
      return;
    } else {
      dispatch(
        addApplication({
          id: nanoid(),
          company:
            company.charAt(0).toUpperCase() + company.slice(1).toLowerCase(),
          jobLink,
          jobRole:
            jobRole.charAt(0).toUpperCase() + jobRole.slice(1).toLowerCase(),
          status:
            status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
          note,
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
      title='Add job application'
    >
      <form>
        <TextInput
          value={company}
          label='Company name'
          onChange={(event) => setCompany(event.currentTarget.value)}
          withAsterisk
          className='mb-3'
          required
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
          data={jobRoles}
          withAsterisk
          className='mb-3'
          required
        />
        <Select
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setStatuses((current) => [...current, item]);
            return item;
          }}
          label='Status'
          searchable
          onSearchChange={setStatus}
          searchValue={status}
          data={statuses}
          withAsterisk
          className='mb-3'
          required
        />

        <Textarea
          placeholder='Add note related to current status'
          label='Note'
          className='mb-3'
        />
        <Button type='submit' variant='light' onClick={addApplicationHandler}>
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default AddApplicationModal;
