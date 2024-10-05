import {
  PaginatedRequestParams,
  PaginatedResponse,
  RequestByEmployeeParams,
  SetTransactionApprovalParams,
  Transaction,
  Employee,
} from "./types"
import mockData from "../mock-data.json"

const TRANSACTIONS_PER_PAGE = 5

const data: { employees: Employee[]; transactions: Transaction[] } = {
  employees: mockData.employees,
  transactions: mockData.transactions,
}

export const getEmployees = (): Employee[] => data.employees

export const getTransactionsPaginated = ({
  page,
}: PaginatedRequestParams): PaginatedResponse<Transaction[]> => {
  if (page === null) {
    throw new Error("Page cannot be null")
  }

  let end = TRANSACTIONS_PER_PAGE * (page + 1)
  let isAtEnd = end > data.transactions.length;
  if (isAtEnd) {
    end = data.transactions.length;
  }

  const nextPage = end < data.transactions.length ? page + 1 : null

  return {
    nextPage,
    data: data.transactions.slice(0, end)
  }
}

export const getTransactionsByEmployee = ({ employeeId }: RequestByEmployeeParams) => {
  if (!employeeId) {
    throw new Error("Employee id cannot be empty")
  }

  return data.transactions.filter((transaction) => transaction.employee.id === employeeId)
}

export const setTransactionApproval = ({ transactionId, value }: SetTransactionApprovalParams): void => {
  const transaction = data.transactions.find(
    (currentTransaction) => currentTransaction.id === transactionId
  )
  console.log(`item: ${transaction?.id} changed from ${transaction?.approved} to ${value}`);
  if (!transaction) {
    throw new Error("Invalid transaction to approve")
  }

  transaction.approved = value
}
