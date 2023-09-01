import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Vault = require('hashi-vault-js');

@Injectable()
export class VaultService {
  private token = process.env.VAULT_TOKEN;
  private vaultpath = process.env.VAULT_PATH;
  private vault = new Vault({
    https: false,
    baseUrl: `${process.env.VAULT_ADDR}/v1`,
    rootPath: `${process.env.VAULT_ADDR}/v1/kv`,
    timeout: 5000,
    proxy: false,
  });
  async checkStatus() {
    const status = await this.vault.healthCheck();
    console.log("checkStatus this.token",this.token);
    console.log("checkStatus this.vaultpath",this.vaultpath);
    console.log("checkStatus this.vault",JSON.stringify(this.vault));
    await this.vault.readKVEngineConfig(this.token);
    console.log("checkStatus status",JSON.stringify(status));
    return status;
  }
  async writePvtKey(secret: string, name: string, path?: string) {
    console.log("writePvtKey this.token",this.token);
    console.log("writePvtKey this.vaultpath",this.vaultpath);
    console.log("writePvtKey this.vault",JSON.stringify(this.vault));
    console.log("writePvtKey secret",secret);
    console.log("writePvtKey name",name);
    console.log("writePvtKey path",path);

    const createSecret = await this.vault.createKVSecret(
      this.token,
      //path ? path + `/${name}` : `ulp/identity-ms/private_keys/${name}`,
      this.vaultpath,
      secret,
    );
    console.log("writePvtKey createSecret",JSON.stringify(createSecret));
    return createSecret;
  }

  async readPvtKey(name: string, path?: string) {
    console.log("readPvtKey this.token",this.token);
    console.log("readPvtKey this.vaultpath",this.vaultpath);
    console.log("readPvtKey this.vault",JSON.stringify(this.vault));
    console.log("readPvtKey name",name);
    console.log("readPvtKey path",path);
    const read = await this.vault.readKVSecret(
      this.token,
      //path ? path + `/${name}` : `ulp/identity-ms/private_keys/${name}`,
      this.vaultpath
    );
    console.log("readPvtKey read",JSON.stringify(read));
    return read.data;
  }
}
