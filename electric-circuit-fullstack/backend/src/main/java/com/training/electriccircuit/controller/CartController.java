package com.training.electriccircuit.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.training.electriccircuit.entity.Cart;
import com.training.electriccircuit.service.CartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {
        return cartService.saveCart(cart);
    }

    @GetMapping("/{userId}")
    public List<Cart> getCart(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    @GetMapping("/count/{userId}")
    public long getCartCount(@PathVariable Long userId) {
        return cartService.getCartCount(userId);
    }

    @GetMapping("/total/{userId}")
    public Double getCartTotal(@PathVariable Long userId) {
        return cartService.getCartTotal(userId);
    }

    @PutMapping("/increase/{id}")
    public Cart increaseQuantity(@PathVariable Long id) {
        return cartService.increaseQuantity(id);
    }

    @PutMapping("/decrease/{id}")
    public Cart decreaseQuantity(@PathVariable Long id) {
        return cartService.decreaseQuantity(id);
    }

    @DeleteMapping("/clear/{userId}")
    public String clearCart(@PathVariable Long userId) {

        cartService.clearCart(userId);

        return "Cart Cleared Successfully";
    }

    @DeleteMapping("/{id}")
    public String removeCart(@PathVariable Long id) {

        cartService.deleteCart(id);

        return "Cart Item Deleted Successfully";
    }

}