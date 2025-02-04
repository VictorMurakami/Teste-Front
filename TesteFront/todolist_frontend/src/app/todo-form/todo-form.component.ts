import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  @Output() saved = new EventEmitter<void>();
  todo: Todo = { title: '', description: '', completed: false };

  constructor(private todoService: TodoService) {}

  saveTodo(): void {
    if (this.todo.id) {
      this.todoService.updateTodo(this.todo).subscribe(() => this.saved.emit());
      setTimeout(() => {
        location.reload();
      }, 500);
    } else {
      this.todoService.addTodo(this.todo).subscribe(() => this.saved.emit());
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  }
}