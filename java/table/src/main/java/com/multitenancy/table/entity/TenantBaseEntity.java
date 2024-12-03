package com.multitenancy.table.entity;

import com.multitenancy.table.config.TenantContextHolder;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

@Getter
@Setter
@MappedSuperclass
@FilterDef(
        name = "tenantFilter",
        parameters = @ParamDef(name = "tenantId", type = String.class)
)
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId")
public abstract class TenantBaseEntity {

    @Column(name = "tenant_id", nullable = false, updatable = false)
    private String tenantId;

    @PrePersist
    @PreUpdate
    public void prePersist() {
        if (tenantId == null) {
            tenantId = TenantContextHolder.getTenantId();
        }
    }
}