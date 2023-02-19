package com.rbaliwal00.todoappusingjsp.service;

import com.rbaliwal00.todoappusingjsp.dto.TodoDto;
import com.rbaliwal00.todoappusingjsp.model.Todo;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TodoService {
    List<TodoDto> findByUser(Long userId);
    TodoDto findById(Long userId, Long id) throws Exception;
    void addTodo(Long userId, TodoDto dto) throws Exception;
    ResponseEntity<Void> deleteById(Long userId, Long id) throws Exception;
    void updateTodo(Long userId, TodoDto dto) throws Exception;
}
