package com.multitenancy.hybrid.controller;

import com.multitenancy.hybrid.dto.OrderDTO;
import com.multitenancy.hybrid.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderDTO.Response>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO.Response> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDTO.SimpleResponse>> getOrdersByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<OrderDTO.Response> createOrder(
            @PathVariable Long userId,
            @Valid @RequestBody OrderDTO.Request orderRequest) {
        return ResponseEntity.ok(orderService.createOrder(userId, orderRequest));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderDTO.Response> updateOrderStatus(
            @PathVariable Long id,
            @Valid @RequestBody OrderDTO.StatusUpdateRequest statusRequest) {
        return orderService.updateOrderStatus(id, statusRequest)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}