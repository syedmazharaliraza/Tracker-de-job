import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialApplications = {
  applications: [
    {
      id: nanoid(),
      company: "Google",
      jobLink: "www.xyz.com/post?id=1245",
      jobRole: "Frontend engineer",
      status: "Rejected",
      note: "prepare from voice notes",
      timeline: [
        {
          status: "No reply",
          note: "",
        },
      ],
    },
    {
      id: nanoid(),
      company: "Yahoo",
      jobLink: "www.yahoo.com/jobs342",
      jobRole: "Backend engineer",
      status: "Selected",
      note: "",
    },
    {
      id: nanoid(),
      company: "Scvelte",
      jobLink: "www.scvelte.com/jobs342",
      jobRole: "Data analyst",
      status: "No reply",
      note: "",
    },
    {
      id: nanoid(),
      company: "Amazon",
      jobLink: "www.amz.com/jobs342",
      jobRole: "Software engineer",
      status: "Interview",
      note: "",
    },
  ],
  companies: ["Google", "Yahoo", "Scvelte", "Amazon"],
  jobRoles: [
    "Frontend engineer",
    "Backend engineer",
    "Data analyst",
    "Software engineer",
  ],
  statuses: ["Interview", "No reply", "Rejected", "Selected"],
};
const initialState = JSON.parse(localStorage.getItem("applications"))
  ? JSON.parse(localStorage.getItem("applications"))
  : initialApplications;

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    addApplication: (state, action) => {
      state.applications.push(action.payload);
      if (
        !state.companies.includes(
          action.payload.company.charAt(0).toUpperCase() +
            action.payload.company.slice(1).toLowerCase()
        )
      ) {
        state.companies.push(
          action.payload.company.charAt(0).toUpperCase() +
            action.payload.company.slice(1).toLowerCase()
        );
      }
      if (
        !state.statuses.includes(
          action.payload.status.charAt(0).toUpperCase() +
            action.payload.status.slice(1).toLowerCase()
        )
      ) {
        state.statuses.push(
          action.payload.status.charAt(0).toUpperCase() +
            action.payload.status.slice(1).toLowerCase()
        );
      }
      if (
        !state.jobRoles.includes(
          action.payload.jobRole.charAt(0).toUpperCase() +
            action.payload.jobRole.slice(1).toLowerCase()
        )
      ) {
        state.jobRoles.push(
          action.payload.jobRole.charAt(0).toUpperCase() +
            action.payload.jobRole.slice(1).toLowerCase()
        );
      }

      localStorage.setItem("applications", JSON.stringify(state));
    },
    removeApplication: (state, action) => {
      state.applications = state.applications.filter(
        (app) => app.id !== action.payload
      );
      localStorage.setItem("applications", JSON.stringify(state));
    },
    updateApplication: (state, action) => {
      state.applications.forEach((app, i) => {
        if (app.id === action.payload.id) {
          state.applications[i] = {
            id: app.id,
            ...action.payload.updatedApplication,
          };
          if (
            !state.companies.includes(
              action.payload.updatedApplication.company
                .charAt(0)
                .toUpperCase() +
                action.payload.updatedApplication.company.slice(1).toLowerCase()
            )
          ) {
            state.companies.push(
              action.payload.updatedApplication.company
                .charAt(0)
                .toUpperCase() +
                action.payload.updatedApplication.company.slice(1).toLowerCase()
            );
          }
          if (
            !state.statuses.includes(
              action.payload.updatedApplication.status.charAt(0).toUpperCase() +
                action.payload.updatedApplication.status.slice(1).toLowerCase()
            )
          ) {
            state.statuses.push(
              action.payload.updatedApplication.status.charAt(0).toUpperCase() +
                action.payload.updatedApplication.status.slice(1).toLowerCase()
            );
          }
          if (
            !state.jobRoles.includes(
              action.payload.updatedApplication.jobRole
                .charAt(0)
                .toUpperCase() +
                action.payload.updatedApplication.jobRole.slice(1).toLowerCase()
            )
          ) {
            state.jobRoles.push(
              action.payload.updatedApplication.jobRole
                .charAt(0)
                .toUpperCase() +
                action.payload.updatedApplication.jobRole.slice(1).toLowerCase()
            );
          }
        }
      });

      localStorage.setItem("applications", JSON.stringify(state));
    },
  },
});

export const { addApplication, removeApplication, updateApplication } =
  applicationSlice.actions;
export default applicationSlice.reducer;
