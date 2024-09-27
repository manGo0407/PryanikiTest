import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { TableData } from "../../types";
import CreateNewOrder from "../../components/CreateNewOrder/CreateNewOrder";

import style from "./HomePage.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const [apiData, setApiData] = useState<TableData[]>([]);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<TableData | null>(null);

  const host = "https://test.v5.pryaniky.com";
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const deleteHandler = async (id: number) => {
    try {
      const response = await axios.delete(
        `${host}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
        {
          headers: {
            "x-auth": authToken,
          },
        }
      );
      if (response.status === 200) {
        setApiData((prev) => prev.filter((el) => el.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = (row: TableData) => {
    setEditingRowId(row.id);
    setEditedData(row);
  };

  const handleRegisterClick = () => {
    navigate("/login");
  };

  const saveHandler = async (id: number) => {
    try {
      const response = await axios.post(
        `${host}/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
        editedData,
        {
          headers: {
            "x-auth": authToken,
          },
        }
      );
      if (response.status === 200) {
        setApiData((prev) =>
          prev.map((row) => (row.id === id ? { ...editedData, id } : row))
        );
        setEditingRowId(null);
      }
    } catch (error) {
      console.log("Ошибка при сохранении", error);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `${host}/ru/data/v3/testmethods/docs/userdocs/get`,
        {
          headers: {
            "x-auth": authToken,
          },
        }
      );
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof TableData
  ) => {
    if (editedData) {
      setEditedData({ ...editedData, [field]: event.target.value });
    }
  };

  return (
    <>
      <div className={style.container}>
        {authToken ? (
          <>
            <TableContainer component={Paper} className={style.tableContainer}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className={style.table}
              >
                <TableHead className={style.tableHead}>
                  <TableRow className={style.tableRow}>
                    <TableCell className={style.tableCell}>
                      Company Sig Date
                    </TableCell>
                    <TableCell className={style.tableCell}>
                      Company Signature Name
                    </TableCell>
                    <TableCell className={style.tableCell}>
                      Document Name
                    </TableCell>
                    <TableCell className={style.tableCell}>
                      Document Status
                    </TableCell>
                    <TableCell className={style.tableCell}>
                      Document Type
                    </TableCell>
                    <TableCell className={style.tableCell}>
                      Employee Number
                    </TableCell>
                    <TableCell className={style.tableCell}>
                      Employee Sig Date
                    </TableCell>
                    <TableCell className={style.tableCell}>
                      Employee Signature Name
                    </TableCell>
                    <TableCell className={style.tableCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={style.tableBody}>
                  {apiData.map((row) => (
                    <TableRow key={row.id} className={style.tableRow}>
                      {editingRowId === row.id ? (
                        <>
                          <TableCell className={style.tableCell}>
                            <TextField
                              value={editedData?.companySigDate || ""}
                              onChange={(e) =>
                                handleInputChange(e, "companySigDate")
                              }
                              className={style.textField}
                            />
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            <TextField
                              value={editedData?.companySignatureName || ""}
                              onChange={(e) =>
                                handleInputChange(e, "companySignatureName")
                              }
                              className={style.textField}
                            />
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            <TextField
                              value={editedData?.documentName || ""}
                              onChange={(e) =>
                                handleInputChange(e, "documentName")
                              }
                              className={style.textField}
                            />
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            <TextField
                              value={editedData?.documentStatus || ""}
                              onChange={(e) =>
                                handleInputChange(e, "documentStatus")
                              }
                              className={style.textField}
                            />
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            <TextField
                              value={editedData?.documentType || ""}
                              onChange={(e) =>
                                handleInputChange(e, "documentType")
                              }
                              className={style.textField}
                            />
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            <TextField
                              value={editedData?.employeeNumber || ""}
                              onChange={(e) =>
                                handleInputChange(e, "employeeNumber")
                              }
                              className={style.textField}
                            />
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            <TextField
                              value={editedData?.employeeSigDate || ""}
                              onChange={(e) =>
                                handleInputChange(e, "employeeSigDate")
                              }
                              className={style.textField}
                            />
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            <TextField
                              value={editedData?.employeeSignatureName || ""}
                              onChange={(e) =>
                                handleInputChange(e, "employeeSignatureName")
                              }
                              className={style.textField}
                            />
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            <Button
                              onClick={() => saveHandler(row.id)}
                              className={style.saveButton}
                            >
                              Сохранить
                            </Button>
                            <Button
                              onClick={() => setEditingRowId(null)}
                              className={style.cancelButton}
                            >
                              Отмена
                            </Button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell className={style.tableCell}>
                            {row.companySigDate}
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            {row.companySignatureName}
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            {row.documentName}
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            {row.documentStatus}
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            {row.documentType}
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            {row.employeeNumber}
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            {row.employeeSigDate}
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            {row.employeeSignatureName}
                          </TableCell>
                          <TableCell className={style.tableCell}>
                            <Button
                              onClick={() => editHandler(row)}
                              className={style.editButton}
                            >
                              Редактировать
                            </Button>
                            <Button
                              onClick={() => deleteHandler(row.id)}
                              className={style.deleteButton}
                            >
                              Удалить
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <CreateNewOrder getData={getData} />
          </>
        ) : (
          <Box 
          sx={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            backgroundColor: '#f4f6f8'
          }}
        >
          <Paper 
            elevation={3}
            sx={{ 
              padding: 4, 
              textAlign: 'center', 
              maxWidth: 500, 
              borderRadius: 2 
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Присоединяйтесь к нашему сообществу!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Войдите, чтобы получить полный доступ к нашему функционалу. 
              Создавайте, редактируйте и удаляйте документы, управляйте данными и многое другое!
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              onClick={handleRegisterClick} 
              sx={{ mb: 2 }}
            >
              Войти
            </Button>
          </Paper>
        </Box>
        )}
      </div>
    </>
  );
}
