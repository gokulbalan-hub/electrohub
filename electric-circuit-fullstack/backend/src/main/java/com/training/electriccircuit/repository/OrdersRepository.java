package com.training.electriccircuit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.training.electriccircuit.entity.Orders;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {

    // User Order History
    List<Orders> findByUserId(Long userId);

    // Status Wise Orders
    List<Orders> findByOrderStatus(String orderStatus);

    // Payment Method Wise Orders
    List<Orders> findByPaymentMethod(String paymentMethod);
}