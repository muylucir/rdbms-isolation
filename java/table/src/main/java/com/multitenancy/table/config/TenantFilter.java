package com.multitenancy.table.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class TenantFilter extends OncePerRequestFilter {

    private final EntityManagerFactory entityManagerFactory;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String tenantId = request.getHeader("x-tenant-id");
        if (tenantId == null) {
            throw new ServletException("Tenant ID not provided");
        }

        TenantContextHolder.setTenantId(tenantId);

        EntityManager em = entityManagerFactory.createEntityManager();
        try {
            org.hibernate.Session session = em.unwrap(org.hibernate.Session.class);
            session.enableFilter("tenantFilter").setParameter("tenantId", tenantId);

            filterChain.doFilter(request, response);
        } finally {
            TenantContextHolder.clear();
            em.close();
        }
    }
}