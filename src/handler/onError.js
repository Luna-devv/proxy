/**
 * Handle proxy errors
 */

module.exports = (err, req, res) => {
    res.writeHead(500)
    res.end()
}