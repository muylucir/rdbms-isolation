package com.multitenancy.table.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

public class OrderItemDTO {

    @Getter
    @Setter
    public static class Request {
        @NotNull(message = "Product ID is required")
        private Long productId;

        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Quantity must be at least 1")
        private Integer quantity;
    }

    @Getter
    @Setter
    public static class Response {
        private Long id;
        private ProductDTO.SimpleResponse product;
        private Integer quantity;
        private BigDecimal price;
        private BigDecimal subtotal;
    }
}