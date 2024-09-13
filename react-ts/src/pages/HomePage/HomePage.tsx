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
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { TableData } from "../../types";
import CreateNewOrder from "../../components/Navbar/CreateNewOrder/CreateNewOrder";

export default function HomePage() {
  const [apiData, setApiData] = useState<TableData[]>([]);
  const [editingRowId, setEditingRowId] = useState<number | null>(null); // ID редактируемой строки
  const [editedData, setEditedData] = useState<TableData | null>(null); // Редактируемые данные

  const host = "https://test.v5.pryaniky.com";
  const authToken = localStorage.getItem("token");

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
        // Обновляем данные
        setApiData((prev) =>
          prev.map((row) => (row.id === id ? { ...editedData, id } : row))
        );
        setEditingRowId(null); // Завершаем редактирование
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((row) => (
              <TableRow key={row.id}>
                {editingRowId === row.id ? (
                  <>
                    <TableCell>
                      <TextField
                        value={editedData?.companySigDate || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                          handleInputChange(e, "companySigDate")
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editedData?.companySignatureName || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                          handleInputChange(e, "companySignatureName")
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editedData?.documentName || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e, "documentName")}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editedData?.documentStatus || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                          handleInputChange(e, "documentStatus")
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editedData?.documentType || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e, "documentType")}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editedData?.employeeNumber || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                          handleInputChange(e, "employeeNumber")
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editedData?.employeeSigDate || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                          handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, "employeeSigDate")
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editedData?.employeeSignatureName || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                          handleInputChange(e, "employeeSignatureName")
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => saveHandler(row.id)}>
                        Сохранить
                      </Button>
                      <Button onClick={() => setEditingRowId(null)}>
                        Отмена
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{row.companySigDate}</TableCell>
                    <TableCell>{row.companySignatureName}</TableCell>
                    <TableCell>{row.documentName}</TableCell>
                    <TableCell>{row.documentStatus}</TableCell>
                    <TableCell>{row.documentType}</TableCell>
                    <TableCell>{row.employeeNumber}</TableCell>
                    <TableCell>{row.employeeSigDate}</TableCell>
                    <TableCell>{row.employeeSignatureName}</TableCell>
                    <TableCell>
                      <Button onClick={() => editHandler(row)}>
                        Редактировать
                      </Button>
                      <Button onClick={() => deleteHandler(row.id)}>
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
  );
}
