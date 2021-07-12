const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://elasticsearch-inlots:9200' })

createInspection = async (req, res) => {

  await client.index({
    index: 'inspection-test',
    body: {
      "name": req.params.name,
      "created_by": req.params.created_by,
      "created_at": req.params.created_at,
      "finished_at": req.params.finished_at,
      "type": req.params.type,
      "sessions": []
    }
  }, (err, data) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    const pureData = data.body.hits.hits.map(hit => hit._source)
    return res.status(200).json({ success: true, data: pureData })
  }
  )

}

createInspectionSession = async (req, res) => {

  await client.update({
    index: 'inspection-test',
    "query": {
      "match": {
        "id": req.params.id
      }
    },
    "script" : {
      "inline": "ctx._source.sessions += [params.session]"
   },
   "params": {
     "session": req.params.new_session
   }
  }, (err, data) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    const pureData = data.body.hits.hits.map(hit => hit._source)
    return res.status(200).json({ success: true, data: pureData })
  }
  )

}

viewContractorsInspections = async (req, res) => {

  await client.search({
    index: 'inspection-test',
    body: {
      query: {
        "term": {
          "created_by": req.params.text
        }
      }
    }
  }, (err, data) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    const pureData = data.body.hits.hits.map(hit => hit._source)
    return res.status(200).json({ success: true, data: pureData })
  }
  )

}

viewInspectorsInspections = async (req, res) => {

  await client.search({
    index: 'inspection-test',
    body: {
      query: {
        "term": {
          "sessions.assigned_to": req.params.text
        }
      }
    }
  }, (err, data) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    const pureData = data.body.hits.hits.map(hit => hit._source)
    return res.status(200).json({ success: true, data: pureData })
  }
  )

}

updateInspection = async (req, res) => {

  await client.update({
    index: 'inspection-test',
    id: req.params.id,
    body: {
      doc: req.params.updated_details
    }
  }, (err, data) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    const pureData = data.body.hits.hits.map(hit => hit._source)
    return res.status(200).json({ success: true, data: pureData })
  }
  )

}

module.exports = {
  createInspection, 
  createInspectionSession,
  viewContractorsInspections,
  viewInspectorsInspections,
  updateInspection
}