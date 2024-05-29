declare global {
  type TodoType = {
    date: number;
    description: string;
    editable: boolean;
    completed: boolean;
    visible: boolean;
  };
}

export {};
