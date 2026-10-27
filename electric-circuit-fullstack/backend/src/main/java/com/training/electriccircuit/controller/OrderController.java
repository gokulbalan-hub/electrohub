package com.training.electriccircuit.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.training.electriccircuit.entity.Orders;
import com.training.electriccircuit.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
public class OrderController {

    private final OrderService orderService;

    public OrderController(
            OrderService orderService) {

        this.orderService = orderService;
    }

    // Place Order
    @PostMapping("/place")
    public Orders placeOrder(
            @RequestBody Orders order) {

        if(order.getOrderStatus() == null) {

            order.setOrderStatus(
                    "PLACED");
        }

        return orderService
                .saveOrder(order);
    }

    // Get All Orders
    @GetMapping("/all")
    public List<Orders> getAllOrders() {

        return orderService
                .getAllOrders();
    }

    // Get Order By Id
    @GetMapping("/{id}")
    public Orders getOrderById(
            @PathVariable Long id) {

        return orderService
                .getOrderById(id);
    }

    // Get Orders By User Id
    @GetMapping("/user/{userId}")
    public List<Orders> getOrdersByUserId(
            @PathVariable Long userId) {

        return orderService
                .getOrdersByUserId(
                        userId);
    }

    // Update Order Status
    @PutMapping("/status/{id}")
    public Orders updateOrderStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return orderService
                .updateOrderStatus(
                        id,
                        status);
    }

    // Get Orders By Status
    @GetMapping("/status/{status}")
    public List<Orders> getOrdersByStatus(
            @PathVariable String status) {

        return orderService
                .getOrdersByStatus(
                        status);
    }

    // Delete Order
    @DeleteMapping("/{id}")
    public String deleteOrder(
            @PathVariable Long id) {

        orderService.deleteOrder(id);

        return "Order Deleted Successfully";
    }
}