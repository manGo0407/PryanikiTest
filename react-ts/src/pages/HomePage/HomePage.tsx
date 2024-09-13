import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { TableData } from "../../types";
import CreateNewOrder from "../../components/Navbar/CreateNewOrder/CreateNewOrder";
// import MultiSelectInput from "../../components/Navbar/CreateNewOrder/CreateNewOrder";

export default function HomePage() {
  const [apiData, setApiData] = useState<TableData[]>([]);

  const host = "https://test.v5.pryaniky.com";

  const getData = async () => {
    try {
      const authToken = localStorage.getItem("token");
      console.log("eto authToken v localStorage ===> ", authToken);
      const response = await axios.get(
        `${host}/ru/data/v3/testmethods/docs/userdocs/get`,
        {
          headers: {
            "x-auth": authToken,
          },
        }
      );
      console.log("eto response v HomePage====>", response.data);
      // setApiData(response.data)
      console.log(apiData);

      if (response.status === 200 && response.data) {
        setApiData(response.data.data);
      } else {
        console.error("Ошибка получения данных:", response.data.error_text);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  console.log("eto dannie dlya otobrazhenia===>", apiData);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company Sig Date</TableCell>
              <TableCell>Company Signature Name</TableCell>
              <TableCell>Document Name</TableCell>
              <TableCell>Document Status</TableCell>
              <TableCell>Document Type</TableCell>
              <TableCell>Employee Number</TableCell>
              <TableCell>Employee Sig Date</TableCell>
              <TableCell>Employee Signature Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.companySigDate}</TableCell>
                <TableCell>{row.companySignatureName}</TableCell>
                <TableCell>{row.documentName}</TableCell>
                <TableCell>{row.documentStatus}</TableCell>
                <TableCell>{row.documentType}</TableCell>
                <TableCell>{row.employeeNumber}</TableCell>
                <TableCell>{row.employeeSigDate}</TableCell>
                <TableCell>{row.employeeSignatureName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateNewOrder getData={getData} />
    </>
  );
}
