import { neon } from '@netlify/neon';

export default async (req, context) => {
    // 只允许 POST 请求
    if (req.method !== 'POST') {
        return new Response("Method not allowed", { status: 405 });
    }
    
    try {
        const { username, time_used } = await req.json();
        
        // 使用 @netlify/neon 自动读取你在后台配置的 NETLIFY_DATABASE_URL 环境变量
        const sql = neon(); 
        
        // 插入数据库
        await sql`INSERT INTO leaderboard (username, time_used) VALUES (${username}, ${time_used})`;
        
        return new Response(JSON.stringify({ success: true }), { 
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