import { userInfo } from 'backloggd-wrapper';

export default async function handler(req, res) {
    const { username } = req.query;

    if (!username)
        return res.status(400).json({ error: 'Username is required.' });

    try {
        const data = await userInfo(username);

        if (data?.avatarUrl) {
            try {
                const response = await fetch(data.avatarUrl);
                if (response.ok) {
                    const arrayBuffer = await response.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    const contentType = response.headers.get('content-type') || 'image/png';
                    
                    data.avatarUrl = `data:${contentType};base64,${buffer.toString('base64')}`;
                }
            } catch (imgError) {
                console.error("Error converting image:", imgError.message);
            }
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}