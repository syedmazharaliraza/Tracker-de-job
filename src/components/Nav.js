import { Button, Select, Switch, Text } from "@mantine/core";
import React, { useState } from "react";
import { FiSliders } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilters,
  toggleShowRejectedApps,
} from "../store/slice/filterSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const jobRoles = useSelector((state) => state.application.jobRoles);
  const statuses = useSelector((state) => state.application.statuses);
  const companies = useSelector((state) => state.application.companies);
  const { showRejectedApps, filters } = useSelector((state) => state.filter);
  const [jobRole, setJobRole] = useState(null);
  const [status, setStatus] = useState(null);
  const [company, setCompany] = useState(null);

  function applyFiltersHandler() {
    dispatch(
      applyFilters({
        jobRole,
        status,
        company,
      })
    );
  }

  return (
    <>
      <Text className='d-flex align-items-center mb-5'>
        <FiSliders style={{ marginRight: "8px" }} /> Filters
      </Text>
      <Switch
        className='mb-5'
        checked={showRejectedApps}
        value={filters.status}
        onChange={(event) =>
          dispatch(toggleShowRejectedApps(event.currentTarget.checked))
        }
        label='Show rejected applications'
      />
      <Select
        className='mb-3'
        label='Filter by status'
        searchable
        nothingFound='Not found'
        value={status}
        onChange={setStatus}
        data={statuses.filter((status) => status !== "Rejected")}
      />

      <Select
        className='mb-3'
        label='Filter by company'
        searchable
        nothingFound='Not found'
        value={company}
        onChange={setCompany}
        data={companies}
      />
      <Select
        className='mb-4'
        label='Filter by role'
        searchable
        nothingFound='Not found'
        value={jobRole}
        onChange={setJobRole}
        data={jobRoles}
      />
      <Button
        style={{ maxWidth: "100px" }}
        variant='light'
        onClick={applyFiltersHandler}
      >
        Filter
      </Button>
    </>
  );
};

export default Nav;
