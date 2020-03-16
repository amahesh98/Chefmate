class Graph:
  def __init__(self):
    self.nodes={}
  
  def addLink(self, nodeUrl, link):
    if nodeUrl not in self.nodes:
      self.nodes[nodeUrl]=set()
    if nodeUrl != link:
      self.nodes[nodeUrl].add(link)
  
  def get(self, node):
    if node in self.nodes:
      return self.nodes[node]
    return set()
  
  def printGraph(self):
    for node in self.nodes:
      print(node, ':', self.nodes[node])