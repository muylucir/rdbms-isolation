package com.multitenancy.hybrid.service;

import com.multitenancy.hybrid.dto.ProductDTO;
import com.multitenancy.hybrid.entity.Product;
import com.multitenancy.hybrid.mapper.ProductMapper;
import com.multitenancy.hybrid.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Transactional(readOnly = true)
    public List<ProductDTO.Response> getAllProducts() {
        return productRepository.findAll().stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<ProductDTO.Response> getProductById(Long id) {
        return productRepository.findById(id)
                .map(productMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public List<ProductDTO.SimpleResponse> searchProducts(String name) {
        return productRepository.findByNameContainingIgnoreCase(name).stream()
                .map(productMapper::toSimpleResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductDTO.Response createProduct(ProductDTO.Request productRequest) {
        Product product = productMapper.toEntity(productRequest);
        Product savedProduct = productRepository.save(product);
        return productMapper.toResponse(savedProduct);
    }

    @Transactional
    public Optional<ProductDTO.Response> updateProduct(Long id, ProductDTO.Request productRequest) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    productMapper.updateEntity(existingProduct, productRequest);
                    Product updatedProduct = productRepository.save(existingProduct);
                    return productMapper.toResponse(updatedProduct);
                });
    }

    // Internal method for order processing
    @Transactional(readOnly = true)
    public Product getProductEntityById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}