import PouchDB from '@craftzdog/pouchdb-core-react-native'
import HttpPouch from 'pouchdb-adapter-http'
import replication from '@verida/pouchdb-replication-react-native'
import mapreduce from 'pouchdb-mapreduce'
import * as PouchDBFind from "pouchdb-find"

PouchDB
    .plugin(HttpPouch)
    .plugin(replication)
    .plugin(mapreduce)
    .plugin(PouchDBFind)

import BaseDb from './base-db'

export default class PublicDatabase extends BaseDb {

    //constructor(dbHumanName: string, dbName: string, dataserver: any, did: string, permissions: PermissionsConfig, isOwner: boolean) {
    private _remoteDb: any

    public async init() {
        if (this._remoteDb) {
            return
        }
        await super.init()

        const databaseName = this.databaseName
        
        this._remoteDb = new PouchDB(this.dsn + this.databaseHash, {
            skip_setup: true
        })

        try {
            let info = await this._remoteDb.info()
            if (info.error && info.error == "not_found") {
                if (this.isOwner) {
                    await this.createDb()
                }
                else {
                    throw new Error(`Public database not found: ${databaseName}`)
                }
            }
        } catch(err) {
            if (this.isOwner) {
                await this.createDb()
            }
            else {
                throw new Error(`Public database not found: ${databaseName}`)
            }
        }

        this.db = this._remoteDb
    }

    public async getDb() {
        if (!this._remoteDb) {
            await this._init()
        }

        return this._remoteDb
    }

    public async info(): Promise<any> {
        await this.init()

        const info = {
            type: 'VeridaStorage',
            privacy: 'public',
            did: this.did,
            dsn: this.dsn,
            storageContext: this.storageContext,
            databaseName: this.databaseName,
            databasehash: this.databaseHash,
            remoteDb: this.db._remoteDb
        }

        return info
    }

}