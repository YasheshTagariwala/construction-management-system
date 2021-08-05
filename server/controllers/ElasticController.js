const {Client} = require('@elastic/elasticsearch')
const client = new Client({node: 'http://localhost:9200'})
const jwt = require('jwt-simple');
const {jwtSecret, jwtExpirationInterval} = require('../config');
const {DateTime} = require('luxon');

createInspection = async (req, res) => {

    await client.index({
            index: 'inspection-test',
            body: {
                "name": req.body.name,
                "created_by": req.body.created_by,
                "created_at": req.body.created_at,
                "finished_at": req.body.finished_at,
                "type": req.body.type,
                "sessions": req.body.sessions
            }
        }, (err, data) => {
            if (err) {
                return res.status(400).json({success: false, message: err})
            }
            // const pureData = data.body.hits.hits.map(hit => hit._source)
            return res.status(200).json({success: true})
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
            "script": {
                "inline": "ctx._source.sessions += [params.session]"
            },
            "params": {
                "session": req.params.new_session
            }
        }, (err, data) => {
            if (err) {
                return res.status(400).json({success: false, message: err})
            }
            const pureData = data.body.hits.hits.map(hit => hit._source)
            return res.status(200).json({success: true, data: pureData})
        }
    )

}

viewContractorsInspections = async (req, res) => {

    await client.search({
            index: 'inspection-test',
            body: {
                query: {
                    "term": {
                        "created_by": req.body.text
                    }
                }
            }
        }, (err, data) => {
            if (err) {
                return res.status(400).json({success: false, message: err})
            }
            const pureData = data.body.hits.hits.map(hit => hit._source)
            return res.status(200).json({success: true, data: pureData})
        }
    )

}

viewInspectorsInspections = async (req, res) => {

    // console.log("123 : "+req.body.text)

    await client.search({
            index: 'inspection-test',
            body: {
                query: {
                    term: {
                        "sessions.assigned_to": req.body.text
                    }
                }
            }
        }, (err, data) => {
            if (err) {
                return res.status(400).json({success: false, message: err})
            }
            const pureData = data.body.hits.hits.map(hit => hit._source)
            return res.status(200).json({success: true, data: pureData})
        }
    )

}

updateInspection = async (req, res) => {

    /*await client.update({
            index: 'inspection-test',
            id: req.body.id,
            body: {
                doc: req.body.updated_details
            }
        }, (err, data) => {
            if (err) {
                return res.status(400).json({success: false, message: err})
            }
            const pureData = data.body.hits.hits.map(hit => hit._source)
            return res.status(200).json({success: true, data: pureData})
        }
    )*/

    await client.updateByQuery({
            index: 'inspection-test',
            body: {
                script: {
                    inline: 'ctx._source.sessions[0].checklist.checked = "true"',
                    lang: 'painless'
                },
                query: {
                    term: {
                        "sessions[0].checklist.item": "Check for grading of sand, Mix proportion."
                    }
                }
            }
        }, (err, data) => {
            if (err) {
                return res.status(400).json({success: false, message: err})
            }
            // const pureData = data.body.hits.hits.map(hit => hit._source)
            return res.status(200).json({success: true})
        }
    )

}

loginUser = async (req, res) => {
    try {
        let inspectorEmail = "inspector@c360.com"
        let contractorEmail = "contractor@c360.com"
        let {email, password} = req.body
        if (email && password) {
            let user = null;
            const date = DateTime.local();
            const payload = {
                id: email === 'inspector@c360.com' ? 'inspector' : 'contractor',
                exp: +new Date(date.plus({minutes: jwtExpirationInterval}).toSeconds()),
                iat: +new Date(date.toSeconds()),
            };

            let token = jwt.encode(payload, jwtSecret);
            if (email === inspectorEmail && password === 'admin@123') {
                user = {
                    role: 'inspector',
                    userName: 'inspector',
                    token,
                    email: inspectorEmail
                }
            }
            if (email === contractorEmail && password === 'admin@123') {
                user = {
                    role: 'contractor',
                    userName: 'contractor',
                    token,
                    email: inspectorEmail
                }
            }
            if (user) {
                return res.status(200).json({success: true, data: user})
            } else {
                return res.status(400).json({success: false, message: 'User not found'})
            }
        } else {
            return res.status(400).json({success: false, message: 'User not found'})
        }
    } catch (e) {
        return res.status(400).json({success: false, message: e})
    }
}

module.exports = {
    createInspection,
    createInspectionSession,
    viewContractorsInspections,
    viewInspectorsInspections,
    updateInspection,
    loginUser
}
