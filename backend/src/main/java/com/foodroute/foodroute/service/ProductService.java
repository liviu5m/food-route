package com.foodroute.foodroute.service;

import com.foodroute.foodroute.model.Category;
import com.foodroute.foodroute.model.Product;
import com.foodroute.foodroute.repository.CategoryRepository;
import com.foodroute.foodroute.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepositor;

    public ProductService(ProductRepository productRepositor) {
        this.productRepositor = productRepositor;
    }

    public Optional<Product> getProductById(Long id) {
        return productRepositor.findById(id);
    }

    public Page<Product> getProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepositor.findAll(pageable);
    }

    public List<Product> getProducts() {
        return productRepositor.findAll();
    }

    public Product createProduct(Product product) {
        return productRepositor.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product product = productRepositor.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setImage(updatedProduct.getImage());
        product.setCategory(updatedProduct.getCategory());
        return productRepositor.save(product);
    }

    public void deleteProduct(Long id) {
        productRepositor.deleteById(id);
    }
}
