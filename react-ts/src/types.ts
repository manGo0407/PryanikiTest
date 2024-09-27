import { ReactNode } from "react";

export interface TableData {
    id: number;
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
  }

  export interface CreateNewOrderProps {
    getData: () => void; 
  }

  export interface GuestRouteProps {
    isAuthenticated: boolean;
    redirectPath?: string;
    children: ReactNode
  }