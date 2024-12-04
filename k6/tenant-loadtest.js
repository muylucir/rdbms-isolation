import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

// Test configuration
export const options = {
  stages: [
    { duration: '1m', target: 50 }, // Ramp-up to 50 VUs (5 tenants * 10 VUs)
    { duration: '3m', target: 50 }, // Stay at 50 VUs
    { duration: '1m', target: 0 },  // Ramp-down to 0 VUs
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2s
    http_req_failed: ['rate<0.01'],    // Less than 1% of requests should fail
  },
};

// Test data
const BASE_URL = 'http://localhost:8081/api';
const TENANTS = ['tenant1', 'tenant2', 'tenant3', 'tenant4', 'tenant5'];
const PRODUCTS_PER_TENANT = 15;
const USERS_PER_TENANT = 5;

// Global variable to store test data
let globalTestData;

// Helper function to get random item from array
function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Setup function - runs once per k6 instance
export function setup() {
    const testData = {};

    // Setup data for each tenant
    for (const tenant of TENANTS) {
        const headers = {
            'Content-Type': 'application/json',
            'x-tenant-id': tenant,
        };

        testData[tenant] = {
            users: [],
            products: []
        };

        // Create users
        for (let i = 0; i < USERS_PER_TENANT; i++) {
            const userData = {
                username: `user_${tenant}_${i}`,
                email: `user_${tenant}_${i}@test.com`,
                password: 'password123'
            };

            const userResponse = http.post(`${BASE_URL}/users/signup`, JSON.stringify(userData), { headers });
            check(userResponse, { 'user created': (r) => r.status === 200 || r.status === 201 });

            if (userResponse.status === 200 || userResponse.status === 201) {
                testData[tenant].users.push(JSON.parse(userResponse.body));
            }
        }

        // Create products
        for (let i = 0; i < PRODUCTS_PER_TENANT; i++) {
            const productData = {
                name: `Product ${tenant} ${i}`,
                description: `Description for product ${i}`,
                price: 10000 + (i * 1000),
                stockQuantity: 100
            };

            const productResponse = http.post(`${BASE_URL}/products`, JSON.stringify(productData), { headers });
            check(productResponse, { 'product created': (r) => r.status === 200 || r.status === 201 });

            if (productResponse.status === 200 || productResponse.status === 201) {
                testData[tenant].products.push(JSON.parse(productResponse.body));
            }
        }
        
        console.log(`Setup completed for tenant: ${tenant}`);
        console.log(`Created ${testData[tenant].users.length} users`);
        console.log(`Created ${testData[tenant].products.length} products`);
    }

    return testData;
}

// VU code - runs in each VU
export default function(data) {
    // Determine tenant for this VU based on VU number
    const tenantIndex = __VU % TENANTS.length;
    const tenant = TENANTS[tenantIndex];
    const tenantData = data[tenant];
    
    const headers = {
        'Content-Type': 'application/json',
        'x-tenant-id': tenant,
    };

    group('API Tests', () => {
        // Get products
        group('Get Products', () => {
            const productsResponse = http.get(`${BASE_URL}/products`, { headers });
            check(productsResponse, {
                'get products status': (r) => r.status === 200,
                'get products count': (r) => JSON.parse(r.body).length > 0,
            });
        });

        // Search products
        group('Search Products', () => {
            const searchResponse = http.get(`${BASE_URL}/products/search?name=Product`, { headers });
            check(searchResponse, {
                'search products status': (r) => r.status === 200,
                'search products count': (r) => JSON.parse(r.body).length > 0,
            });
        });

        // Create order
        group('Create Order', () => {
            const user = randomItem(tenantData.users);
            const orderItems = [
                {
                    productId: randomItem(tenantData.products).id,
                    quantity: randomIntBetween(1, 5)
                },
                {
                    productId: randomItem(tenantData.products).id,
                    quantity: randomIntBetween(1, 5)
                }
            ];

            const orderResponse = http.post(
                `${BASE_URL}/orders/user/${user.id}`,
                JSON.stringify({ orderItems }),
                { headers }
            );

            check(orderResponse, {
                'create order status': (r) => r.status === 200 || r.status === 201,
                'order created with items': (r) => {
                    if (r.status !== 200 && r.status !== 201) return false;
                    const order = JSON.parse(r.body);
                    return order.orderItems && order.orderItems.length === 2;
                }
            });
        });

        // Get user orders
        group('Get User Orders', () => {
            const user = randomItem(tenantData.users);
            const ordersResponse = http.get(`${BASE_URL}/orders/user/${user.id}`, { headers });
            check(ordersResponse, {
                'get orders status': (r) => r.status === 200,
            });
        });
    });

    sleep(1);
}

// Teardown function - runs at the end of the test
export function teardown(data) {
    console.log('Test completed');
    // Print test summary
    for (const tenant of TENANTS) {
        console.log(`\nTenant: ${tenant}`);
        console.log(`Users created: ${data[tenant].users.length}`);
        console.log(`Products created: ${data[tenant].products.length}`);
    }
}