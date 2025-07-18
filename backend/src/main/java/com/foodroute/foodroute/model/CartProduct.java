package com.foodroute.foodroute.model;

import jakarta.persistence.*;

@Entity
public class CartProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int quantity = 1;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cart_id", referencedColumnName = "id", nullable = false)
    private Cart cart;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private Product product;

}
