import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  title = 'Angular Todo List';
  todoList: TodoType[] = [];
  input = '';
  search = '';
  isAscending = true;

  constructor(private todoService: TodoService) {
    this.todoList = this.todoService.getTodoList();
  }

  get visibleItemCount() {
    return this.todoList.filter((todo: TodoType) =>
      todo.description.includes(this.search)
    ).length;
  }

  onInputKeyupEnter() {
    this.todoService.addTodo(this.input);
    this.input = '';
  }

  onSearchKeyup() {
    this.todoService.filteredBySearch(this.search);
  }

  onStatusClick(index: number) {
    this.todoService.toggleStatus(index);
  }

  onEditClick(e: Event, index: number) {
    e.stopPropagation();
    this.todoService.toggleEditable(index);
  }

  onDeleteClick(e: Event, index: number) {
    e.stopPropagation();
    this.todoService.deleteTodo(index);
  }

  filterTodoList() {
    this.isAscending = !this.isAscending;
    this.todoService.sortListBy(this.isAscending);
  }
}
