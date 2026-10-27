package com.training.electriccircuit.service;

import java.util.List;

import com.training.electriccircuit.entity.Product;

public interface ProductService {

    // Add Product
    Product saveProduct(Product product);

    // Get All Products
    List<Product> getAllProducts();

    // Get Product By Id
    Product getProductById(Long id);

    // Delete Product
    void deleteProduct(Long id);

    // Update Product
    Product updateProduct(Long id, Product product);

    // Search Product
    List<Product> searchProducts(String keyword);

    // Category Filter
    List<Product> getProductsByCategory(String category);

    // Brand Filter
    List<Product> getProductsByBrand(String brand);

    // Active Products Only
    List<Product> getActiveProducts();
}