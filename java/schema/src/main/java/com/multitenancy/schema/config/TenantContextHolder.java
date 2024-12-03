package com.multitenancy.schema.config;

import org.springframework.util.StringUtils;

public final class TenantContextHolder {
    private static final ThreadLocal<String> CONTEXT = new ThreadLocal<>();
    private static final String DEFAULT_TENANT_ID = "public";

    private TenantContextHolder() {

    }

    public static void setTenantId(String tenantId) {
        if (StringUtils.hasText(tenantId)) {
            CONTEXT.set(tenantId);
        } else {
            clear();
        }
    }

    public static String getTenantId() {
        String tenantId = CONTEXT.get();
        return StringUtils.hasText(tenantId) ? tenantId : DEFAULT_TENANT_ID;
    }

    public static void clear() {
        CONTEXT.remove();
    }

    public static boolean hasTenant() {
        return StringUtils.hasText(CONTEXT.get());
    }
}