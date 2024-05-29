import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../todo.service';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let service: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
    }).compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Angular Todo List'
    );
  });

  it('should render input', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input')).toBeTruthy();
  });

  it('should be able to add new task', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputEl = compiled.querySelectorAll('input');
    if (inputEl[0]) {
      inputEl[0].value = 'test';
      inputEl[0].dispatchEvent(new Event('input'));
      inputEl[0].dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    }
    fixture.detectChanges();
    expect(service.todoList.length).toEqual(2);
  });

  it('should be able to search a task', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const el = compiled.querySelectorAll('input');
    if (el[0]) {
      el[0].value = 'test';
      el[0].dispatchEvent(new Event('input'));
      el[0].dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    }
    fixture.detectChanges();
    if (el[1]) {
      el[1].value = 'test';
      el[1].dispatchEvent(new Event('input'));
    }
    fixture.detectChanges();
    expect(service.todoList[1].visible).toBeTruthy();
  });

  it('should be able to toggle status', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const statusEl = compiled.querySelector('.todo-list-item');
    statusEl?.dispatchEvent(new Event('click'));
    expect(service.todoList[0].completed).toBeTruthy();
  });

  it('should be able to toggle editable', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const statusEl = compiled.querySelector('.item-actions-edit');
    statusEl?.dispatchEvent(new Event('click'));
    expect(service.todoList[0].editable).toBeTruthy();
  });

  it('should be delete a task', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const statusEl = compiled.querySelector('.item-actions-delete');
    statusEl?.dispatchEvent(new Event('click'));
    expect(service.todoList.length).toEqual(0);
  });
});
