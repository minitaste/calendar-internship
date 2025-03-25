export type Todo = {
  id: string;
  name: string;
  description: string;
  date: string;
  importance: string;
  completed: boolean;
};

export interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}