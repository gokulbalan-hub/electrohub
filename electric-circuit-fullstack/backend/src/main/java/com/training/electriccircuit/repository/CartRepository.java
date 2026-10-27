package com.training.electriccircuit.repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.training.electriccircuit.entity.Cart;

@Repository

public interface CartRepository extends JpaRepository<Cart, Long> {

    // All cart items of a user
    List<Cart> findByUserId(Long userId);

    // Find specific product in user's cart
    Cart findByUserIdAndProductId(Long userId, Long productId);

    // Count cart items
    long countByUserId(Long userId);

    @Transactional
    @Modifying
    void deleteByUserId(Long userId);
    
}