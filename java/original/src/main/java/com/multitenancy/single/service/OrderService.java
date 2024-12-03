package com.multitenancy.single.service;

import com.multitenancy.single.dto.OrderDTO;
import com.multitenancy.single.entity.Order;
import com.multitenancy.single.entity.OrderItem;
import com.multitenancy.single.entity.Product;
import com.multitenancy.single.entity.User;
import com.multitenancy.single.mapper.OrderMapper;
import com.multitenancy.single.repository.OrderRepository;
import com.multitenancy.single.utils.OrderStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;
    private final ProductService productService;
    private final OrderMapper orderMapper;

    @Transactional(readOnly = true)
    public List<OrderDTO.Response> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<OrderDTO.Response> getOrderById(Long id) {
        return orderRepository.findById(id)
                .map(orderMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public List<OrderDTO.SimpleResponse> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(orderMapper::toSimpleResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDTO.Response createOrder(Long userId, OrderDTO.Request orderRequest) {
        User user = userService.getUserEntityById(userId);
        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (var itemRequest : orderRequest.getOrderItems()) {
            Product product = productService.getProductEntityById(itemRequest.getProductId());

            OrderItem orderItem = orderMapper.createOrderItem(itemRequest, product);
            order.addOrderItem(orderItem);

            totalAmount = totalAmount.add(
                    orderItem.getPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity()))
            );

        }

        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);
        return orderMapper.toResponse(savedOrder);
    }

    @Transactional
    public Optional<OrderDTO.Response> updateOrderStatus(Long id, OrderDTO.StatusUpdateRequest statusRequest) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(statusRequest.getStatus());
                    Order updatedOrder = orderRepository.save(order);
                    return orderMapper.toResponse(updatedOrder);
                });
    }
}