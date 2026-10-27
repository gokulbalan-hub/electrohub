package com.training.electriccircuit.service;

import java.util.List;

import com.training.electriccircuit.entity.Orders;

public interface OrderService {

    Orders saveOrder(Orders order);

    List<Orders> getAllOrders();

    Orders getOrderById(Long id);

    List<Orders> getOrdersByUserId(Long userId);

    Orders updateOrderStatus(
            Long id,
            String status);

    List<Orders> getOrdersByStatus(
            String status);

    void deleteOrder(Long id);

	List<Orders> getOrdersByPaymentMethod(String method);
}