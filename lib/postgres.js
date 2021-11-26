const { pg } = require('../config')
const { Pool } = require('pg');
const pool = new Pool({connectionString:pg.connectingString});
const fetch = async(SQL,...values) =>{
    const client = await pool.connect()

    try{
        const { rows : [ row ] } = await client.query(SQL,values.length ? values : null)
        return row
    }
    finally{
         client.release();
    }
}

const fetchAll = async(SQL,...values) =>{
    const client =await pool.connect()

    try{
        const { rows } = await client.query(SQL,values.length ? values : null)
        return rows
    }
    finally{
         client.release();
    }
}


module.exports={
    fetch,fetchAll
}
