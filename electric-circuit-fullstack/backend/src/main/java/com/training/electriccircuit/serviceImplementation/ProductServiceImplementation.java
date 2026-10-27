package com.training.electriccircuit.serviceImplementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.training.electriccircuit.entity.Product;
import com.training.electriccircuit.repository.ProductRepository;
import com.training.electriccircuit.service.ProductService;

@Service
public class ProductServiceImplementation implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImplementation(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @SuppressWarnings("null")
	@Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @SuppressWarnings("null")
	@Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @SuppressWarnings("null")
	@Override
    public void deleteProduct(Long id) {

        productRepository.deleteById(id);

    }
    @Override
    public Product updateProduct(Long id, Product product) {

        Product existing = getProductById(id);

        if (existing != null) {

            existing.setName(product.getName());
            existing.setCategory(product.getCategory());
            existing.setPrice(product.getPrice());
            existing.setImage(product.getImage());
            existing.setDescription(product.getDescription());
            existing.setBrand(product.getBrand());
            existing.setStock(product.getStock());
            existing.setActive(product.isActive());

            return productRepository.save(existing);
        }

        return null;
    }

    @Override
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    @Override
    public List<Product> getProductsByBrand(String brand) {
        return productRepository.findByBrand(brand);
    }

    @Override
    public List<Product> getActiveProducts() {
        return productRepository.findByActiveTrue();
    }
}