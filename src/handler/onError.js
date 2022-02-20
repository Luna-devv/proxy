/**
 * Handle proxy errors
 */

module.exports = (err, req, res) => {
    try {
        res.writeHead(500);
        res.end();
    } catch (e) {
        return;
    };
}