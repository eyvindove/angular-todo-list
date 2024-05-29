import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList: TodoType[] = [
    {
      date: 1704067200000,
      description: 'Click me!',
      editable: false,
      completed: false,
      visible: true,
    },
  ];

  constructor() {}

  sortAscending(list: any[], key: string) {
    return list.sort((a, b) => a[key] - b[key]);
  }

  sortDescending(list: any[], key: string) {
    return list.sort((a, b) => b[key] - a[key]);
  }

  sortListBy(isAscending: boolean) {
    if (isAscending) {
      this.sortAscending(this.todoList, 'date');
    } else {
      this.sortDescending(this.todoList, 'date');
    }
  }

  filteredBySearch(search: string) {
    this.todoList.forEach((todo: TodoType) => {
      if (search) {
        todo.visible = todo.description.includes(search);
      } else {
        todo.visible = true;
      }
    });
  }

  getTodoList() {
    return this.sortAscending(this.todoList, 'date');
  }

  addTodo(input: string) {
    const description = input.trim();
    if (!description) return;
    this.todoList.push({
      date: new Date().valueOf(),
      description,
      editable: false,
      completed: false,
      visible: true,
    });
  }

  deleteTodo(index: number) {
    this.todoList.splice(index, 1);
  }

  toggleStatus(index: number) {
    this.todoList[index].completed = !this.todoList[index].completed;
  }

  toggleEditable(index: number) {
    this.todoList[index].editable = !this.todoList[index].editable;
  }
}
