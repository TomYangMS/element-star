import { neon } from '@netlify/neon';

export default async (req, context) => {
    try {
        const sql = neon();
        
        // 获取用时最短的前 10 名
        const leaderboard = await sql`SELECT username, time_used FROM leaderboard ORDER BY time_used ASC LIMIT 10`;
        
        return new Response(JSON.stringify(leaderboard), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};