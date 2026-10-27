package com.training.electriccircuit.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.training.electriccircuit.entity.Product;
import com.training.electriccircuit.repository.ProductRepository;

@SuppressWarnings("unused")
@Controller
public class AdminController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/admin")
    public String adminPage(Model model) {

        List<Product> products = productRepository.findAll();

        model.addAttribute("products", products);

        return "admin";
    }

    // Add Product Page
    @GetMapping("/admin/add")
    public String addProductPage(Model model) {

        model.addAttribute("product", new Product());

        return "add-product";
    }

    // Save Product
    @PostMapping("/admin/save")
    public String saveProduct(@NonNull Product product) {

        productRepository.save(product);

        return "redirect:/admin";
    }

    // Edit Product Page
    @GetMapping("/admin/edit/{id}")
    public String editProduct(@PathVariable @NonNull Long id,
                              Model model) {

        Product product = productRepository
                .findById(id)
                .orElse(null);

        if (product == null) {
            return "redirect:/admin";
        }

        model.addAttribute("product", product);

        return "edit-product";
    }

    // Update Product
    @PostMapping("/admin/update")
    public String updateProduct(@NonNull Product product) {

        productRepository.save(product);

        return "redirect:/admin";
    }

    // Delete Product
    @SuppressWarnings("null")
	@GetMapping("/admin/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {

        productRepository.deleteById(id);

        return "redirect:/admin";
    }

    // View Single Product
    @GetMapping("/admin/view/{id}")
    public String viewProduct(@PathVariable Long id,
                              Model model) {

    	@SuppressWarnings("null")
		Product product = productRepository
                .findById(id)
                .orElse(null);

        model.addAttribute("product", product);

        return "product-details";
    }

}