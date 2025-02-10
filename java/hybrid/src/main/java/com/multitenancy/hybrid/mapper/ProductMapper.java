package com.multitenancy.hybrid.mapper;

import com.multitenancy.hybrid.dto.ProductDTO;
import com.multitenancy.hybrid.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public Product toEntity(ProductDTO.Request dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        return product;
    }

    public ProductDTO.Response toResponse(Product product) {
        ProductDTO.Response dto = new ProductDTO.Response();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        return dto;
    }

    public ProductDTO.SimpleResponse toSimpleResponse(Product product) {
        ProductDTO.SimpleResponse dto = new ProductDTO.SimpleResponse();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        return dto;
    }

    public void updateEntity(Product product, ProductDTO.Request dto) {
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
    }
}