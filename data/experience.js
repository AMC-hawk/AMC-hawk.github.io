/* Career and education, transcribed from Anmol's resume (20 Sept). */
window.TIMELINE = [
  {
    when:"Jan 2023 to Present",
    role:"Software Engineer, Distributed Data Platform",
    org:"Hewlett Packard Enterprise",
    now:true,
    points:[
      "Designed and operated production batch and streaming pipelines on <b>Apache Spark, Scala, SQL, Trino, Kafka and Debezium</b>, processing <b>1+ TB/day</b> with reliable CDC and low-latency synchronization.",
      "Built end-to-end cloud-native data services across ingestion, transformation, data modeling, metadata, storage and query execution, delivering <b>15+ BI data models</b> for Customer Success, FinOps and Engineering.",
      "Improved performance, scalability and reliability via <b>Spark partitioning, broadcast joins, AQE, resource tuning, Kubernetes and AWS</b>, holding <b>95%+ production incident SLA compliance</b>.",
      "Ran production observability across distributed workloads with <b>Prometheus, Grafana, CloudWatch and Humio</b>, covering incident diagnosis, root-cause analysis, alerting and durable remediation.",
      "Hardened platform reliability through <b>CI/CD, Kubernetes / Argo CD, infrastructure automation</b> and documentation."
    ]
  },
  {
    when:"2019 to 2023",
    role:"B.Tech, Computer Science and Engineering",
    org:"Vellore Institute of Technology, Chennai",
    points:["Graduated with a <b>8.81 / 10 CGPA</b>."]
  }
];

window.CONTRIB = [
  { proj:"Apache Spark", pr:"#59212", status:"open",
    title:"[SPARK-59910][PYTHON] Make VariantVal.toJson match the JVM to_json output",
    blurb:"PySpark's <code>VariantVal.toJson()</code> had drifted from the JVM's <code>to_json</code>, and wrote NaN and infinity as invalid JSON. Aligns floats, decimals, timestamps and offsets with the JVM, with tests.",
    url:"https://github.com/apache/spark/pull/59212" },
  { proj:"Apache Spark", pr:"#58760", status:"open",
    title:"[SPARK-59146][SQL] Retain qualified access to source columns affected by pipe SET",
    blurb:"Spark SQL analyzer behaviour for pipe <code>SET</code> column resolution, with planner changes plus SQL test coverage.",
    url:"https://github.com/apache/spark/pull/58760" },
  { proj:"AWS PyDeequ", pr:"#289", status:"merged",
    title:"feat: add DQDL support via EvaluateDataQuality",
    blurb:"Data-quality functionality with tests and documentation, merged into PyDeequ, the Spark-based data quality framework.",
    url:"https://github.com/awslabs/python-deequ/pull/289" }
];
