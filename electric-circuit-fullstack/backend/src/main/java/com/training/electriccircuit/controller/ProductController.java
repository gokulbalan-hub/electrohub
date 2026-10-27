package com.training.electriccircuit.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.training.electriccircuit.entity.Product;
import com.training.electriccircuit.service.ProductService;


@RestController
@RequestMapping("/product")
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Add Product
    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    // Get All Products
    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/testpage")
    public String testpage() {
        return "index";
    }
    // Get Active Products Only
    @GetMapping("/active")
    public List<Product> getActiveProducts() {
        return productService.getActiveProducts();
    }

    // Get Product By Id
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // Update Product
    @PutMapping("/update/{id}")
    public Product updateProduct(@PathVariable Long id,
                                 @RequestBody Product product) {

        return productService.updateProduct(id, product);
    }

    // Delete Product
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {

        productService.deleteProduct(id);

        return "Product Deleted Successfully";
    }

    // Search Product
    @GetMapping("/search/{keyword}")
    public List<Product> searchProduct(@PathVariable String keyword) {

        return productService.searchProducts(keyword);
    }

    // Category Filter
    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {

        return productService.getProductsByCategory(category);
    }

    // Brand Filter
    @GetMapping("/brand/{brand}")
    public List<Product> getByBrand(@PathVariable String brand) {

        return productService.getProductsByBrand(brand);
    }
}