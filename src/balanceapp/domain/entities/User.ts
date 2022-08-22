import { Expense } from "./Expense";
import { Income } from "./Income";

export class User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    
    name: string;
    email: string;
    password: string;
    incomes: Income[] | null;
    expenses: Expense[] | null;
}