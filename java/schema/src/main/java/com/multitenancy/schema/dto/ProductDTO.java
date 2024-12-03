package com.multitenancy.schema.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

public class ProductDTO {

    @Getter
    @Setter
    public static class Request {
        @NotBlank(message = "Product name is required")
        @Size(min = 3, max = 100, message = "Product name must be between 3 and 100 characters")
        private String name;

        @Size(max = 500, message = "Description cannot exceed 500 characters")
        private String description;

        @NotNull(message = "Price is required")
        @Min(value = 0, message = "Price must be greater than or equal to 0")
        private BigDecimal price;

    }

    @Getter
    @Setter
    public static class Response {
        private Long id;
        private String name;
        private String description;
        private BigDecimal price;
    }

    @Getter
    @Setter
    public static class SimpleResponse {
        private Long id;
        private String name;
        private BigDecimal price;
    }
}