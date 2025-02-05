from elasticsearch import Elasticsearch
client = Elasticsearch(
    "https://my-elasticsearch-project-c07d35.es.us-east-1.aws.elastic.cloud:443",
    api_key="eHBPdTE1UUJJc0pndFVTdXRhQVU6b0pPVFVMSEVSaW02QTJiMG9xbWdQQQ=="
)
client.indices.create(
    index="search-kj73",
    mappings={
        "properties": {
            "vector": {"type": "dense_vector", "dims": 3 },
            "text": {"type": "text"}
        }
    }
)