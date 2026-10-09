import {createHash} from 'node:crypto';
export const ORIGIN='https://totalviewer.pages.dev';
const clean=value=>String(value).replace(/[<>\[\]`|]/g,'').replace(/[\r\n]+/g,' ').trim();
const url=value=>{const parsed=new URL(value);if(parsed.origin!==ORIGIN||parsed.username||parsed.password)throw new Error('Only public TotalViewer URLs are allowed');return parsed;};
const knownFields=(item,fields)=>{if(!item||typeof item!=='object'||Object.keys(item).some(field=>!fields.includes(field)))throw new Error('Unknown fields cannot be mirrored to a public repository');};
export const digest=value=>createHash('sha256').update(value).digest('hex');
function discoveryUrl(value){const parsed=url(value);if(parsed.search||parsed.hash||/^\/(?:api|admin|login|signup|account|auth)(?:\/|$)/.test(parsed.pathname))throw new Error('Private or personalized URLs cannot be submitted');return parsed.href;}
export function validateCatalog(catalog){
 knownFields(catalog,['schemaVersion','updated','title','description','englishTitle','englishDescription','origin','policy','demoScope','cases','demos','links']);
 if(catalog.schemaVersion!==1||catalog.origin!==ORIGIN||!/^\d{4}-\d{2}-\d{2}$/.test(catalog.updated))throw new Error('Unsupported promotion catalog');
 for(const field of ['title','description','englishTitle','englishDescription','policy','demoScope'])if(typeof catalog[field]!=='string'||catalog[field].length>1000)throw new Error(`Invalid public field: ${field}`);
 const paths={website:'/',solutions:'/solutions',share:'/share',formats:'/formats',contact:'/contact?type=enterprise',feed:'/updates/feed.xml',privacy:'/privacy',terms:'/terms'};
 knownFields(catalog.links,Object.keys(paths));
 for(const [name,path] of Object.entries(paths))if(catalog.links?.[name]!==ORIGIN+path)throw new Error(`Unexpected public link: ${name}`);
 const diagrams={intranet:'intranet-viewer',registration:'revision-review',integration:'portal-integration'};
 if(!Array.isArray(catalog.cases)||catalog.cases.length!==3||new Set(catalog.cases.map(item=>item.id)).size!==3)throw new Error('Unexpected use cases');
 for(const item of catalog.cases){
  knownFields(item,['id','title','audience','outcome','features','scope','url','diagram','demo']);
  if(!Object.hasOwn(diagrams,item.id)||item.url!==`${ORIGIN}/solutions#${item.id}`||item.diagram!==`${ORIGIN}/enterprise/${diagrams[item.id]}.svg`)throw new Error('Unexpected case link');
  if(!['/demo/workplace','/demo/registration'].includes(url(item.demo).pathname)||url(item.demo).search||url(item.demo).hash)throw new Error('Unexpected demo link');
  for(const field of ['title','audience','outcome','scope'])if(typeof item[field]!=='string'||item[field].length>1000)throw new Error('Invalid case text');
  if(!Array.isArray(item.features)||item.features.length>10||item.features.some(item=>typeof item!=='string'||item.length>500))throw new Error('Invalid features');
 }
  if(!Array.isArray(catalog.demos)||catalog.demos.length!==3||new Set(catalog.demos.map(item=>item.url)).size!==3)throw new Error('Unexpected demos');
 for(const item of catalog.demos){knownFields(item,['title','url','description']);if(!['/demo/workplace','/demo/registration','/demo'].includes(url(item.url).pathname)||url(item.url).search||url(item.url).hash)throw new Error('Unexpected demo destination');for(const field of ['title','description'])if(typeof item[field]!=='string'||item[field].length>1000)throw new Error('Invalid demo text');}
 return catalog;
}
export function sitemapEntries(xml){
 if(!/<urlset\b/.test(xml)||xml.length>1000000)throw new Error('Expected a public XML sitemap');
 const entries={};
 for(const match of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)){
  const loc=match[1].match(/<loc>(.*?)<\/loc>/)?.[1]?.replaceAll('&amp;','&');
  if(!loc)throw new Error('Sitemap URL missing');
  entries[discoveryUrl(loc)]=match[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1]||'';
 }
 if(!Object.keys(entries).length||Object.keys(entries).length>5000)throw new Error('Invalid sitemap size');return entries;
}
export function changedUrls(previous,current,catalogChanged=false){
 const all=new Set([...Object.keys(previous||{}),...Object.keys(current)]);
 for(const item of all)discoveryUrl(item);
 const changed=[...all].filter(item=>previous?.[item]!==current[item]);
 if(catalogChanged)for(const path of ['/','/solutions','/demo/workplace','/demo/registration','/drawing-management','/pricing','/share'])if(Object.hasOwn(current,ORIGIN+path)&&!changed.includes(ORIGIN+path))changed.push(ORIGIN+path);
 return changed;
}
export function renderReadme(catalog){
 validateCatalog(catalog);
 const viewerGuides=`## Open a drawing without installing CAD\n\nUse the format guide to check compatibility, see common viewing problems, and download available synthetic samples. Basic viewing is limited to one file per day in the same browser; Pro does not remove format or device resource limits.\n\n| File | Viewing guide |\n| --- | --- |\n| DXF | [Layers, text and fit-to-view](${ORIGIN}/guides/en/dxf) · [한국어](${ORIGIN}/formats/dxf) |\n| DWG | [2D trial conversion and DXF alternatives](${ORIGIN}/guides/en/dwg) · [한국어](${ORIGIN}/formats/dwg) |\n| STEP / STP | [3D model, parts and mesh conversion](${ORIGIN}/guides/en/step) · [한국어](${ORIGIN}/formats/step) |\n| Gerber / Excellon | [PCB layers, drills and ZIP scope](${ORIGIN}/guides/en/gerber) · [한국어](${ORIGIN}/formats/gerber) |\n\n[DXF 화면이 비거나 글자가 깨질 때](${ORIGIN}/learn/dxf-empty-text-layers) · [DWG·DXF 파일 열기](${ORIGIN}/learn/open-dwg-dxf-without-cad)\n`;
 return `# TotalViewer · 토탈뷰어\n\n${clean(catalog.englishDescription)}\n\n${clean(catalog.description)}\n\n[Open the viewer](${ORIGIN}/?utm_source=github&utm_medium=referral&utm_campaign=totalviewer_business) · [Business solutions](${catalog.links.solutions}) · [Interactive demo](${ORIGIN}/demo/workplace) · [지원 형식](${catalog.links.formats})\n\n![TotalViewer introduction](${ORIGIN}/press/totalviewer-ko.png)\n\n${viewerGuides}\n## Practical review checklists\n\nUse these guides to check real review inputs, not just the filename. The registration demo uses synthetic data and does not execute a company approval workflow.\n\n| Task | English | 한국어 |\n| --- | --- | --- |\n| STEP / STP / STL and units | [Choose a model and check units](${ORIGIN}/guides/en/learn/step-stp-stl-differences) | [3D 형식·단위 확인](${ORIGIN}/learn/step-stp-stl-differences) |\n| Gerber ZIP and drill alignment | [Check fabrication layers](${ORIGIN}/guides/en/learn/gerber-zip-layer-alignment) | [레이어·드릴 위치 확인](${ORIGIN}/learn/gerber-zip-layer-alignment) |\n| PDF search and drawing revisions | [Review a drawing PDF](${ORIGIN}/guides/en/learn/pdf-drawing-review-checklist) | [PDF 개정 검토](${ORIGIN}/learn/pdf-drawing-review-checklist) |\n| Excel drawing register and REV | [Registration checklist and CSV](${ORIGIN}/guides/en/learn/drawing-revision-register-checklist) | [엑셀·등록관리 체크리스트](${ORIGIN}/learn/drawing-revision-register-checklist) |\n\n[All English guides](${ORIGIN}/guides/en/learn) · [한국어 가이드](${ORIGIN}/learn)\n\n## 기업 업무 활용\n\n${catalog.cases.map(item=>`### ${clean(item.title)}\n\n대상: ${clean(item.audience)}\n\n${clean(item.outcome)}\n\n${item.features.map(feature=>'- '+clean(feature)).join('\n')}\n\n![${clean(item.title)} 구성 예시](${item.diagram.replace(/\.svg$/,'.png')})\n\n[직접 체험](${item.demo}) · [제공 구성](${item.url})\n\n${clean(item.scope)}`).join('\n\n')}\n\n## 로그인 없이 가상 자료로 체험\n\n${catalog.demos.map(item=>`- [${clean(item.title)}](${item.url}) — ${clean(item.description)}`).join('\n')}\n\n${clean(catalog.demoScope)}\n\n## 이용 범위와 도입 문의\n\n${clean(catalog.policy)}\n\n문의는 [사이트의 비공개 문의 화면](${catalog.links.contact})에서 로그인 후 작성합니다. 본인과 운영자만 확인합니다. 회사 도면·계정·내부 주소를 공개 GitHub에 올리지 마세요.\n\n[개인정보 처리](${catalog.links.privacy}) · [이용 약관](${catalog.links.terms}) · [소개·공유 자료](${catalog.links.share}) · [RSS updates](${catalog.links.feed})\n\n## 이 저장소의 자동 갱신\n\n공개 사이트의 소개 자료를 하루 한 번 확인해 변경된 내용만 갱신합니다. 변경된 공개 URL은 IndexNow로 참여 검색엔진에 알립니다. 검색 색인·순위·방문자·수익을 보장하지 않습니다. Google 색인 생성 요청은 이 자동화에 포함되지 않습니다.\n\n이 저장소에는 공개 소개 자료와 자동화 스크립트만 있습니다. TotalViewer 뷰어 제품의 소스·설치 패키지·고객 자료는 포함하지 않습니다. 자동화 스크립트의 MIT 라이선스는 뷰어 제품의 사용권을 부여하지 않습니다.\n\nPublic catalog updated: ${catalog.updated}\n`;
}
