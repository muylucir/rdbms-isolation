# Tenant isolation strategy for relational databases in SaaS

Let's take a look at data isolation strategies, one of the most important architectural decisions in SaaS applications. In particular, we will take an in-depth look at the two most widely used approaches: table-level isolation and schema-level isolation.

# Why Data Isolation Matters?
The biggest challenges faced when developing SaaS applications are as follows.

- Securely isolate and efficiently manage data from multiple customers (tenants)
- Need to use cost-effective resources for each tenant
- Implement an architecture that can scale as the number of tenants increases
- Ensure ease of development and maintenance

# What We'll Cover
The following topics will be covered at this workshop.

### Discriminator Column Approach

- Data isolation through the tenant_id column
- Implementation patterns
- Implementation methods as seen in actual code


### Separate Schema Approach

- Independent schema management for each tenant
- Dynamic schema switching mechanism
- Implementation examples and patterns



# What You'll Learn
After the workshop, you will be able to do the following.

- Understand the pros and cons of the two data isolation methods and choose the right method for your project.
- Understand the security considerations for each method.
- Develop a performance optimization strategy.
- Learn operational know-how in a real production environment.


# What You need

- Basic knowledge of one of the following programming languages: JAVA, Node.js, or Python.
- Basic knowledge of Amazon Aurora is required.

# Notes

Running this workshop on your personal AWS Account may incur additional costs.

Now, let's take a closer look at the core of SaaS applications: multi-tenancy data isolation strategies. You will learn how to choose the approach that best suits your situation by comparing the pros and cons of each method with actual code.
Let's get started!
