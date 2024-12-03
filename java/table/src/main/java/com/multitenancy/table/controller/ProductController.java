package com.multitenancy.table.controller;

import com.multitenancy.table.dto.ProductDTO;
import com.multitenancy.table.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO.Response>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO.Response> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO.SimpleResponse>> searchProducts(@RequestParam String name) {
        return ResponseEntity.ok(productService.searchProducts(name));
    }

    @PostMapping
    public ResponseEntity<ProductDTO.Response> createProduct(@Valid @RequestBody ProductDTO.Request productRequest) {
        return ResponseEntity.ok(productService.createProduct(productRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO.Response> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductDTO.Request productRequest) {
        return productService.updateProduct(id, productRequest)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}