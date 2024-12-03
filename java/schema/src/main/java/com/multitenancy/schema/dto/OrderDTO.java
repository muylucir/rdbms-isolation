package com.multitenancy.schema.dto;

import com.multitenancy.schema.utils.OrderStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDTO {

    @Getter
    @Setter
    public static class Request {
        @NotEmpty(message = "Order must contain at least one item")
        @Valid
        private List<OrderItemDTO.Request> orderItems;
    }

    @Getter
    @Setter
    public static class Response {
        private Long id;
        private UserDTO.Response user;
        private LocalDateTime orderDate;
        private BigDecimal totalAmount;
        private OrderStatus status;
        private List<OrderItemDTO.Response> orderItems;
    }

    @Getter
    @Setter
    public static class SimpleResponse {
        private Long id;
        private LocalDateTime orderDate;
        private BigDecimal totalAmount;
        private OrderStatus status;
    }

    @Getter
    @Setter
    public static class StatusUpdateRequest {
        @NotNull(message = "Order status is required")
        private OrderStatus status;
    }
}