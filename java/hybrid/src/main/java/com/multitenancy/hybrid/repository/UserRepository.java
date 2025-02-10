package com.multitenancy.hybrid.repository;

import com.multitenancy.hybrid.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
}