import React from "react";
import { TextField, Button, Box, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import { CreateNewOrderProps } from "../../../types";

export default function CreateNewOrder({ getData }: CreateNewOrderProps) {
  const [formValues, setFormValues] = React.useState({
    companySigDate: "",
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSigDate: "",
    employeeSignatureName: "",
  });

  const host = "https://test.v5.pryaniky.com";
  const token = localStorage.getItem("token");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name!]: value,
    });
  };
  const formatToISO = (date: string | Date) => {
    date = new Date();
    return date.toISOString();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${host}/ru/data/v3/testmethods/docs/userdocs/create`,
        {
          companySigDate: formatToISO(formValues.companySigDate),
          companySignatureName: formValues.companySignatureName,
          documentName: formValues.documentName,
          documentStatus: formValues.documentStatus,
          documentType: formValues.documentType,
          employeeNumber: formValues.employeeNumber,
          employeeSigDate: formatToISO(formValues.employeeSigDate),
          employeeSignatureName: formValues.employeeSignatureName,
        },
        {
          headers: {
            "x-auth": token,
          },
        }
      );
      setFormValues({
        companySigDate: "",
        companySignatureName: "",
        documentName: "",
        documentStatus: "",
        documentType: "",
        employeeNumber: "",
        employeeSigDate: "",
        employeeSignatureName: "",
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 style={{ color: "#1565C0", textAlign: "center" }}>Create a New Order</h1>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#f9f9f9",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <TextField
          label="Company Sig Date"
          type="date"
          name="companySigDate"
          InputLabelProps={{ shrink: true }}
          value={formValues.companySigDate}
          onChange={handleChange}
          required
          sx={{ backgroundColor: "#ffffff", borderRadius: "4px" }}
        />
        <TextField
          label="Company Signature Name"
          type="text"
          name="companySignatureName"
          value={formValues.companySignatureName}
          onChange={handleChange}
          required
          sx={{ backgroundColor: "#ffffff", borderRadius: "4px" }}
        />
        <TextField
          label="Document Name"
          type="text"
          name="documentName"
          value={formValues.documentName}
          onChange={handleChange}
          required
          sx={{ backgroundColor: "#ffffff", borderRadius: "4px" }}
        />
        <FormControl fullWidth>
          <InputLabel id="document-status-label">Document Status</InputLabel>
          <TextField
            type="text"
            name="documentStatus"
            value={formValues.documentStatus}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "#ffffff", borderRadius: "4px" }}
          />
        </FormControl>
        <TextField
          label="Document Type"
          type="text"
          name="documentType"
          value={formValues.documentType}
          onChange={handleChange}
          required
          sx={{ backgroundColor: "#ffffff", borderRadius: "4px" }}
        />
        <TextField
          label="Employee Number"
          type="text"
          name="employeeNumber"
          value={formValues.employeeNumber}
          onChange={handleChange}
          required
          sx={{ backgroundColor: "#ffffff", borderRadius: "4px" }}
        />
        <TextField
          label="Employee Sig Date"
          type="date"
          name="employeeSigDate"
          value={formValues.employeeSigDate}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          required
          sx={{ backgroundColor: "#ffffff", borderRadius: "4px" }}
        />
        <TextField
          label="Employee Signature Name"
          type="text"
          name="employeeSignatureName"
          value={formValues.employeeSignatureName}
          onChange={handleChange}
          required
          sx={{ backgroundColor: "#ffffff", borderRadius: "4px" }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            backgroundColor: "#1565C0",
            "&:hover": {
              backgroundColor: "#0D47A1",
            },
          }}
        >
          Добавить!
        </Button>
      </Box>
    </>
  );
}
