package com.tyk.springev2.entities;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class TickerEntity {
    private String id;
    private String name;
}
