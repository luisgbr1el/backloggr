import { latestReview } from 'backloggd-wrapper';

export default async function handler(req, res) {
    const { username } = req.query;

    if (!username)
        return res.status(400).json({ error: 'Username is required.' });

    try {
        const data = await latestReview(username);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}