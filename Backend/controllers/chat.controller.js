import chat from "../utils/chat.js";


export const sendAndReceiveQuery = async (req, res, next) => {
    try {
        const { query } = req.body;
        console.log(query);
        if (!query || typeof query !== 'string' || query.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Query is required and must be a non-empty string',
            });
        }
        const response = await chat(query);
        res.status(200).json({
            success: true,
            data: {
                query,
                response,
            },
        });
    } catch (error) {
        console.error('Error in sendAndReceiveQuery:', error);
        next(error);
    }
};