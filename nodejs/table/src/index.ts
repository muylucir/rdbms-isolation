import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import { UserController } from './controllers/user.controller';
import { ProductController } from './controllers/product.controller';
import { OrderController } from './controllers/order.controller';
import { errorHandler } from './middlewares/error.middleware';
import { tenantMiddleware } from './middlewares/tenant.middleware';

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());

// Tenant middleware - Apply to all routes
app.use(tenantMiddleware);

// Routes
app.use('/api/users', UserController);
app.use('/api/products', ProductController);
app.use('/api/orders', OrderController);

// Error handling
app.use(errorHandler);

// Database connection and server start
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log('TypeORM connection error: ', error));