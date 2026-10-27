package com.training.electriccircuit.serviceImplementation;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.training.electriccircuit.entity.Orders;
import com.training.electriccircuit.repository.OrdersRepository;
import com.training.electriccircuit.service.CartService;
import com.training.electriccircuit.service.OrderService;

@Service
public class OrderServiceImplementation implements OrderService {

    private final OrdersRepository ordersRepository;
    private final CartService cartService;

    public OrderServiceImplementation(
            OrdersRepository ordersRepository,
            CartService cartService) {

        this.ordersRepository = ordersRepository;
        this.cartService = cartService;

    }

    @Override
    public Orders saveOrder(Orders order) {

        // Default Status
        if (order.getOrderStatus() == null ||
                order.getOrderStatus().isEmpty()) {

            order.setOrderStatus("PLACED");

        }

        // Save Order Date
        if (order.getOrderDate() == null) {

            order.setOrderDate(LocalDateTime.now());

        }

        // Save Status Updated Date
        order.setStatusUpdatedDate(LocalDateTime.now());

        Orders savedOrder = ordersRepository.save(order);

        // Clear User Cart
        cartService.clearCart(order.getUserId());

        return savedOrder;

    }
    @Override
    public List<Orders> getAllOrders() {

        return ordersRepository.findAll();

    }

    @SuppressWarnings("null")
	@Override
    public Orders getOrderById(Long id) {

        return ordersRepository
                .findById(id)
                .orElse(null);

    }

    @Override
    public List<Orders> getOrdersByUserId(Long userId) {

        return ordersRepository
                .findByUserId(userId);

    }

    @Override
    public Orders updateOrderStatus(
            Long id,
            String status) {

        @SuppressWarnings("null")
		Orders order = ordersRepository
                .findById(id)
                .orElse(null);

        if (order != null) {

            // Update Order Status
            order.setOrderStatus(status);

            // Update Status Changed Date
            order.setStatusUpdatedDate(
                    LocalDateTime.now());

            return ordersRepository.save(order);

        }

        return null;

    }
    @Override
    public List<Orders> getOrdersByStatus(String status) {

        return ordersRepository.findByOrderStatus(status);

    }

    @Override
    public List<Orders> getOrdersByPaymentMethod(String method) {

        return ordersRepository.findByPaymentMethod(method);

    }

    @SuppressWarnings("null")
	@Override
    public void deleteOrder(Long id) {

        ordersRepository.deleteById(id);

    }

    public CartService getCartService() {

        return cartService;

    }

}