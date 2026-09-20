/* Projects — only substantial work. Public repos link to source;
   private ones carry no link rather than a dead one. */
const GH = "https://github.com/AMC-hawk/";

window.PROJECTS = [
  { name:"RaftDB — Mini Distributed Database", cat:"Distributed Systems", year:2025, featured:true,
    blurb:"A distributed database built from scratch to open up the black boxes in production systems. Fault-tolerant storage with Raft consensus, leader election, log replication, WAL, snapshots, SSTables, Bloom filters and background compaction — plus a SQL layer on Apache Calcite doing cost-based optimization, predicate pushdown, projection pruning, distributed joins and parallel execution.",
    stack:["Java","Raft","LSM Tree","WAL","RocksDB","Apache Calcite","SQL"], url:null },

  { name:"Data Quality Research", cat:"Research", year:2026, featured:true,
    blurb:"An ongoing research programme toward a cloud-native data quality framework for open-source datasets — a structured literature review across validation systems, error detection, label noise and LLM-driven cleaning, and the framework design that follows from it.",
    stack:["Research","Data Quality","Literature Review"], url:null },

  { name:"AIOps Platform POC", cat:"Data Engineering", year:2026, featured:true,
    blurb:"A proof-of-concept AIOps platform: telemetry ingestion wired into anomaly detection and automated operational signals.",
    stack:["Python","Observability","ML"], url:GH+"AIOps-Platform-POC" },

  { name:"JanusGraph POC", cat:"Data Engineering", year:2026, featured:true,
    blurb:"Distributed graph database exploration on JanusGraph — modelling, Gremlin traversals and scale characteristics for connected data.",
    stack:["Python","JanusGraph","Gremlin"], url:GH+"JanusGraph-POC" },

  { name:"Airflow + Spark Setup", cat:"Data Engineering", year:2025, featured:true,
    blurb:"A reproducible orchestration stack: Apache Airflow scheduling Spark jobs end to end, containerised and ready to extend.",
    stack:["Python","Airflow","Spark","Docker"], url:GH+"Airflow-Spark-Setup" },

  { name:"MCP Server — Local Setup", cat:"ML / AI", year:2025, featured:true,
    blurb:"A local Model Context Protocol server: standing up tool-calling infrastructure so LLMs can reach real systems.",
    stack:["Python","MCP","LLM"], url:GH+"MCP_Server_LocalSetup" },

  { name:"MLflow Setup", cat:"ML / AI", year:2025,
    blurb:"Experiment tracking and model registry with MLflow — runs, params, metrics and artifacts captured end to end.",
    stack:["MLflow","Python","Jupyter"], url:GH+"ML_Flow_Setup" },

  { name:"Scala REST API", cat:"Backend", year:2025,
    blurb:"A REST service in Scala — the JVM side of the data stack, written in the language Spark itself is built in.",
    stack:["Scala","REST","JVM"], url:GH+"scala-rest-api" }
];

/* Upstream projects I run, fork and follow closely enough to patch. */
window.OSS = [
  { name:"Apache Spark", lang:"Scala", url:"https://github.com/apache/spark",
    note:"The unified analytics engine at the centre of my day-to-day work." },
  { name:"PyDeequ", lang:"Python", url:"https://github.com/awslabs/python-deequ",
    note:"Python API for Deequ — declarative data quality checks on Spark." },
  { name:"Spark Kubernetes Operator", lang:"Java", url:"https://github.com/apache/spark-kubernetes-operator",
    note:"Running Spark natively on Kubernetes." },
  { name:"Spark Connect (Go)", lang:"Go", url:"https://github.com/apache/spark-connect-go",
    note:"Go client for Spark Connect's decoupled driver protocol." },
  { name:"Spark Docker", lang:"Dockerfile", url:"https://github.com/apache/spark-docker",
    note:"Official container images for Spark." },
  { name:"Apache Superset", lang:"Python", url:"https://github.com/apache/superset",
    note:"Data exploration and visualisation platform." },
  { name:"MLflow", lang:"Python", url:"https://github.com/mlflow/mlflow",
    note:"Open platform for the machine learning lifecycle." },
  { name:"Trino", lang:"Java", url:"https://github.com/trinodb/trino",
    note:"Distributed SQL query engine — the query layer I build against." }
];
