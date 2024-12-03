package com.multitenancy.table.config;

import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class TenantFilterConfiguration {

    private final EntityManagerFactory entityManagerFactory;

    @Bean
    public FilterRegistrationBean<TenantFilter> tenantFilter() {
        FilterRegistrationBean<TenantFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new TenantFilter(entityManagerFactory));
        registrationBean.addUrlPatterns("/api/*");
        return registrationBean;
    }
}