export interface ComparisonItem {
  id: string;
  title: string;
  serviceA: string;
  serviceB: string;
  features: { name: string; a: boolean | string; b: boolean | string }[];
  examTip: string;
}

export const comparisons: ComparisonItem[] = [
  {
    id: 'kinesis-vs-firehose',
    title: 'Kinesis Data Streams vs Firehose',
    serviceA: 'Kinesis Data Streams',
    serviceB: 'Kinesis Firehose',
    features: [
      { name: 'Real-time processing', a: true, b: false },
      { name: 'Fully managed delivery', a: false, b: true },
      { name: 'Custom consumers (KCL/Lambda)', a: true, b: false },
      { name: 'Auto-delivery to S3/Redshift', a: false, b: true },
      { name: 'Data retention (replay)', a: '24h–365 days', b: false },
      { name: 'Min latency', a: '~200ms', b: '60 seconds' },
      { name: 'Scales to zero', a: false, b: false },
      { name: 'Shard management required', a: true, b: false },
    ],
    examTip: 'If the exam says "custom real-time processing" → Streams. If "managed delivery to S3/Redshift" → Firehose. Firehose is NEAR real-time (60s buffer).',
  },
  {
    id: 'glue-vs-emr',
    title: 'AWS Glue vs Amazon EMR',
    serviceA: 'AWS Glue',
    serviceB: 'Amazon EMR',
    features: [
      { name: 'Serverless', a: true, b: false },
      { name: 'Cluster management required', a: false, b: true },
      { name: 'Data Catalog integration', a: true, b: 'Manual' },
      { name: 'Spark support', a: true, b: true },
      { name: 'Hadoop/Hive/Presto', a: false, b: true },
      { name: 'Schema crawling', a: true, b: false },
      { name: 'Cost model', a: 'Per DPU-hour', b: 'Per instance-hour' },
      { name: 'Best for', a: 'ETL jobs', b: 'Complex big data' },
    ],
    examTip: '"No infrastructure management" or "least operational overhead" → Glue. "Full Spark/Hadoop control" or "custom frameworks" → EMR.',
  },
  {
    id: 'pipelines-vs-stepfunctions',
    title: 'SageMaker Pipelines vs Step Functions',
    serviceA: 'SageMaker Pipelines',
    serviceB: 'AWS Step Functions',
    features: [
      { name: 'ML-native steps (TrainingStep, ProcessingStep)', a: true, b: false },
      { name: 'Model Registry integration', a: true, b: false },
      { name: 'General serverless orchestration', a: false, b: true },
      { name: 'Lambda/ECS/Glue orchestration', a: false, b: true },
      { name: 'ConditionStep for ML logic', a: true, b: 'Custom via Choice state' },
      { name: 'CI/CD for ML', a: true, b: false },
      { name: 'Visual workflow editor', a: true, b: true },
    ],
    examTip: 'Purely ML workflow → SageMaker Pipelines. Mixed services (Lambda + Glue + SageMaker) → Step Functions.',
  },
  {
    id: 'model-registry-vs-ecr',
    title: 'SageMaker Model Registry vs ECR',
    serviceA: 'Model Registry',
    serviceB: 'Amazon ECR',
    features: [
      { name: 'Model versioning', a: true, b: false },
      { name: 'Container image storage', a: false, b: true },
      { name: 'Model approval workflows', a: true, b: false },
      { name: 'Model package groups', a: true, b: false },
      { name: 'Pull built-in SageMaker images', a: false, b: true },
      { name: 'Store custom training containers', a: false, b: true },
      { name: 'Model metadata & lineage', a: true, b: false },
    ],
    examTip: 'ECR stores CONTAINER IMAGES. Model Registry stores MODEL METADATA and versions. "Model versioning" → Model Registry. "Container images" → ECR. (Q#1, Q#101, Q#201)',
  },
  {
    id: 'monitor-vs-clarify',
    title: 'Model Monitor vs SageMaker Clarify',
    serviceA: 'Model Monitor',
    serviceB: 'SageMaker Clarify',
    features: [
      { name: 'Data quality drift', a: true, b: false },
      { name: 'Model quality drift', a: true, b: false },
      { name: 'Bias detection (pre-training)', a: false, b: true },
      { name: 'Bias drift (post-deployment)', a: false, b: true },
      { name: 'Feature attribution (SHAP)', a: false, b: true },
      { name: 'Scheduled monitoring', a: true, b: 'On-demand via Lambda' },
      { name: 'CloudWatch integration', a: true, b: true },
    ],
    examTip: '"Data/model drift detection" → Model Monitor. "Bias detection" or "explainability" → Clarify. (Q#4, Q#153)',
  },
  {
    id: 'databrew-vs-datawrangler',
    title: 'Glue DataBrew vs SageMaker Data Wrangler',
    serviceA: 'Glue DataBrew',
    serviceB: 'Data Wrangler',
    features: [
      { name: 'Visual / no-code', a: true, b: true },
      { name: 'Built-in transformations', a: '250+', b: '300+' },
      { name: 'Inside SageMaker Studio', a: false, b: true },
      { name: 'General ETL / data prep', a: true, b: false },
      { name: 'ML-specific feature engineering', a: false, b: true },
      { name: 'Balance data (SMOTE)', a: false, b: true },
      { name: 'Anomaly detection visuals', a: false, b: true },
      { name: 'Best for', a: 'General data cleaning', b: 'ML feature engineering' },
    ],
    examTip: 'General data prep for analytics → DataBrew. ML-specific feature engineering in SageMaker → Data Wrangler. (Q#54, Q#60)',
  },
  {
    id: 'realtime-vs-async-vs-batch-vs-serverless',
    title: 'Inference Types Comparison',
    serviceA: 'Real-Time / Serverless',
    serviceB: 'Async / Batch Transform',
    features: [
      { name: 'Response time', a: 'Milliseconds / Milliseconds (cold start)', b: 'Seconds-Minutes / Hours' },
      { name: 'Max payload', a: '6 MB / 6 MB', b: '1 GB / Unlimited' },
      { name: 'Scales to zero', a: 'No / Yes', b: 'Yes / N/A (job-based)' },
      { name: 'Always-on cost', a: 'Yes / No', b: 'No / No' },
      { name: 'Best for', a: 'APIs, chatbots / Intermittent traffic', b: 'Large docs / Offline scoring' },
      { name: 'Notification on complete', a: 'Immediate / Immediate', b: 'SNS / S3 output' },
    ],
    examTip: 'Constant traffic → Real-time. Variable/intermittent → Serverless. Large payloads (100MB+) → Async. Millions of records offline → Batch Transform. (Q#51, Q#52, Q#57, Q#103)',
  },
];
