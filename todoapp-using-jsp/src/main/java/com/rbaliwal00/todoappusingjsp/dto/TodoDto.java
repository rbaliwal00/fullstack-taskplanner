package com.rbaliwal00.todoappusingjsp.dto;

import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Data
@Builder
public class TodoDto {
    private Long id;
    private String description;
    private LocalDate targetDate;
    private boolean done;
}
