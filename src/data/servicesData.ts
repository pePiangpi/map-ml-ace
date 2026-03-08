export interface ServiceInfo {
  id: string;
  name: string;
  layer: string;
  layerColor: string;
  simple: string;
  exam: string;
  whenToUse: string;
  examTrap: string;
  alternatives: string[];
  quiz: { question: string; options: string[]; correct: number; explanation: string };
}

export const servicesData: Record<string, ServiceInfo> = {
  // LAYER 1 - Data Sources
  'applications': { id: 'applications', name: 'Applications', layer: 'Data Sources', layerColor: 'node-data',
    simple: 'Apps on your phone or computer that create data when you use them — like clicking buttons or filling forms.',
    exam: 'Application-generated data includes transactional records, user interaction logs, and API event streams from production systems.',
    whenToUse: 'When your ML model needs to learn from how users interact with your software.',
    examTrap: 'Don\'t confuse application logs with CloudTrail logs. CloudTrail tracks AWS API calls, not application-level events.',
    alternatives: ['CloudTrail', 'CloudWatch Logs'],
    quiz: { question: 'What type of data do applications typically generate for ML?', options: ['Only images', 'Transactional and interaction data', 'Only audio files', 'Hardware metrics'], correct: 1, explanation: 'Applications generate transactional records, clickstream data, and user interaction logs.' }
  },
  'databases': { id: 'databases', name: 'Databases', layer: 'Data Sources', layerColor: 'node-data',
    simple: 'Think of databases like organized filing cabinets where companies store all their important information.',
    exam: 'Relational (RDS, Aurora) and NoSQL (DynamoDB, DocumentDB) databases serve as primary data sources for ML feature extraction.',
    whenToUse: 'When you need structured historical data for training ML models.',
    examTrap: 'RDS is for relational data; DynamoDB is for key-value. Don\'t mix them up on the exam.',
    alternatives: ['Amazon RDS', 'DynamoDB', 'DocumentDB'],
    quiz: { question: 'Which database is best for key-value lookups at scale?', options: ['Amazon RDS', 'Amazon DynamoDB', 'Amazon Redshift', 'Amazon Aurora'], correct: 1, explanation: 'DynamoDB is designed for key-value and document data with single-digit millisecond performance.' }
  },
  'iot-devices': { id: 'iot-devices', name: 'IoT Devices', layer: 'Data Sources', layerColor: 'node-data',
    simple: 'Smart devices like thermostats, fitness trackers, or factory sensors that constantly send data about the real world.',
    exam: 'IoT devices transmit telemetry data via MQTT/HTTP to AWS IoT Core, which can route to Kinesis or S3 for ML processing.',
    whenToUse: 'When building predictive maintenance, anomaly detection, or real-time monitoring ML models.',
    examTrap: 'AWS IoT Core handles device communication. IoT Analytics is for analyzing IoT data. Don\'t confuse them.',
    alternatives: ['AWS IoT Core', 'AWS IoT Analytics', 'AWS IoT Greengrass'],
    quiz: { question: 'What protocol do IoT devices commonly use to send data?', options: ['FTP', 'MQTT', 'SMTP', 'POP3'], correct: 1, explanation: 'MQTT is a lightweight messaging protocol ideal for IoT devices with limited bandwidth.' }
  },
  'streaming': { id: 'streaming', name: 'Streaming Data', layer: 'Data Sources', layerColor: 'node-data',
    simple: 'Data that flows continuously like a river — social media feeds, stock prices, or live sensor readings.',
    exam: 'Streaming data sources produce unbounded, time-ordered event sequences requiring real-time ingestion via Kinesis or MSK.',
    whenToUse: 'When your ML model needs to make predictions on fresh, continuously arriving data.',
    examTrap: 'Streaming ≠ batch. If the exam says "real-time," think Kinesis. If it says "scheduled," think Glue/EMR.',
    alternatives: ['Kinesis', 'MSK', 'Apache Flink'],
    quiz: { question: 'What makes streaming data different from batch data?', options: ['It\'s larger', 'It arrives continuously', 'It\'s always structured', 'It\'s stored in S3'], correct: 1, explanation: 'Streaming data is continuous and unbounded, unlike batch data which is finite and processed periodically.' }
  },

  // LAYER 2 - Data Storage
  's3': { id: 's3', name: 'Amazon S3', layer: 'Data Storage', layerColor: 'node-storage',
    simple: 'S3 is like an infinite cloud locker where you can store any file — photos, videos, CSVs, anything. It\'s the #1 storage for ML.',
    exam: 'Amazon S3 is an object storage service offering industry-leading scalability, data availability, and security. It\'s the default data lake for SageMaker training jobs.',
    whenToUse: 'Almost always. S3 is the central data lake for ML pipelines — training data, model artifacts, and outputs.',
    examTrap: 'S3 is object storage, not block storage (EBS) or file storage (EFS). Know the difference for the exam.',
    alternatives: ['EFS', 'FSx', 'EBS'],
    quiz: { question: 'What type of storage is Amazon S3?', options: ['Block storage', 'File storage', 'Object storage', 'Database storage'], correct: 2, explanation: 'S3 is object storage, storing data as objects in buckets with unique keys.' }
  },
  'redshift': { id: 'redshift', name: 'Amazon Redshift', layer: 'Data Storage', layerColor: 'node-storage',
    simple: 'Redshift is like a super-fast calculator for huge spreadsheets. It can crunch billions of rows in seconds.',
    exam: 'Amazon Redshift is a fully managed petabyte-scale data warehouse using columnar storage and massively parallel processing (MPP).',
    whenToUse: 'When you need to run complex analytical queries on structured data before feeding it to ML models.',
    examTrap: 'Redshift is for analytics (OLAP), not transactions (OLTP). Use RDS/Aurora for OLTP workloads.',
    alternatives: ['Amazon Athena', 'Amazon EMR'],
    quiz: { question: 'What storage format does Redshift use?', options: ['Row-based', 'Columnar', 'Document', 'Graph'], correct: 1, explanation: 'Redshift uses columnar storage for efficient analytical query performance.' }
  },
  'dynamodb': { id: 'dynamodb', name: 'Amazon DynamoDB', layer: 'Data Storage', layerColor: 'node-storage',
    simple: 'DynamoDB is like a super-fast lookup table. You give it a key, and it instantly gives back the value.',
    exam: 'Amazon DynamoDB is a fully managed NoSQL database providing single-digit millisecond performance at any scale with key-value and document data models.',
    whenToUse: 'For real-time feature lookups in ML inference pipelines where low latency is critical.',
    examTrap: 'DynamoDB is NoSQL — no JOINs, no complex queries. If the exam mentions complex queries, think Redshift or RDS.',
    alternatives: ['Amazon ElastiCache', 'Amazon DocumentDB'],
    quiz: { question: 'When should you use DynamoDB for ML?', options: ['Complex analytical queries', 'Real-time feature lookups', 'Data warehousing', 'File storage'], correct: 1, explanation: 'DynamoDB excels at low-latency key-value lookups needed during real-time inference.' }
  },
  'rds': { id: 'rds', name: 'Amazon RDS', layer: 'Data Storage', layerColor: 'node-storage',
    simple: 'RDS is a managed relational database — like having a perfectly organized spreadsheet that AWS takes care of for you.',
    exam: 'Amazon RDS is a managed relational database service supporting MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server engines.',
    whenToUse: 'When your ML training data lives in relational format with complex relationships between tables.',
    examTrap: 'RDS is for OLTP. For OLAP/analytics, use Redshift. For serverless relational, consider Aurora Serverless.',
    alternatives: ['Aurora', 'Redshift'],
    quiz: { question: 'RDS is best suited for which workload type?', options: ['OLAP', 'OLTP', 'Streaming', 'Object storage'], correct: 1, explanation: 'RDS is designed for Online Transaction Processing (OLTP) workloads.' }
  },
  'aurora': { id: 'aurora', name: 'Amazon Aurora', layer: 'Data Storage', layerColor: 'node-storage',
    simple: 'Aurora is like a turbocharged version of RDS — same concept but 5x faster and auto-scales.',
    exam: 'Amazon Aurora is a MySQL/PostgreSQL-compatible relational database with up to 5x throughput improvement and automatic storage scaling up to 128TB.',
    whenToUse: 'When you need high-performance relational data for ML with automatic scaling.',
    examTrap: 'Aurora Serverless v2 scales to zero — useful for intermittent ML data extraction workloads.',
    alternatives: ['RDS', 'Redshift'],
    quiz: { question: 'How much faster is Aurora compared to standard MySQL?', options: ['2x', '3x', '5x', '10x'], correct: 2, explanation: 'Aurora provides up to 5x throughput of standard MySQL.' }
  },
  'efs': { id: 'efs', name: 'Amazon EFS', layer: 'Data Storage', layerColor: 'node-storage',
    simple: 'EFS is like a shared folder that multiple computers can access at the same time — great for team projects.',
    exam: 'Amazon EFS provides scalable, elastic NFS file storage for use with AWS services and on-premises resources. Supports POSIX-compliant shared access.',
    whenToUse: 'When multiple SageMaker training instances need shared access to the same training data simultaneously.',
    examTrap: 'EFS is file storage (NFS), not object storage (S3). Use EFS when you need POSIX file system semantics.',
    alternatives: ['FSx for Lustre', 'S3'],
    quiz: { question: 'What protocol does EFS use?', options: ['HTTP', 'NFS', 'SMB', 'FTP'], correct: 1, explanation: 'EFS uses the NFS (Network File System) protocol for shared file access.' }
  },
  'fsx': { id: 'fsx', name: 'Amazon FSx', layer: 'Data Storage', layerColor: 'node-storage',
    simple: 'FSx for Lustre is like a super-fast highway for data — built for high-performance computing and ML training.',
    exam: 'Amazon FSx for Lustre provides a high-performance file system optimized for fast processing of workloads. Integrates natively with S3.',
    whenToUse: 'When SageMaker training jobs need high-throughput, low-latency access to large training datasets stored in S3.',
    examTrap: 'FSx for Lustre is for HPC/ML workloads. FSx for Windows is for Windows file shares. Don\'t confuse them.',
    alternatives: ['EFS', 'S3'],
    quiz: { question: 'FSx for Lustre integrates natively with which service?', options: ['DynamoDB', 'RDS', 'S3', 'Redshift'], correct: 2, explanation: 'FSx for Lustre can automatically sync data with S3 buckets.' }
  },
  'opensearch': { id: 'opensearch', name: 'Amazon OpenSearch', layer: 'Data Storage', layerColor: 'node-storage',
    simple: 'OpenSearch is like a super-powered search engine for your data — find anything in milliseconds.',
    exam: 'Amazon OpenSearch Service is a managed service for search and analytics. Supports full-text search, log analytics, and vector search for ML.',
    whenToUse: 'For ML use cases involving semantic search, log analysis, or vector similarity search (RAG patterns).',
    examTrap: 'OpenSearch supports k-NN vector search — relevant for retrieval-augmented generation (RAG) architectures.',
    alternatives: ['Amazon Kendra', 'CloudWatch Logs'],
    quiz: { question: 'What ML-relevant feature does OpenSearch support?', options: ['Model training', 'k-NN vector search', 'Auto-scaling', 'Data encryption'], correct: 1, explanation: 'OpenSearch supports k-NN vector search, essential for similarity search and RAG patterns.' }
  },
  'timestream': { id: 'timestream', name: 'Amazon Timestream', layer: 'Data Storage', layerColor: 'node-storage',
    simple: 'Timestream is built for data that has timestamps — like temperature readings every second or stock prices every minute.',
    exam: 'Amazon Timestream is a fast, scalable, serverless time-series database for IoT and operational applications.',
    whenToUse: 'When building ML models on time-series data like IoT sensor readings, application metrics, or financial data.',
    examTrap: 'Use Timestream for time-series, not DynamoDB. The exam tests whether you know the right database for the data type.',
    alternatives: ['DynamoDB', 'RDS'],
    quiz: { question: 'What type of data is Timestream optimized for?', options: ['Graph data', 'Time-series data', 'Document data', 'Key-value data'], correct: 1, explanation: 'Timestream is purpose-built for time-series data with automatic data lifecycle management.' }
  },

  // LAYER 3 - Data Ingestion
  'kinesis-streams': { id: 'kinesis-streams', name: 'Kinesis Data Streams', layer: 'Data Ingestion', layerColor: 'node-ingestion',
    simple: 'Kinesis Streams is like a conveyor belt that moves data in real-time. You control the speed and number of lanes.',
    exam: 'Amazon Kinesis Data Streams is a scalable real-time data streaming service. Data is retained for 24h–365 days. Consumers read via KCL or Lambda.',
    whenToUse: 'When you need custom real-time processing of streaming data with multiple consumers.',
    examTrap: 'Streams = custom processing, you manage consumers. Firehose = managed delivery to destinations. Key exam distinction!',
    alternatives: ['Kinesis Firehose', 'MSK'],
    quiz: { question: 'What is the default data retention period for Kinesis Data Streams?', options: ['1 hour', '24 hours', '7 days', '30 days'], correct: 1, explanation: 'Default retention is 24 hours, extendable up to 365 days.' }
  },
  'kinesis-firehose': { id: 'kinesis-firehose', name: 'Kinesis Firehose', layer: 'Data Ingestion', layerColor: 'node-ingestion',
    simple: 'Firehose is like an automatic delivery truck — it picks up data and delivers it to S3, Redshift, or OpenSearch without you doing anything.',
    exam: 'Amazon Kinesis Data Firehose is a fully managed service for delivering real-time streaming data to S3, Redshift, OpenSearch, and HTTP endpoints.',
    whenToUse: 'When you want zero-management data delivery from streams to storage destinations.',
    examTrap: 'Firehose is NEAR real-time (60s buffer minimum), not true real-time. For true real-time, use Kinesis Data Streams.',
    alternatives: ['Kinesis Data Streams', 'MSK'],
    quiz: { question: 'What is Firehose\'s minimum buffer interval?', options: ['0 seconds', '30 seconds', '60 seconds', '5 minutes'], correct: 2, explanation: 'Firehose buffers data for a minimum of 60 seconds before delivery.' }
  },
  'msk': { id: 'msk', name: 'Amazon MSK', layer: 'Data Ingestion', layerColor: 'node-ingestion',
    simple: 'MSK is managed Apache Kafka — like having a massive message board where different apps can post and read messages.',
    exam: 'Amazon MSK is a fully managed Apache Kafka service for building real-time streaming data pipelines and applications.',
    whenToUse: 'When your team already uses Kafka or needs Kafka-specific features like consumer groups and topic partitions.',
    examTrap: 'MSK = Kafka managed. If the exam says "Apache Kafka compatible," the answer is MSK, not Kinesis.',
    alternatives: ['Kinesis Data Streams'],
    quiz: { question: 'When should you choose MSK over Kinesis?', options: ['Always', 'When you need Kafka compatibility', 'For smaller workloads', 'For batch processing'], correct: 1, explanation: 'MSK is the right choice when you need Apache Kafka compatibility or have existing Kafka workloads.' }
  },
  'flink': { id: 'flink', name: 'Managed Apache Flink', layer: 'Data Ingestion', layerColor: 'node-ingestion',
    simple: 'Flink processes streaming data on the fly — like a factory worker inspecting items on the conveyor belt as they pass by.',
    exam: 'Amazon Managed Service for Apache Flink provides real-time stream processing using SQL or Java/Scala with exactly-once processing semantics.',
    whenToUse: 'When you need complex real-time transformations, windowed aggregations, or pattern detection on streaming data.',
    examTrap: 'Flink is for PROCESSING streams, Kinesis is for INGESTING streams. They\'re complementary, not competing.',
    alternatives: ['Kinesis Data Analytics', 'EMR with Spark Streaming'],
    quiz: { question: 'What processing guarantee does Flink provide?', options: ['At-most-once', 'At-least-once', 'Exactly-once', 'Best-effort'], correct: 2, explanation: 'Apache Flink provides exactly-once processing semantics for reliable stream processing.' }
  },
  'datasync': { id: 'datasync', name: 'AWS DataSync', layer: 'Data Ingestion', layerColor: 'node-ingestion',
    simple: 'DataSync is like a moving truck that efficiently moves your data from on-premises to AWS — fast and automated.',
    exam: 'AWS DataSync is a data transfer service that automates moving data between on-premises storage and AWS services at up to 10 Gbps.',
    whenToUse: 'When migrating large datasets from on-premises to S3/EFS for ML training.',
    examTrap: 'DataSync is for online transfer. Snowball is for offline/physical transfer. Exam tests this distinction.',
    alternatives: ['AWS Transfer Family', 'Snowball'],
    quiz: { question: 'What is DataSync\'s maximum transfer speed?', options: ['1 Gbps', '5 Gbps', '10 Gbps', '100 Gbps'], correct: 2, explanation: 'DataSync can transfer data at speeds up to 10 Gbps.' }
  },
  'snowball': { id: 'snowball', name: 'AWS Snowball', layer: 'Data Ingestion', layerColor: 'node-ingestion',
    simple: 'Snowball is a physical box AWS ships to you. You load your data onto it and ship it back. Like mailing a hard drive!',
    exam: 'AWS Snowball is a petabyte-scale data transport solution using physical devices for large-scale data migration to AWS.',
    whenToUse: 'When you have 10+ TB of training data and limited bandwidth makes online transfer impractical.',
    examTrap: 'Snowball = TB scale. Snowmobile = EB scale (a literal truck). If the exam mentions exabytes, it\'s Snowmobile.',
    alternatives: ['DataSync', 'Snowmobile'],
    quiz: { question: 'When should you use Snowball instead of DataSync?', options: ['Always', 'For small files', 'When bandwidth is limited for large datasets', 'For real-time data'], correct: 2, explanation: 'Snowball is ideal when network bandwidth is insufficient for transferring large datasets (10+ TB).' }
  },

  // LAYER 4 - Data Processing
  'glue': { id: 'glue', name: 'AWS Glue', layer: 'Data Processing', layerColor: 'node-processing',
    simple: 'Glue is like a robot that automatically cleans, organizes, and transforms messy data into clean data ready for ML.',
    exam: 'AWS Glue is a fully managed ETL service with serverless Spark execution, a Data Catalog for metadata, and crawlers for schema discovery.',
    whenToUse: 'For serverless ETL jobs to prepare training data. Use Glue Crawlers to catalog data in S3.',
    examTrap: 'Glue is SERVERLESS ETL. EMR is managed CLUSTER-based. If the exam says "no infrastructure management," think Glue.',
    alternatives: ['EMR', 'Lambda', 'Athena'],
    quiz: { question: 'What makes Glue different from EMR?', options: ['Glue is faster', 'Glue is serverless', 'Glue supports more languages', 'Glue is cheaper always'], correct: 1, explanation: 'Glue is serverless — no cluster management needed. EMR requires managing clusters.' }
  },
  'glue-databrew': { id: 'glue-databrew', name: 'Glue DataBrew', layer: 'Data Processing', layerColor: 'node-processing',
    simple: 'DataBrew is like a visual recipe book for data — click buttons to clean and transform data without writing code.',
    exam: 'AWS Glue DataBrew is a visual data preparation tool with 250+ built-in transformations for cleaning and normalizing data without code.',
    whenToUse: 'When data scientists need to visually explore and prepare data without writing Spark code.',
    examTrap: 'DataBrew = visual/no-code. Glue ETL = code-based Spark. The exam may test which tool fits non-technical users.',
    alternatives: ['SageMaker Data Wrangler', 'Glue ETL'],
    quiz: { question: 'How many built-in transformations does DataBrew offer?', options: ['50+', '100+', '250+', '500+'], correct: 2, explanation: 'DataBrew offers 250+ built-in transformations for data preparation.' }
  },
  'emr': { id: 'emr', name: 'Amazon EMR', layer: 'Data Processing', layerColor: 'node-processing',
    simple: 'EMR is like renting a team of powerful computers to process massive amounts of data using tools like Spark and Hadoop.',
    exam: 'Amazon EMR is a managed cluster platform for big data processing using Apache Spark, Hadoop, Hive, Presto, and other frameworks.',
    whenToUse: 'When you need full control over big data processing frameworks or have existing Spark/Hadoop workloads.',
    examTrap: 'EMR = full cluster control. EMR Serverless = no cluster management. Know when the exam asks for each.',
    alternatives: ['Glue', 'EMR Serverless'],
    quiz: { question: 'Which framework is most commonly used on EMR for ML?', options: ['Hadoop MapReduce', 'Apache Spark', 'Apache Hive', 'Presto'], correct: 1, explanation: 'Apache Spark with its MLlib library is the most common ML framework on EMR.' }
  },
  'lambda': { id: 'lambda', name: 'AWS Lambda', layer: 'Data Processing', layerColor: 'node-processing',
    simple: 'Lambda runs small pieces of code without you needing a server. Like a magic button that runs your code when triggered.',
    exam: 'AWS Lambda is a serverless compute service that runs code in response to events with automatic scaling. 15-minute max timeout, 10GB memory.',
    whenToUse: 'For lightweight data transformations, triggering ML pipelines, or pre/post-processing in inference workflows.',
    examTrap: 'Lambda has a 15-minute timeout and 10GB memory limit. For long-running or memory-intensive processing, use Glue or EMR.',
    alternatives: ['Glue', 'Step Functions'],
    quiz: { question: 'What is Lambda\'s maximum execution timeout?', options: ['5 minutes', '10 minutes', '15 minutes', '30 minutes'], correct: 2, explanation: 'Lambda functions can run for a maximum of 15 minutes per invocation.' }
  },
  'athena': { id: 'athena', name: 'Amazon Athena', layer: 'Data Processing', layerColor: 'node-processing',
    simple: 'Athena lets you ask questions about your data in S3 using SQL — without setting up any database.',
    exam: 'Amazon Athena is a serverless interactive query service that uses standard SQL to analyze data directly in S3 using Presto engine.',
    whenToUse: 'For ad-hoc SQL queries on data in S3 during ML exploration phase. Pay per query, no infrastructure.',
    examTrap: 'Athena queries S3 directly. Redshift requires loading data first. For quick exploration, Athena wins.',
    alternatives: ['Redshift Spectrum', 'EMR with Spark SQL'],
    quiz: { question: 'Where does Athena query data from?', options: ['RDS', 'DynamoDB', 'S3', 'Redshift'], correct: 2, explanation: 'Athena queries data directly from S3 without needing to load it into a database.' }
  },

  // LAYER 5 - Feature Engineering
  'data-wrangler': { id: 'data-wrangler', name: 'SageMaker Data Wrangler', layer: 'Feature Engineering', layerColor: 'node-feature',
    simple: 'Data Wrangler is like a visual playground where you can drag, drop, and transform data columns to create the perfect input for your ML model.',
    exam: 'SageMaker Data Wrangler provides a visual interface for data preparation and feature engineering with 300+ built-in transformations.',
    whenToUse: 'When data scientists need to visually create feature engineering workflows within SageMaker Studio.',
    examTrap: 'Data Wrangler is inside SageMaker. Glue DataBrew is standalone. The exam tests which belongs where.',
    alternatives: ['Glue DataBrew', 'Custom Spark on EMR'],
    quiz: { question: 'Where does SageMaker Data Wrangler run?', options: ['Standalone service', 'Inside SageMaker Studio', 'On EMR clusters', 'In Lambda'], correct: 1, explanation: 'Data Wrangler is integrated into SageMaker Studio for seamless ML workflows.' }
  },
  'feature-scaling': { id: 'feature-scaling', name: 'Feature Scaling', layer: 'Feature Engineering', layerColor: 'node-feature',
    simple: 'Imagine comparing heights in cm and weights in kg — the numbers are so different! Scaling makes all features speak the same "language."',
    exam: 'Feature scaling normalizes the range of independent variables. Methods include Min-Max normalization (0-1) and Z-score standardization (mean=0, std=1).',
    whenToUse: 'Before training models sensitive to feature magnitude: SVM, k-NN, neural networks, gradient descent-based algorithms.',
    examTrap: 'Tree-based models (XGBoost, Random Forest) do NOT require feature scaling. The exam tests this knowledge.',
    alternatives: ['Normalization', 'Standardization'],
    quiz: { question: 'Which algorithm does NOT require feature scaling?', options: ['K-Nearest Neighbors', 'Support Vector Machine', 'XGBoost', 'Neural Networks'], correct: 2, explanation: 'Tree-based algorithms like XGBoost are invariant to feature scaling because they use threshold-based splits.' }
  },
  'smote': { id: 'smote', name: 'SMOTE / Class Imbalance', layer: 'Feature Engineering', layerColor: 'node-feature',
    simple: 'If you have 1000 "not fraud" examples but only 10 "fraud" examples, your model won\'t learn fraud well. SMOTE creates synthetic fraud examples to balance things out.',
    exam: 'SMOTE (Synthetic Minority Over-sampling Technique) generates synthetic samples by interpolating between existing minority class instances in feature space.',
    whenToUse: 'When dealing with imbalanced classification problems like fraud detection, rare disease diagnosis, or anomaly detection.',
    examTrap: 'SMOTE generates SYNTHETIC data, not duplicates. Oversampling duplicates existing data. The exam distinguishes these.',
    alternatives: ['Random oversampling', 'Random undersampling', 'Class weights'],
    quiz: { question: 'How does SMOTE differ from random oversampling?', options: ['It\'s faster', 'It creates synthetic samples', 'It removes data', 'It changes labels'], correct: 1, explanation: 'SMOTE creates NEW synthetic samples by interpolating between existing minority samples, while oversampling duplicates existing ones.' }
  },

  // LAYER 6 - Feature Store
  'feature-store': { id: 'feature-store', name: 'SageMaker Feature Store', layer: 'Feature Store', layerColor: 'node-ingestion',
    simple: 'Feature Store is like a library of pre-calculated data features. Instead of recalculating features every time, just grab them from the shelf!',
    exam: 'SageMaker Feature Store is a centralized repository for ML features with online (low-latency) and offline (batch) stores for training and inference.',
    whenToUse: 'When multiple ML models share features, ensuring consistency between training and inference.',
    examTrap: 'Online Store = real-time inference features (DynamoDB-backed). Offline Store = training features (S3-backed). Key exam distinction.',
    alternatives: ['Custom feature tables in DynamoDB + S3'],
    quiz: { question: 'What backs the Feature Store Online Store?', options: ['S3', 'RDS', 'DynamoDB', 'Redshift'], correct: 2, explanation: 'The Online Store is backed by DynamoDB for single-digit millisecond feature retrieval during inference.' }
  },

  // LAYER 7 - Model Training
  'sagemaker-training': { id: 'sagemaker-training', name: 'SageMaker Training Jobs', layer: 'Model Training', layerColor: 'node-training',
    simple: 'A Training Job is like sending your data and algorithm to a powerful computer that learns patterns and creates a model.',
    exam: 'SageMaker Training Jobs run on managed ML instances. Data is pulled from S3, model artifacts are saved to S3. Supports distributed training.',
    whenToUse: 'For all model training in AWS ML pipelines. Supports built-in algorithms, custom containers, and framework containers.',
    examTrap: 'Training data MUST be in S3 (or EFS/FSx). Model artifacts are ALWAYS saved to S3. The exam assumes this.',
    alternatives: ['EMR with Spark MLlib', 'EC2 with custom setup'],
    quiz: { question: 'Where are SageMaker model artifacts stored?', options: ['EBS', 'DynamoDB', 'S3', 'EFS'], correct: 2, explanation: 'SageMaker always saves trained model artifacts (model.tar.gz) to an S3 bucket you specify.' }
  },
  'xgboost': { id: 'xgboost', name: 'XGBoost', layer: 'Model Training', layerColor: 'node-training',
    simple: 'XGBoost is like a team of decision-making trees that vote together. Each new tree learns from the mistakes of the previous ones.',
    exam: 'XGBoost is a gradient boosted trees algorithm. SageMaker provides it as a built-in algorithm supporting CSV and libsvm formats.',
    whenToUse: 'For structured/tabular data classification and regression. Top performer on most Kaggle competitions.',
    examTrap: 'XGBoost in SageMaker supports CSV and libsvm formats. For images/text, use deep learning frameworks instead.',
    alternatives: ['LightGBM', 'Random Forest', 'Linear Learner'],
    quiz: { question: 'What data type is XGBoost best suited for?', options: ['Images', 'Text', 'Tabular/structured data', 'Audio'], correct: 2, explanation: 'XGBoost excels at tabular/structured data with its gradient boosted decision tree approach.' }
  },
  'bias-variance': { id: 'bias-variance', name: 'Bias vs Variance', layer: 'Model Training', layerColor: 'node-training',
    simple: 'Bias = your model is too simple and misses patterns (underfitting). Variance = your model memorizes training data and fails on new data (overfitting).',
    exam: 'The bias-variance tradeoff balances model complexity. High bias → underfitting (high training error). High variance → overfitting (low training, high validation error).',
    whenToUse: 'Always consider when evaluating model performance. Use cross-validation to diagnose.',
    examTrap: 'If training error AND validation error are both high → high bias (underfitting). If training is low but validation is high → high variance (overfitting).',
    alternatives: ['Regularization (L1/L2)', 'Cross-validation', 'Early stopping'],
    quiz: { question: 'What indicates overfitting?', options: ['High training and validation error', 'Low training and validation error', 'Low training error, high validation error', 'High training error, low validation error'], correct: 2, explanation: 'Overfitting shows low training error (memorized data) but high validation error (can\'t generalize).' }
  },

  // LAYER 8 - Hyperparameter Tuning
  'auto-tuning': { id: 'auto-tuning', name: 'SageMaker Auto Tuning', layer: 'Hyperparameter Tuning', layerColor: 'node-tuning',
    simple: 'Auto Tuning is like having a smart assistant that tries different settings for your model and finds the best combination automatically.',
    exam: 'SageMaker Automatic Model Tuning uses Bayesian optimization to find optimal hyperparameters by running multiple training jobs with different configurations.',
    whenToUse: 'When you want to systematically find the best hyperparameters without manual trial and error.',
    examTrap: 'SageMaker uses BAYESIAN optimization by default (not grid/random). Bayesian is more efficient. Key exam fact.',
    alternatives: ['Manual tuning', 'Grid search', 'Random search'],
    quiz: { question: 'What optimization strategy does SageMaker Auto Tuning use by default?', options: ['Grid search', 'Random search', 'Bayesian optimization', 'Genetic algorithm'], correct: 2, explanation: 'SageMaker uses Bayesian optimization, which intelligently explores the hyperparameter space based on previous results.' }
  },

  // LAYER 9 - Model Evaluation
  'confusion-matrix': { id: 'confusion-matrix', name: 'Confusion Matrix', layer: 'Model Evaluation', layerColor: 'node-evaluation',
    simple: 'A confusion matrix is a scorecard showing where your model got confused — what it predicted right and where it made mistakes.',
    exam: 'A confusion matrix displays TP, FP, TN, FN counts. Precision = TP/(TP+FP). Recall = TP/(TP+FN). F1 = 2×(P×R)/(P+R).',
    whenToUse: 'For evaluating classification model performance, especially with imbalanced classes.',
    examTrap: 'Precision matters when FP is costly (spam filter). Recall matters when FN is costly (cancer detection). Exam tests this!',
    alternatives: ['ROC-AUC', 'PR-AUC'],
    quiz: { question: 'When is Recall more important than Precision?', options: ['Spam filtering', 'Product recommendations', 'Cancer detection', 'Image classification'], correct: 2, explanation: 'In cancer detection, missing a positive case (FN) is much worse than a false alarm (FP), so Recall is prioritized.' }
  },
  'roc-auc': { id: 'roc-auc', name: 'ROC-AUC', layer: 'Model Evaluation', layerColor: 'node-evaluation',
    simple: 'ROC-AUC shows how good your model is at separating classes. A score of 1.0 = perfect, 0.5 = random guessing.',
    exam: 'ROC curve plots True Positive Rate vs False Positive Rate at various thresholds. AUC (Area Under Curve) summarizes overall discriminative ability.',
    whenToUse: 'For binary classification evaluation. AUC is threshold-independent, making it useful for comparing models.',
    examTrap: 'AUC can be misleading with highly imbalanced data. Use PR-AUC instead for imbalanced datasets.',
    alternatives: ['PR-AUC', 'F1 Score'],
    quiz: { question: 'What AUC score indicates random guessing?', options: ['0.0', '0.25', '0.5', '1.0'], correct: 2, explanation: 'An AUC of 0.5 means the model performs no better than random chance.' }
  },

  // LAYER 10 - Model Management
  'sagemaker-pipelines': { id: 'sagemaker-pipelines', name: 'SageMaker Pipelines', layer: 'Model Management', layerColor: 'node-management',
    simple: 'Pipelines let you build an assembly line for ML — from data to training to deployment, all automated.',
    exam: 'SageMaker Pipelines is a purpose-built CI/CD service for ML that provides workflow orchestration with SageMaker-native steps.',
    whenToUse: 'For end-to-end ML workflow automation within SageMaker — the recommended approach for MLOps.',
    examTrap: 'SageMaker Pipelines = ML-specific orchestration. Step Functions = general-purpose orchestration. Exam tests which to use.',
    alternatives: ['Step Functions', 'Apache Airflow (MWAA)'],
    quiz: { question: 'What is SageMaker Pipelines primarily used for?', options: ['Data storage', 'ML workflow orchestration', 'Model inference', 'Data visualization'], correct: 1, explanation: 'SageMaker Pipelines orchestrates end-to-end ML workflows including data processing, training, and deployment.' }
  },
  'model-registry': { id: 'model-registry', name: 'SageMaker Model Registry', layer: 'Model Management', layerColor: 'node-management',
    simple: 'Model Registry is like a catalog of all your trained models — each with a version number and approval status.',
    exam: 'SageMaker Model Registry provides model versioning, metadata tracking, and approval workflows for model governance and deployment.',
    whenToUse: 'For tracking model versions, managing approval workflows, and maintaining model lineage in production ML systems.',
    examTrap: 'Models must be in "Approved" status in the Registry before deployment. This is part of ML governance.',
    alternatives: ['Custom model tracking in S3'],
    quiz: { question: 'What status must a model have before deployment?', options: ['Pending', 'Draft', 'Approved', 'Archived'], correct: 2, explanation: 'Models must be approved in the Model Registry before they can be deployed to production endpoints.' }
  },

  // LAYER 11 - Model Deployment
  'realtime-endpoint': { id: 'realtime-endpoint', name: 'Real-Time Endpoints', layer: 'Model Deployment', layerColor: 'node-deployment',
    simple: 'A real-time endpoint is like a drive-through window — send data in, get a prediction back instantly.',
    exam: 'SageMaker Real-Time Endpoints provide persistent, low-latency inference with auto-scaling. Always running, pay per instance-hour.',
    whenToUse: 'For applications requiring sub-second predictions: fraud detection, recommendations, chatbots.',
    examTrap: 'Real-time endpoints are ALWAYS running (and billing). For intermittent traffic, consider Serverless Inference.',
    alternatives: ['Serverless Inference', 'Batch Transform'],
    quiz: { question: 'When should you NOT use real-time endpoints?', options: ['For fraud detection', 'For large offline batch predictions', 'For chatbots', 'For recommendations'], correct: 1, explanation: 'Large offline predictions should use Batch Transform to avoid paying for always-on infrastructure.' }
  },
  'batch-transform': { id: 'batch-transform', name: 'Batch Transform', layer: 'Model Deployment', layerColor: 'node-deployment',
    simple: 'Batch Transform is like sending a big box of questions to the model and getting all the answers back at once — no rush.',
    exam: 'SageMaker Batch Transform runs inference on large datasets stored in S3. Instances are provisioned per job and terminated after completion.',
    whenToUse: 'For large-scale offline predictions, pre-computing recommendations, or scoring entire datasets.',
    examTrap: 'Batch Transform = large dataset, no real-time need. If the exam says "millions of records overnight," think Batch Transform.',
    alternatives: ['Real-Time Endpoints', 'Async Inference'],
    quiz: { question: 'Where does Batch Transform read input from?', options: ['DynamoDB', 'API Gateway', 'S3', 'Kinesis'], correct: 2, explanation: 'Batch Transform reads input data from S3 and writes predictions back to S3.' }
  },
  'multi-model': { id: 'multi-model', name: 'Multi-Model Endpoints', layer: 'Model Deployment', layerColor: 'node-deployment',
    simple: 'Instead of having one server per model, Multi-Model Endpoints let you host thousands of models on one server — like a hotel with many rooms.',
    exam: 'Multi-Model Endpoints host multiple models on a single endpoint, dynamically loading/unloading models from S3. Cost-effective for many models.',
    whenToUse: 'When you have hundreds or thousands of similar models (e.g., per-customer models) and want to save costs.',
    examTrap: '"Many small models" or "per-tenant models" = Multi-Model Endpoint. This is a HIGH-FREQUENCY exam pattern.',
    alternatives: ['Multiple single-model endpoints'],
    quiz: { question: 'What is the key benefit of Multi-Model Endpoints?', options: ['Faster inference', 'Cost savings with many models', 'Better accuracy', 'Auto-scaling'], correct: 1, explanation: 'Multi-Model Endpoints reduce costs by hosting many models on shared infrastructure instead of dedicated endpoints per model.' }
  },
  'async-inference': { id: 'async-inference', name: 'Async Inference', layer: 'Model Deployment', layerColor: 'node-deployment',
    simple: 'Async Inference is like dropping off your laundry — you leave it, and it notifies you when it\'s ready.',
    exam: 'SageMaker Asynchronous Inference queues requests for processing. Supports payloads up to 1GB, scales to zero, with SNS notifications.',
    whenToUse: 'For large payload inference (images, documents), long processing times, or when you can tolerate seconds of latency.',
    examTrap: 'Async Inference can scale to ZERO (unlike real-time). If the exam mentions "cost savings during idle" + "large payloads," think Async.',
    alternatives: ['Real-Time Endpoints', 'Batch Transform'],
    quiz: { question: 'What is the maximum payload size for Async Inference?', options: ['6MB', '100MB', '500MB', '1GB'], correct: 3, explanation: 'Async Inference supports payloads up to 1GB, much larger than real-time endpoints (6MB).' }
  },
  'serverless-inference': { id: 'serverless-inference', name: 'Serverless Inference', layer: 'Model Deployment', layerColor: 'node-deployment',
    simple: 'Serverless Inference is like a light that turns on only when someone walks into the room — no wasted energy.',
    exam: 'SageMaker Serverless Inference automatically provisions and scales compute. Pay per inference request with cold starts.',
    whenToUse: 'For unpredictable or intermittent traffic patterns where you don\'t want to pay for idle instances.',
    examTrap: 'Serverless has COLD STARTS. If the exam requires consistent low latency, use Real-Time Endpoints instead.',
    alternatives: ['Real-Time Endpoints', 'Lambda with custom inference'],
    quiz: { question: 'What is the main drawback of Serverless Inference?', options: ['High cost', 'Cold starts', 'Limited model support', 'No auto-scaling'], correct: 1, explanation: 'Serverless Inference can experience cold starts when scaling from zero, adding latency to initial requests.' }
  },

  // LAYER 12 - Monitoring
  'model-monitor': { id: 'model-monitor', name: 'SageMaker Model Monitor', layer: 'Monitoring', layerColor: 'node-monitoring',
    simple: 'Model Monitor watches your model in production like a security camera — alerting you when the model starts making weird predictions.',
    exam: 'SageMaker Model Monitor detects data quality, model quality, bias drift, and feature attribution drift in deployed models using baseline statistics.',
    whenToUse: 'For all production ML models to detect when performance degrades over time due to data or concept drift.',
    examTrap: 'Model Monitor detects DRIFT. CloudWatch monitors INFRASTRUCTURE. The exam tests this distinction frequently.',
    alternatives: ['Custom monitoring with CloudWatch', 'Amazon Lookout for Metrics'],
    quiz: { question: 'What types of drift does Model Monitor detect?', options: ['Only data drift', 'Only model drift', 'Data quality, model quality, bias, and feature attribution drift', 'Only bias drift'], correct: 2, explanation: 'Model Monitor provides four monitoring types: data quality, model quality, bias drift, and feature attribution drift.' }
  },
  'cloudwatch': { id: 'cloudwatch', name: 'Amazon CloudWatch', layer: 'Monitoring', layerColor: 'node-monitoring',
    simple: 'CloudWatch is like a dashboard in your car — it shows you speed, fuel, and engine health for all your AWS services.',
    exam: 'Amazon CloudWatch provides monitoring for AWS resources and applications. Collects metrics, logs, and events. Supports alarms and dashboards.',
    whenToUse: 'For infrastructure monitoring: instance utilization, endpoint latency, invocation counts, error rates.',
    examTrap: 'CloudWatch = infrastructure metrics. Model Monitor = ML-specific drift detection. Use BOTH in production.',
    alternatives: ['Model Monitor for ML metrics', 'X-Ray for tracing'],
    quiz: { question: 'What does CloudWatch monitor in ML?', options: ['Data drift', 'Model accuracy', 'Infrastructure metrics and endpoint health', 'Feature importance'], correct: 2, explanation: 'CloudWatch monitors infrastructure-level metrics like CPU utilization, memory, latency, and error rates for ML endpoints.' }
  },
};

export const layerOrder = [
  'Data Sources',
  'Data Storage',
  'Data Ingestion',
  'Data Processing',
  'Feature Engineering',
  'Feature Store',
  'Model Training',
  'Hyperparameter Tuning',
  'Model Evaluation',
  'Model Management',
  'Model Deployment',
  'Monitoring',
];

export const layerColors: Record<string, string> = {
  'Data Sources': '#2e8bc0',
  'Data Storage': '#2da87e',
  'Data Ingestion': '#e8841a',
  'Data Processing': '#8b5cf6',
  'Feature Engineering': '#e8457e',
  'Feature Store': '#e8841a',
  'Model Training': '#3b82f6',
  'Model Evaluation': '#22c55e',
  'Hyperparameter Tuning': '#eab308',
  'Model Management': '#a855f7',
  'Model Deployment': '#f97316',
  'Monitoring': '#ef4444',
};

export const layerServices: Record<string, string[]> = {
  'Data Sources': ['applications', 'databases', 'iot-devices', 'streaming'],
  'Data Storage': ['s3', 'redshift', 'dynamodb', 'rds', 'aurora', 'efs', 'fsx', 'opensearch', 'timestream'],
  'Data Ingestion': ['kinesis-streams', 'kinesis-firehose', 'msk', 'flink', 'datasync', 'snowball'],
  'Data Processing': ['glue', 'glue-databrew', 'emr', 'lambda', 'athena'],
  'Feature Engineering': ['data-wrangler', 'feature-scaling', 'smote'],
  'Feature Store': ['feature-store'],
  'Model Training': ['sagemaker-training', 'xgboost', 'bias-variance'],
  'Hyperparameter Tuning': ['auto-tuning'],
  'Model Evaluation': ['confusion-matrix', 'roc-auc'],
  'Model Management': ['sagemaker-pipelines', 'model-registry'],
  'Model Deployment': ['realtime-endpoint', 'batch-transform', 'multi-model', 'async-inference', 'serverless-inference'],
  'Monitoring': ['model-monitor', 'cloudwatch'],
};

export const examPatterns = [
  { pattern: 'Real-time streaming data ingestion', answer: 'Kinesis Data Streams', detail: 'For custom real-time processing with multiple consumers.' },
  { pattern: 'Managed delivery to S3/Redshift', answer: 'Kinesis Data Firehose', detail: 'Near real-time, fully managed delivery.' },
  { pattern: 'Many small per-tenant models', answer: 'Multi-Model Endpoint', detail: 'Cost-effective hosting of hundreds/thousands of models.' },
  { pattern: 'Large dataset offline predictions', answer: 'Batch Transform', detail: 'Process millions of records without persistent endpoints.' },
  { pattern: 'ML pipeline orchestration', answer: 'SageMaker Pipelines', detail: 'Purpose-built CI/CD for ML workflows.' },
  { pattern: 'Serverless ETL', answer: 'AWS Glue', detail: 'No cluster management, serverless Spark execution.' },
  { pattern: 'Big data with Spark clusters', answer: 'Amazon EMR', detail: 'Full control over Spark/Hadoop clusters.' },
  { pattern: 'Intermittent inference traffic', answer: 'Serverless Inference', detail: 'Scales to zero, pay per request.' },
  { pattern: 'Large payload (>6MB) inference', answer: 'Async Inference', detail: 'Up to 1GB payloads with SNS notifications.' },
  { pattern: 'ML-specific drift detection', answer: 'SageMaker Model Monitor', detail: 'Detects data, model, bias, and feature attribution drift.' },
  { pattern: 'Feature reuse across models', answer: 'SageMaker Feature Store', detail: 'Centralized feature repository with online/offline stores.' },
  { pattern: 'Hyperparameter optimization', answer: 'SageMaker Auto Tuning', detail: 'Bayesian optimization by default.' },
  { pattern: 'Apache Kafka compatible streaming', answer: 'Amazon MSK', detail: 'Managed Kafka for existing Kafka workloads.' },
  { pattern: 'Physical data migration (TB scale)', answer: 'AWS Snowball', detail: 'Ship physical devices for large transfers.' },
  { pattern: 'Visual no-code data preparation', answer: 'Glue DataBrew', detail: '250+ built-in transformations, no coding.' },
];

export const serviceComparisons = [
  { services: ['Kinesis Data Streams', 'Kinesis Firehose'], criteria: [
    { aspect: 'Management', a: 'You manage consumers', b: 'Fully managed delivery' },
    { aspect: 'Latency', a: 'Real-time (ms)', b: 'Near real-time (60s min)' },
    { aspect: 'Use Case', a: 'Custom processing', b: 'Load to S3/Redshift' },
    { aspect: 'Scaling', a: 'Manual shard management', b: 'Automatic' },
  ]},
  { services: ['AWS Glue', 'Amazon EMR'], criteria: [
    { aspect: 'Infrastructure', a: 'Serverless', b: 'Managed clusters' },
    { aspect: 'Control', a: 'Limited customization', b: 'Full framework control' },
    { aspect: 'Cost Model', a: 'Pay per DPU-hour', b: 'Pay per instance-hour' },
    { aspect: 'Best For', a: 'ETL jobs', b: 'Complex big data processing' },
  ]},
  { services: ['SageMaker Pipelines', 'Step Functions'], criteria: [
    { aspect: 'Purpose', a: 'ML-specific workflows', b: 'General-purpose orchestration' },
    { aspect: 'Integration', a: 'Native SageMaker steps', b: 'Any AWS service' },
    { aspect: 'Versioning', a: 'Pipeline versioning built-in', b: 'Manual versioning' },
    { aspect: 'Best For', a: 'End-to-end ML workflows', b: 'Complex multi-service orchestration' },
  ]},
  { services: ['Model Monitor', 'CloudWatch'], criteria: [
    { aspect: 'Focus', a: 'ML-specific drift', b: 'Infrastructure metrics' },
    { aspect: 'Detects', a: 'Data/model/bias drift', b: 'CPU, memory, latency' },
    { aspect: 'Baselines', a: 'Statistical baselines', b: 'Metric thresholds' },
    { aspect: 'Best For', a: 'Model quality monitoring', b: 'Endpoint health monitoring' },
  ]},
];
