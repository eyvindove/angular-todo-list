import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

const testList = [
  {
    date: 1703980800000, // -- 2023/12/31 08:00:00
    description: '1',
  },
  {
    date: 1704067200000, // -- 2024/01/01 08:00:00
    description: '2',
  },
];

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to sort in ascending', () => {
    const result = service.sortAscending(testList, 'date');
    expect(result[0].description).toBe('1');
  });

  it('should be able to sort in descending', () => {
    const result = service.sortDescending(testList, 'date');
    expect(result[0].description).toBe('2');
  });

  it('should be able to sort todoList in descending', () => {
    service.addTodo('wow');
    service.sortListBy(false);
    expect(service.todoList[0].description).toBe('wow');
  });

  it('should be able to filter search result', () => {
    service.addTodo('wow');
    service.addTodo('test');
    service.filteredBySearch('test');
    expect(service.todoList[0].visible).toBe(false);
  });

  it('should be able get todoList', () => {
    expect(service.todoList[0].description).toEqual('Click me!');
  });

  it('should add new task correctly', () => {
    service.addTodo('test');
    expect(service.todoList.length).toEqual(2);
  });

  it('should delete new task correctly', () => {
    service.deleteTodo(0);
    expect(service.todoList.length).toEqual(0);
  });

  it('should toggle task status correctly', () => {
    service.toggleStatus(0);
    expect(service.todoList[0].completed).toEqual(true);
  });

  it('should toggle task editable correctly', () => {
    service.toggleEditable(0);
    expect(service.todoList[0].editable).toEqual(true);
  });
});
