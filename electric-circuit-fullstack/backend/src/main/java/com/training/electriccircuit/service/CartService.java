package com.training.electriccircuit.service;
import com.training.electriccircuit.service.CartService;

import java.util.List;

import com.training.electriccircuit.entity.Cart;

public interface CartService {

    Cart saveCart(Cart cart);

    List<Cart> getCartByUserId(Long userId);

    void deleteCart(Long id);

    Cart getCartItem(Long userId, Long productId);

    long getCartCount(Long userId);

    void clearCart(Long userId);

    Double getCartTotal(Long userId);

    // New Methods
    Cart increaseQuantity(Long id);

    Cart decreaseQuantity(Long id);

}