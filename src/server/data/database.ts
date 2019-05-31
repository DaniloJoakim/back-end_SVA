import mariadb from 'mariadb';

class Database {

    constructor(){}

    protected conn: any;
    protected tran: boolean = false;

    async Open() {
        if (!this.conn) {
            if (process.env.NODE_ENV == 'development') {
                console.info("getConnection...");
            }
            const pool = mariadb.createPool({
                host: process.env.DB_HOST || 'localhost',
                port: process.env.DB_PORT || 3306,
                database: process.env.DB_NAME || 'teste',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || '',
                connectionLimit: process.env.DB_CONNECTION_LIMIT || 5
            });
            this.conn = await pool.getConnection();
        }
    };

    async BeginTran() {
        if (this.conn) {
            if (process.env.NODE_ENV == 'development') {
                console.info("beginTransaction...");
            }
            await this.conn.beginTransaction();
            this.tran = true;
        }
    };

    async CommitTran() {
        if (this.tran) {
            if (process.env.NODE_ENV == 'development') {
                console.info("commit...");
            }
            await this.conn.commit();
            this.tran = false;
        }
    };

    async RollbackTran() {
        if (this.conn && this.tran) {
            if (process.env.NODE_ENV == 'development') {
                console.info("rollback...");
            }
            await this.conn.rollback();
            this.tran = false;
        }
    };

    async Close() {
        try {
            await this.RollbackTran();
        } catch (err) {
            throw err;
        }
        finally {
            if (this.conn) {
                if (process.env.NODE_ENV == 'development') {
                    console.info("end...");
                }
                return this.conn.end();
            }
        }
    };

    async ExecSQL(sql: any, params: any = []) {
        if (process.env.NODE_ENV == 'development') {
            console.info(`SQL: ${sql}`);
            console.info(`PARAMS: ${params}`);
        }
        return await this.conn.query(sql, params);
    };
}

export default new Database();
