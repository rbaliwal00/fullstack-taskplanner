package com.rbaliwal00.todoappusingjsp.controller;

import com.rbaliwal00.todoappusingjsp.dto.TodoDto;
import com.rbaliwal00.todoappusingjsp.service.TodoServiceImp;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoController {

    private final TodoServiceImp todoService;

    public TodoController(TodoServiceImp service) {
        this.todoService = service;
    }

    @RequestMapping(value = "/users/{userId}/todos",method = RequestMethod.GET)
    public List<TodoDto> listAllTodos(@PathVariable Long userId){
        return todoService.findByUser(userId);
    }

    @RequestMapping(value = "/users/{userId}/todos/{id}",method = RequestMethod.GET)
    public TodoDto listTodo(@PathVariable Long userId, @PathVariable Long id) throws Exception {
        return (TodoDto) todoService.findById(userId, id);
    }

    @DeleteMapping("/users/{userId}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long userId, @PathVariable Long id) throws Exception {
        return todoService.deleteById(userId, id);
    }

    @PutMapping( "/users/{userId}/todos")
    public void updateTodo(@PathVariable Long userId, @RequestBody TodoDto todo) throws Exception {
        todoService.updateTodo(userId, todo);
    }

    @PostMapping( "/users/{userId}/todos")
    public void createTodo(@PathVariable Long userId,
                           @RequestBody TodoDto todo) throws Exception {
        todoService.addTodo(userId,todo);
    }
}
