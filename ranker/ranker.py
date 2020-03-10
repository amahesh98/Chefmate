from flask import Flask, jsonify

import requests
import sys
sys.path.append('..')
sys.path.append('../crawler')
import helpers
log = helpers.log

from mongoengine import *
from mongoConfig import *
from cosineSimilarity import *

app = Flask(__name__)

port = 8002
connect('chefmateDB', host='18.222.251.5', port=27017)

inMemoryTFIDF = loadInvertedIndexToMemory()

@app.route('/', methods=["GET"])
def index():
  return 'I am the ranker!'

@app.route('/query/<query>', methods=['GET'])
def rankQuery(query):
  log('query', query)
  queryTerms = stemQuery(query)
  sortedDocIds=calculateAllCosineSimilarity(queryTerms, inMemoryTFIDF)
  print(sortedDocIds)
  return helpers.sendPacket(1, 'Successfully retrieved query', {'sortedDocIds':sortedDocIds})

@app.route('/testRoute')
def testRoute():
  return helpers.sendPacket(
      1, 'successfully got packet from ranker', {'name': 'Ashwin'})

#Insert Helper functions below here

if __name__ == "__main__":
  log('info', f"Ranker is listening on port {port}, {app.config['ENV']} environment.")
  app.run(debug=True, host='0.0.0.0', port=port)
