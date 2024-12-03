package com.multitenancy.schema.config;

import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Component
public class MultiTenantConnectionProviderImpl implements MultiTenantConnectionProvider {

    private final DataSource dataSource;

    public MultiTenantConnectionProviderImpl() {
        // 기본 생성자 추가
        this.dataSource = null;
    }

    @Autowired // 생성자 주입
    public MultiTenantConnectionProviderImpl(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // 기존 dataSource 사용 부분을 null check 추가
    @Override
    public Connection getAnyConnection() throws SQLException {
        if (dataSource == null) {
            throw new SQLException("DataSource is not initialized");
        }
        return dataSource.getConnection();
    }

    @Override
    public void releaseAnyConnection(Connection connection) throws SQLException {
        connection.close();
    }

    @Override
    public Connection getConnection(String tenantIdentifier) throws SQLException {
        final Connection connection = getAnyConnection();
        try {
            String tenantId = TenantContextHolder.getTenantId();
            if (tenantId == null) {
                tenantId = tenantIdentifier; // Fallback to tenantIdentifier if schema is not set
            }
            connection.createStatement().execute("SET search_path TO " + tenantId);
        } catch (SQLException e) {
            throw new SQLException("Could not alter JDBC connection to specified schema", e);
        }
        return connection;
    }

    @Override
    public void releaseConnection(String tenantIdentifier, Connection connection) throws SQLException {
        try {
            connection.createStatement().execute("SET search_path TO public");
        } catch (SQLException e) {
            // Log error
        }
        releaseAnyConnection(connection);
    }

    @Override
    public boolean supportsAggressiveRelease() {
        return false;
    }

    @Override
    public boolean isUnwrappableAs(Class unwrapType) {
        return false;
    }

    @Override
    public <T> T unwrap(Class<T> unwrapType) {
        return null;
    }
}