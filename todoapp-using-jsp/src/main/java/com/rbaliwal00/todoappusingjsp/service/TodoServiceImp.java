package com.rbaliwal00.todoappusingjsp.service;

import com.rbaliwal00.todoappusingjsp.dto.TodoDto;
import com.rbaliwal00.todoappusingjsp.model.Todo;
import com.rbaliwal00.todoappusingjsp.model.User;
import com.rbaliwal00.todoappusingjsp.repository.TodoRepository;
import com.rbaliwal00.todoappusingjsp.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class TodoServiceImp implements  TodoService{
    private final TodoRepository todoRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    public TodoServiceImp(TodoRepository todoRepository, ModelMapper modelMapper, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    public List<TodoDto> findByUser(Long userId){
        List<TodoDto> todos = new ArrayList<>();
        try{
            User user = userRepository.findById(userId).orElseThrow(() -> new Exception());

            todos = todoRepository.findByUser(user)
                    .stream().map(
                            todo -> new TodoDto(todo.getId(), todo.getDescription(), todo.getTargetDate(), todo.isDone()))
                    .collect(Collectors.toList());

        }catch (Exception ex){
            System.out.println(ex);
        }
        return todos;
    }

    public void addTodo(Long userId, TodoDto dto) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception());
        Todo todo = modelMapper.map(dto, Todo.class);
        todo.setUser(user);
        todoRepository.save(todo);
    }

    public TodoDto findById(Long userId, Long id) throws Exception {
        Todo task = todoRepository.findById(id).orElseThrow();
        if(task==null){
            throw new NoSuchElementException();
        }
        if(!task.getUser().getId().equals(userId)){
            throw new Exception("Unauthorised Attempt");
        }
        return modelMapper.map(task, TodoDto.class);
    }

    @Override
    public ResponseEntity<Void> deleteById(Long userId, Long id) throws Exception {
        Todo task = todoRepository.findById(id).orElseThrow(() -> new Exception());
        if(!task.getUser().getId().equals(userId)){
            throw new Exception("Unauthorised Attempt");
        }
        todoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    public void updateTodo(Long userId, TodoDto dto) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception());
        if(dto==null){
            throw new NoSuchElementException();
        }
        deleteById(userId, dto.getId());
        Todo todo = modelMapper.map(dto, Todo.class);
        todo.setUser(user);
        todoRepository.save(todo);
    }

}
