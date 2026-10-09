# TotalViewer · 토탈뷰어

Try supported drawing, 3D and PCB files in your browser. Explore on-premises viewing, drawing registration and portal integration with synthetic demos. Enterprise delivery requires customer-specific integration and acceptance checks.

사내 통합뷰어, 도면등록관리와 ERP·MES·문서관리 뷰어 연동. 합성 자료 데모로 열람·개정 검토·승인 흐름을 확인하고 고객별 구축 범위를 협의하세요.

[Open the viewer](https://totalviewer.pages.dev/?utm_source=github&utm_medium=referral&utm_campaign=totalviewer_business) · [Business solutions](https://totalviewer.pages.dev/solutions) · [Interactive demo](https://totalviewer.pages.dev/demo/workplace) · [지원 형식](https://totalviewer.pages.dev/formats)

![TotalViewer introduction](https://totalviewer.pages.dev/press/totalviewer-ko.png)

## Open a drawing without installing CAD

Use the format guide to check compatibility, see common viewing problems, and download available synthetic samples. Basic viewing is limited to one file per day in the same browser; Pro does not remove format or device resource limits.

| File | Viewing guide |
| --- | --- |
| DXF | [Layers, text and fit-to-view](https://totalviewer.pages.dev/guides/en/dxf) · [한국어](https://totalviewer.pages.dev/formats/dxf) |
| DWG | [2D trial conversion and DXF alternatives](https://totalviewer.pages.dev/guides/en/dwg) · [한국어](https://totalviewer.pages.dev/formats/dwg) |
| STEP / STP | [3D model, parts and mesh conversion](https://totalviewer.pages.dev/guides/en/step) · [한국어](https://totalviewer.pages.dev/formats/step) |
| Gerber / Excellon | [PCB layers, drills and ZIP scope](https://totalviewer.pages.dev/guides/en/gerber) · [한국어](https://totalviewer.pages.dev/formats/gerber) |

[DXF 화면이 비거나 글자가 깨질 때](https://totalviewer.pages.dev/learn/dxf-empty-text-layers) · [DWG·DXF 파일 열기](https://totalviewer.pages.dev/learn/open-dwg-dxf-without-cad)

## Practical review checklists

Use these guides to check real review inputs, not just the filename. The registration demo uses synthetic data and does not execute a company approval workflow.

| Task | English | 한국어 |
| --- | --- | --- |
| STEP / STP / STL and units | [Choose a model and check units](https://totalviewer.pages.dev/guides/en/learn/step-stp-stl-differences) | [3D 형식·단위 확인](https://totalviewer.pages.dev/learn/step-stp-stl-differences) |
| Gerber ZIP and drill alignment | [Check fabrication layers](https://totalviewer.pages.dev/guides/en/learn/gerber-zip-layer-alignment) | [레이어·드릴 위치 확인](https://totalviewer.pages.dev/learn/gerber-zip-layer-alignment) |
| PDF search and drawing revisions | [Review a drawing PDF](https://totalviewer.pages.dev/guides/en/learn/pdf-drawing-review-checklist) | [PDF 개정 검토](https://totalviewer.pages.dev/learn/pdf-drawing-review-checklist) |
| Excel drawing register and REV | [Registration checklist and CSV](https://totalviewer.pages.dev/guides/en/learn/drawing-revision-register-checklist) | [엑셀·등록관리 체크리스트](https://totalviewer.pages.dev/learn/drawing-revision-register-checklist) |

[All English guides](https://totalviewer.pages.dev/guides/en/learn) · [한국어 가이드](https://totalviewer.pages.dev/learn)

## 기업 업무 활용

### 사내 도면 열람

대상: 생산 · 구매 · 품질 · 설계

업무 화면에서 도면을 열고, 필요한 페이지·레이어·부품을 확인하는 흐름을 만듭니다.

- PDF·2D CAD·3D·PCB 지원 범위 안의 통합 열람
- 검색·검토 표시·측정·두 도면 비교
- 전용 서버 처리와 사내 포털 연결

![사내 도면 열람 구성 예시](https://totalviewer.pages.dev/enterprise/intranet-viewer.png)

[직접 체험](https://totalviewer.pages.dev/demo/workplace) · [제공 구성](https://totalviewer.pages.dev/solutions#intranet)

직원 인증·자료 권한·서버 용량·백업은 고객 환경에 맞춰 구축하고 검수합니다.

### 등록·개정 검토

대상: 도면 관리자 · 설계 검토자

원본 선택, 변경안 확인, 이전 REV 비교, 담당자 승인과 등록 결과 확인을 연결합니다.

- 두 관리 엑셀의 셀 변경안 미리보기
- 이전 도면과 새 도면의 시각 차이 검토
- 이전 REV 보존과 등록 결과 재확인

![등록·개정 검토 구성 예시](https://totalviewer.pages.dev/enterprise/revision-review.png)

[직접 체험](https://totalviewer.pages.dev/demo/registration) · [제공 구성](https://totalviewer.pages.dev/solutions#registration)

등록 DB·엑셀 쓰기·공동 승인은 별도 업무 어댑터 구축 범위입니다. 공개 예제는 가상 자료입니다.

### 기존 시스템에 뷰어 연동

대상: ERP · MES · 문서관리 구축 업체

기존 화면의 도면 열기 버튼에서 열람·처리 상태·결과 조회를 연결하는 구성을 제안합니다.

- 기존 포털 안에 도면 열람 화면 배치
- 업로드·작업 상태·원본·결과·삭제 API 연동
- 검색·검토·비교를 업무 화면에 연결

![기존 시스템에 뷰어 연동 구성 예시](https://totalviewer.pages.dev/enterprise/portal-integration.png)

[직접 체험](https://totalviewer.pages.dev/demo/workplace) · [제공 구성](https://totalviewer.pages.dev/solutions#integration)

고객 인증·자료 접근권·API 어댑터와 사용권을 협의합니다. 공개 데모는 고객 API를 호출하지 않습니다.

## 로그인 없이 가상 자료로 체험

- [직원 업무 포털 체험](https://totalviewer.pages.dev/demo/workplace) — 예제 부서 역할, REV A/B 비교, 검토 메모, 목록 반영, 3D·PCB 열람과 가상 기록 CSV
- [원본·엑셀 등록 체험](https://totalviewer.pages.dev/demo/registration) — 두 엑셀 변경안, REV 불일치 보류, 예제 승인, 응답 유실 재확인
- [뷰어 고급 기능 체험](https://totalviewer.pages.dev/demo) — 합성 자료의 도면 비교, 3D 회전·측정·단면, PCB 레이어와 BOM 탐색

공개 데모는 가상 자료로 동작합니다. 직원 역할·검토 상태는 브라우저 화면의 예제이며 회사 인증·등록 DB·실제 공동 승인을 실행하지 않습니다.

## 이용 범위와 도입 문의

기본 보기는 같은 브라우저에서 하루 파일 1개 무료입니다. 파일·형상·기기 한도가 적용되며 DWG는 시험 보기입니다. Pro 실결제는 준비 중이고 Enterprise는 별도 구축·검수·계약으로 진행합니다.

문의는 [사이트의 비공개 문의 화면](https://totalviewer.pages.dev/contact?type=enterprise)에서 로그인 후 작성합니다. 본인과 운영자만 확인합니다. 회사 도면·계정·내부 주소를 공개 GitHub에 올리지 마세요.

[개인정보 처리](https://totalviewer.pages.dev/privacy) · [이용 약관](https://totalviewer.pages.dev/terms) · [소개·공유 자료](https://totalviewer.pages.dev/share) · [RSS updates](https://totalviewer.pages.dev/updates/feed.xml)

## 이 저장소의 자동 갱신

공개 사이트의 소개 자료를 하루 한 번 확인해 변경된 내용만 갱신합니다. 변경된 공개 URL은 IndexNow로 참여 검색엔진에 알립니다. 검색 색인·순위·방문자·수익을 보장하지 않습니다. Google 색인 생성 요청은 이 자동화에 포함되지 않습니다.

이 저장소에는 공개 소개 자료와 자동화 스크립트만 있습니다. TotalViewer 뷰어 제품의 소스·설치 패키지·고객 자료는 포함하지 않습니다. 자동화 스크립트의 MIT 라이선스는 뷰어 제품의 사용권을 부여하지 않습니다.

Public catalog updated: 2026-10-09
