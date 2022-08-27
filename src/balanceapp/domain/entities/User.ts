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

  validateFields(): string[] {
    const errors: string[] = [];
    if (!this.name) errors.push("El nombre es requerido");
    if (!this.email) errors.push("El email es requerido");
    if (!this.password) errors.push("La contraseña es requerida");
    if (this.email && !this.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      errors.push("El email no tiene un formato válido");
    }

    return errors;
  }

  validateLogin(): string[] {
    const errors: string[] = [];
    if (!this.email) errors.push("El email es requerido");
    if (!this.password) errors.push("La contraseña es requerida");
    if (this.email && !this.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      errors.push("El email no tiene un formato válido");
    }

    return errors;
  }
}
