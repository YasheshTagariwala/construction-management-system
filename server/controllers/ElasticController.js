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

  await client.search({
    index: 'inspection-test',
    body: {
      query: {
        
      }
    }
  }, (err, data) => {
    if (err) {
      return res.status(400).json({success: false, error: err })
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
      return res.status(400).json({success: false, error: err })
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
      return res.status(400).json({success: false, error: err })
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
      return res.status(400).json({success: false, error: err })
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
        
      }
    }
  }, (err, data) => {
    if (err) {
      return res.status(400).json({success: false, error: err })
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
        
      }
    }
  }, (err, data) => {
    if (err) {
      return res.status(400).json({success: false, error: err })
    }
    const pureData = data.body.hits.hits.map(hit => hit._source)
    return res.status(200).json({ success: true, data: pureData })
  }
  )

}


module.exports = {
  searchArticle
}