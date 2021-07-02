const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

fetchInspections = async (req, res) => {

  await client.search({
    index: 'test-index-inspections',
    body: {
      query: {
        "match_all": {}
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

module.exports = {
    fetchInspections
}