import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {ORIGIN,validateCatalog,sitemapEntries,changedUrls,digest,renderReadme} from './promotion-sync-core.mjs';
import {INDEXNOW_KEY,INDEXNOW_ENDPOINT} from '../lib/discovery-config.mjs';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
async function get(path){const response=await fetch(ORIGIN+path,{redirect:'error',signal:AbortSignal.timeout(30000),headers:{'User-Agent':'TotalViewer-Public-Promotion/1.0'}});if(!response.ok)throw new Error(`${path}: HTTP ${response.status}`);const body=await response.text();if(body.length>1000000)throw new Error('Public response too large');return body;}
async function main(){
 const marker=JSON.parse(await readFile(resolve(root,'public-showcase.json'),'utf8'));
 if(marker.repository!=='kimsungsugit/totalviewer-showcase'||marker.publicMaterialOnly!==true)throw new Error('Run only inside the dedicated public showcase repository');
 const dryRun=process.argv.includes('--dry-run');
 const [catalogBody,sitemapBody]=await Promise.all([get('/promotion/catalog.json'),get('/sitemap.xml')]);
 const catalog=validateCatalog(JSON.parse(catalogBody)), entries=sitemapEntries(sitemapBody);
 let previous={};try{previous=JSON.parse(await readFile(resolve(root,'.promotion-state.json'),'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
 const catalogHash=digest(JSON.stringify(catalog)), changed=changedUrls(previous.entries,entries,previous.catalogHash!==catalogHash);
 const readme=renderReadme(catalog);
 if(dryRun){console.log(JSON.stringify({dryRun:true,publicUrlCount:Object.keys(entries).length,changedUrls:changed.length,catalogUpdated:catalog.updated}));return;}
 if(changed.length){
  const keyBody=(await get(`/${INDEXNOW_KEY}.txt`)).trim();if(keyBody!==INDEXNOW_KEY)throw new Error('Public IndexNow key validation failed');
  const response=await fetch(INDEXNOW_ENDPOINT,{method:'POST',redirect:'error',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host:new URL(ORIGIN).hostname,key:INDEXNOW_KEY,keyLocation:`${ORIGIN}/${INDEXNOW_KEY}.txt`,urlList:changed}),signal:AbortSignal.timeout(30000)});
  if(![200,202].includes(response.status))throw new Error(`IndexNow HTTP ${response.status}; state remains unchanged for a later retry`);
  console.log(JSON.stringify({indexNowStatus:response.status,submittedUrls:changed.length,verificationPending:response.status===202,indexingOrRankingGuaranteed:false}));
 }
 await writeFile(resolve(root,'README.md'),readme);
 await writeFile(resolve(root,'public-catalog.json'),JSON.stringify(catalog,null,2)+'\n');
 await writeFile(resolve(root,'.promotion-state.json'),JSON.stringify({catalogHash,entries},null,2)+'\n');
 console.log(JSON.stringify({changedUrls:changed.length,publicCatalogUpdated:catalog.updated}));
}
await main();
