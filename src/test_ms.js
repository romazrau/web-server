const sql = require('mssql');

const config = {
    // user: 'sa',
    // password: 'P@ssw0rd',
    user: 'sa',
    password: 'everybodycanuse',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'SeaTurtleOnTheWay',
}
 
const h = async (page=1) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const result = await sql.query(`select *
        from [SeaTurtleOnTheWay].[Member].[tMember] 
        order by fId  desc
        offset  ${(page-1)*2} rows fetch next 2 rows only;`);
        return result.recordset;
        console.dir(result)
    } catch (err) {
        console.log(err);
    }
};


module.exports = h;