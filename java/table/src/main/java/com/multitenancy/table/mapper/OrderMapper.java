package com.multitenancy.table.mapper;

import com.multitenancy.table.dto.OrderDTO;
import com.multitenancy.table.dto.OrderItemDTO;
import com.multitenancy.table.entity.Order;
import com.multitenancy.table.entity.OrderItem;
import com.multitenancy.table.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderMapper {

    private final UserMapper userMapper;
    private final ProductMapper productMapper;

    public OrderItemDTO.Response toOrderItemResponse(OrderItem orderItem) {
        OrderItemDTO.Response dto = new OrderItemDTO.Response();
        dto.setId(orderItem.getId());
        dto.setProduct(productMapper.toSimpleResponse(orderItem.getProduct()));
        dto.setQuantity(orderItem.getQuantity());
        dto.setPrice(orderItem.getPrice());
        dto.setSubtotal(orderItem.getPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity())));
        return dto;
    }

    public OrderItem createOrderItem(OrderItemDTO.Request dto, Product product) {
        OrderItem orderItem = new OrderItem();
        orderItem.setProduct(product);
        orderItem.setQuantity(dto.getQuantity());
        orderItem.setPrice(product.getPrice());
        return orderItem;
    }

    public OrderDTO.Response toResponse(Order order) {
        OrderDTO.Response dto = new OrderDTO.Response();
        dto.setId(order.getId());
        dto.setUser(userMapper.toResponse(order.getUser()));
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setOrderItems(order.getOrderItems().stream()
                .map(this::toOrderItemResponse)
                .collect(Collectors.toList()));
        return dto;
    }

    public OrderDTO.SimpleResponse toSimpleResponse(Order order) {
        OrderDTO.SimpleResponse dto = new OrderDTO.SimpleResponse();
        dto.setId(order.getId());
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        return dto;
    }
}