# Siriraj CMT 2025 — ตารางตรวจสอบก่อน seed

ถอดจาก "คู่มือการให้ยาเคมีบำบัด ศิริราช Update 2025" หมวด CMT Summary (หน้า 4–30) ลงใน `api/_siriraj2025.js`

- regimens ใหม่: **138** (drug rows 468)
- ตาราง CMT Summary ไม่มี premedication → ไม่ได้เติมให้ (ต่างจาก seed เดิมที่มี ondansetron/dexa)
- `type` (IPD/OPD) ไม่อยู่ในตาราง PDF — เป็นการเดาของผู้ถอด ต้องตรวจทุกตัว
- หน่วยใหม่ที่เพิ่มในแอป: `mcg/m2`, `mg/kg/day`; หมวดใหม่: Hodgkin, CNS lymphoma, Burkitt, NK/T lymphoma, Aplastic anemia, HLH
- การ seed (POST /api/seed) **ลบ regimen เดิมทั้งหมดใน MongoDB ก่อน** แล้วใส่ BUILTIN + SIRIRAJ_2025 ใหม่ — ถ้ามี regimen ที่เพิ่มเองผ่านหน้า admin จะหาย

## ⚠ จุดที่ต้องตรวจเป็นพิเศษ (ถอดตาม PDF แต่ดูผิดปกติ)

- **APML4: ATRA-CMT-ATO Maintenance (every 12 wk)** (Siriraj CMT 2025 p.8) — Methotrexate: 5–15 mg/m2 (ตามตาราง PDF — ตรวจสอบ daily/weekly)
- **APML4: ATRA-CMT-ATO Maintenance (every 12 wk)** (Siriraj CMT 2025 p.8) — Mercaptopurine: 50–90 mg/m2 (ตามตาราง PDF — ตรวจสอบ daily/weekly)
- **BV-CHP** (Siriraj CMT 2025 p.16) — Vincristine: ตาราง PDF ระบุ vincristine ใน BV-CHP — ตรวจสอบ (ECHELON-2 ไม่มี vincristine)
- **DDGP** (Siriraj CMT 2025 p.25) — Cisplatin: วันตามตาราง PDF — ตรวจสอบ (แถว day อาจเลื่อน)
- **DDGP** (Siriraj CMT 2025 p.25) — Gemcitabine: วันตามตาราง PDF — ตรวจสอบ (แถว day อาจเลื่อน)
- **DDGP** (Siriraj CMT 2025 p.25) — L-asparaginase: PDF ไม่ระบุวัน — ตรวจสอบ

## ไม่ได้เพิ่ม เพราะมีใน seed เดิมแล้ว

| PDF | seed เดิม |
|---|---|
| 7+3 (Idarubicin) p.6 | 3+7 (Idarubicin+Cytarabine) |
| HDAC p.7 | HiDAC (High-dose Ara-C) |
| Azacytidine p.7 | Azacytidine |
| ATRA-ATO Induction p.7 | ATRA+ATO — APL Low/Int risk |
| ATRA-CMT Induction p.7 | ATRA+IDA — APL High risk |
| Hyper-CVAD cycle 1,3,5,7 / 2,4,6,8 p.5 | Hyper-CVAD — Part A / Part B |
| ABVD p.13 | ABVD |
| BR p.16 | BR (Bendamustine+Rituximab) |
| CHOP p.16 | CHOP |
| R-CHOP p.19 | R-CHOP |
| Rituximab p.19 | Rituximab Monotherapy (CLL) |
| ESHAP p.18 | ESHAP |
| GDP p.18 | GDP |
| ICE p.18 | ICE |
| HD-MTX / HD-MTX with HD-Ara-C / HD-MTX CNS prophylaxis p.21 | HD-MTX ×3 |
| CODOX-M p.23 | CODOX-M (Burkitt Lymphoma) |
| IVAC p.23 | IVAC (Burkitt Lymphoma) |
| CyDex p.27 | Cd (Cyclophosphamide+Dexamethasone) |
| MP p.27 | MP |
| VD p.27 | Vd |
| Td p.27 | Td |
| Rd p.27 | Rd |
| CTD p.27 | CTd |
| MPT p.28 | MPT |
| VRD p.28 | VRd |
| Dara-Vd p.28 | DVd |
| Dara-Rd p.28 | DRd |
| DT-PACE p.29 | DT-PACE (Myeloma Salvage) |

## ซ้ำซ้อนบางส่วน / หมายเหตุ

- ALL protocol phase I p.4 — seed มี "ALL Induction Phase I (D1–14)" ซึ่งครอบคลุมแค่ D1–14; เพิ่ม "ALL protocol phase I (adapted GMALL)" ฉบับเต็มแล้ว (ซ้ำซ้อนบางส่วน — เลือกเก็บอันเดียว)
- Chlorambucil p.24 — seed มี "Chlorambucil" เดี่ยว; PDF เป็น CP (chlorambucil+prednisolone) จึงเพิ่ม CP แยก
- DA-EPOCH ปรากฏทั้งหน้า 17 (NHL) และ 23 (Burkitt) — ใส่ครั้งเดียวใน cat Lymphoma

## รายการทั้งหมด (เทียบกับ PDF ทีละหน้า)

### ALL

**ALL protocol phase I (adapted GMALL)** — abbr `ALL Ph I GMALL`, IPD — _Siriraj CMT 2025 p.4_
- Vincristine 1.4 mg/m2 IV push — D1, D8, D15, D22
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV in 10 min — D1, D8, D15, D22 [ระวัง extravasation]
- L-asparaginase 5000 IU/m2 ใน NSS 500 mL IV in 4 hr — D15–D28
- Prednisolone 60 mg/m2 PO — D1–D14 (note: หรือ Dexamethasone 10 mg/m2)
- Prednisolone 40 mg/m2 PO — D15–D28 (note: หรือ Dexamethasone 6 mg/m2)

**B-cell ALL induction cycle 1 (adapted MRC UKALL XII/ECOG E2993)** — abbr `B-ALL Ind C1`, IPD — _Siriraj CMT 2025 p.4_
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV in 10 min — D1, D8, D15, D22 [ระวัง extravasation]
- Vincristine 1.4 mg/m2 IV push — D1, D8, D15, D22
- L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV in 4 hr — D18, D20, D22, D24, D26, D28
- Dexamethasone 10 mg/m2/day (max 20 mg) PO — D1–D7 (note: max 20 mg/day; งดถ้าอายุ ≥55 ปี)
- Rituximab (considered) 375 mg/m2 ใน NSS 250–500 mL Standard infusion regimen — D8, D15
- Cytarabine (IT): 70 mg intrathecal — D1
- Methotrexate (IT): 12.5 mg intrathecal — D14

**B-cell ALL induction cycle 2 (adapted MRC UKALL XII/ECOG E2993)** — abbr `B-ALL Ind C2`, IPD — _Siriraj CMT 2025 p.4_
- Cyclophosphamide 1000 mg/m2 (max 1500 mg) ใน NSS 250 mL IV in 2 hr — D1, D29 (note: max 1,500 mg; อายุ >60 ปี ใช้ 800 mg/m2)
- Cytarabine 75 mg/m2 ใน NSS 100 mL IV in 30 min — D1–D4, D8–D11, D29–D32, D36–D39
- Mercaptopurine 60 mg/m2 PO — D1–D14, D29–D42
- L-asparaginase 5000 IU/m2 ใน NSS 500 mL IV in 4 hr — D15, D17, D19, D21, D23, D25 (note: งดถ้าอายุ ≥55 ปี)
- Rituximab (considered) 375 mg/m2 ใน NSS 250–500 mL Standard infusion regimen — D8, D15
- Methotrexate (IT): 12.5 mg intrathecal — D1, D8, D15, D22

**Blinatumomab — consolidation in B-ALL** — abbr `Blina consol`, IPD, cycle 28 วัน — _Siriraj CMT 2025 p.4_
- Blinatumomab 15 mcg/m2 Continuous IV infusion — D1–D28 (note: หรือ 28 mcg/day flat dose)

**Inotuzumab (with mini-hyper-CVD) — cycle 1** — abbr `Ino+miniCVD C1`, IPD — _Siriraj CMT 2025 p.5_
- Inotuzumab ozogamicin 0.6 mg/m2 ใน NSS 50 mL IV in 1 hr — D2
- Inotuzumab ozogamicin 0.3 mg/m2 ใน NSS 50 mL IV in 1 hr — D8

**Inotuzumab (with mini-hyper-CVD) — cycle 2–4** — abbr `Ino+miniCVD C2-4`, IPD — _Siriraj CMT 2025 p.5_
- Inotuzumab ozogamicin 0.3 mg/m2 ใน NSS 50 mL IV in 1 hr — D2, D8

**Mini-hyper-CVD — cycle 1,3,5,7** — abbr `miniCVD-A`, IPD — _Siriraj CMT 2025 p.5_
- Cyclophosphamide 150 mg/m2 ใน NSS 100 mL IV in 1 hr every 12 hr — D1–D3
- Vincristine: 2 mg IV push — D1, D8
- Dexamethasone: 20 mg/day PO หรือ IV — D1–D4, D11–D14

**Mini-hyper-CVD — cycle 2,4,6,8** — abbr `miniCVD-B`, IPD — _Siriraj CMT 2025 p.5_
- Methotrexate 250 mg/m2 ใน D5W 500 mL IV in 3 hr — D1
- Leucovorin 15 mg/m2 IV push every 6 hr × 8 doses — Start D2 [เริ่ม 12 hr หลัง MTX หมด; หยุดเมื่อ MTX level <0.05 µmol/L] (note: เพิ่มเป็น 50 mg ถ้า MTX level สูง)
- Cytarabine 500 mg/m2 ใน NSS 250 mL IV in 2 hr every 12 hr — D2–D3
- Methotrexate (IT): 12 mg intrathecal — D2
- Cytarabine (IT): 100 mg intrathecal — D8

**Nelarabine — after CMT induction in T-ALL** — abbr `Nelarabine 650`, IPD — _Siriraj CMT 2025 p.5_
- Nelarabine 650 mg/m2 IV drip in 2 hr — D1–D5

**TPOG HR/VHR ALL — phase I** — abbr `TPOG ALL Ph I`, IPD — _Siriraj CMT 2025 p.6_
- Vincristine 1.5 mg/m2 IV push — D1, D8, D15, D22
- Prednisolone 30 mg/m2 PO BID (per dose) — D1–D28
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV in 10 min — D1, D8, D15, D22 [ระวัง extravasation]
- L-asparaginase 10000 IU/m2 ใน NSS 500 mL IV in 4 hr — D4, D6, D8, D10, D12, D14
- Methotrexate (IT): 15 mg intrathecal — D1, D8, D29 (+D15, D22 ถ้า CNS-3 หรือ traumatic tap)

**TPOG VHR ALL — phase II** — abbr `TPOG ALL Ph II`, IPD — _Siriraj CMT 2025 p.6_
- Cyclophosphamide 1000 mg/m2 ใน NSS 250 mL IV in 2 hr — D1, D29
- Mesna 250 mg/m2 ใน D5W 20 mL IV in 15 min at hr 0, 4, 8 of cyclophosphamide (per dose) — D1, D29
- Cytarabine 75 mg/m2 ใน NSS 100 mL IV in 30 min — D1–D4, D8–D11, D29–D32, D36–D39
- Mercaptopurine 60 mg/m2 PO — D1–D14, D29–D42
- L-asparaginase 25000 IU/m2 ใน NSS 500 mL IV in 4 hr — D15, D22, D43, D50
- Vincristine 1.5 mg/m2 IV push — D15, D22, D43, D50
- Methotrexate (IT): 15 mg intrathecal — D1, D8, D15, D22

**TPOG VHR ALL — phase III** — abbr `TPOG ALL Ph III`, IPD — _Siriraj CMT 2025 p.6_
- Vincristine 1.5 mg/m2 IV push — D1, D15, D29, D43
- Methotrexate 5000 mg/m2 ใน D5W 1,000 mL IV in 24 hr — D1, D15, D29, D43
- Leucovorin 15 mg/m2 IV push every 6 hr × 8 doses — Start D2, D16, D30, D44 [เริ่ม 12 hr หลัง MTX หมด; หยุดเมื่อ MTX level <0.05 µmol/L] (note: เพิ่มเป็น 50 mg ถ้า MTX level สูง)
- Mercaptopurine 25 mg/m2 PO — D1–D56
- Methotrexate (IT): 15 mg intrathecal — D1, D29

### AML

**7+3 (Daunorubicin+Cytarabine)** — abbr `7+3 DNR`, IPD — _Siriraj CMT 2025 p.6_
- Cytarabine 100 mg/m2 ใน NSS 500 mL IV in 12 hr — D1–D7 (note: 100–200 mg/m2)
- Daunorubicin 60 mg/m2 IV slowly push — D1–D3 [ระวัง leak] (note: 60–90 mg/m2)

**7+3 (Mitoxantrone+Cytarabine)** — abbr `7+3 Mito`, IPD — _Siriraj CMT 2025 p.6_
- Cytarabine 100 mg/m2 ใน NSS 500 mL IV in 12 hr — D1–D7 (note: 100–200 mg/m2)
- Mitoxantrone 12 mg/m2 IV slowly push — D1–D3 [ระวัง leak]

**7+3 (Doxorubicin+Cytarabine)** — abbr `7+3 Doxo`, IPD — _Siriraj CMT 2025 p.6_
- Cytarabine 100 mg/m2 ใน NSS 500 mL IV in 12 hr — D1–D7 (note: 100–200 mg/m2)
- Doxorubicin 45 mg/m2 IV slowly push — D1–D3 [ระวัง leak]

### MDS/AML

**Azacytidine + Venetoclax** — abbr `Aza+Ven`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.7_
- Azacytidine 75 mg/m2 SC — D1–D7 (note: NED; ใบกำกับ)
- Venetoclax: 400 mg/day PO (ramp-up ใน dose แรก) — D1–D28

**Decitabine** — abbr `Decitabine`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.7_
- Decitabine 20 mg/m2 ใน NSS 100 mL IV in 1 hr — D1–D5

**Decitabine + Venetoclax** — abbr `Dec+Ven`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.7_
- Decitabine 20 mg/m2 ใน NSS 100 mL IV in 1 hr — D1–D5
- Venetoclax: 400 mg/day PO (ramp-up ใน dose แรก) — D1–D28

### AML

**IDAC (Intermediate-dose Ara-C)** — abbr `IDAC`, IPD — _Siriraj CMT 2025 p.7_
- Cytarabine 1500 mg/m2 ใน NSS 250 mL IV in 3 hr every 12 hr — D1, D3, D5 (total 6 doses)

**LDAC (Low-dose Ara-C)** — abbr `LDAC`, OPD — _Siriraj CMT 2025 p.7_
- Cytarabine: 40 mg SC — D1–D10

**LDAC + Venetoclax** — abbr `LDAC+Ven`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.7_
- Cytarabine: 40 mg SC — D1–D10
- Venetoclax: 400 mg/day PO (ramp-up ใน dose แรก) — D1–D28

### MDS/AML

**G-DEC (Filgrastim + Decitabine)** — abbr `G-DEC`, OPD — _Siriraj CMT 2025 p.7_
- Filgrastim 100 mcg/m2 SC — D0–D5
- Decitabine 5 mg/m2 ใน NSS 50 mL IV in 30 min — D1–D5

### APL

**ATO monotherapy** — abbr `ATO mono`, IPD — _Siriraj CMT 2025 p.7_
- Arsenic trioxide 0.15 mg/kg ใน NSS 250 mL IV in 2 hr — Start D1 until CR [monitor K, Mg, QTc]

**ATRA monotherapy** — abbr `ATRA mono`, IPD — _Siriraj CMT 2025 p.7_
- ATRA 45 mg/m2/day PO every 12 hr — Start D1 until CR (note: ห้ามให้ทาง NG tube)

**ATRA-ATO Consolidation (total 28 weeks)** — abbr `ATRA-ATO consol`, OPD — _Siriraj CMT 2025 p.7_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D15 every 4 wk
- Arsenic trioxide 0.15 mg/kg ใน NSS 250 mL IV drip in 2 hr — D1–D5, D8–D12, D15–D19, D22–D26 every 8 wk [monitor K, Mg, QTc]

**ATRA-CMT Consolidation C1 — High risk** — abbr `ATRA-CMT C1 HR`, IPD — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D15
- Idarubicin 5 mg/m2 ใน NSS 50 mL IV in 10 min — D1–D4 [ระวัง extravasation]
- Cytarabine 1000 mg/m2 ใน NSS 250 mL IV drip in 3 hr — D1–D4

**ATRA-CMT Consolidation C2 — High risk** — abbr `ATRA-CMT C2 HR`, IPD — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D15
- Mitoxantrone 10 mg/m2 ใน NSS 50 mL IV in 15 min — D1–D5

**ATRA-CMT Consolidation C3 — High risk** — abbr `ATRA-CMT C3 HR`, IPD — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D15
- Idarubicin 12 mg/m2 ใน NSS 50 mL IV in 10 min — D1 [ระวัง extravasation]
- Cytarabine 150 mg/m2 ใน NSS 500 mL IV drip in 8 hr — D1–D4

**ATRA-CMT Consolidation C1 — Intermediate risk** — abbr `ATRA-CMT C1 IR`, IPD — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D15
- Idarubicin 7 mg/m2 ใน NSS 50 mL IV in 10 min — D1–D4 [ระวัง extravasation]

**ATRA-CMT Consolidation C2 — Intermediate risk** — abbr `ATRA-CMT C2 IR`, IPD — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D15
- Mitoxantrone 10 mg/m2 ใน NSS 50 mL IV in 15 min — D1–D3

**ATRA-CMT Consolidation C3 — Intermediate risk** — abbr `ATRA-CMT C3 IR`, IPD — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D15
- Idarubicin 12 mg/m2 ใน NSS 50 mL IV in 10 min — D1–D2 [ระวัง extravasation]

**ATRA-CMT Consolidation C1 — Low risk** — abbr `ATRA-CMT C1 LR`, IPD — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D15
- Idarubicin 5 mg/m2 ใน NSS 50 mL IV in 10 min — D1–D4 [ระวัง extravasation]

**ATRA-CMT Consolidation C2 — Low risk** — abbr `ATRA-CMT C2 LR`, IPD — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D15
- Mitoxantrone 10 mg/m2 ใน NSS 50 mL IV in 15 min — D1–D3

**ATRA-CMT Consolidation C3 — Low risk** — abbr `ATRA-CMT C3 LR`, IPD — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D15
- Idarubicin 12 mg/m2 ใน NSS 50 mL IV in 10 min — D1 [ระวัง extravasation]

**ATRA-CMT Maintenance (2 years, every 12 wk)** — abbr `ATRA-CMT maint`, OPD, cycle 12 สัปดาห์ — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D15
- Methotrexate 15 mg/m2 PO — Weekly
- Mercaptopurine 90 mg/m2 PO — Daily

**APML4: ATRA-CMT-ATO Induction** — abbr `APML4 Ind`, IPD — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — Start D1 until CR
- Idarubicin 12 mg/m2 ใน NSS 50 mL IV in 10 min — D2, D4, D6, D8 [ระวัง extravasation]
- Arsenic trioxide 0.15 mg/kg ใน NSS 250 mL IV drip in 2 hr — D9–D36 [monitor K, Mg, QTc]

**APML4: ATRA-CMT-ATO Consolidation — cycle 1** — abbr `APML4 Consol C1`, OPD — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D28
- Arsenic trioxide 0.15 mg/kg ใน NSS 250 mL IV drip in 2 hr — D1–D28 [monitor K, Mg, QTc]

**APML4: ATRA-CMT-ATO Consolidation — cycle 2** — abbr `APML4 Consol C2`, OPD — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D7, D15–D21, D29–D35
- Arsenic trioxide 0.15 mg/kg ใน NSS 250 mL IV drip in 2 hr — D1–D5, D8–D12, D15–D19, D22–D26, D29–D33 [monitor K, Mg, QTc]

**APML4: ATRA-CMT-ATO Maintenance (every 12 wk)** — abbr `APML4 maint`, OPD, cycle 12 สัปดาห์ — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO — D1–D14
- Methotrexate 5 mg/m2 PO — Daily except D1–D14 (note: 5–15 mg/m2 (ตามตาราง PDF — ตรวจสอบ daily/weekly))
- Mercaptopurine 50 mg/m2 PO — Weekly except D1–D14 (note: 50–90 mg/m2 (ตามตาราง PDF — ตรวจสอบ daily/weekly))

**APOLLO: ATRA-ATO Induction (+idarubicin)** — abbr `APOLLO Ind`, IPD — _Siriraj CMT 2025 p.8_
- ATRA 45 mg/m2/day PO every 12 hr — Start D1 until CR (up to D60)
- Idarubicin 12 mg/m2 ใน NSS 50 mL IV in 10 min — D1, D3 [ระวัง extravasation]
- Arsenic trioxide 0.15 mg/kg ใน NSS 250 mL IV drip in 2 hr — Start D5 until CR (up to D60) [monitor K, Mg, QTc]

**APOLLO: ATRA-ATO Consolidation — cycle 1–3** — abbr `APOLLO Consol C1-3`, OPD — _Siriraj CMT 2025 p.9_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D14, D29–D42
- Arsenic trioxide 0.15 mg/kg ใน NSS 250 mL IV drip in 2 hr — D1–D5, D8–D12, D15–D19, D22–D26 [monitor K, Mg, QTc]

**APOLLO: ATRA-ATO Consolidation — cycle 4** — abbr `APOLLO Consol C4`, OPD — _Siriraj CMT 2025 p.9_
- ATRA 45 mg/m2/day PO every 12 hr — D1–D14
- Arsenic trioxide 0.15 mg/kg ใน NSS 250 mL IV drip in 2 hr — D1–D5, D8–D12, D15–D19, D22–D26 [monitor K, Mg, QTc]

### ALL

**ALL-REZ BFM protocol — phase F1** — abbr `ALL-REZ F1`, IPD — _Siriraj CMT 2025 p.9_
- Vincristine 1.5 mg/m2 IV push — D1, D6
- Methotrexate 1000 mg/m2 ใน D5W 1,000 mL IV in 36 hr — D1
- Leucovorin 15 mg/m2 IV หรือ PO every 6 hr (6 doses) — D2–D3
- L-asparaginase 10000 IU/m2 ใน NSS 500 mL IV in 4 hr — D4
- Dexamethasone 20 mg/m2 PO — D1–D5
- Methotrexate (IT): 12 mg intrathecal — D1
- Cytarabine (IT): 30 mg intrathecal — D1
- Hydrocortisone (IT): 15 mg intrathecal — D1

**ALL-REZ BFM protocol — phase F2** — abbr `ALL-REZ F2`, IPD — _Siriraj CMT 2025 p.9_
- Vincristine 1.5 mg/m2 IV push — D1
- Cytarabine 3000 mg/m2 ใน NSS 250 mL IV drip in 3 hr every 12 hr (4 doses) — D1, D2
- L-asparaginase 10000 IU/m2 ใน NSS 500 mL IV in 4 hr — D4
- Dexamethasone 20 mg/m2 PO — D1–D5
- Methotrexate (IT): 12 mg intrathecal — D1
- Cytarabine (IT): 30 mg intrathecal — D1
- Hydrocortisone (IT): 15 mg intrathecal — D1

**Blinatumomab (R/R B-ALL) — cycle 1** — abbr `Blina R/R C1`, IPD — _Siriraj CMT 2025 p.9_
- Blinatumomab: 9 mcg/day continuous IV infusion — D1–D7
- Blinatumomab: 28 mcg/day continuous IV infusion — D8–D28

**Blinatumomab (R/R B-ALL) — cycle 2** — abbr `Blina R/R C2`, IPD — _Siriraj CMT 2025 p.9_
- Blinatumomab: 28 mcg/day continuous IV infusion — D1–D28

### AML

**FLAG** — abbr `FLAG`, IPD — _Siriraj CMT 2025 p.10_
- Fludarabine 30 mg/m2 ใน NSS 50 mL IV in 30 min — D1–D5
- Cytarabine 2000 mg/m2 ใน NSS 250 mL IV in 3 hr — D1–D5 [เริ่ม 4 hr หลัง fludarabine หมด]
- Filgrastim: 300 mcg SC — Start D0 until ANC >1,000/mm3

**FLAG-IDA** — abbr `FLAG-IDA`, IPD — _Siriraj CMT 2025 p.10_
- Fludarabine 30 mg/m2 ใน NSS 50 mL IV in 30 min — D1–D4
- Cytarabine 2000 mg/m2 ใน NSS 250 mL IV in 3 hr — D1–D4 [เริ่ม 4 hr หลัง fludarabine หมด]
- Idarubicin 12 mg/m2 ใน NSS 50 mL IV in 10 min — D2–D4 [ระวัง extravasation]
- Filgrastim: 300 mcg SC — Start D0 until ANC >1,000/mm3

### ALL

**Inotuzumab (R/R B-ALL)** — abbr `Ino R/R`, IPD — _Siriraj CMT 2025 p.10_
- Inotuzumab ozogamicin 0.8 mg/m2 ใน NSS 50 mL IV in 1 hr — D1
- Inotuzumab ozogamicin 0.5 mg/m2 ใน NSS 50 mL IV in 1 hr — D8, D15

### AML

**MEC** — abbr `MEC`, IPD — _Siriraj CMT 2025 p.10_
- Mitoxantrone 8 mg/m2 ใน NSS 50 mL IV in 10 min — D1–D5
- Etoposide 100 mg/m2 ใน NSS 500 mL IV in 1 hr — D1–D5
- Cytarabine 1000 mg/m2 ใน NSS 250 mL IV in 3 hr — D1–D5

### ALL

**MECA** — abbr `MECA`, IPD — _Siriraj CMT 2025 p.10_
- Mitoxantrone 8 mg/m2 IV push — D1–D5
- Etoposide 100 mg/m2 ใน NSS 500 mL IV in 1 hr — D1–D3
- Carboplatin 200 mg/m2 ใน NSS 250 mL IV in 2 hr — D7–D8
- Cytarabine 500 mg/m2 ใน NSS 250 mL IV in 2 hr every 12 hr — D7–D8
- Prednisolone 1 mg/kg/day PO — D1–D28 (note: ในผู้ป่วย ALL)

**Nelarabine (R/R T-ALL)** — abbr `Nelarabine 1500`, IPD — _Siriraj CMT 2025 p.10_
- Nelarabine 1500 mg/m2 IV drip in 2 hr — D1, D3, D5

### AML

**S-HAM** — abbr `S-HAM`, IPD — _Siriraj CMT 2025 p.10_
- Cytarabine 1000 mg/m2/day ใน NSS 250 mL IV in 3 hr every 12 hr — D1, D2, D8, D9 (note: 1–3 g/m2/day)
- Mitoxantrone 10 mg/m2/day ใน NSS 50 mL IV in 30 min — D3, D4, D10, D11

### ALL

**TPOG 1305 protocol — phase I induction** — abbr `TPOG1305 Ph I`, IPD — _Siriraj CMT 2025 p.10_
- Dexamethasone 20 mg/m2/day PO หรือ IV TID — D1–D5, D15–D19
- Mitoxantrone 10 mg/m2 ใน NSS 50 mL IV in 30 min — D1–D2
- Vincristine 1.5 mg/m2 IV push — D3, D10, D17, D24
- L-asparaginase 10000 IU/m2 ใน NSS 500 mL IV in 4 hr — D3, D5, D7, D17, D19, D21
- Methotrexate (IT): 12 mg intrathecal — D1, D8

**TPOG 1305 protocol — phase II consolidation** — abbr `TPOG1305 Ph II`, IPD — _Siriraj CMT 2025 p.11_
- Dexamethasone 6 mg/m2/day PO BID — D1–D5
- Vincristine 1.5 mg/m2 IV push — D3
- Methotrexate 1000 mg/m2 ใน D5W 1,000 mL IV in 24 hr — D8
- Leucovorin 15 mg/m2 IV push every 6 hr × 6 doses — Start D9 [เริ่ม 18 hr หลัง MTX หมด; หยุดเมื่อ MTX level <0.05 µmol/L] (note: เพิ่มเป็น 50 mg ถ้า MTX level สูง)
- L-asparaginase 10000 IU/m2 ใน NSS 500 mL IV in 4 hr — D9, D11, D13
- Cyclophosphamide 440 mg/m2 ใน NSS 100 mL IV in 30 min — D15–D19
- Etoposide 100 mg/m2 ใน NSS 500 mL IV in 1 hr — D15–D19
- Methotrexate (IT): 12 mg intrathecal — D8

### Aplastic anemia

**ATG-CSA** — abbr `ATG-CSA`, IPD — _Siriraj CMT 2025 p.12_
- ATG 3.5 mg/kg/day ใน NSS 500 mL IV in 12 hr — D1–D5
- Cyclosporin A 5 mg/kg/day PO BID — Start D1
- Prednisolone 1 mg/kg/day PO BID — D5–D13
- Prednisolone 0.5 mg/kg/day PO BID — D14–D16
- Prednisolone 0.25 mg/kg/day PO BID — D17–D19

**ATG-CSA-Eltrombopag** — abbr `ATG-CSA-EPAG`, IPD — _Siriraj CMT 2025 p.12_
- ATG 3.5 mg/kg/day ใน NSS 500 mL IV in 12 hr — D1–D5
- Cyclosporin A 5 mg/kg/day PO BID — Start D1
- Eltrombopag: 75 mg/day PO — Start D14 until 6 months
- Prednisolone 1 mg/kg/day PO BID — D5–D13
- Prednisolone 0.5 mg/kg/day PO BID — D14–D16
- Prednisolone 0.25 mg/kg/day PO BID — D17–D19

**CSA-Eltrombopag** — abbr `CSA-EPAG`, OPD — _Siriraj CMT 2025 p.12_
- Cyclosporin A 10 mg/kg/day PO — Start D1 until 6 months
- Eltrombopag: 100 mg/day PO — Start D1 until 6 months

### HLH

**HLH 2004 protocol — phase I (week 1–8)** — abbr `HLH-2004 Ph I`, IPD — _Siriraj CMT 2025 p.12_
- Etoposide 150 mg/m2 ใน NSS 500 mL IV in 2 hr — D1, D4, D8, D11, D15, D22, D29, D36, D43, D50
- Dexamethasone 10 mg/m2 PO หรือ IV — D1–D14
- Dexamethasone 5 mg/m2 PO หรือ IV — D15–D28
- Dexamethasone 2.5 mg/m2 PO หรือ IV — D29–D42
- Dexamethasone 1.25 mg/m2 PO หรือ IV — D43–D56 (note: แล้ว taper off ใน 1 สัปดาห์)
- Cyclosporine 6 mg/kg/day PO every 12 hr — Daily (note: 6–10 mg/kg/day)
- IVIG: 0.5 g/kg/dose IV (IAHS only) — every 4 weeks

**HLH 2004 protocol — phase II (week 9–40, 2-week cycle)** — abbr `HLH-2004 Ph II`, OPD, cycle 14 วัน — _Siriraj CMT 2025 p.12_
- Etoposide 150 mg/m2 ใน NSS 500 mL IV in 2 hr — D1
- Dexamethasone 10 mg/m2/day PO — D8–D10
- Cyclosporine 6 mg/kg/day PO every 12 hr — Daily (note: 6–10 mg/kg/day)
- Co-trimoxazole: 5 mg TMP/kg/day PO BID — 3 days/week

### Hodgkin

**B-B (Brentuximab+Bendamustine)** — abbr `B-B`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.13_
- Brentuximab vedotin 1.8 mg/kg ใน NSS 100 mL IV in 1 hr — D1
- Bendamustine 90 mg/m2 ใน NSS 500 mL IV in 2 hr — D1, D2 (note: NED)

**BEGEV** — abbr `BEGEV`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.13_
- Vinorelbine 20 mg/m2 ใน NSS 50 mL IV in 10 min — D1
- Gemcitabine 800 mg/m2 ใน NSS 250 mL IV in 30 min — D1, D4
- Bendamustine 90 mg/m2 ใน NSS 500 mL IV in 2 hr — D2, D3 (note: NED)

**BrECADD** — abbr `BrECADD`, IPD, cycle 21 วัน — _Siriraj CMT 2025 p.13_
- Brentuximab vedotin 1.8 mg/kg (max 180 mg) ใน NSS 100 mL IV in 1 hr — D0 [max 180 mg]
- Doxorubicin 40 mg/m2 ใน NSS 50 mL IV in 10 min — D1 [ระวัง extravasation]
- Cyclophosphamide 1250 mg/m2 ใน NSS 250 mL IV in 2 hr — D1
- Etoposide 150 mg/m2 ใน NSS 500 mL IV in 2 hr — D1–D3
- Dacarbazine 250 mg/m2 ใน NSS 500 mL IV in 3 hr — D2–D3
- Dexamethasone 40 mg/m2 PO — D1–D4

**Brentuximab vedotin monotherapy** — abbr `BV mono`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.13_
- Brentuximab vedotin 1.8 mg/kg ใน NSS 100 mL IV in 1 hr — D1

**BV-AVD** — abbr `BV-AVD`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.13_
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV in 10 min — D1, D15 [ระวัง extravasation]
- Vinblastine 6 mg/m2 IV push — D1, D15
- Dacarbazine 375 mg/m2 ใน NSS 500 mL IV in 3 hr — D1, D15
- Brentuximab vedotin 1.2 mg/kg (max 180 mg) ใน NSS 100 mL IV in 1 hr — D1, D15 [max 180 mg]

**BV-DTIC** — abbr `BV-DTIC`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.13_
- Brentuximab vedotin 1.8 mg/kg (max 180 mg) ใน NSS 100 mL IV in 1 hr — D1 [max 180 mg]
- Dacarbazine 375 mg/m2 ใน NSS 500 mL IV in 3 hr — D1

**BV-N (Brentuximab+Nivolumab)** — abbr `BV-N`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.13_
- Brentuximab vedotin 1.8 mg/kg (max 180 mg) ใน NSS 100 mL IV in 1 hr — D1 [max 180 mg]
- Nivolumab 3 mg/kg ใน NSS 100 mL IV in 1 hr — D1

**BV-N-AD** — abbr `BV-N-AD`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.13_
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV in 10 min — D1, D15 [ระวัง extravasation]
- Dacarbazine 375 mg/m2 ใน NSS 500 mL IV in 3 hr — D1, D15
- Brentuximab vedotin 1.2 mg/kg (max 120 mg) ใน NSS 100 mL IV in 1 hr — D1, D15 [max 120 mg]
- Nivolumab: 240 mg ผสม NSS 100 mL IV in 1 hr — D1, D15

**COP-ABV** — abbr `COP-ABV`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.14_
- Vincristine 1.4 mg/m2 (max 2 mg) IV push — D1 [max 2 mg]
- Cyclophosphamide 600 mg/m2 ใน NSS 250 mL IV in 2 hr — D1
- Prednisolone 60 mg/m2 PO — D1–D7
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV in 10 min — D15 [ระวัง extravasation]
- Bleomycin 10 IU/m2 ใน NSS 50 mL IV in 10 min — D15
- Vinblastine 6 mg/m2 IV push — D15

**GVD** — abbr `GVD`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.14_
- Gemcitabine 1000 mg/m2 ใน NSS 250 mL IV in 30 min — D1, D8
- Vinorelbine 20 mg/m2 ใน NSS 50 mL IV in 10 min — D1, D8
- Liposomal doxorubicin 15 mg/m2 ใน D5W 250 mL IV in 2 hr — D1

**IGEV** — abbr `IGEV`, IPD, cycle 21 วัน — _Siriraj CMT 2025 p.14_
- Vinorelbine 20 mg/m2 ใน NSS 50 mL IV in 10 min — D1
- Gemcitabine 800 mg/m2 ใน NSS 250 mL IV in 30 min — D1, D4
- Ifosfamide 2000 mg/m2 ใน NSS 250 mL IV in 2 hr — D1–D4 (note: + Mesna 2,000 mg/m2)
- Mesna 2000 mg/m2 IV (ร่วมกับ ifosfamide) — D1–D4
- Prednisolone: 100 mg/day PO — D1–D4

**Modified BEACOPP** — abbr `mBEACOPP`, IPD, cycle 21 วัน — _Siriraj CMT 2025 p.14_
- Cyclophosphamide 650 mg/m2 ใน NSS 250 mL IV in 3 hr — D1
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV in 10 min — D1 [ระวัง extravasation]
- Etoposide 100 mg/m2 ใน NSS 250 mL IV in 1 hr — D1–D3
- Procarbazine 100 mg/m2 PO — D1–D7
- Prednisolone 40 mg/m2 PO — D1–D14
- Vincristine 1.4 mg/m2 (max 2 mg) IV push — D8 [max 2 mg]
- Bleomycin 10 mg/m2 ใน NSS 50 mL IV in 10 min — D8

**MOPP** — abbr `MOPP`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.14_
- Mechlorethamine 6 mg/m2 IV push — D1, D8
- Vincristine 1.4 mg/m2 (max 2 mg) IV push — D1, D8 [max 2 mg]
- Procarbazine 100 mg/m2 PO — D1–D14
- Prednisolone 40 mg/m2 PO — D1–D14

**MOPP/ABV** — abbr `MOPP/ABV`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.14_
- Mechlorethamine 6 mg/m2 IV push — D1
- Vincristine 1.4 mg/m2 (max 2 mg) IV push — D1 [max 2 mg]
- Procarbazine 100 mg/m2 PO — D1–D7
- Prednisolone 40 mg/m2 PO — D1–D14
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV in 10 min — D8 [ระวัง extravasation]
- Bleomycin 10 IU/m2 ใน NSS 50 mL IV in 10 min — D8
- Vinblastine 6 mg/m2 IV push — D8

**Nivolumab-AVD** — abbr `N-AVD`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.15_
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV in 10 min — D1, D15 [ระวัง extravasation]
- Vinblastine 6 mg/m2 IV push — D1, D15
- Dacarbazine 375 mg/m2 ใน NSS 500 mL IV in 3 hr — D1, D15
- Nivolumab: 240 mg ผสม NSS 100 mL IV in 1 hr — D1, D15

**Stanford V** — abbr `Stanford V`, OPD, cycle 12 สัปดาห์ — _Siriraj CMT 2025 p.15_
- Mechlorethamine 6 mg/m2 IV push — wk 1, 5, 9
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV in 10 min — wk 1, 3, 5, 7, 9, 11 [ระวัง extravasation]
- Vinblastine 6 mg/m2 IV push — wk 1, 3, 5, 7, 9, 11
- Vincristine 1.4 mg/m2 (max 2 mg) IV push — wk 2, 4, 6, 8, 10, 12 [max 2 mg]
- Bleomycin 5 IU/m2 ใน NSS 50 mL IV in 10 min — wk 2, 4, 6, 8, 10, 12
- Etoposide 60 mg/m2 ใน NSS 250 mL IV in 1 hr — wk 3, 7, 11 (2 days/wk)
- Prednisolone 40 mg/m2 PO วันเว้นวัน (AD) — wk 1–10

### Lymphoma

**BV-CHP** — abbr `BV-CHP`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.16_
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV in 2 hr — D1
- Doxorubicin 50 mg/m2 ใน NSS 50 mL IV in 10 min — D1 [ระวัง extravasation]
- Vincristine 1.4 mg/m2 (max 2 mg) IV push — D1 [max 2 mg] (note: ตาราง PDF ระบุ vincristine ใน BV-CHP — ตรวจสอบ (ECHELON-2 ไม่มี vincristine))
- Brentuximab vedotin 1.8 mg/kg ใน NSS 100 mL IV in 1 hr — D1
- Prednisolone: 100 mg/day PO — D1–D5

**BV-Len-Ritux** — abbr `BV-Len-R`, OPD — _Siriraj CMT 2025 p.16_
- Brentuximab vedotin 1.2 mg/kg ใน NSS 100 mL IV in 1 hr — D1
- Rituximab 375 mg/m2 ใน NSS 250–500 mL Standard infusion regimen — D1
- Lenalidomide: 20 mg/day PO — Daily

**CDOP (liposomal doxorubicin)** — abbr `CDOP`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.16_
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV in 2 hr — D1
- Liposomal doxorubicin 30 mg/m2 ใน D5W 250 mL IV in 2 hr — D1
- Vincristine 1.4 mg/m2 (max 2 mg) IV push — D1 [max 2 mg]
- Prednisolone: 100 mg/day PO — D1–D5

**CEOP** — abbr `CEOP`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.16_
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV in 2 hr — D1
- Etoposide 50 mg/m2 ใน NSS 500 mL IV in 2 hr — D1–D3
- Vincristine 1.4 mg/m2 (max 2 mg) IV push — D1 [max 2 mg]
- Prednisolone: 100 mg/day PO — D1–D5

**CHOEP** — abbr `CHOEP`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.16_
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV in 2 hr — D1
- Doxorubicin 50 mg/m2 ใน NSS 50 mL IV in 10 min — D1 [ระวัง extravasation]
- Vincristine 1.4 mg/m2 (max 2 mg) IV push — D1 [max 2 mg]
- Etoposide 100 mg/m2/day ใน NSS 250 mL IV in 2 hr — D1–D3
- Prednisolone: 100 mg/day PO — D1–D5

**CNOP** — abbr `CNOP`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.17_
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV in 2 hr — D1
- Mitoxantrone 10 mg/m2 ใน NSS 50 mL IV in 10 min — D1
- Vincristine 1.4 mg/m2 (max 2 mg) IV push — D1 [max 2 mg]
- Prednisolone: 100 mg/day PO — D1–D5

**CVP** — abbr `CVP`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.17_
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV in 2 hr — D1
- Vincristine 1.4 mg/m2 (max 2 mg) IV push — D1 [max 2 mg]
- Prednisolone: 100 mg/day PO — D1–D5

**DA-EPOCH (Dose-adjusted)** — abbr `DA-EPOCH`, IPD, cycle 21 วัน — _Siriraj CMT 2025 p.17_
- Etoposide 50 mg/m2/day Continuous IV infusion — D1–D4 (note: DA: nadir ANC ≥500 → +20%; ANC <500 1–2 ครั้ง → เท่าเดิม; ANC <500 ≥3 ครั้ง หรือ plt <25,000 → −20%)
- Doxorubicin 10 mg/m2/day Continuous IV infusion — D1–D4 (note: DA ปรับตาม nadir เช่นเดียวกับ etoposide)
- Vincristine 0.4 mg/m2/day Continuous IV infusion — D1–D4
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV in 2 hr — D6 (note: DA ปรับตาม nadir เช่นเดียวกับ etoposide)
- Prednisolone 60 mg/m2 PO — D1–D5

**DHAP** — abbr `DHAP`, IPD, cycle 21 วัน — _Siriraj CMT 2025 p.17_
- Dexamethasone 40 mg/m2 10 mg IV every 6 hr — D1–D4
- Cytarabine 2000 mg/m2 ใน NSS 200 mL IV in 3 hr every 12 hr × 2 doses (per dose) — D2
- Cisplatin 100 mg/m2 ใน NSS 1,000 mL IV in 24 hr — D1 [hydration, mannitol]

**DHAX** — abbr `DHAX`, IPD, cycle 21 วัน — _Siriraj CMT 2025 p.17_
- Dexamethasone: 40 mg/day PO — D1–D4
- Cytarabine 2000 mg/m2 ใน NSS 200 mL IV in 3 hr every 12 hr × 2 doses (per dose) — D2
- Oxaliplatin 130 mg/m2 ใน D5W 250 mL IV in 2 hr — D1

**DICE** — abbr `DICE`, IPD, cycle 21–28 วัน — _Siriraj CMT 2025 p.17_
- Dexamethasone: 40 mg/day (10 mg IV every 6 hr) — D1–D4
- Prednisolone: 60 mg PO แล้วลดลงวันละ 10 mg — Start D5
- Ifosfamide 1000 mg/m2 (max 1750 mg) ใน NSS 1,000 mL IV in 24 hr — D1–D4 [max 1,750 mg] (note: + Mesna 1,000 mg/m2)
- Mesna 1000 mg/m2 IV (ร่วมกับ ifosfamide) — D1–D4
- Cisplatin 25 mg/m2 ใน NSS 1,000 mL IV in 24 hr — D1–D4
- Etoposide 100 mg/m2 ใน NSS 250 mL IV in 2 hr — D1–D4

**FLUDAP** — abbr `FLUDAP`, IPD, cycle 21 วัน — _Siriraj CMT 2025 p.18_
- Dexamethasone: 100 mg/day ผสม NSS 20 mL IV in 24 hr — D1–D3
- Fludarabine 30 mg/m2 (max 50 mg) ใน NSS 50 mL IV in 30 min — D2–D3 [max 50 mg; ให้ก่อน Ara-C 4 hr]
- Cisplatin 50 mg/m2 ใน NSS 1,000 mL IV in 4 hr — D2–D3 [hydration, mannitol]
- Cytarabine 1000 mg/m2 ใน NSS 50 mL IV in 24 hr — D2–D3

**FND** — abbr `FND`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.18_
- Fludarabine 25 mg/m2 ใน NSS 100 mL IV in 30 min — D1–D3
- Mitoxantrone 10 mg/m2 IV push — D1
- Dexamethasone: 20 mg/day IV หรือ PO — D1–D5

**GCVP** — abbr `GCVP`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.18_
- Gemcitabine 750 mg/m2 ใน NSS 250 mL IV in 30 min — D1, D8 (note: 750–1,000 mg/m2)
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV in 2 hr — D1
- Vincristine 1.4 mg/m2 (max 2 mg) IV push — D1 [max 2 mg]
- Prednisolone: 100 mg/day PO — D1–D5

**GemOx** — abbr `GemOx`, OPD, cycle 14 วัน — _Siriraj CMT 2025 p.18_
- Gemcitabine 1000 mg/m2 ใน NSS 250 mL IV in 30 min — D1
- Oxaliplatin 130 mg/m2 ใน D5W 250 mL IV in 3 hr — D1

**GIFOX** — abbr `GIFOX`, IPD, cycle 14 วัน — _Siriraj CMT 2025 p.18_
- Gemcitabine 1000 mg/m2 ใน NSS 250 mL IV in 30 min — D1
- Oxaliplatin 130 mg/m2 ใน D5W 250 mL IV in 3 hr — D2
- Ifosfamide 5000 mg/m2 ใน NSS 1,000 mL IV in 20 hr — D2 (note: + Mesna 5,000 mg/m2)
- Mesna 5000 mg/m2 IV (ร่วมกับ ifosfamide) — D2

**IMVP-16** — abbr `IMVP-16`, IPD, cycle 21 วัน — _Siriraj CMT 2025 p.18_
- Ifosfamide 1000 mg/m2 ใน 5% DW 500 mL IV in 2 hr — D1–D5
- Methotrexate 30 mg/m2 IV in 10 min — D3, D10
- Etoposide (VP-16) 100 mg/m2 ใน NSS 500 mL IV in 2 hr — D1–D3

**MINE** — abbr `MINE`, IPD — _Siriraj CMT 2025 p.19_
- Ifosfamide 1330 mg/m2 ใน NSS 250 mL IV in 2 hr — D1–D3 (note: + Mesna 1,330 mg/m2)
- Mesna 1330 mg/m2 IV (ร่วมกับ ifosfamide) — D1–D3
- Mesna 500 mg/m2 ใน NSS 100 mL IV in 30 min — D1–D3
- Mitoxantrone 8 mg/m2 ใน NSS 50 mL IV in 15 min — D1
- Etoposide 65 mg/m2 ใน NSS 250 mL IV in 2 hr — D1–D3

**mini-CHOP** — abbr `mini-CHOP`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.19_
- Cyclophosphamide 400 mg/m2 ใน NSS 250 mL IV in 2 hr — D1
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV in 10 min — D1 [ระวัง extravasation]
- Vincristine 1 mg/m2 IV push — D1
- Prednisolone 40 mg/m2 PO — D1–D5

**Pola-BR** — abbr `Pola-BR`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.19_
- Bendamustine 90 mg/m2 ใน NSS 500 mL IV in 2 hr — D1, D2 (note: NED)
- Rituximab 375 mg/m2 ใน NSS 250–500 mL Standard infusion regimen — D1
- Polatuzumab vedotin 1.8 mg/kg ใน NSS 100 mL IV in 1 hr — D1

**Pola-R-CHP** — abbr `Pola-R-CHP`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.19_
- Rituximab 375 mg/m2 ใน NSS 250–500 mL Standard infusion regimen — D1
- Polatuzumab vedotin 1.8 mg/kg ใน NSS 100 mL IV in 1 hr — D1
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV in 2 hr — D1
- Doxorubicin 50 mg/m2 ใน NSS 50 mL IV in 10 min — D1 [ระวัง extravasation]
- Prednisolone: 100 mg/day PO — D1–D5

**Polatuzumab vedotin monotherapy** — abbr `Pola mono`, OPD — _Siriraj CMT 2025 p.19_
- Polatuzumab vedotin 1.8 mg/kg ใน NSS 100 mL IV in 1 hr — D1

**R2 (Rituximab+Lenalidomide)** — abbr `R2`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.19_
- Rituximab 375 mg/m2 ใน NSS 250–500 mL Standard infusion regimen — D1
- Lenalidomide: 20–25 mg/day PO — D1–D21

**RBAC500** — abbr `RBAC500`, IPD, cycle 28 วัน — _Siriraj CMT 2025 p.19_
- Rituximab 375 mg/m2 ใน NSS 250–500 mL Standard infusion regimen — D1
- Bendamustine 70 mg/m2 ใน NSS 500 mL IV in 2 hr — D2, D3 (note: NED)
- Cytarabine 500 mg/m2 ใน NSS 250 mL IV in 2 hr — D2–D4

**VR-CAP** — abbr `VR-CAP`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.20_
- Rituximab 375 mg/m2 ใน NSS 250–500 mL Standard infusion regimen — D1
- Bortezomib 1.3 mg/m2 SC — D1, D4, D8, D11
- Doxorubicin 50 mg/m2 ใน NSS 50 mL IV in 10 min — D1 [ระวัง extravasation]
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV in 2 hr — D1

### CNS lymphoma

**MATRIx** — abbr `MATRIx`, IPD, cycle 21 วัน — _Siriraj CMT 2025 p.22_
- Rituximab 375 mg/m2 ใน NSS 250–500 mL Standard infusion regimen — D0
- Dexamethasone: 20 mg IV — D1–D4
- Prehydration: D5W 1,000 mL + 7.5% NaHCO3 100 mL IV เริ่ม 12 hr ก่อน MTX ต่อเนื่องถึง 48 hr หลัง MTX หมด — D0
- Methotrexate (loading) 500 mg/m2 ใน D5W 50 mL IV in 15 min — D1
- Methotrexate 3000 mg/m2 ใน D5W 500 mL + 7.5% NaHCO3 50 mL IV in 3 hr — D1
- Leucovorin 15 mg/m2 IV every 6 hr × 12 doses — Start D2 [เริ่ม 12 hr หลัง MTX หมด; จนกว่า MTX level <0.05 µmol/L]
- Cytarabine 2000 mg/m2 ใน NSS 300 mL IV in 3 hr every 12 hr (4 doses) — D2, D3
- Thiotepa 30 mg/m2 ใน NSS (0.5–1 mg/mL) IV in 1 hr — D4

### CLL

**Alemtuzumab** — abbr `Alemtuzumab`, OPD — _Siriraj CMT 2025 p.24_
- Alemtuzumab: 30 mg ผสม NSS 100 mL IV in 2 hr — 3 days/week (max 12 wk)

**Alemtuzumab + Fludarabine** — abbr `Alem+Flu`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.24_
- Alemtuzumab: 30 mg ผสม NSS 100 mL IV in 2 hr — D1–D3
- Fludarabine 30 mg/m2 ใน NSS 100 mL IV in 30 min — D1–D3

**CP (Chlorambucil+Prednisolone)** — abbr `CP`, OPD, cycle 14–28 วัน — _Siriraj CMT 2025 p.24_
- Chlorambucil 0.3 mg/kg/day PO — D1–D5
- Prednisolone 40 mg/m2/day PO — D1–D5

**FC — 3-day protocol** — abbr `FC 3-day`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.24_
- Fludarabine 30 mg/m2 ใน NSS 100 mL IV in 30 min — D1–D3
- Cyclophosphamide 250 mg/m2 ใน NSS 100 mL IV in 30 min — D1–D3 (note: 250–300 mg/m2)

**FC — 5-day protocol** — abbr `FC 5-day`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.24_
- Fludarabine 20 mg/m2 ใน NSS 100 mL IV in 30 min — D1–D5
- Cyclophosphamide 600 mg/m2 ใน NSS 250 mL IV in 2 hr — D1 (note: 600–1,000 mg/m2)

**Fludarabine monotherapy** — abbr `Fludarabine`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.24_
- Fludarabine 25 mg/m2 ใน NSS 100 mL IV in 30 min — D1–D5

**R-FC — cycle 1** — abbr `R-FC C1`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.24_
- Rituximab 375 mg/m2 ใน NSS 250–500 mL Standard infusion regimen — D1
- Fludarabine 25 mg/m2 ใน NSS 100 mL IV in 30 min — D2–D4
- Cyclophosphamide 300 mg/m2 ใน NSS 100 mL IV in 30 min — D2–D4

**R-FC — cycle 2–6** — abbr `R-FC C2-6`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.24_
- Rituximab 500 mg/m2 ใน NSS 250–500 mL Standard infusion regimen — D1
- Fludarabine 25 mg/m2 ใน NSS 100 mL IV in 30 min — D2–D4
- Cyclophosphamide 300 mg/m2 ใน NSS 100 mL IV in 30 min — D2–D4

### NK/T lymphoma

**AspaMetDex** — abbr `AspaMetDex`, IPD — _Siriraj CMT 2025 p.25_
- Prehydration: D5W 1,000 mL + 7.5% NaHCO3 100 mL IV เริ่ม 12 hr ก่อน MTX ต่อเนื่องถึง 48 hr หลัง MTX หมด — D1
- Methotrexate 3000 mg/m2 ใน D5W 500 mL IV in 3 hr — D1
- Leucovorin 30 mg/m2 IV every 6 hr — Start D2 [เริ่ม 12 hr หลัง MTX หมด; จนกว่า MTX level <0.05 µmol/L]
- L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV in 4 hr — D2, D4, D6, D8
- Dexamethasone: 40 mg/day PO — D1–D4

**DDGP** — abbr `DDGP`, IPD — _Siriraj CMT 2025 p.25_
- Dexamethasone 15 mg/m2 IV — D1–D4
- Cisplatin 20 mg/m2 ใน NSS 1,000 mL IV in 20 hr — D1, D8 [hydration, mannitol] (note: วันตามตาราง PDF — ตรวจสอบ (แถว day อาจเลื่อน))
- Gemcitabine 800 mg/m2 ใน NSS 250 mL IV in 30 min — D1–D7 (note: วันตามตาราง PDF — ตรวจสอบ (แถว day อาจเลื่อน))
- L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV in 2 hr — — (note: PDF ไม่ระบุวัน — ตรวจสอบ)

**DeVIC** — abbr `DeVIC`, IPD — _Siriraj CMT 2025 p.25_
- Dexamethasone: 40 mg/day IV — D1–D3
- Etoposide 67 mg/m2 ใน NSS 500 mL IV in 2 hr — D1–D3
- Ifosfamide 1000 mg/m2 ใน NSS 250 mL IV in 2 hr — D1–D3 (note: + Mesna 1,000 mg/m2)
- Mesna 1000 mg/m2 IV (ร่วมกับ ifosfamide) — D1–D3
- Carboplatin 200 mg/m2 (max 800 mg) ใน D5W 250 mL IV in 1 hr — D1 [max 800 mg]

**GELAD** — abbr `GELAD`, IPD — _Siriraj CMT 2025 p.25_
- Gemcitabine 1000 mg/m2 ใน NSS 250 mL IV in 30 min — D1
- Etoposide 60 mg/m2 ใน NSS 500 mL IV in 2 hr — D1–D3
- L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV in 2 hr — D1–D7
- Dexamethasone: 40 mg/day IV — D1–D4

**GELOX** — abbr `GELOX`, IPD — _Siriraj CMT 2025 p.25_
- Gemcitabine 1000 mg/m2 ใน NSS 250 mL IV in 30 min — D1, D8
- Oxaliplatin 130 mg/m2 ใน D5W 250 mL IV in 3 hr — D1
- L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV in 2 hr — D1–D7

**SMILE** — abbr `SMILE`, IPD — _Siriraj CMT 2025 p.26_
- Prehydration: D5W 1,000 mL + 7.5% NaHCO3 100 mL IV เริ่ม 12 hr ก่อน MTX ต่อเนื่องถึง 48 hr หลัง MTX หมด — D0
- Methotrexate 2000 mg/m2 ใน D5W 1,000 mL + 7.5% NaHCO3 100 mL IV in 6 hr — D1
- Leucovorin 30 mg/m2 IV every 6 hr — Start D2 [เริ่ม 12 hr หลัง MTX หมด; จนกว่า MTX level <0.05 µmol/L]
- Dexamethasone: 40 mg/day IV — D2–D4
- Ifosfamide 1500 mg/m2 ใน NSS 250 mL IV in 2 hr — D2–D4 (note: + Mesna 1,500 mg/m2)
- Mesna 1500 mg/m2 IV (ร่วมกับ ifosfamide) — D2–D4
- Etoposide 100 mg/m2 ใน NSS 500 mL IV in 2 hr — D2–D4
- L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV in 2 hr — D8, D10, D12, D14, D16, D18, D20

**VIDL** — abbr `VIDL`, IPD — _Siriraj CMT 2025 p.26_
- Ifosfamide 1200 mg/m2 ใน NSS 250 mL IV in 2 hr — D1–D3 (note: + Mesna 1,200 mg/m2)
- Mesna 1200 mg/m2 IV (ร่วมกับ ifosfamide) — D1–D3
- Etoposide 100 mg/m2 ใน NSS 500 mL IV in 2 hr — D1–D3
- Dexamethasone: 40 mg/day PO — D1–D3
- L-asparaginase 4000 IU/m2 ใน NSS 500 mL IV in 2 hr — D8, D10, D12, D14, D16, D18, D20

**VIPD** — abbr `VIPD`, IPD — _Siriraj CMT 2025 p.26_
- Ifosfamide 1200 mg/m2 ใน NSS 250 mL IV in 2 hr — D1–D3 (note: + Mesna 1,200 mg/m2)
- Mesna 1200 mg/m2 IV (ร่วมกับ ifosfamide) — D1–D3
- Cisplatin 33 mg/m2 ใน NSS 1,000 mL IV in 20 hr — D1–D3 [hydration, mannitol]
- Etoposide 100 mg/m2 ใน NSS 500 mL IV in 2 hr — D1–D3
- Dexamethasone: 40 mg/day PO — D1–D4

### Myeloma

**HD-dexa (High-dose dexamethasone)** — abbr `HD-dexa`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.27_
- Dexamethasone: 40 mg/day PO — D1–D4, D9–D12, D17–D20

**Bortezomib monotherapy** — abbr `Bortezomib`, OPD, cycle 21 วัน — _Siriraj CMT 2025 p.27_
- Bortezomib 1.3 mg/m2 IV — D1, D4, D8, D11

**VCD (Bortezomib+Cyclophosphamide+Dex)** — abbr `VCD`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.27_
- Bortezomib 1.3 mg/m2 IV — D1, D4, D8, D11 (หรือ D1, D8, D15, D22)
- Cyclophosphamide 300 mg/m2 PO — D1, D8, D15, D22
- Dexamethasone: 40 mg/day PO — D1–D4 (D9–D12, D17–D20 ใน cycle 1–2)

**VCD-mod** — abbr `VCD-mod`, OPD — _Siriraj CMT 2025 p.27_
- Bortezomib 1.3 mg/m2 IV — D1, D4, D8, D11
- Cyclophosphamide 500 mg/m2 PO — D1, D8, D15
- Dexamethasone: 40 mg/day PO — D1, D8, D15

**VMP (Bortezomib+Melphalan+Prednisolone)** — abbr `VMP`, OPD, cycle 35 วัน — _Siriraj CMT 2025 p.27_
- Melphalan 9 mg/m2 PO — D1–D4
- Prednisolone 60 mg/m2 PO — D1–D4
- Bortezomib 1.3 mg/m2 IV — D1, D8, D15, D22 (cycle แรก 6 สัปดาห์: D1, D4, D8, D11, D22, D25, D29, D32)

**VTD (Bortezomib+Thalidomide+Dex)** — abbr `VTD`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.27_
- Bortezomib 1.3 mg/m2 IV — D1, D4, D8, D11
- Thalidomide: 100–200 mg PO hs — D1–D28
- Dexamethasone: 40 mg/day PO — D1–D4, D9–D12

**VTP (Bortezomib+Thalidomide+Prednisolone)** — abbr `VTP`, OPD, cycle 35 วัน — _Siriraj CMT 2025 p.28_
- Thalidomide: 100 mg PO hs — D1–D28
- Prednisolone 60 mg/m2 PO — D1–D4
- Bortezomib 1.3 mg/m2 IV — D1, D8, D15, D22 (cycle แรก 6 สัปดาห์: D1, D4, D8, D11, D22, D25, D29, D32)

**MPR (Melphalan+Prednisolone+Lenalidomide)** — abbr `MPR`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.28_
- Melphalan 9 mg/m2 PO — D1–D4
- Prednisolone 60 mg/m2 PO — D1–D4
- Lenalidomide: 5–10 mg/day PO — D1–D21

**Dara-Pd (Daratumumab+Pomalidomide+Dex)** — abbr `Dara-Pd`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.28_
- Daratumumab 16 mg/kg Standard infusion regimen — Weekly cycle 1–2, every 2 wk cycle 3–6, every 4 wk thereafter
- Pomalidomide: 4 mg/day PO — D1–D21
- Dexamethasone: 40 mg/day PO — D1, D8, D15, D22

**Dara-Kd (Daratumumab+Carfilzomib+Dex)** — abbr `Dara-Kd`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.29_
- Daratumumab 16 mg/kg Standard infusion regimen — Weekly cycle 1–2, every 2 wk cycle 3–6, every 4 wk thereafter
- Carfilzomib 20 mg/m2 ใน D5W 50 mL IV in 30 min — D1, D8, D15 (note: เพิ่มเป็น 70 mg/m2 ตั้งแต่ C1D8)
- Dexamethasone: 40 mg/day PO — D1, D8, D15, D22

**Dara-CyBorD** — abbr `Dara-CyBorD`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.29_
- Daratumumab 16 mg/kg Standard infusion regimen — Weekly cycle 1–2, every 2 wk cycle 3–6, every 4 wk thereafter
- Bortezomib 1.3 mg/m2 SC — D1, D8, D15, D22
- Cyclophosphamide 300 mg/m2 PO — D1, D8, D15, D22
- Dexamethasone: 40 mg/day PO — D1, D8, D15, D22

**Dara-VMP** — abbr `Dara-VMP`, OPD, cycle 42 วัน — _Siriraj CMT 2025 p.29_
- Daratumumab 16 mg/kg Standard infusion regimen — Weekly cycle 1, every 3 wk cycle 2–9, every 4 wk thereafter
- Bortezomib 1.3 mg/m2 SC — D1, D4, D8, D11, D22, D25, D29, D32 ใน cycle 1; D1, D8, D22, D29 ใน cycle 2–9
- Melphalan 9 mg/m2 PO — D1–D4
- Prednisolone 60 mg/m2 PO — D1–D4

**Dara-VTd** — abbr `Dara-VTd`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.29_
- Daratumumab 16 mg/kg Standard infusion regimen — D1, D8, D15, D22
- Bortezomib 1.3 mg/m2 SC — D1, D4, D8, D11
- Thalidomide: 100 mg/day PO hs — D1–D28
- Dexamethasone: 40 mg/day PO ใน C1–C2, 20 mg/day ใน C3–C4 — D1, D2, D8, D9, D15, D16, D22, D23

**Dara-VRD (modified)** — abbr `Dara-VRD`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.29_
- Daratumumab 16 mg/kg Standard infusion regimen — D1, D8, D15, D22
- Bortezomib 1.3 mg/m2 SC — D1, D8, D15, D22
- Lenalidomide: 25 mg/day PO — D1–D21
- Dexamethasone: 20 mg/day PO — D1, D2, D8, D9, D15, D16, D22, D23

**DVD (Liposomal doxorubicin+Vincristine+Dex)** — abbr `DVD`, OPD, cycle 28 วัน — _Siriraj CMT 2025 p.30_
- Liposomal doxorubicin 40 mg/m2 ใน D5W 250 mL IV in 1½ hr — D1
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 100 mL IV in 1 hr — D1 [max 2 mg]
- Dexamethasone: 40 mg/day PO หรือ IV — D1–D4

**mCBAD** — abbr `mCBAD`, IPD, cycle 28 วัน — _Siriraj CMT 2025 p.30_
- Cyclophosphamide 350 mg/m2 ใน NSS 100 mL IV in 1 hr every 12 hr — D1–D4
- Mesna 400 mg/m2 ใน 5% DN/2 1,000 mL IV in 12 hr every 12 hr — D1–D4
- Bortezomib 1.3 mg/m2 SC — D1, D4, D8, D11
- Doxorubicin 9 mg/m2 Continuous IV infusion — D1–D4
- Dexamethasone: 40 mg/day PO — D1–D4, D9–D12, D17–D20

**Modified VAD** — abbr `mVAD`, IPD, cycle 28 วัน — _Siriraj CMT 2025 p.30_
- Vincristine: 0.4 mg ผสม NSS 100 mL IV in 2 hr — D1–D4
- Doxorubicin 9 mg/m2 ใน NSS 100 mL IV in 1 hr — D1–D4
- Dexamethasone: 40 mg/day PO หรือ IV — D1–D4

**PAD (Bortezomib+Doxorubicin+Dex)** — abbr `PAD`, IPD, cycle 21 วัน — _Siriraj CMT 2025 p.30_
- Bortezomib 1.3 mg/m2 IV — D1, D4, D8, D11
- Doxorubicin 9 mg/m2 ใน NSS 100 mL IV in 1 hr — D1–D4
- Dexamethasone: 40 mg/day PO หรือ IV — D1–D4 (D8–D11, D15–D18 ใน cycle 1)

**VAD** — abbr `VAD`, IPD, cycle 28 วัน — _Siriraj CMT 2025 p.30_
- Vincristine: 0.4 mg/day continuous IV infusion — D1–D4
- Doxorubicin 9 mg/m2 Continuous IV infusion — D1–D4
- Dexamethasone: 40 mg/day PO หรือ IV — D1–D4 (D9–D12, D17–D20 ใน cycle 1–2)

**Teclistamab** — abbr `Teclistamab`, IPD — _Siriraj CMT 2025 p.30_
- Teclistamab (step-up dose 1) 0.06 mg/kg SC — D1
- Teclistamab (step-up dose 2) 0.3 mg/kg SC — 2–4 วันถัดไป
- Teclistamab (treatment dose) 1.5 mg/kg SC — 2–4 วันถัดไป แล้ว weekly
