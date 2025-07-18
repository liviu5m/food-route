package com.foodroute.foodroute.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.awt.*;

@Entity
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private Double price;
    @Column(nullable = false)
    private String image;

    @ManyToOne(optional = false)
    @JoinColumn(name="category_id",referencedColumnName="id", nullable = false)
    private Category category;

    public Product() {
    }

    public Product(String name, String description, Double price, String image, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
    }
}
