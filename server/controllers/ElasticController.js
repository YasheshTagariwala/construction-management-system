const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://elasticsearch-inlots:9200' })

searchArticle = async (req, res) => {

  await client.search({
    index: 'inspection-test',
    body: {
      query: {
        "multi_match": {
          "query": req.params.text,
          "fields": [
            "article", "slugged_article", "topics", "link"
          ],
          "fuzziness": "AUTO",
          "prefix_length": 2
        }
      }
    }
  }, (err, data) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    const pureData = data.body.hits.hits.map(hit => hit._source)
    return res.status(200).json({ success: true, data: pureData })
  })
}

createInspection = async (req, res) => {

  await client.index({
    index: 'inspection-test',
    body: {
      "name": req.params.name,
      "created_by": req.params.created_by,
      "created_at": req.params.created_at,
      "finished_at": req.params.finished_at,
      "type": req.params.type,
      "sessions": [
        {
          "name": req.params.session.name,
          "assigned_to": req.params.session.assigned_to,
          "created_at": req.params.session.created_at,
          "finished_at": req.params.session.finished_at,
          "type": req.params.session.type,
          "checklist": req.params.session.checklist,
          "images": req.params.session.images,
          "start_end": req.params.session.start_end,
          "notes": req.params.session.notes,
          "signature": req.params.session.signature,
        }
      ]
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

finishInspection = async (req, res) => {

  await client.search({
    index: 'inspection-test',
    body: {
      query: {

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

createInspectionSession = async (req, res) => {

  await client.search({
    index: 'inspection-test',
    body: {
      query: {

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

updateInspectionSession = async (req, res) => {

  await client.search({
    index: 'inspection-test',
    body: {
      query: {

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


module.exports = {
  searchArticle
}