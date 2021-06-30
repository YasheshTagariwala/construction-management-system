# 
# 
# THIS FILE IS ONLY FOR TESTING INDEXES & QUERIES IN ELASTICSEARCH
# 
# 
# initiates
from elasticsearch import Elasticsearch
from datetime import datetime
INDEX_NAME = 'c360-test-index-1'
es = Elasticsearch()
# 
# utility initates
import random
from pprint import pprint
# 
# (C) inserting document
def insert_document(document):
    return es.index(index=INDEX_NAME, body=document)
# 
# (R) reading document
def get_document(param):
    search_query = {
            "size": 10,  # amount of data we need
            "_source": ["fields", "we", "wanna", "fetch"],
            "query": {
                "match": {
                    "article": param
            }
        }
    }
    return [x['_source'] for x in es.search(index=INDEX_NAME, body=search_query)['hits']['hits']][0]
# 
# (U) update document
def update_document(id, params):
    return es.update(index=INDEX_NAME, id=id,
                body=params)
# 
# (D) delete document
def delete_document(id):
    return es.delete(index=INDEX_NAME, id=id)
#
# 
# 
# we'll be using the following document structure for inspections
# (STORED IN """inspection-index-PROJECT_NAME-BUILDER_NAME-other-properties""")
inspection_document_skeleton = {
    "name": 0,
    "date_time": datetime.now(),
    "type": [0, 1],
    "status": {
        "started": datetime.now(),
        "ended": 0
        },
    "sessions": [
        {
            "type": "remote",
            "checklist": [
                {
                    "checkpoint_1": ["list", "of", "issues"]
                }
            ],
            "images": ["path", "to", "all", "images"],
            "start_end": [0, 0],
            "notes": ["yes", "this", "was really", "good"],
            "signature": "path_to_sign_image"
        }
    ]
}
# 
# 
# lets create some initializers for random sampling and filling up our index :)
a_z = 'abcdefghijklmnopqrstuvwxyz'
names = [''.join([random.choice(a_z) for i in range(5)]) for i in range(0, 30)]
checkpoints = [''.join([random.choice(a_z) for i in range(200)]) for i in range(0, 200)]
issues = [''.join([random.choice(a_z) for i in range(200)]) for i in range(0, 300)]
image_paths = [''.join([random.choice(a_z) for i in range(30)]) for i in range(0, 1000)]
notes = [''.join([random.choice(a_z) for i in range(300)]) for i in range(0, 6000)]
types = [(random.choice([0,1,2,3,4]), random.choice([0,1,2,3,4])) for i in range(0, 50)]
signatures = [''.join([random.choice(a_z) for i in range(30)]) for i in range(0, 300)]
# 
# create fake documents
# like harshad mehta did 
for i in range(0, 10000):
    new_document = inspection_document_skeleton
    new_document['name'] = random.choice(names)
    new_document['type'] = random.choice(types)
    session_skeleton = new_document['sessions'][0]
    for i in range(random.choice([i for i in range(0, 10)])):
        new_session = session_skeleton
        new_session['type'] = random.choice(["remote", "local"])
        new_session['checklist'] = []
        for j in range(random.choice([i for i in range(0, 10)])):
            new_session['checklist'] += [{
                str(random.choice(checkpoints)): [str(random.choice(issues)) for i in range(random.choice([i for i in range(0, 20)]))]
            }]
        new_session["images"] = random.choice(image_paths)
        new_session["start_end"] = (random.choice([0,1,2,3,4]), random.choice([0,1,2,3,4]))
        new_session["notes"] = random.choice(notes)
        new_session["signature"] = random.choice(signatures)
    print(insert_document(new_document))

