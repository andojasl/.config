# Categorization of DBMS's

## Categorization based on data model

### Hierarchical DBMS's
Hierarchical DBMSs organize data in a tree-like structure, where each record has a single parent and many children. This model is akin to a family tree or an organizational chart.

- **Example:** Imagine an organizational structure where a CEO oversees several VPs, each VP oversees several managers, and each manager oversees several employees.

**Questions:**
1. What is a Hierarchical DBMS, and how is data structured in it?
2. Can you provide an example of a real-world application that would benefit from a hierarchical database model?
3. What are the advantages and disadvantages of using a Hierarchical DBMS?

### Network DBMS's
Network DBMSs allow for more complex relationships between data entities by using a graph structure. Records can have multiple parent and child records, forming a network of interconnected nodes.

- **Example:** A student can enroll in multiple courses, and each course can have multiple students.

**Questions:**
1. How does a Network DBMS differ from a Hierarchical DBMS in terms of data relationships?
2. Describe a scenario where a Network DBMS would be more beneficial than a Hierarchical DBMS.
3. What are the primary challenges in maintaining a Network DBMS?

### Relational DBMSs
Relational DBMSs store data in tables, with rows representing records and columns representing attributes. They use SQL for querying and maintaining the database.

- **Example:** A customer database where each customer has a record with attributes like ID, name, and address.

**Questions:**
1. Explain the structure of a Relational DBMS.
2. What is SQL, and how is it used in a Relational DBMS?
3. Name two popular Relational DBMSs.

### Object-oriented DBMSs
Object-oriented DBMSs store data in the form of objects, similar to object-oriented programming. They support complex data types and relationships.

- **Example:** A multimedia database where images, videos, and text are stored as objects with associated methods.

**Questions:**
1. What is an Object-oriented DBMS, and how does it store data?
2. How does an Object-oriented DBMS handle complex data types differently from a Relational DBMS?
3. What are the benefits of using an Object-oriented DBMS for multimedia applications?

### XML
XML databases store data in XML format, which is flexible and can represent complex hierarchical data.

- **Example:** A configuration file database where settings and preferences are stored in XML format.

**Questions:**
1. What is XML, and how is it used in databases?
2. Explain a use case where an XML database is preferable to a Relational DBMS.
3. What are the limitations of using XML databases?

### NoSQL
NoSQL databases are designed for high performance, scalability, and flexible data models, often used for big data and real-time web applications.

- **Example:** A social media platform that needs to store large volumes of unstructured data such as user posts, comments, and likes.

**Questions:**
1. What are NoSQL databases, and what types of data models do they support?
2. Why are NoSQL databases suitable for big data applications?
3. List and briefly describe the four main types of NoSQL databases.

## Categorization based on architecture

### Centralized architecture
Centralized DBMSs have all data stored in a single location, which can simplify management but can be a single point of failure.

- **Example:** A small business with a single server handling all its database needs.

**Questions:**
1. What is a centralized DBMS architecture, and what are its advantages?
2. Describe a scenario where a centralized DBMS might be a disadvantage.
3. How does a centralized architecture impact system scalability?

### Client-server architecture
Client-server DBMSs have multiple clients accessing a centralized server, distributing processing loads and improving performance.

- **Example:** A banking system where teller terminals (clients) access a central database server.

**Questions:**
1. Explain the client-server DBMS architecture.
2. What are the benefits of using a client-server architecture for a database system?
3. How does a client-server architecture handle multiple simultaneous requests?

### N-tier architecture
N-tier DBMSs use multiple layers (tiers) such as presentation, application, and data layers to improve scalability and manageability.

- **Example:** A web application with a user interface (presentation tier), business logic (application tier), and database (data tier).

**Questions:**
1. What are the main components of an N-tier DBMS architecture?
2. How does N-tier architecture enhance scalability?
3. Provide an example of how N-tier architecture can improve system manageability.

### Cloud DBMS architecture
Cloud DBMSs leverage cloud computing resources to provide scalable, flexible, and cost-effective database services.

- **Example:** Google Cloud SQL, which offers managed relational databases in the cloud.

**Questions:**
1. What is a Cloud DBMS, and how does it differ from traditional on-premises DBMS?
2. What are the advantages of using a Cloud DBMS?
3. Describe a use case where a Cloud DBMS would be ideal.

### Federated DBMS
Federated DBMSs integrate multiple autonomous databases into a single federated database, allowing unified access while maintaining local control.

- **Example:** An organization with separate databases for different departments that need to be queried together.

**Questions:**
1. What is a Federated DBMS, and how does it operate?
2. What are the benefits of using a Federated DBMS?
3. Explain a challenge associated with maintaining a Federated DBMS.

### In-memory DBMS
In-memory DBMSs store data in the main memory (RAM) rather than on disk, providing extremely fast data access and processing.

- **Example:** SAP HANA, which supports real-time analytics by storing data in-memory.

**Questions:**
1. How does an in-memory DBMS achieve high performance?
2. What are the potential downsides of using an in-memory DBMS?
3. Provide an example of an application that would benefit from an in-memory DBMS.

## Categorization based on usage

### On-line transaction processing (OLTP)
OLTP systems are designed for managing transaction-oriented applications, typically involving many short online transactions.

- **Example:** A retail point-of-sale system that processes customer purchases.

**Questions:**
1. What is OLTP, and what type of applications is it best suited for?
2. Describe the characteristics of an OLTP system.
3. How do OLTP systems ensure data integrity during concurrent transactions?

### On-line analytical processing (OLAP)
OLAP systems are used for complex queries and analysis of large volumes of data, often in data warehousing scenarios.

- **Example:** A business intelligence tool analyzing sales data to generate trends and forecasts.

**Questions:**
1. What is OLAP, and how does it differ from OLTP?
2. Explain the typical use cases for an OLAP system.
3. How do OLAP systems handle large volumes of data for analysis?

### Big Data & Analytics
Big Data systems handle vast amounts of unstructured and structured data, providing tools for storage, processing, and analysis.

- **Example:** Hadoop, an open-source framework for distributed storage and processing of large data sets.

**Questions:**
1. What is Big Data, and why is it important?
2. How do Big Data systems differ from traditional DBMSs?
3. Describe a scenario where Big Data analytics would be essential.

### Multimedia
Multimedia databases manage various types of media content such as images, audio, and video, providing specialized storage and retrieval mechanisms.

- **Example:** A digital asset management system storing and indexing large collections of photos and videos.

**Questions:**
1. What are multimedia databases, and what types of data do they handle?
2. Explain the challenges associated with managing multimedia data.
3. Provide an example of an application that would benefit from a multimedia database.

### Spatial applications
Spatial databases are designed to store and query data related to objects in space, such as geographic locations.

- **Example:** A geographic information system (GIS) that manages and analyzes spatial data.

**Questions:**
1. What is a spatial database, and what type of data does it manage?
2. How are spatial queries different from traditional database queries?
3. Describe a use case for a spatial database.

### Mobile
Mobile databases are optimized for mobile devices, offering offline capabilities and synchronization features for on-the-go access.

- **Example:** A mobile app that stores user data locally and syncs with a central server when connected.

**Questions:**
1. What are mobile databases, and how are they different from traditional databases?
2. Explain the challenges of managing databases on mobile devices.
3. How do mobile databases handle offline access and data synchronization?

### Open source
Open-source DBMSs are developed and maintained by communities and are freely available for use and modification.

- **Example:** MySQL, an open-source relational database management system.

**Questions:**
1. What are the benefits of using an open-source DBMS?
2. Name two popular open-source DBMSs and their primary use cases.
3. How does the open-source nature of a DBMS impact its development and support?

### Mixed variants
Mixed variant DBMSs combine features from multiple DBMS categories to provide hybrid solutions that cater to specific requirements.

- **Example:** A DBMS that supports both OLTP and OLAP workloads in a single system.

**Questions:**
1. What is a mixed variant DBMS, and why might it be used?
2. Provide an example of a scenario where a mixed variant DBMS would be beneficial.
3. What are the challenges of managing a mixed variant DBMS?

# NoSQL

## Introduction

### Four V's of Big Data
The Four V's of Big Data represent the key characteristics of big data: Volume, Variety, Velocity, and Veracity.

- **Volume:** The amount of data generated and stored.
- **Variety:** The different types of data (structured, unstructured, semi-structured).
- **Velocity:** The speed at which data is generated and processed.
- **Veracity:** The quality and accuracy of the data.

**Example:** Social media platforms generate large volumes of data (posts, images), in various formats (text, video), at high speed, and with varying accuracy.

**Questions:**
1. What are the Four V's of Big Data, and what does each represent?
2. How does the concept of "velocity" impact the design of a NoSQL database?
3. Why is "veracity" important in big data analytics?

### Scaling up Scaling down
Scaling up involves adding more resources to a single machine (vertical scaling), while scaling down refers to reducing resources as needed.

- **Example:** Adding more RAM to a server to handle increased database load.

**Questions:**
1. What is the difference between scaling up and scaling down?
2. Give an example of when you would need to scale up a database system.
3. What are the limitations of scaling up compared to scaling out?

### Scaling out
Scaling out involves adding more machines to a system (horizontal scaling) to distribute the load.

- **Example:** Adding more servers to a cluster to handle increased traffic for a web application.

**Questions:**
1. What is scaling out, and how does it differ from scaling up?
2. Provide an example of a system that benefits from scaling out.
3. What are the challenges of scaling out a database system?

### RDMS comes with problems too
RDBMSs can face challenges like performance bottlenecks, limited flexibility with unstructured data, and difficulties scaling out.

- **Example:** Handling a high volume of unstructured social media posts can be challenging for a traditional RDBMS.

**Questions:**
1. What are some common problems associated with RDBMSs?
2. Explain why RDBMSs might struggle with unstructured data.
3. How does scaling out differ in RDBMS compared to NoSQL databases?

### Other ways to scale RDBMS
Techniques such as sharding, partitioning, and replication can be used to scale RDBMSs horizontally.

- **Example:** Distributing customer records across multiple database servers to balance the load.

**Questions:**
1. What are some methods to scale RDBMSs horizontally?
2. How does sharding help in scaling an RDBMS?
3. Explain the concept of replication in the context of RDBMS scalability.

### Where to find such databases? In the world of NoSQL
NoSQL databases are often used in applications requiring high performance, scalability, and flexibility with unstructured data.

- **Example:** E-commerce websites using NoSQL databases to handle product catalogues and customer reviews.

**Questions:**
1. What types of applications are best suited for NoSQL databases?
2. Why might a company choose NoSQL over a traditional RDBMS?
3. List two examples of NoSQL databases and their typical use cases.

### NoSQL on distribution
NoSQL databases often distribute data across multiple nodes, improving fault tolerance and scalability.

- **Example:** Cassandra, which distributes data across a cluster of nodes for high availability.

**Questions:**
1. How do NoSQL databases handle data distribution?
2. Explain the benefits of distributing data across multiple nodes in a NoSQL database.
3. What challenges can arise from data distribution in NoSQL databases?

### NoSQL on performance and flexibility
NoSQL databases are designed for high performance and flexibility, often allowing schema-less data models and supporting various data formats.

- **Example:** A document store like MongoDB allows dynamic schemas, making it flexible to store different types of documents.

**Questions:**
1. How does the performance of NoSQL databases compare to traditional RDBMSs?
2. What is meant by schema-less data models in NoSQL databases?
3. Provide an example of how NoSQL databases offer flexibility in data storage.

## CAP Theorem

### Consistency Availability Partition-tolerance
The CAP theorem states that in the presence of a network partition, a distributed system can only guarantee two out of the three properties: Consistency, Availability, and Partition-tolerance.

- **Consistency:** Every read receives the most recent write.
- **Availability:** Every request receives a response, regardless of the success.
- **Partition-tolerance:** The system continues to operate despite network partitions.

**Example:** A distributed database must choose between being consistent (ensuring data uniformity) or available (ensuring responsiveness) when network issues occur.

**Questions:**
1. What are the three components of the CAP theorem?
2. Explain how a distributed system can achieve consistency but may sacrifice availability.
3. Provide an example of a system that prioritizes availability over consistency.

### Which possibilities are there and why? (CP, AP, CA)
Depending on their requirements, systems can be:
- **CP:** Consistent and Partition-tolerant (e.g., traditional RDBMS)
- **AP:** Available and Partition-tolerant (e.g., DynamoDB)
- **CA:** Consistent and Available (not possible during a partition)

**Questions:**
1. What does a CP system prioritize, and why might it be chosen?
2. How does an AP system handle network partitions?
3. Why is CA not possible during a partition according to the CAP theorem?

### Consistency and availability
In distributed systems, consistency ensures all nodes have the same data at the same time, while availability ensures every request receives a response.

**Questions:**
1. What is the trade-off between consistency and availability in distributed systems?
2. Provide an example of a system that prioritizes consistency.
3. How can availability impact user experience in distributed systems?

### Types of consistency
Different levels of consistency can be implemented, such as strong consistency, eventual consistency, and causal consistency.

- **Example:** Eventual consistency in a NoSQL database ensures that all nodes will eventually have the same data, though not immediately.

**Questions:**
1. What are the different types of consistency in distributed systems?
2. How does eventual consistency differ from strong consistency?
3. Provide a scenario where eventual consistency is acceptable.

### Eventual consistency
Eventual consistency means that updates will propagate to all nodes, and all replicas will become consistent over time.

**Questions:**
1. What is eventual consistency, and how does it work?
2. Explain a use case where eventual consistency is sufficient.
3. What are the challenges of implementing eventual consistency in a distributed system?

### Dynamic tradeoff between C and A
Systems may dynamically adjust between consistency and availability based on current network conditions or user requirements.

**Questions:**
1. How can systems dynamically trade off between consistency and availability?
2. Provide an example of a scenario where a system might shift towards availability.
3. Why is it important to manage the trade-off between consistency and availability dynamically?

### Tradeoff between Consistency and Latency of Networks
Increasing consistency often leads to higher latency because ensuring uniformity across nodes can delay responses.

**Questions:**
1. How does consistency affect network latency in distributed systems?
2. Why might a system choose to reduce consistency to lower latency?
3. Provide an example of a system where low latency is more critical than consistency.

### From CAP To PACELC
The PACELC theorem extends CAP by stating that in the presence of a network partition, a distributed system can prioritize either Availability or Consistency, and in the absence of a partition, it must balance Latency and Consistency.

**Questions:**
1. What does the PACELC theorem add to the CAP theorem?
2. Explain how PACELC affects the design choices in distributed systems.
3. Provide an example of a system that optimizes for availability during a partition and latency otherwise.

# Examples:

## PA/EL Systems: Give up both Cs for availability and lower latency
- **Dynamo**
- **Cassandra**
- **Riak**

## PC/EC Systems: Refuse to give up consistency and pay the cost of availability and latency
- **BigTable**
- **Hbase**
- **VoltDB/H-Store**

## PA/EC Systems: Give up consistency when a partition happens and keep consistency in normal operations
- **MongoDB**

## PC/EL System: Keep consistency if a partition occurs but gives up consistency for latency in normal operations
- **Yahoo! PNUTS** (former NoSQL platform by Yahoo!)

# NoSQL DBMS Overview

## Common Classification
- **Column Store or Column-oriented DBMS**
- **Document Store or Document-oriented DBMS**
- **Key-value Store/DBMS**
- **Graph DBMS**
- **Graph vs Relational DBMS**
- **MongoDB vs Relational Database**

# Physical Storage and Indexing

## Disk Structure

### Single Level Indexes
- **Single Level Ordered Indexes**
- **Types of Single-level Ordered Indexes**
  - **Primary Indexes**
  - **Clustered Index**
  - **Secondary Index**

### Multi-level Indexes
- **Dynamic Multi-level Indexes**
- **Tree Terminology**
- **Search Tree**
- **[B-tree Introduction](https://www.youtube.com/watch?v=C_q5ccN84C8)**
- **[Motivation for B-trees](https://www.youtube.com/watch?v=aZjYr87r1b8)**
- **B-trees**
- **[B+ Trees](https://www.youtube.com/watch?v=2q9UYVLSNeI&t=16s)**
- **B+-trees**

### Indexes in SQL
- **(Postgre)SQL and Indexing**
- **Other Indexes in PostgreSQL**
- **Why Use or Revise Indexes?**
- **How to Determine Good Indexes**
- **Query Plan and Effective Execution Time**

# Query Processing & Optimization

## Writes / Reads: Why Do We Have to Look into That?

## Execution of Queries
- **Algorithms for a SELECT**
- **Algorithms for a JOIN Operation**
- **Sort-Merge Algorithm for JOIN Operation**
- **Algorithm for PROJECTION**

## Transformation of SQL into Query Trees

## Optimization of Query Trees
- **Heuristic Optimization (All Steps)**
- **Cost-based Optimization**
  - **Costs**
  - **Catalog Information**
  - **What is Used in DBMSs? A Good Mix**

### Short Summary:
Query optimization determines the most efficient way to execute a given query. Performance is an issue because handling large tables exceeds the space in the main memory, necessitating a lot of reshuffling (many read/write operations) of records between disk storage and main memory. A query can be executed through different algorithms (sorts, merges, joins, etc.) or rewritten in different forms and structures. Hence, query optimization is essential to determine the most optimal pathway. This is done by applying heuristics to query plans (query trees) or cost-based optimization of query plans or both. Heuristics are rules for transforming a query tree. Cost-based optimization calculates costs of a query tree and algorithms by using statistics about the size and structure of tables.

# Transaction Processing & Concurrency Control

## Transaction Processing Concepts and Theory
- **Desirable Properties of Transactions**
- **Execution of Transactions (TXNs)**
- **Concurrent Execution of Transactions**
- **Problems When Concurrent Execution Is Not Controlled**
- **Who Is Responsible?**
- **Serializable Schedules**
- **What Do We Gain with Serializable Schedules?**

## Concurrency Control Protocols
- **How to Ensure Serializable Schedules**
- **Two-phase Locking (TPL)**
- **Timestamping**

## Further Issues in Concurrency Control
- **Granularity**
- **Concurrency Control and Indexes**
- **Comparing Protocols in Number of Rollbacks and Waits**
- **Comparing Concurrency Control Protocols**
- **Weighing Correctness (Full Isolation) and Performance**

### Short Summary:
The concept of transaction provides a mechanism for describing logical units of database processing. Transaction processing systems must handle large databases and numerous concurrent users. Execution of concurrent transactions can cause problems such as dirty reads. To prevent these issues and ensure transactions run correctly, the system must guarantee certain properties: atomicity, consistency, isolation, durability. A concurrency control subsystem must maintain these properties by ordering transaction operations in schedules that must be serializable. Different protocols for creating schedules are used for concurrency control, such as two-phase locking and timestamping. The granularity of database items used in these protocols influences potential deadlocks and starvation. Index handling also needs consideration for performance in concurrency control.

# Recovery Techniques

## Who Is Responsible?
- **ACID**
- **State (Transition) Diagram of Transactions**
- **Why Recovery?**
- **How Does the System Know at Restart Time Which Transactions Are to Be Undone and Which Ones to Be Redone?**

## Deferred Update Policy for Recovery
- **Rollback and Recovery for Deferred-Update (Single Transaction)**

## Other Policies: Immediate-update and Shadow Paging
- **Immediate-update Policy**
- **Shadow Paging**
- **System Failure (with Deferred-update)**

## Wrap-up on Transaction Processing, Concurrency Control, and Recovery
- **Who Is Responsible?**
- **DBMS Components and Functions**

### Short Summary:
The concept of transaction provides a mechanism for describing logical units of database processing. Transaction processing systems must handle large databases and many concurrent users. Execution of concurrent transactions can cause problems such as dirty reads. To avoid these issues and ensure correct transaction execution, the system must guarantee atomicity, consistency, isolation, durability. A concurrency control subsystem must maintain isolation. The main goal of recovery is to ensure transaction atomicity and durability of committed data changes. If a transaction fails before completing its execution (explicit rollback, abortion by concurrency control system, system failure), the recovery mechanism ensures no lasting effects. In case of implicit abortion or system failure, the recovery system handles restart/redoing transactions. Recovery techniques are based on the atomicity property of transactions.

# Advanced SQL

## Group By
- **Querying with GROUP BY Clause**

## OLAP with SQL
- **Online Analytical Processing (OLAP)**
- **ROLLUP**
- **More Customization: GROUPING SETS**
- **CUBE**

## Window Functions
- **Control the Order in Which Rows Are Processed by Window Functions**
- **Window Function Without Partition (and Without Order of Processing)**
- **Window Function Without Partition with Order of Processing**
- **More General-purpose Window Functions**

## Common Table Expressions
- **Subqueries**
- **Common Table Expression (CTE)**
- **Recursive CTE**
- **Querying Hierarchical Data in a Relational Database**
- **The Need for Recursive CTEs: Looking Up Ancestors**
