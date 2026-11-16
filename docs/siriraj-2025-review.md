# Siriraj CMT 2025 — ตารางตรวจสอบก่อน seed

ถอดจาก "คู่มือการให้ยาเคมีบำบัด ศิริราช Update 2025" หมวด CMT Summary (หน้า 4–30) และ IVIG จากใบสั่งยาผู้ป่วยใน (หน้า 109) ลงใน `api/_siriraj2025.js`

- regimens ใหม่: **139** (drug rows 472)
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

### อื่นๆ

**IVIG (Intravenous immunoglobulin)** — abbr `IVIG`, IPD — _Siriraj CMT 2025 p.109_
- IVIG: …… g/kg/day (…… mL/day) IV — ระบุขนาดตามข้อบ่งชี้; 5% (2.5 g/50 mL, 5 g/100 mL, 10 g/200 mL) หรือ 10% (2.5 g/25 mL, 5 g/50 mL, 10 g/100 mL) — Day ……
- IVIG rate: 0.5 mL/kg/hr × 30 min → 1 mL/kg/hr × 30 min → 2 mL/kg/hr × 30 min → แล้ว 4 mL/kg/hr — ทุกวันที่ให้
- Record vital signs: q 15 min × 2 → q 30 min × 2 → q 1 hr จนครบ 1 hr หลังให้ยาหมด — ทุกวันที่ให้
- เตรียมยาฉุกเฉิน: adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้ข้างเตียง — ทุกวันที่ให้


# ใบสั่งยา hemato (order forms, หน้า 36–198)

ถอดจากแบบฟอร์มใบสั่งยาผู้ป่วยนอก/ผู้ป่วยใน ทีละหน้า (1 ฟอร์ม = 1 regimen) อยู่ใน `api/_orders/*.js` แสดงในแอปใต้ปุ่ม "ใบสั่งยา hemato" ทุก regimen มีลิงก์เปิดหน้าต้นฉบับใน `public/protocol/`

- regimens: **140** (drug rows 2067)
- หน้าที่เป็นแผนภาพสรุป protocol (ไม่ใช่ฟอร์ม 2 คอลัมน์) ไม่ได้ถอด เพราะมีใน CMT Summary แล้ว
- ลิงก์ PDF: ตัดจากไฟล์ต้นฉบับเป็น 17 ส่วนตามหมวด เปิดด้วย #page= ภายในส่วนนั้น

## ⚠ จุดที่ผู้ถอดสงสัย (ใบสั่งยา)


## ข้อสังเกตจากผู้ถอดแต่ละส่วน (ถอดตามที่พิมพ์ แต่ควรตรวจกับต้นฉบับ)

### HSCT (p.191–198)
- หมวด HSCT ใน PDF มีเฉพาะ Ara-C mobilization และ stem cell collection (ผู้ป่วย/ผู้บริจาค) ไม่มี conditioning regimen (BEAM, Bu/Cy ฯลฯ)
- หน้า 199–201 เป็นหน้าคั่น "แนวทางการรักษาโรคมะเร็งในเด็ก" และ "Dose adjustment" โดยไม่มีเนื้อหาตามมา (ไฟล์จบที่หน้า 201)
- Filgrastim 10 µg/kg/day ใส่เป็น unit mcg/kg/day (เพิ่มหน่วยนี้ในแอป); เวลาให้ยาผู้ป่วย 23.00 น. vs ผู้บริจาค 18.00 น. ตามฟอร์ม
### AML & MDS (p.62–72)
- p.63 Cytarabine พิมพ์ช่วง 100–200 mg/m2 → ใส่ 100 (ขอบล่าง) ระบุช่วงไว้ใน detail
- p.65/67/71 แถว "☐ Ramp-up dose of venetoclax: Itraconazole (100)" / "☐ Normal dose…: Itraconazole (100)" ถอดตามที่พิมพ์ — layout ในฟอร์มกำกวม (น่าจะหมายถึงขนาด venetoclax เมื่อให้คู่ azole) ต้องตรวจ
- p.64/65 Ondansetron เป็น 8 mg PO (หน้าอื่นเป็น IV) ถอดตามที่พิมพ์; p.64 Azacitidine วัน "D1 ถึง D……" เว้นว่างตามฟอร์ม
- p.68/69 Cytarabine ขนาดต่อ dose (q12h รวม 6 doses); LDAC+Ven จัดอยู่ใน MDS/AML
### Relapse/Refractory acute leukemia (p.93–103)
- ช่วงหน้านี้ไม่มีฟอร์ม S-HAM, inotuzumab, MECA (มีเฉพาะใน CMT Summary)
- Blinatumomab (p.96/97) พิมพ์เป็น µg ต่อถุง 24 ชม. (10.375 µg D1–7, 32.5 µg D8–28 + stabilizer) → ใส่เป็น fixed ตามฟอร์ม
- p.95/102/103 Ondansetron ไม่มีคอลัมน์วันในฟอร์ม → เว้นว่าง; p.103 Dexamethasone/Vincristine พิมพ์อยู่คอลัมน์ซ้าย ถอดตามลำดับที่พิมพ์
- p.100 MEC footnote cytarabine (CrCl 40–60: 500 mg/m2) ต่างจาก FLAG (1,000 mg/m2/day) ถอดตามแต่ละหน้า; p.99 Idarubicin footnote "Cr >2.5: ลดขนาดยา" ไม่ระบุ %
- p.101 Nelarabine แถว premed/V/S ไม่มีวันในฟอร์ม ใส่ D1, D3, D5 ตามวันให้ยา
### NK/T-cell lymphoma (p.163–171)
- p.165 DDGP: footnote มี etoposide ทั้งที่สูตรไม่มี etoposide; ไม่มี footnote cisplatin/dexamethasone
- p.165/167/168 footnote gemcitabine "TB สูง: 800 mg/m2 (80%)" เขียนสำหรับขนาด 1,000 แต่ DDGP ใช้ 800 อยู่แล้ว
- p.164/169 Ondansetron ไม่มีวันในฟอร์ม; p.166 DeVIC carboplatin 200 mg/m2 (max 800) แต่ footnote ให้ปรับตาม AUC 5–7 ในโรคไต
- Ifosfamide + Mesna ที่พิมพ์บรรทัดเดียว แยกเป็น 2 แถวคำนวณ; ตาราง sandwich CMT-RT / CCRT ใส่เป็นแถวข้อความ
### ใบสั่งยาผู้ป่วยนอก (p.37–39), Aplastic anemia (p.105), HLH (p.107)
- ฟอร์ม OPD ชุด A/B/D ใส่เป็น 1 regimen ต่อฟอร์ม (รายการยาทั้งหมดเป็นแถว ติ๊กเลือกเอาที่ใช้) ชื่อยามี [กลุ่ม] นำหน้า
- p.37 Bleomycin พิมพ์ "10 mg/m2" (ไม่ใช่ IU) ถอดตามที่พิมพ์; p.38 Cyclophosphamide [ALL] พิมพ์ "800 mg/m2, 1 g/m2 (max 1.5 g)" ใช้ 800 + max 1,500
- p.39 Carfilzomib "20, 27, 36, 56, 70 mg/m2" ไม่มีค่า default → ใส่ 20 ระบุตัวเลือกใน note; Dexamethasone premed "D 1, 8, 15 22" น่าจะตกลูกน้ำ; ตารางรอบ Daratumumab ใส่เป็นข้อความ
- p.105 Prednisolone 0.25 mg/kg/day พิมพ์ "OD pc" ขณะที่ขนาดก่อนหน้าเป็น "bid pc"; p.107 Dexamethasone ไม่มี Sig./route ในฟอร์ม → ไม่ใส่ route
### APL (p.73–92)
- ไม่มีฟอร์ม maintenance ในช่วงหน้านี้ (มีเฉพาะในหน้าแผนภาพ p.80/85 ซึ่งไม่ได้ถอด; ดูใน CMT Summary แทน)
- p.82–84 ATRA Sig "tab oral pc" ขณะที่หน้าอื่น "cap oral pc"; Dex-oph eye drop ใส่ทุก risk แม้ทางคลินิกคู่กับ cytarabine (high risk) เท่านั้น
- p.83/84 วันของ mitoxantrone/idarubicin เว้นว่างในฟอร์ม เติมจาก footnote (high D1–5, int/low D1–3 ฯลฯ); filgrastim วันเริ่มเว้นว่าง
- p.86 Idarubicin "6–12 mg/m2/day ตามอายุ" (1–60 ปี 12, 61–70 ปี 9, >70 ปี 6) ใส่ 12 + ตารางอายุใน note; p.86/90 Prednisolone Sig เว้นว่าง
### ALL (p.41–61)
- หน้าแผนภาพ p.42, 45–46 ไม่ได้ถอด
- p.59 และ p.60 ชื่อฟอร์มซ้ำกัน "TPOG VHR ALL Regimen (Phase II)" แต่เป็นชุดยาคนละสัปดาห์ (MTX IT wk 1–2 vs wk 3–4) แยกเป็น 2 regimen
- p.58 Doxorubicin footnote "TB 1.2–3 mg/dL" (หน้าอื่น 1.5–3) ถอดตามที่พิมพ์
- p.44/48/49/50/58 premed บางแถวไม่มีวันในฟอร์ม → "……"; p.47–49 "พิจารณาให้ Rituximab 375 mg/m2 ใน B-ALL" ใส่เป็นแถวคำนวณ
- p.54 Inotuzumab ขนาดเว้นว่างในฟอร์ม → fixed + ระบุ schedule จาก footnote (frontline 0.6/0.3, relapsed 0.8/0.5) ใน note
- p.53 Hyper-CVAD B: MTX แยก 2 แถว (loading 200 mg/m2 3 hr + continuous 800 mg/m2 20 hr)
### Multiple myeloma (p.172–190)
- ฟอร์ม daratumumab ใส่เป็น OPD (ฟอร์มวันให้ยา ไม่มีคำสั่งผู้ป่วยในประจำ); p.181–182 เป็นหน้าคำแนะนำ/ตาราง IRR ไม่ใช่ฟอร์ม ไม่ได้ถอด
- p.173 D-Vd หัวตาราง Week 4 พิมพ์ "D22 D15" (น่าจะ D25); p.179 D-VTd หัวข้อคอลัมน์ขวาพิมพ์ "D-VTd หรือ Daratumumab monotherapy" (น่าจะ copy จากหน้า D-Rd); p.180 header "Week 1 2 3" แต่ตารางเป็นรอบ 4 สัปดาห์
- Lenalidomide/Pomalidomide/Thalidomide พิมพ์เป็นตัวเลือก mg → fixed; p.176 Carfilzomib ใส่ 20 mg/m2 + ตัวเลือก 27/36/56/70 ใน note
- p.177 D-VCD Cyclophosphamide ไม่มี route ในฟอร์ม → ใส่ "oral (Sig. ……)" จากความแรงเม็ด 50 mg (reference หน้านี้คือ ANDROMEDA/AL amyloidosis)
- p.186 VAD Vincristine พิมพ์ "0.4 mg/m2/day; max 0.5 mg/day" (VAD มาตรฐานคือ 0.4 mg/day flat) ถอดตามที่พิมพ์
- p.183 DT-PACE cisplatin+cyclophosphamide+etoposide ถุงเดียวกัน แยกเป็น 3 แถวคำนวณ; Teclistamab แยก 3 regimen (ยา+monitoring / CRS / ICANS)
### Lymphoma ส่วนที่ 1 (p.110–136)
- p.115 BrECADD Dexamethasone พิมพ์ "40 mg/m2" (สูตรตีพิมพ์ใช้ 40 mg/day flat) ถอดตามที่พิมพ์
- p.111 ABVD Bleomycin "10 mg/m2" แต่ p.127 COP/ABV "10 units/m2"; p.127 ไม่มี footnote ปรับขนาดยา
- p.128 CVP footnote มี doxorubicin ทั้งที่สูตรไม่มี (ไม่ได้ถอด)
- ขนาดเป็นช่วง (ESHAP etoposide 40–60, FC fludarabine 25–30, cyclophosphamide 250–300 / FCM 200–250) ใส่ขอบล่าง ระบุช่วงใน detail
- p.126 CODOX-M MTX และ leucovorin แยก 2 แถวตามขั้นการให้; p.129 DA-EPOCH 3 ยาผสมถุงเดียวแยกเป็น 3 แถว
- p.116 BV monotherapy จัดใน Hodgkin (reference ครอบคลุม DLBCL/CTCL ด้วย)
### Lymphoma ส่วนที่ 2 (p.137–162)
- p.144 HD-MTX: "MTX 1,500 mg/m2 in 1 hr แล้ว 1,650 mg/m2 IV 6 hr × 2 ชุด" — "× 2 ชุด" ทำให้รวม 4,800 mg/m2 ดูผิดปกติ ถอดตามที่พิมพ์และ flag ไว้
- p.137 Fludarabine "25–30 mg/m2/day" ใส่ 25; p.139 GCVP gemcitabine "750–1,000" ใส่ 750 + escalation ใน detail
- p.155 Obinutuzumab "IV infusion 80" ไม่มีหน่วย; p.162 VR-CAP Rituximab ไม่มีวันในฟอร์ม ใส่ D1
- p.146 HD-MTX CNS prophylaxis (DLBCL) จัดใน CNS lymphoma; Rituximab ☐375/☐500 เป็น 2 แถวเลือก 1

## รายการใบสั่งยาทั้งหมด

### ผู้ป่วยนอก

**ใบสั่งยาผู้ป่วยนอก ชุด A** — abbr `OPD A`, OPD — _Siriraj order 2025 p.37_
- Lab ผ่านเกณฑ์ให้ยา: Lab ผ่านเกณฑ์ให้ยา Day …… Hb ≤8 หรือ …… g/dL; ANC 1,000 หรือ ……/mm3, Plt 75,000 หรือ ……/mm3; Regimen …… Cycle …… Day 1 = ……; น้ำหนัก …… kg ส่วนสูง …… cm BSA …… m2; ☐ non cancer ☐ cancer — Day ……
- [Rituximab/Obinutuzumab] Paracetamol (500 mg): 1 tab PO ก่อนให้ยา rituximab หรือ Obinutuzumab 30 นาที — Day 1
- [Rituximab/Obinutuzumab] Benadryl (25 mg): 2 caps PO ก่อนให้ยา rituximab หรือ Obinutuzumab 30 นาที — Day 1
- [Rituximab/Obinutuzumab] Dexamethasone: 20 mg IV ก่อนให้ยา obinutuzumab 60 นาที — Day 1
- [Rituximab/Obinutuzumab] MabThera: 1,400 mg SC — Day 1
- [Rituximab/Obinutuzumab] Rituximab (……®) 375 mg/m2 ใน NSS 250 mL IV infusion — Day 1 [ชั่วโมงที่ 1 rate 50 mL/hr, ชั่วโมงที่ 2 rate 100 mL/hr, ชั่วโมงต่อไป rate 150 mL/hr] (note: ใบกำกับ)
- [Rituximab/Obinutuzumab] Obinutuzumab: 1,000 mg in NSS 250 mL IV infusion; เริ่มต้น rate 25 mL/hr, นาทีที่ 30 rate 50 mL/hr, นาทีที่ 60 rate 75 mL/hr, นาทีที่ 90 rate 100 mL/hr — Day 1
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — Day ……
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — Day ……
- [CHOP] Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV in 1 hr — Day 1
- [CHOP] Doxorubicin 50 mg/m2 ใน NSS 50 mL IV in 10 min — Day 1
- [CHOP] Vincristine 1.4 mg/m2 (max 2 mg) IV push — Day 1 [max 2 mg]
- [CHOP] Prednisolone (5 mg): 5 tabs PO tid pc and hs #100 tabs — Day 1-5
- [ABVD] Adriamycin 25 mg/m2 ใน NSS 50 mL IV in 10 min — Day 1, 15
- [ABVD] Bleomycin 10 mg/m2 ใน NSS 50 mL IV in 10 min — Day 1, 15
- [ABVD] Vinblastine 6 mg/m2 (max 10 mg) IV push — Day 1, 15 [max 10 mg]
- [ABVD] Dacarbazine 375 mg/m2 ใน NSS 500 mL IV in 3 hr — Day 1, 15
- [ICE] Ifosfamide 1670 mg/m2 ใน NSS 250 mL IV in 2 hr — Day 1-3
- [ICE] Mesna 1670 mg/m2 ผสมใน bag เดียวกับ ifosfamide — Day 1-3
- [ICE] Carboplatin undefined AUC5 (max 800 mg) ใน D5W 250 mL IV in 1 hr — Day 2 [5×(CrCl+25); max 800 mg]
- [ICE] Etoposide 100 mg/m2 ใน NSS 500 mL IV in 2 hr — Day 1-3
- Gemcitabine 1000 mg/m2 ใน NSS 250 mL IV drip in 30 min — Day ……
- Brentuximab 1.8 mg/kg ใน NSS 100 mL IV in 1 hr — Day 1 (note: NED)
- Bendamustine 90 mg/m2 ใน NSS 500 mL IV in 2 hr — Day 1-2 (note: NED)
- Nivolumab: …… mg in NSS 100 mL IV in 1 hr — Day ……
- [Supportive] Filgrastim (……®): ☐ 300 ☐ 480 mcg SC OD # …… amps — Day ……
- [Supportive] Pegfilgrastim: 6 mg SC — Day ……
- [Supportive] Domperidone (10 mg): 1 tab PO tid ac # …… tabs — ตลอดการรักษา
- [Supportive] Omeprazole (20 mg): 1 cap PO bid ac # …… caps — ตลอดการรักษา

**ใบสั่งยาผู้ป่วยนอก ชุด B** — abbr `OPD B`, OPD — _Siriraj order 2025 p.38_
- Lab ผ่านเกณฑ์ให้ยา: Lab ผ่านเกณฑ์ให้ยา Day …… Hb ≤8 หรือ …… g/dL; ANC 1,000 หรือ ……/mm3, Plt 75,000 หรือ ……/mm3; Regimen …… Cycle …… Day 1 = ……; น้ำหนัก …… kg ส่วนสูง …… cm BSA …… m2; ☐ non cancer ☐ cancer — Day ……
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — Day ……
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — Day ……
- [ALL] Vincristine 1.4 mg/m2 (max 2 mg) IV push — Day …… [max 2 mg]
- [ALL] Doxorubicin 25 mg/m2 ใน NSS 50 mL IV in 10 min — Day ……
- [ALL] Cyclophosphamide 800 mg/m2 (max 1500 mg) ใน NSS 250 mL IV in 1 hr — Day …… [max 1.5 g] (note: ขนาดที่พิมพ์ให้เลือก 800 mg/m2 หรือ 1 g/m2 (max 1.5 g))
- [ALL] Cytarabine 75 mg/m2 ใน NSS 250 mL IV in 2 hr — Day ……
- [ALL] Methotrexate (2.5 mg) 10 mg/m2 PO pc — Day …… [# …… tabs]
- [ALL] 6-MP (50 mg) 60 mg/m2 PO pc — Day …… [# …… tabs]
- [AML/MDS] Azacytidine (……®) 75 mg/m2 SC — Day …… [# …… amps] (note: ใบกำกับ; NED)
- [AML/MDS] Decitabine 20 mg/m2 ใน NSS 100 mL IV in 1 hr — Day …… [# …… amps] (note: ใบกำกับ; NED)
- [Myeloma] Bortezomib (……®) 1.3 mg/m2 SC — Day 1, 4, 8, 11, 22, 25, 29, 32
- [Myeloma] Bortezomib (……®) 1.3 mg/m2 SC — Day 1, 8, 15, 22
- [Myeloma] Thalidomide (50 mg): …… cap PO OD hs # …… caps — Day ……
- [Myeloma] Lenalidomide (……®) (10, 15, 25 mg): …… cap PO OD pc # …… caps — Day 1-21
- [Myeloma] Cyclophosphamide (50 mg) 300 mg/m2 PO pc — Day 1, 8, 15, 22 [# …… tabs]
- [Myeloma] Melphalan (2 mg) 9 mg/m2 PO ac — Day 1-4 [# …… tabs]
- [Myeloma] Dexamethasone (4 mg): …… tabs PO pc # …… tabs — Day ……
- [Myeloma] Prednisolone (5 mg): …… tabs PO pc # …… tabs — Day ……
- [Supportive] Filgrastim (……®): ☐ 300 ☐ 480 mcg SC OD # …… amps — Day ……
- [Supportive] Pegfilgrastim (……®): 6 mg SC — Day ……
- [Supportive] Pamidronate: ☐ 30 ☐ 60 ☐ 90 mg in NSS 250 mL IV in 2 hr — Day ……
- [Supportive] Zoledronate: ☐ 3 ☐ 4 mg in NSS 50 mL IV in 15 min — Day ……
- [Supportive] Denosumab: 120 mg SC — Day ……
- [Supportive] Domperidone (10 mg): 1 tab PO tid ac # …… tabs — ตลอดการรักษา
- [Supportive] Omeprazole (20 mg): 1 cap PO bid ac # …… caps — ตลอดการรักษา

**ใบสั่งยาผู้ป่วยนอก ชุด D** — abbr `OPD D`, OPD — _Siriraj order 2025 p.39_
- Lab ผ่านเกณฑ์ให้ยา: Lab ผ่านเกณฑ์ให้ยา Day …… Hb ≤8 หรือ …… g/dL; ANC 1,000 หรือ ……/mm3, Plt 75,000 หรือ ……/mm3; น้ำหนัก …… kg ส่วนสูง …… cm BSA …… m2; Regimen …… Cycle …… Week …… Day …… = ……; ☐ non cancer ☐ cancer — Day ……
- [Premedication] Dexamethasone: 15, 20 mg IV 30 min / 16, 20 mg PO 60 min ก่อน Dara/Tec — D1, 8, 15, 22 (regimen อื่นๆ) หรือ D1, 8, 15, 22, 29, 36 (D-VMP)
- [Premedication] Paracetamol (500 mg): 2 tabs PO ก่อนให้ยา Dara/Tec 30 นาที — D1, 8, 15, 22 (regimen อื่นๆ) หรือ D1, 8, 15, 22, 29, 36 (D-VMP)
- [Premedication] Benadryl (25 mg): 2 caps PO ก่อนให้ยา Dara/Tec 30 นาที — D1, 8, 15, 22 (regimen อื่นๆ) หรือ D1, 8, 15, 22, 29, 36 (D-VMP)
- [Premedication] Montelukast (10): 1 tab PO ก่อนให้ยา Daratumumab 30 นาที — D1, 8, 15, 22 (regimen อื่นๆ) หรือ D1, 8, 15, 22, 29, 36 (D-VMP)
- [Daratumumab] Red cell phenotyping: ส่ง Blood Bank ก่อนให้ C1D1 (*ให้ฉีด Daratumumab ก่อน bortezomib) — C1D1
- [Daratumumab] Daratumumab IV 16 mg/kg ใน NSS 500 mL IV infusion — ตามตาราง Daratumumab schedule [☐ ชั่วโมงที่ 1 50 mL/hr, ชั่วโมงที่ 2 100 mL/hr, ชั่วโมงที่ 3 150 mL/hr, ต่อไป 200 mL/hr ☐ ชั่วโมงที่ 1 100 mL/hr, ชั่วโมงที่ 2 150 mL/hr, ต่อไป 200 mL/hr (เข็ม 3 เป็นต้นไป)] (note: เลือก rate อย่างใดอย่างหนึ่ง; ใบกำกับ; NED)
- [Daratumumab] Daratumumab SC (1,800 mg/15 mL): 1,800 mg SC หน้าท้องห่างจากสะดือ 3.5 ซม.; สังเกตอาการหลังฉีด 3.5 ชั่วโมง ใน C1D1 และ 30 นาที ในเข็มถัดไป — ตามตาราง Daratumumab schedule
- [Daratumumab] ตาราง Daratumumab schedule (Cycle × Week): คอลัมน์ Wk1 D1, Wk2 D8, Wk3 D15, Wk4 D1, Wk5 D8, Wk6 D15 — DVMP: cycle 1 ให้ทุกสัปดาห์ (Wk1–Wk6); cycle 2-9 ให้ Wk1 D1 และ Wk4 D1; cycle ≥10 ให้ Wk1 D1 (ไม่มี Wk5–6). (m)DVd: cycle 1-3 ให้ Wk1 D1, Wk2 D8, Wk3 D15 (ไม่มี Wk4–6); cycle 4-8 ให้ Wk1 D1; cycle ≥9 ให้ Wk1 D1. DRd/Pd/Kd และ D-VRd: cycle 1-2 ให้ Wk1 D1, Wk2 D8, Wk3 D15, Wk4 D1 (ไม่มี Wk5–6); cycle 3-6 ให้ Wk1 D1 และ Wk3 D15; cycle ≥7 ให้ Wk1 D1 — ตามตาราง
- [DVMP] Bortezomib (……®) 1.3 mg/m2 SC — ☐ D1, 4, 8, 11, 22, 25, 29, 32 (cycle 1) ☐ D1, 8, 22, 29 (cycle 2-9) (note: เลือกตาม cycle)
- [DVMP] Melphalan (2 mg) 9 mg/m2 PO ac — D1-4 (เฉพาะ wk 1 ของ cycle 1-9) [# …… tabs]
- [DVMP] Prednisolone (5 mg) 60 mg/m2 PO pc — D1-4 (เฉพาะ wk 1 ของ cycle 1-9) [# …… tabs]
- [D+VVd/VCd/VTd/VR] Bortezomib (……®) 1.3 mg/m2 SC — ☐ D1, 8, 15, 22 or ☐ D1, 4, 8, 11 (ต้องการลดโรคเร็ว) (note: เลือกตารางอย่างใดอย่างหนึ่ง)
- [D+VVd/VCd/VTd/VR] Thalidomide (50): …… cap PO OD hs # …… caps — D1-28
- [D+VVd/VCd/VTd/VR] Cyclophosphamide (50) 300 mg/m2 tab PO — D1, 8, 15, (22) [# …… tabs]
- [D+VVd/VCd/VTd/VR] Dexamethasone (4 mg): 5 tabs PO BID pc # …… tabs — ☐ D1, 2, 8, 9, 15, 16, 22, 23 ☐ D2, 9, 16, 23 (กรณีมี dexamethasone premed แล้ว)
- [D+RdPd/Kd] Lenalidomide (5, 10, 15, 25 mg): …… cap PO OD pc # …… caps — D1-21
- [D+RdPd/Kd] Pomalidomide (2, 3, 4 mg): …… cap PO OD pc # …… caps — D1-21
- [D+RdPd/Kd] Carfilzomib 20 mg/m2 ใน D5W 50 mL IV in 30 min — ☐ D1, 2, 8, 9, 15, 16 ☐ D1, 8, 15 (note: ขนาดที่พิมพ์ให้เลือก 20, 27, 36, 56, 70 mg/m2; เลือกตารางอย่างใดอย่างหนึ่ง)
- [D+RdPd/Kd] Dexamethasone (4 mg): 5 tabs PO OD/BID pc # …… tabs — D1, 8, 15, 22
- [Others] Selinexor (20): …… tab PO OD with meal # …… tabs — D1, 8, 15, 22
- [Others] Teclistamab (90 mg/mL; 1.7 mL/vial) 1.5 mg/kg SC บริเวณหน้าท้อง — D1, 8, 15, 22 (note: stop steroid premed after C1)
- [Bone] Zoledronate: ☐ 3 ☐ 4 mg + NSS 50 mL IV in 15 min — D ……
- [Bone] Denosumab: 120 mg SC — D ……

### Aplastic anemia

**Aplastic anemia — ATG + CSA** — abbr `ATG+CSA`, IPD — _Siriraj order 2025 p.105_
- Lab D1: BW …… kg Ht …… cm BSA …… m2; Cr …… mg/dL, TB …… mg/dL, AST …… U/L, ALT …… U/L; D1 = ……; CBC, BUN, Cr, Electrolyte, LFT; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล; Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ห้ามให้เกล็ดเลือดหรือเลือดระหว่างให้ antithymocyte globulin; Blood product ทุกชนิดเป็น irradiated product เท่านั้น — ตลอดการรักษา
- คำแนะนำ ATG test dose: ระหว่าง test dose ให้เตรียม adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้; กรณีเกิด severe allergic reaction ให้หยุดยาทันทีและให้ hydrocortisone IV, chlorpheniramine IV; กรณีเกิด anaphylaxis ให้หยุดยาทันทีและให้ adrenaline IV — ระหว่าง test dose
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Acyclovir (400): 1 tab po bid pc — ตลอดการรักษา
- Thymoglobulin test dose (1/10 vial): 2.5 mg in NSS 100 mL IV in 1 hr; Record BP, HR q 15 min — if BP <90/60 mmHg หยุดยา และ notify แพทย์ทันที; ถ้าไม่แพ้ ให้ start ยาได้ — ก่อนเริ่ม ATG
- ☐ Premedication: Dexamethasone: 5 mg IV ก่อน Thymoglobulin 1 ชั่วโมง — D1 ถึง D5
- ☐ Premedication: Chlorpheniramine: 10 mg IV ก่อน Thymoglobulin 1 ชั่วโมง — D1 ถึง D5
- ☐ Premedication: Paracetamol (500 mg): 2 tab oral ก่อน Thymoglobulin 1 ชั่วโมง — D1 ถึง D5
- Thymoglobulin (25 mg/vial) 3.5 mg/kg/day ใน NSS 500 mL IV drip in 12 hr — D1 ถึง D5 (note: Antithymocyte globulin ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคไตหรือโรคตับ)
- Cyclosporin A 5 mg/kg/day oral q 12 hr — เริ่ม D1 [Sig. (100 mg) …… cap oral q 12 hr; (25 mg) …… cap oral q 12 hr] (note: Cyclosporin A ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคไตหรือโรคตับ)
- Prednisolone (5 mg) 1 mg/kg/day tab oral bid pc — D5 ถึง D13 [Sig. …… tab oral bid pc]
- Prednisolone (5 mg) 0.5 mg/kg/day tab oral bid pc — D14 ถึง D16 [Sig. …… tab oral bid pc]
- Prednisolone (5 mg) 0.25 mg/kg/day tab oral OD pc — D17 ถึง D19 [Sig. …… tab oral OD pc; then off prednisolone]

### HLH

**HLH 2004 protocol — Phase I Initial therapy D1–D21** — abbr `HLH-2004 Ph I (order)`, IPD — _Siriraj order 2025 p.107_
- Lab D1: BW …… kg Ht …… cm BSA …… m2 CrCl …… mL/min; Cr …… mg/dL, TB …… mg/dL, AST …… U/L, ALT …… U/L; D1 = ……; CBC, BUN, Cr, Electrolyte, Ca, PO4, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล; Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 และ D8
- Etoposide 150 mg/m2/day ใน NSS 500 mL IV drip in 2 hr — D1, D4, D8, D11, D15 (note: **The first two doses of etoposide may be omitted if ANC <500/mm3 AND hypocellular marrow; CrCl 15–50 mL/min: 75%; CrCl <15 mL/min: งดใช้ยา; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3 mg/dL หรือ AST >180 U/L: งดใช้ยา)
- Dexamethasone 10 mg/m2  — D1 ถึง D14 [Sig. ……]
- Dexamethasone 5 mg/m2  — D15 ถึง D21 [Sig. ……]
- Cyclosporin A 6 mg/kg/day oral q 12 hr — D1 ถึง D21 [Sig. (100 mg) …… cap oral q 12 hr; (25 mg) …… cap oral q 12 hr] (note: ขนาดที่พิมพ์ 6–10 mg/kg/day; ***Keep trough level of cyclosporine 150–200 ng/mL; Cyclosporin A ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคไตหรือโรคตับ)
- หมายเหตุ protocol*: *Add IVIG 0.5 g/kg/dose q 4 week in D1, D29, D57 for Infectious-associated hemophagocytosis (IAHS) only; Add IT CMT if progressive neurological symptoms or abnormal cell persist in CSF only — ตามข้อบ่งชี้

### ALL

**ALL protocol (Adapted GMALL) — Induction D1–14** — abbr `ALL GMALL Ind D1-14`, IPD — _Siriraj order 2025 p.43_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามยินยอม; แนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน ระวังเลือดออกผิดปกติ — ตลอดการรักษา
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1, D8
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1, D8
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV bolus — D1, D8 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดตามโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180: 50%; TB >3.1 หรือ AST >180: งด)
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1, D8 [ระวัง leak] (note: CrCl <10: 75%; TB 1.5–3 หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งด)
- ☐ Prednisolone (5 mg) 60 mg/m2 PO pc — D1–D14 (note: เลือก prednisolone หรือ dexamethasone อย่างใดอย่างหนึ่ง)
- ☐ Dexamethasone (4 mg) 10 mg/m2 PO pc — D1–D14 (note: เลือก prednisolone หรือ dexamethasone อย่างใดอย่างหนึ่ง)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D4 (เว้น D8)

**ALL protocol (Adapted GMALL) — Induction D15–28** — abbr `ALL GMALL Ind D15-28`, IPD — _Siriraj order 2025 p.44_
- Lab D1: CBC, BUN, Cr, LFT; ☐ PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC, PT, aPTT, fibrinogen — D17, D19, D21, D23, D25, D27
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ L-asparaginase: L-asparaginase ผสม 10,000 IU in NSS 2 ml IM ได้; การให้ L-asparaginase วันแรก: Record V/S q 15 min × 2 จากนั้น q 30 min × 2 จากนั้น q 1 hr จนยาหมด ถ้า BP <90/60 mmHg หยุดยาและรายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง; เตรียม adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้; กรณีเกิด severe allergic reaction ให้หยุดยาทันทีและให้ hydrocortisone IV, chlorpheniramine IV; กรณีเกิด anaphylaxis ให้หยุดยาทันทีและให้ adrenaline IV — วันแรกที่ให้ L-asparaginase
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D15 ถึง D28
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — ……
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV bolus — D15 และ D22 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดตามโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180: 50%; TB >3.1 หรือ AST >180: งด)
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV drip in 10 min — D15 และ D22 [ระวัง leak] (note: CrCl <10: 75%; TB 1.5–3 หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งด)
- L-asparaginase 5000 IU/m2 ใน NSS 500 mL IV in 4 hr — D15 ถึง D28
- ☐ Prednisolone (5 mg) 40 mg/m2 PO pc — D15 ถึง D28 (note: เลือก prednisolone หรือ dexamethasone อย่างใดอย่างหนึ่ง)
- ☐ Dexamethasone (4 mg) 6 mg/m2 PO pc — D15 ถึง D28 (note: เลือก prednisolone หรือ dexamethasone อย่างใดอย่างหนึ่ง)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D17 (เว้น D22)

**ALL protocol (induction 1) (Adapted MRC UKALL XII/ECOG E2993) — Induction cycle 1 D1–14** — abbr `ALL UKALL Ind1 D1-14`, IPD — _Siriraj order 2025 p.47_
- Lab D1: CBC, BUN, Cr, LFT; ☐ PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- CSF: ส่ง CSF for cell count, cell diff, cytology, flow cytometry for acute leukemia — D1
- Intrathecal cytarabine: 70 mg IT — D1
- Intrathecal methotrexate: 12.5 mg IT — D14
- Rituximab (พิจารณาใน B-ALL) 375 mg/m2  — D8 (note: พิจารณาให้ Rituximab 375 mg/m2 ใน B-ALL ใน D8 (แบบฟอร์มไม่ได้ระบุ vehicle/วิธีให้))
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1, D8
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV bolus — D1, D8 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดตามโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180: 50%; TB >3.1 หรือ AST >180: งด)
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1, D8 [ระวัง leak] (note: CrCl <10: 75%; TB 1.5–3 หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งด)
- Dexamethasone (4 mg) 10 mg/m2 (max 20 mg) PO pc — D1–D7 [max 20 mg/day]
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — D3 ถึง D6 และ D9 ถึง D12

**ALL protocol (induction 1) (Adapted MRC UKALL XII/ECOG E2993) — Induction cycle 1 D15–28** — abbr `ALL UKALL Ind1 D15-28`, IPD — _Siriraj order 2025 p.48_
- Lab D1: CBC, BUN, Cr, LFT, PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC, PT, aPTT, fibrinogen — D15, D18, D20, D22, D24, D27
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Rituximab (พิจารณาใน B-ALL) 375 mg/m2  — D15 (note: พิจารณาให้ Rituximab 375 mg/m2 ใน B-ALL ใน D15 (แบบฟอร์มไม่ได้ระบุ vehicle/วิธีให้))
- คำแนะนำ L-asparaginase: L-asparaginase ผสม 10,000 IU in NSS 2 ml IM ได้; การให้ L-asparaginase วันแรก: Record V/S q 15 min × 2 จากนั้น q 30 min × 2 จากนั้น q 1 hr จนยาหมด ถ้า BP <90/60 mmHg หยุดยาและรายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง; เตรียม adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้; กรณีเกิด severe allergic reaction ให้หยุดยาทันทีและให้ hydrocortisone IV, chlorpheniramine IV; กรณีเกิด anaphylaxis ให้หยุดยาทันทีและให้ adrenaline IV — วันแรกที่ให้ L-asparaginase
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — ……
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV bolus — D15, D22 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดตามโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180: 50%; TB >3.1 หรือ AST >180: งด)
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV drip in 10 min — D15, D22 [ระวัง leak] (note: CrCl <10: 75%; TB 1.5–3 หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งด)
- ☐ Dexamethasone (4 mg) 10 mg/m2 (max 20 mg) PO pc — D15–D21 [max 20 mg/day] (note: only in age <55 years)
- ☐ L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV in 4 hr — D18, D20, D22, D24, D26, D28 (note: only in age <55 years)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — D17–D20 และ D24–D27

**ALL protocol (induction 2) (Adapted MRC UKALL XII/ECOG E2993) — Induction cycle 2 (42 days)** — abbr `ALL UKALL Ind2`, IPD, cycle 42 วัน — _Siriraj order 2025 p.49_
- Lab D1: CBC, BUN, Cr, LFT, PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC, PT, aPTT, fibrinogen — D15, D18, D20, D22, D24, D27
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Rituximab (พิจารณาใน B-ALL) 375 mg/m2  — D8 และ D15 (note: พิจารณาให้ rituximab 375 mg/m2 ใน B-ALL ใน D8 และ D15 (แบบฟอร์มไม่ได้ระบุ vehicle/วิธีให้))
- คำแนะนำ L-asparaginase: L-asparaginase ผสม 10,000 IU in NSS 2 ml IM ได้; การให้ L-asparaginase วันแรก: Record V/S q 15 min × 2 จากนั้น q 30 min × 2 จากนั้น q 1 hr จนยาหมด ถ้า BP <90/60 mmHg หยุดยาและรายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง; เตรียม adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้; กรณีเกิด severe allergic reaction ให้หยุดยาทันทีและให้ hydrocortisone IV, chlorpheniramine IV; กรณีเกิด anaphylaxis ให้หยุดยาทันทีและให้ adrenaline IV — วันแรกที่ให้ L-asparaginase
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชั่วโมง — ……
- Cyclophosphamide 1000 mg/m2 (max 1500 mg) ใน NSS 250 mL IV drip in 2 hr OD — D1, D29 [max 1,500 mg] (note: CrCl <10: 50%; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา)
- Mesna 250 mg/m2 ใน D5W 20 mL IV drip in 15 min — D1, D29 [250 mg/m2/dose at ชั่วโมงที่ 0, 4, 8 ของการให้ cyclophosphamide]
- ☐ L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV in 4 hr — D15, D17, D19, D21, D23, D25 (note: omitted if ≥55 yr of ages)
- Cytarabine 75 mg/m2 ใน NSS 100 mL IV drip in 30 min OD — D…… ถึง D…… [75 mg/m2/dose] (note: ขนาดยา 75 mg/m2: ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคไตและโรคตับ)
- Mercaptopurine (6-MP) (50 mg) 60 mg/m2 PO hs — D…… ถึง D…… [60 mg/m2/dose]
- Intrathecal methotrexate: 12.5 mg IT — D1, D8, D15, D22
- CSF: ส่ง CSF for cell count, cell diff, cytology, flow cytometry for acute leukemia — D1, D8, D15, D22

**ALL protocol (L-asparaginase) (Adapted MRC UKALL XII/ECOG E2993) — ☐ Intensification phase ☐ Consolidation cycle 1** — abbr `ALL UKALL L-asp`, IPD — _Siriraj order 2025 p.50_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ L-asparaginase: L-asparaginase ผสม 10,000 IU in NSS 2 ml IM ได้; การให้ L-asparaginase วันแรก: Record V/S q 15 min × 2 จากนั้น q 30 min × 2 จากนั้น q 1 hr จนยาหมด ถ้า BP <90/60 mmHg หยุดยาและรายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง; เตรียม adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้; กรณีเกิด severe allergic reaction ให้หยุดยาทันทีและให้ hydrocortisone IV, chlorpheniramine IV; กรณีเกิด anaphylaxis ให้หยุดยาทันทีและให้ adrenaline IV — วันแรกที่ให้ L-asparaginase
- Domperidone (10 mg): 1 tab PO prn nausea/vomiting tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- Phase: ☐ Intensification phase ☐ Consolidation cycle 1 — —
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — ……
- L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV in 4 hr — ☐ D1, D3, D5, D7, D9, D11 (if <55 yr of ages) ☐ D1, D3, D5 (if ≥55 yr of ages) (note: เลือกชุดวันตามอายุ)

**Blinatumomab Consolidation in B-ALL — Cycle 1–4 (42-day/cycle)** — abbr `Blina consol B-ALL`, IPD, cycle 42 วัน — _Siriraj order 2025 p.51_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, Mg, PO4, LFT, Uric, LDH, PT, PTT, Fibrinogen, Amylase, Lipase, CRP, IL-6; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Vital signs หลังให้ Blinatumomab: หลังให้ยา Blinatumomab ให้ Record vital signs q 15 min × 4 then q 30 min × 4 then q 1 hr × 4 then q 4 hr until completion of infusion; Keep BP ≥90/60 mmHg, RR <20/min — ตลอดการให้ยา
- Lab OD: CBC, BUN, Cr, Electrolyte, Ca, Mg, PO4, LFT, Uric, LDH, PT, PTT, Fibrinogen, Amylase, Lipase, CRP, IL-6 OD — ทุกวัน
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs PO OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Acyclovir (400): 1 tab PO bid pc — ตลอดการรักษา
- Dexamethasone (premedication): 20 mg IV bolus 1 hr before infusion — D1
- Paracetamol (500): 2 tabs PO q 6 hr — D1 ถึง D2
- Blinatumomab: 32.5 mcg + stabilizer 5.5 ml in NSS 270 ml IV drip 10 ml/hr for 24 hr; *ห้าม flush สายด้วย NSS หลังยาหมดเด็ดขาด ยาที่ค้างสายให้ทิ้งได้เลย — D1 ถึง D28

**Hyper-CVAD regimen (course คี่) — Cycle 1, 3, 5, 7** — abbr `HyperCVAD A`, IPD — _Siriraj order 2025 p.52_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, LFT, uric acid, LDH, PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Intrathecal methotrexate (50 mg/vial จำนวน 1 ขวด): 12 mg IT วันที่…… — D2
- CSF: ส่ง CSF for cell count, cell differential, protein, sugar, cytology, flow cytometry for acute leukemia; Capillary blood glucose (POCT) หลัง lumbar puncture — D2, D8
- Intrathecal cytarabine (100 mg/vial จำนวน 1 ขวด): 100 mg IT วันที่…… — D8
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs PO OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D4, D8, D11
- Cyclophosphamide 300 mg/m2 ใน NSS 100 mL IV drip in 1 hr q 12 hr — D1 ถึง D3 [q 12 hr (6 doses)] (note: CrCl <10: 50%; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา)
- Mesna 300 mg/m2 ใน 5%DN/2 1,000 mL IV drip in 12 hr q 12 hr — D1 ถึง D3 [q 12 hr (6 doses); เริ่มให้พร้อม cyclophosphamide]
- Vincristine: 2 mg in NSS 20 mL IV push ระวัง leak — D4 และ D11
- Doxorubicin 50 mg/m2 ใน NSS 50 mL IV drip in 10 min — D4 [ระวัง leak] (note: CrCl <10: 75%; TB 1.5–3 หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งด)
- Dexamethasone (40 mg/d): ☐ Dexamethasone (4 mg) 5 tabs PO bid pc ☐ Dexamethasone 10 mg IV q 6 hr — D1 ถึง D4, D11 ถึง D14
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D5 (เว้น D8, D11)

**Hyper-CVAD regimen (course คู่) — Cycle 2, 4, 6, 8** — abbr `HyperCVAD B`, IPD — _Siriraj order 2025 p.53_
- Lab D1: CBC, BUN, Cr, LFT, uric acid, LDH; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Intrathecal methotrexate (50 mg/vial จำนวน 1 ขวด): 12 mg IT วันที่…… — D2
- CSF: ส่ง CSF for cell count, cell differential, protein, sugar, cytology, flow cytometry for acute leukemia; Capillary blood glucose (POCT) หลัง lumbar puncture — D2, D8
- Intrathecal cytarabine (100 mg/vial จำนวน 1 ขวด): 100 mg IT วันที่…… — D8
- MTX level: MTX level OD จนกว่า <0.05 µmol/L (เริ่มเจาะ 48 hr หลังจากเริ่มให้ MTX) — เริ่ม D3
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- งดยา: งดให้ยา omeprazole และ co-trimoxazole — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D3, D8
- Methotrexate (loading) 200 mg/m2 ใน D5W 500 mL IV drip in 3 hr — D1 [then methotrexate 800 mg/m2 in D5W 1,000 mL IV in 20 hr] (note: CrCl 30–60: 50%; CrCl <30: งดยา; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา)
- Methotrexate (continuous) 800 mg/m2 ใน D5W 1,000 mL IV in 20 hr — D1 [ต่อจาก methotrexate 200 mg/m2 in 3 hr] (note: CrCl 30–60: 50%; CrCl <30: งดยา; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา)
- Leucovorin 15 mg/m2 ใน D5W 20 mL IV push q 6 hr — เริ่ม D2 [เริ่มให้ 12 hr หลัง MTX หมด; หยุดให้เมื่อ MTX level <0.05 µmol/L] (note: 50 mg IV q 6 hours if MTX >20 µmol/L at 0 hours, or >1.0 µmol/L at 24 hours, or >0.1 µmol/L at 48 hours after the end of MTX infusion)
- Cytarabine (……®) 3000 mg/m2 ใน NSS 250 mL IV drip in 2 hr q 12 hr — D2 ถึง D3 [q 12 hr (4 doses)] (note: CrCl 40–60: 1,000 mg/m2 ต่อครั้ง; CrCl <40: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- Methylprednisolone: 50 mg in D5W 100 mL IV drip in 30 min q 12 hr (6 doses) — D1 ถึง D3
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D2 ถึง D4
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D5 (เว้น D8)

**Inotuzumab — Infusion Protocol Cycle 1, 2, 3, 4, (5), (6)** — abbr `Inotuzumab`, IPD — _Siriraj order 2025 p.54_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Vital signs ระหว่างให้ยา: Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr × 2 ครั้ง; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา: Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — ทุกครั้งที่ให้ยา
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- Premedication: ก่อนให้ inotuzumab 30 นาที: Dexamethasone injection 10 mg IV; Paracetamol tab (500 mg) 1 tab PO; Benadryl (25 mg) 2 cap PO — ทุกครั้งที่ให้ inotuzumab
- Inotuzumab (…… mg/m2): …… mg/m2 → …… mg in NSS 50 mL IV drip in 1 hr — D……
- Inotuzumab (…… mg/m2): …… mg/m2 → …… mg in NSS 50 mL IV drip in 1 hr — D8
- ☐ Inotuzumab 0.5 mg/m2 ใน NSS 50 mL IV drip in 1 hr — D15 (note: เฉพาะ relapsed ALL schedule (0.8 mg/m2 D1, 0.5 mg/m2 D8 และ D15); ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคไตและไม่ต้องปรับขนาดยาในโรคตับ)

**Mini-Hyper-CVD (course คี่) — Cycle 1, 3, 5, 7** — abbr `MiniHyperCVD A`, IPD — _Siriraj order 2025 p.55_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, LFT, uric acid, LDH, PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Intrathecal methotrexate (50 mg/vial จำนวน 1 ขวด): 12 mg IT วันที่…… — D2
- CSF: ส่ง CSF for cell count, cell differential, protein, sugar, cytology, flow cytometry for acute leukemia; Capillary blood glucose (POCT) หลัง lumbar puncture — D2, D8
- Intrathecal cytarabine (100 mg/vial จำนวน 1 ขวด): 100 mg IT วันที่…… — D8
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs PO OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D3 และ D8
- Cyclophosphamide 150 mg/m2 ใน NSS 100 mL IV drip in 1 hr q 12 hr — D1 ถึง D3 [q 12 hr (6 doses)] (note: CrCl <10: 50%; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา)
- Vincristine: 2 mg in NSS 20 mL IV push ระวัง leak — D1 และ D8
- Dexamethasone (20 mg/d): ☐ Dexamethasone (4 mg) 5 tabs PO OD pc ☐ Dexamethasone 10 mg IV q 12 hr — D1 ถึง D4 และ D11 ถึง D14
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D5 (เว้น D8)

**Mini-Hyper-CVD (course คู่) — Cycle 2, 4, 6, 8** — abbr `MiniHyperCVD B`, IPD — _Siriraj order 2025 p.56_
- Lab D1: CBC, BUN, Cr, LFT, uric acid, LDH; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Intrathecal methotrexate (50 mg/vial จำนวน 1 ขวด): 12 mg IT วันที่…… — D2
- CSF: ส่ง CSF for cell count, cell differential, protein, sugar, cytology, flow cytometry for acute leukemia; Capillary blood glucose (POCT) หลัง lumbar puncture — D2, D8
- Intrathecal cytarabine (100 mg/vial จำนวน 1 ขวด): 100 mg IT วันที่…… — D8
- MTX level: MTX level OD จนกว่า <0.05 µmol/L (เริ่มเจาะ 48 hr หลังจากเริ่มให้ MTX) — เริ่ม D3
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- งดยา: งดให้ยา omeprazole และ co-trimoxazole — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D3
- Methotrexate 250 mg/m2 ใน D5W 500 mL IV drip in 3 hr — D1 (note: CrCl 30–60: 50%; CrCl <30: งดยา; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา)
- Leucovorin 15 mg/m2 ใน D5W 20 mL IV push q 6 hr — เริ่ม D2 [เริ่มให้ 12 hr หลัง MTX หมด; หยุดให้เมื่อ MTX level <0.05 µmol/L] (note: 50 mg IV q 6 hours if MTX >20 µmol/L at 0 hours, or >1.0 µmol/L at 24 hours, or >0.1 µmol/L at 48 hours after the end of MTX infusion)
- Cytarabine (……®) 500 mg/m2 ใน NSS 250 mL IV drip in 2 hr q 12 hr — D2 ถึง D3 [q 12 hr (4 doses)] (note: ขนาดยา 500 mg/m2: ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคไตและโรคตับ)
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D2 ถึง D4
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D5

**Nelarabine (after CMT) Induction T-ALL — Nelarabine Protocol Cycle 1, 2 (21-day to 35-day/cycle)** — abbr `Nelarabine T-ALL`, IPD, cycle 21–35 วัน — _Siriraj order 2025 p.57_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Vital signs ระหว่างให้ยา: Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr × 2 ครั้ง; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา: Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — ทุกครั้งที่ให้ยา
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- ☐ Allopurinol (300 mg): 1 tab PO OD pc — ตลอดการรักษา
- Premedication: ก่อนให้ nelarabine 30 นาที: Paracetamol tab (500 mg) 1 tab PO; ☐ NSS 1,000 ml IV drip in 4 hr (if bulky disease) — D1 ถึง D5
- Nelarabine (5 mg/ml) (50 ml/vial) 650 mg/m2 IV drip in 2 hr — D1 ถึง D5 (note: ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคไตหรือโรคตับ)

**TPOG HR/VHR ALL Regimen (Phase I) — Phase I: HR/VHR Induction** — abbr `TPOG Ph I`, IPD — _Siriraj order 2025 p.58_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC, PT, aPTT, fibrinogen — D3, D5, D7, D9, D11, D13
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ L-asparaginase: L-asparaginase ผสม 10,000 IU in NSS 2 ml IM ได้; การให้ L-asparaginase วันแรก: Record V/S q 15 min × 2 จากนั้น q 30 min × 2 จากนั้น q 1 hr จนยาหมด ถ้า BP <90/60 mmHg หยุดยาและรายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง; เตรียม adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้; กรณีเกิด severe allergic reaction ให้หยุดยาทันทีและให้ hydrocortisone IV, chlorpheniramine IV; กรณีเกิด anaphylaxis ให้หยุดยาทันทีและให้ adrenaline IV — วันแรกที่ให้ L-asparaginase
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชั่วโมง — ……
- Vincristine 1.5 mg/m2 (max 2 mg) ใน NSS 20 mL IV bolus — D1, D8, D15, D22 [1.5 mg/m2/dose; max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดตามโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180: 50%; TB >3.1 หรือ AST >180: งด)
- Prednisolone 30 mg/m2 PO bid pc — D1 ถึง D28 [30 mg/m2/dose]
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1, D8, D15, D22 [25 mg/m2/dose] (note: TB 1.2–3 mg/dL หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งดยา)
- L-Asparaginase 10000 IU/m2 ใน NSS 500 mL IV in 4 hr — D4, D6, D8, D10, D12, D14 [10,000 IU/m2/dose] (note: Consider withhold dose if elevated direct bilirubinemia)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — D3, D5, D7, D9, D11, D13, D16–D21, D23 เป็นต้นไป
- Intrathecal methotrexate*: 15 mg IT — D1, D8, D29
- CSF: ส่ง CSF for cell count, cell diff, cytology, flow cytometry for acute leukemia — D1, D8, D29

**TPOG VHR ALL Regimen (Phase II) — Phase II: VHR-Augmented Consolidation (Wk……) [Cyclophosphamide/Cytarabine/6-MP; MTX IT wk 1–2]** — abbr `TPOG Ph II-A`, IPD — _Siriraj order 2025 p.59_
- Lab D1: CBC, BUN, Cr, LFT, uric acid, LDH; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D……
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Intrathecal methotrexate*: 15 mg IT — D……
- CSF: ส่ง CSF for cell count, cell diff, cytology, flow cytometry for acute leukemia — D……
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชั่วโมง — D……
- Cyclophosphamide** 1000 mg/m2 ใน NSS 250 mL IV drip in 2 hr OD — D…… [1,000 mg/m2/dose] (note: CrCl <10: 50%; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา; **Cyclophosphamide ให้เฉพาะ week 1 และ 5)
- Mesna 250 mg/m2 ใน D5W 20 mL IV drip in 15 min — D…… [250 mg/m2/dose at ชั่วโมงที่ 0, 4, 8 ของการให้ cyclophosphamide]
- Cytarabine 75 mg/m2 ใน NSS 100 mL IV drip in 30 min OD — D…… ถึง D…… [75 mg/m2/dose] (note: ขนาดยา 75 mg/m2: ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคไตและโรคตับ)
- Mercaptopurine (6-MP) (50 mg) 60 mg/m2 PO hs — D…… ถึง D…… [60 mg/m2/dose]

**TPOG VHR ALL Regimen (Phase II) — Phase II: VHR-Augmented Consolidation (Wk……) [L-Asparaginase/Vincristine; MTX IT wk 3–4]** — abbr `TPOG Ph II-B`, IPD — _Siriraj order 2025 p.60_
- Lab D1: CBC, BUN, Cr, LFT, uric acid, LDH; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D……
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Intrathecal methotrexate*: 15 mg IT — D……
- CSF: ส่ง CSF for cell count, cell diff, cytology, flow cytometry for acute leukemia — D……
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap PO OD ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชั่วโมง — D……
- L-Asparaginase 25000 IU/m2 ใน NSS 500 mL IV in 4 hr — D…… [25,000 IU/m2/dose] (note: Consider withhold dose if elevated direct bilirubinemia)
- Vincristine 1.5 mg/m2 (max 2 mg) ใน NSS 20 mL IV bolus — D…… [1.5 mg/m2/dose; max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดตามโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180: 50%; TB >3.1 หรือ AST >180: งด)

**TPOG VHR ALL Regimen (Phase III) — Phase III: VHR-Augmented Interim Consolidation** — abbr `TPOG Ph III`, IPD — _Siriraj order 2025 p.61_
- Lab D1: CBC, BUN, Cr, LFT, uric acid, LDH; U/A, stool concentrate for parasite × 3 days; CXR (PA); EKG 12 leads — D……
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Intrathecal methotrexate: 15 mg IT — D……
- CSF: ส่ง CSF for cell count, cell diff, cytology, flow cytometry for acute leukemia — D……
- MTX level: MTX level OD จนกว่า <0.05 µmol/L (เริ่มเจาะ 48 hr หลังจากเริ่มให้ MTX) — เริ่ม D……
- Domperidone (10 mg): 1 tab PO tid ac — ตลอดการรักษา
- Senokot: 2 tabs PO hs prn constipation — ตลอดการรักษา
- งดยา: งดให้ยา omeprazole และ co-trimoxazole — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชั่วโมง — D……
- Vincristine 1.5 mg/m2 (max 2 mg) ใน NSS 20 mL IV bolus — D…… [1.5 mg/m2/dose; max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดตามโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180: 50%; TB >3.1 หรือ AST >180: งด)
- Methotrexate 5000 mg/m2 ใน D5W 1,000 mL IV drip in 24 hr — D…… (note: CrCl 30–60: 50%; CrCl <30: งดยา; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา)
- Leucovorin 15 mg/m2 ใน D5W 20 mL IV push q 6 hr — เริ่ม D…… [เริ่มให้ 12 hr หลัง MTX หมด; หยุดให้เมื่อ MTX level <0.05 µmol/L]
- Mercaptopurine (6-MP) (50 mg) 25 mg/m2 PO hs — D1–D56 [25 mg/m2/dose]
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D……

### AML

**3+7 regimen (Idarubicin + Cytarabine)** — abbr `3+7`, IPD — _Siriraj order 2025 p.63_
- Lab D1: CBC, BUN, Cr, Electrolyte, LFT, Ca, PO4, uric acid, LDH; ☐ PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA), EKG — D1
- การประเมินโรค AML: BMA, BM biopsy, flow cytometry, cytogenetics, gene, CT brain/LP กรณีมีอาการทางสมอง, CT หรือ PET กรณี extramedullary leukemia — D1
- HLA typing: ☐ HLA typing class I ของผู้ป่วย (DNA) กรณี transplant candidate — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Azole level: ☐ Posaconazole level ☐ Itraconazole level ก่อนรับประทานยา — D8, D14, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- ☐ Omeprazole (20 mg): 1 cap oral OD ac ก่อนอาหาร 2 ชั่วโมง — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ☐ Itraconazole (100 mg): Antifungal prophylaxis: 2 caps oral tid Day 1 to Day 3 then 2 caps oral bid พร้อมอาหาร — ตลอดการรักษา
- ☐ Posaconazole: กรณีต้องการสั่งยา Posaconazole ให้ปรึกษาแพทย์อายุรศาสตร์โรคติดเชื้อ — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D7
- Idarubicin 12 mg/m2 ใน NSS 50 mL IV drip in 10 min OD — D1–D3 [ระวัง leak] (note: eGFR <30 ml/min/1.73m2: ลดขนาดยา; TB 2.5–5 mg/dL: 6 mg/m2/day; TB >5 mg/dL: งดยา)
- Cytarabine 100 mg/m2 ใน NSS 500 mL IV drip in 12 hr OD — D1–D7 [ขนาด 100–200 mg/m2 (ระบุขนาดที่เลือก)] (note: ขนาดยา 100–200 mg/m2: ไม่มีคำแนะนำเรื่องปรับขนาดยาในโรคไตและโรคตับ)

### MDS/AML

**Azacitidine** — abbr `Aza`, IPD — _Siriraj order 2025 p.64_
- Lab D1: CBC, BUN, Cr, LFT; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D4, D7
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron (8 mg): 1 tab oral ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D……
- Azacytidine (100 mg/vial) 75 mg/m2/day SC — D1–D…… (note: กรณี nadir ANC 500–1,500/mm3 หรือ platelet 25,000–50,000/mm3: 50 mg/m2/day (baseline ANC >1,500/mm3 และ platelet 75,000/mm3); กรณี nadir ANC <500/mm3 หรือ platelet <25,000/mm3: 37.5 mg/m2/day (baseline ANC >1,500/mm3 และ platelet 75,000/mm3); กรณี HCO3 <20 mEq/L หรือการทำงานของไตลดลงภายหลังได้รับยาโดยไม่ทราบสาเหตุ: 37.5 mg/m2/day)

**Azacitidine + Venetoclax** — abbr `Aza-Ven`, IPD — _Siriraj order 2025 p.65_
- Lab D1: CBC, BUN, Cr, LFT; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D3, D5, D7
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- ☐ Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron (8 mg): 1 tab oral ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D7
- Azacytidine (100 mg/vial) 75 mg/m2/day SC — D1–D7 (note: กรณี nadir ANC 500–1,500/mm3 หรือ platelet 25,000–50,000/mm3: 50 mg/m2/day (baseline ANC >1,500/mm3 และ platelet 75,000/mm3); กรณี nadir ANC <500/mm3 หรือ platelet <25,000/mm3: 37.5 mg/m2/day (baseline ANC >1,500/mm3 และ platelet 75,000/mm3); กรณี HCO3 <20 mEq/L หรือการทำงานของไตลดลงภายหลังได้รับยาโดยไม่ทราบสาเหตุ: 37.5 mg/m2/day)
- Venetoclax (100 mg): 1 tab oral OD pc — D1–D……
- ☐ Ramp-up dose of venetoclax: Itraconazole (100 mg): 1 tab oral OD with meal D2, then 2 tabs oral OD with meal D3 ถึง D…… — D2, D3–D……
- ☐ Normal dose of venetoclax: Itraconazole (100 mg): 2 tabs oral OD with meal — D1–D……

**Decitabine** — abbr `Dec`, IPD — _Siriraj order 2025 p.66_
- Lab D1: CBC, BUN, Cr, LFT; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D3, D6
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D5
- Decitabine (50 mg/vial) 20 mg/m2/day ใน NSS 100 mL IV drip in 1 hr — D1–D5 (note: ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคไตหรือโรคตับ)

**Decitabine + Venetoclax** — abbr `Dec-Ven`, IPD — _Siriraj order 2025 p.67_
- Lab D1: CBC, BUN, Cr, LFT; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D3, D6
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- ☐ Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D5
- Decitabine (50 mg/vial) 20 mg/m2/day ใน NSS 100 mL IV drip in 1 hr — D1–D5 (note: ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคไตหรือโรคตับ)
- Venetoclax (100 mg): 1 tab oral OD pc — D1–D……
- ☐ Ramp-up dose of venetoclax: Itraconazole (100 mg): 1 tab oral OD with meal D2, then 2 tabs oral OD with meal D3 ถึง D…… — D2, D3–D……
- ☐ Normal dose of venetoclax: Itraconazole (100 mg): 2 tabs oral OD with meal — D1–D……

### AML

**HDAC regimen for CBF-AML** — abbr `HDAC`, IPD — _Siriraj order 2025 p.68_
- Lab D1: CBC, BUN, Cr, LFT; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- HLA typing: ส่งตรวจ HLA typing: ☐ class I ของผู้ป่วย (DNA) ☐ class I ของ donor (serology) ☐ class II ของผู้ป่วยและ donor (DNA high resolution) ☐ ไม่ตรวจ เนื่องจากรอผล HLA class…………… ☐ ไม่ตรวจ เนื่องจากเป็น non-transplant candidate — D1
- สิทธิปลูกถ่าย: ☐ ขออนุมัติสิทธิปลูกถ่าย (ภายหลัง CR สำหรับสิทธิ ปกส. และภายหลัง matched HLA class II สำหรับสิทธิ สปสช.) — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1, D3, D5
- Cytarabine 3000 mg/m2 ใน NSS 250 mL IV drip in 3 hr q 12 hr — D1, D3, D5 [3,000 mg/m2 ต่อครั้ง (รวม 6 doses)] (note: CrCl 40–60 mL/min: 1,000 mg/m2 ต่อครั้ง; CrCl <40 mL/min: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- ตรวจ cerebellar signs: ตรวจ cerebellar signs ทุกครั้งก่อนให้ยา cytarabine — D1, D3, D5
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D1–D7
- Filgrastim: ○ 300 mcg ○ 480 mcg SC OD — เริ่ม D6

**IDAC regimen** — abbr `IDAC`, IPD — _Siriraj order 2025 p.69_
- Lab D1: CBC, BUN, Cr, LFT; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- HLA typing: ส่งตรวจ HLA typing: ☐ class I ของผู้ป่วย (DNA) ☐ class I ของ donor (serology) ☐ class II ของผู้ป่วยและ donor (DNA high resolution) ☐ ไม่ตรวจ เนื่องจากรอผล HLA class…………… ☐ ไม่ตรวจ เนื่องจากเป็น non-transplant candidate — D1
- สิทธิปลูกถ่าย: ☐ ขออนุมัติสิทธิปลูกถ่าย (ภายหลัง CR สำหรับสิทธิ ปกส. และภายหลัง matched HLA class II สำหรับสิทธิ สปสช.) — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1, D3, D5
- Cytarabine 1500 mg/m2 ใน NSS 250 mL IV drip in 3 hr q 12 hr — D1, D3, D5 [1,500 mg/m2 ต่อครั้ง (รวม 6 doses)] (note: CrCl 40–60 mL/min: 500–1,000 mg/m2 ต่อครั้ง; CrCl <40 mL/min: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- ตรวจ cerebellar signs: ตรวจ cerebellar signs ทุกครั้งก่อนให้ยา cytarabine — D1, D3, D5
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D1–D7
- Filgrastim: ○ 300 mcg ○ 480 mcg SC OD — เริ่ม D6

**LDAC regimen (Low-dose cytarabine)** — abbr `LDAC`, IPD — _Siriraj order 2025 p.70_
- Lab D1: CBC, BUN, Cr, LFT; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC — D5, D10
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D10
- Cytarabine: 40 mg SC OD — D1–D10

### MDS/AML

**LDAC regimen + Venetoclax** — abbr `LDAC-Ven`, IPD — _Siriraj order 2025 p.71_
- Lab D1: CBC, BUN, Cr, LFT; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC — D5, D10
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- ☐ Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D10
- Cytarabine 20 mg/m2 SC OD — D1–D10 (note: Low dose cytarabine: ไม่ต้องปรับขนาดยาในโรคไต และไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- Venetoclax (100 mg): 1 tab po OD pc — D1–D……
- ☐ Ramp-up dose of venetoclax: Itraconazole (100 mg): 1 tab oral OD with meal D2, then 2 tabs oral OD with meal D3, then 3 tabs oral OD with meal D4 ถึง D…… — D2, D3, D4–D……
- ☐ Normal dose of venetoclax: Itraconazole (100 mg): 3 tabs oral OD with meal — D1–D……

**Low-dose Decitabine + G-CSF (G-DEC)** — abbr `G-DEC`, IPD — _Siriraj order 2025 p.72_
- Lab D1: CBC, BUN, Cr, LFT; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D0 = ……, D1 = ……
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D3, D6
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Filgrastim 100 mcg/m2 SC OD — D0–D5 [○ 300 mcg ○ 480 mcg SC OD]
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D5
- Decitabine (50 mg/vial) 5 mg/m2/day ใน NSS 50 mL IV drip in 30 min — D1–D5 (note: ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคไตหรือโรคตับ)

### APL

**ATO monotherapy** — abbr `ATO mono`, IPD — _Siriraj order 2025 p.74_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC, Cr, Electrolyte, Mg, ALT — D5, D8, D10, D12, D14, D17, D20
- EKG ติดตาม: EKG 12 leads — D4, D8, D11, D15, D18, D22, D25
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <30,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3); ให้ FFP ถ้า prolonged PT, aPTT; ให้ cryoprecipitate ถ้า fibrinogen <150 mg/dL; keep K >4 mEq/L, Mg >1.8 mEq/L, QTc <500 msec — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — เริ่ม D1 จนกว่า CR
- Arsenic trioxide 0.15 mg/kg/day ใน NSS 250 mL IV drip in 2 hr — เริ่ม D1 จนกว่า CR (ไม่เกิน D75)
- การประเมินโรค APL: BMA, BM biopsy, flow cytometry, cytogenetics, PML-RARA, CT brain/LP กรณีมีอาการทางสมอง — D1

**ATRA monotherapy** — abbr `ATRA mono`, IPD — _Siriraj order 2025 p.75_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <30,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3); ให้ FFP ถ้า prolonged PT, aPTT; ให้ cryoprecipitate ถ้า fibrinogen <150 mg/dL — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — เริ่ม D1 จนกว่า CR (ไม่เกิน D90) […… cap oral pc เช้า, …… cap oral pc เย็น; ห้ามให้ทาง NG tube]
- การประเมินโรค APL: BMA, BM biopsy, flow cytometry, cytogenetics, PML-RARA, CT brain/LP กรณีมีอาการทางสมอง — D1

**ATRA-ATO — Induction** — abbr `ATRA-ATO Ind`, IPD — _Siriraj order 2025 p.77_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC, Cr, Electrolyte, Mg, ALT — D5, D8, D10, D12, D14, D17, D20
- EKG ติดตาม: EKG 12 leads — D4, D8, D11, D15, D18, D22, D25
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <30,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3); ให้ FFP ถ้า prolonged PT, aPTT; ให้ cryoprecipitate ถ้า fibrinogen <150 mg/dL; keep K >4 mEq/L, Mg >1.8 mEq/L, QTc <500 msec — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — เริ่ม D1 จนกว่า CR (ไม่เกิน D60) […… cap oral pc เช้า, …… cap oral pc เย็น; ห้ามให้ทาง NG tube]
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — เริ่ม D1 จนกว่า CR
- Arsenic trioxide 0.15 mg/kg/day ใน NSS 250 mL IV drip in 2 hr — เริ่ม D1 จนกว่า CR
- การประเมินโรค APL: BMA, BM biopsy, flow cytometry, cytogenetics, PML-RARA, CT brain/LP กรณีมีอาการทางสมอง — D1

**ATRA-ATO — Consolidation Cycle 1, 3, 5, 7 (course คี่)** — abbr `ATRA-ATO Cons odd`, IPD — _Siriraj order 2025 p.78_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid; ☐ PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC, Cr, Electrolyte, Mg, ALT — D8, D15, D22
- EKG ติดตาม: EKG 12 leads — D8, D15, D22
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3); ให้ FFP ถ้า prolonged PT, aPTT; ให้ cryoprecipitate ถ้า fibrinogen <150 mg/dL; keep K >4 mEq/L, Mg >1.8 mEq/L, QTc <500 msec — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1 ถึง D14 […… cap oral pc เช้า, …… cap oral pc เย็น; ห้ามให้ทาง NG tube]
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D5, D8–D12, D15–D19, D22–D26
- Arsenic trioxide 0.15 mg/kg/day ใน NSS 250 mL IV drip in 2 hr — D1–D5, D8–D12, D15–D19, D22–D26
- การประเมินโรค APL: day 28–35 ของ induction: BMA, BM biopsy, flow cytometry; หลังจาก consolidation: BMA, BM biopsy, flow cytometry, PML-RARA — D1

**ATRA-ATO — Consolidation Cycle 2, 4, 6 (course คู่)** — abbr `ATRA-ATO Cons even`, IPD — _Siriraj order 2025 p.79_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid; ☐ PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3); ให้ FFP ถ้า prolonged PT, aPTT; ให้ cryoprecipitate ถ้า fibrinogen <150 mg/dL — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1 ถึง D14 […… cap oral pc เช้า, …… cap oral pc เย็น; ห้ามให้ทาง NG tube]

**ATRA-IDA (ATRA + Chemotherapy) — Induction** — abbr `ATRA-IDA Ind`, IPD — _Siriraj order 2025 p.81_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads; eGFR — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <30,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3); ให้ FFP ถ้า prolonged PT, aPTT; ให้ cryoprecipitate ถ้า fibrinogen <150 mg/dL — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D2, D4, D6, D8
- Idarubicin 12 mg/m2/day ใน NSS 50 mL IV drip in 10 min — D2, D4, D6, D8 [ระวัง leak] (note: eGFR <30 mL/min/1.73 m2: ลดขนาดยา; TB 2.5–5 mg/dL: 6 mg/m2/day (50%); TB >5 mg/dL: งดยา; หากอายุมากกว่า 70 ปี: งดยา Day 8)
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — เริ่ม D1 จนกว่า CR (ไม่เกิน D90) […… cap oral pc เช้า, …… cap oral pc เย็น; ห้ามให้ทาง NG tube]
- การประเมินโรค APL: BMA, BM biopsy, flow cytometry, cytogenetics, PML-RARA, CT brain/LP กรณีมีอาการทางสมอง, CT หรือ PET กรณี extramedullary leukemia — D1

**ATRA-IDA — Consolidation Cycle 1 (High risk)** — abbr `ATRA-IDA C1 HR`, IPD — _Siriraj order 2025 p.82_
- Lab D1: CBC, BUN, Cr, LFT, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads; eGFR, CrCl — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D4
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1 ถึง D15 […… tab oral pc เช้า, …… tab oral pc เย็น; ห้ามให้ทาง NG tube]
- Idarubicin 5 mg/m2/day ใน NSS 50 mL IV drip in 10 min — D1 ถึง D4 [ระวัง leak] (note: 5 mg/m2/day สำหรับ high risk และ low risk, 7 mg/m2/day สำหรับ intermediate risk; eGFR <30 mL/min/1.73 m2: ลดขนาดยา; TB 2.5–5 mg/dL: 6 mg/m2/day (50%); TB >5 mg/dL: งดยา)
- Cytarabine (เฉพาะ high risk) 1000 mg/m2 ใน NSS 250 mL IV drip in 3 hr — D1 ถึง D4 (note: CrCl 40–60 mL/min: 500 mg/m2/day; CrCl <40 mL/min: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- ตรวจ cerebellar signs: ตรวจ cerebellar signs ทุกครั้งก่อนให้ยา cytarabine (เฉพาะ high risk) — D1 ถึง D4
- Dexa-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D1 ถึง D7
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D5
- การประเมินโรค APL: APL day 28–35 ของ induction: BMA, BM biopsy, flow cytometry, LP กรณี high risk — D1

**ATRA-IDA — Consolidation Cycle 1 (Intermediate risk)** — abbr `ATRA-IDA C1 IR`, IPD — _Siriraj order 2025 p.82_
- Lab D1: CBC, BUN, Cr, LFT, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads; eGFR, CrCl — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D4
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1 ถึง D15 […… tab oral pc เช้า, …… tab oral pc เย็น; ห้ามให้ทาง NG tube]
- Idarubicin 7 mg/m2/day ใน NSS 50 mL IV drip in 10 min — D1 ถึง D4 [ระวัง leak] (note: 7 mg/m2/day สำหรับ intermediate risk (5 mg/m2/day สำหรับ high risk และ low risk); eGFR <30 mL/min/1.73 m2: ลดขนาดยา; TB 2.5–5 mg/dL: 6 mg/m2/day (50%); TB >5 mg/dL: งดยา)
- Dexa-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D1 ถึง D7
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D5
- การประเมินโรค APL: APL day 28–35 ของ induction: BMA, BM biopsy, flow cytometry, LP กรณี high risk — D1

**ATRA-IDA — Consolidation Cycle 1 (Low risk)** — abbr `ATRA-IDA C1 LR`, IPD — _Siriraj order 2025 p.82_
- Lab D1: CBC, BUN, Cr, LFT, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads; eGFR, CrCl — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D4
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1 ถึง D15 […… tab oral pc เช้า, …… tab oral pc เย็น; ห้ามให้ทาง NG tube]
- Idarubicin 5 mg/m2/day ใน NSS 50 mL IV drip in 10 min — D1 ถึง D4 [ระวัง leak] (note: 5 mg/m2/day สำหรับ high risk และ low risk, 7 mg/m2/day สำหรับ intermediate risk; eGFR <30 mL/min/1.73 m2: ลดขนาดยา; TB 2.5–5 mg/dL: 6 mg/m2/day (50%); TB >5 mg/dL: งดยา)
- Dexa-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D1 ถึง D7
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D5
- การประเมินโรค APL: APL day 28–35 ของ induction: BMA, BM biopsy, flow cytometry, LP กรณี high risk — D1

**ATRA-IDA — Consolidation Cycle 2 (High risk)** — abbr `ATRA-IDA C2 HR`, IPD — _Siriraj order 2025 p.83_
- Lab D1: CBC, BUN, Cr, LFT, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D5
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1 ถึง D15 […… tab oral pc เช้า, …… tab oral pc เย็น; ห้ามให้ทาง NG tube]
- Mitoxantrone 10 mg/m2/day ใน NSS 50 mL IV drip in 15 min — D1 ถึง D5 (note: D1 ถึง D5 สำหรับ high risk, D1 ถึง D3 สำหรับ intermediate และ low risk; ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL: 5 mg/m2/day (50%); TB >3 mg/dL: 2.5 mg/m2/day (25%))
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D……

**ATRA-IDA — Consolidation Cycle 2 (Intermediate / Low risk)** — abbr `ATRA-IDA C2 IR-LR`, IPD — _Siriraj order 2025 p.83_
- Lab D1: CBC, BUN, Cr, LFT, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D5
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1 ถึง D15 […… tab oral pc เช้า, …… tab oral pc เย็น; ห้ามให้ทาง NG tube]
- Mitoxantrone 10 mg/m2/day ใน NSS 50 mL IV drip in 15 min — D1 ถึง D3 (note: D1 ถึง D3 สำหรับ intermediate และ low risk, D1 ถึง D5 สำหรับ high risk; ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL: 5 mg/m2/day (50%); TB >3 mg/dL: 2.5 mg/m2/day (25%))
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D……

**ATRA-IDA — Consolidation Cycle 3 (High risk)** — abbr `ATRA-IDA C3 HR`, IPD — _Siriraj order 2025 p.84_
- Lab D1: CBC, BUN, Cr, LFT, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads; eGFR — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D4
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1 ถึง D15 […… tab oral pc เช้า, …… tab oral pc เย็น; ห้ามให้ทาง NG tube]
- Idarubicin 12 mg/m2/day ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: D1 สำหรับ high risk และ low risk, D1 ถึง D2 สำหรับ intermediate risk; eGFR <30 mL/min/1.73 m2: ลดขนาดยา; TB 2.5–5 mg/dL: 6 mg/m2/day (50%); TB >5 mg/dL: งดยา)
- Cytarabine (เฉพาะ high risk) 150 mg/m2 ใน NSS 500 mL IV drip in 8 hr — D1 ถึง D4 (note: ขนาดยา 150 mg/m2: ไม่มีคำแนะนำเรื่องปรับขนาดยาในโรคไตและโรคตับ)
- ตรวจ cerebellar signs: ตรวจ cerebellar signs ทุกครั้งก่อนให้ยา cytarabine (เฉพาะ high risk) — D1 ถึง D4
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D1 ถึง D7
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D……
- การประเมินโรค APL: APL หลังจาก consolidation: BMA, BM biopsy, flow cytometry, PML-RARA — D1

**ATRA-IDA — Consolidation Cycle 3 (Intermediate risk)** — abbr `ATRA-IDA C3 IR`, IPD — _Siriraj order 2025 p.84_
- Lab D1: CBC, BUN, Cr, LFT, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads; eGFR — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D4
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1 ถึง D15 […… tab oral pc เช้า, …… tab oral pc เย็น; ห้ามให้ทาง NG tube]
- Idarubicin 12 mg/m2/day ใน NSS 50 mL IV drip in 10 min — D1 ถึง D2 [ระวัง leak] (note: D1 ถึง D2 สำหรับ intermediate risk (D1 สำหรับ high risk และ low risk); eGFR <30 mL/min/1.73 m2: ลดขนาดยา; TB 2.5–5 mg/dL: 6 mg/m2/day (50%); TB >5 mg/dL: งดยา)
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D1 ถึง D7
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D……
- การประเมินโรค APL: APL หลังจาก consolidation: BMA, BM biopsy, flow cytometry, PML-RARA — D1

**ATRA-IDA — Consolidation Cycle 3 (Low risk)** — abbr `ATRA-IDA C3 LR`, IPD — _Siriraj order 2025 p.84_
- Lab D1: CBC, BUN, Cr, LFT, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads; eGFR — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D4
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1 ถึง D15 […… tab oral pc เช้า, …… tab oral pc เย็น; ห้ามให้ทาง NG tube]
- Idarubicin 12 mg/m2/day ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: D1 สำหรับ high risk และ low risk, D1 ถึง D2 สำหรับ intermediate risk; eGFR <30 mL/min/1.73 m2: ลดขนาดยา; TB 2.5–5 mg/dL: 6 mg/m2/day (50%); TB >5 mg/dL: งดยา)
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D1 ถึง D7
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D……
- การประเมินโรค APL: APL หลังจาก consolidation: BMA, BM biopsy, flow cytometry, PML-RARA — D1

**APML4 — Induction ATRA-IDA-ATO** — abbr `APML4 Ind`, IPD — _Siriraj order 2025 p.86_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads; eGFR — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC, Cr, Electrolyte, Mg, ALT — D5, D8, D10, D12, D14, D17, D20
- EKG ติดตาม: EKG 12 leads — D4, D8, D11, D15, D18, D22, D25
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <30,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3); ให้ FFP ถ้า prolonged PT, aPTT; ให้ cryoprecipitate ถ้า fibrinogen <150 mg/dL; keep K >4 mEq/L, Mg >1.8 mEq/L, QTc <500 msec — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D2, D4, D6, D8, D9 ถึง D36
- Idarubicin 12 mg/m2/day ใน NSS 50 mL IV drip in 10 min — D2, D4, D6, D8 [6–12 mg/m2/day ตามอายุ; ระวัง leak] (note: อายุ 1–60 ปี: 12 mg/m2/day; อายุ 61–70 ปี: 9 mg/m2/day; อายุ >70 ปี: 6 mg/m2/day; eGFR <30 mL/min/1.73 m2: ลดขนาดยา; TB 2.5–5 mg/dL: 6 mg/m2/day (50%); TB >5 mg/dL: งดยา)
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1 ถึง D36 […… cap oral pc เช้า, …… cap oral pc เย็น; ห้ามให้ทาง NG tube]
- Arsenic trioxide 0.15 mg/kg/day ใน NSS 250 mL IV drip in 2 hr — D9 ถึง D36
- Prednisolone (5 mg) 1 mg/kg/day PO — D1 ถึง D10 หรือ WBC <1,000/mm3 [Sig. ……]
- การประเมินโรค APL: BMA, BM biopsy, flow cytometry, cytogenetics, PML-RARA, CT brain/LP กรณีมีอาการทางสมอง — D1

**APML4 — Consolidation Cycle 1** — abbr `APML4 C1`, IPD — _Siriraj order 2025 p.87_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid; ☐ PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC, Cr, Electrolyte, Mg, ALT — D8, D15, D22
- EKG ติดตาม: EKG 12 leads — D8, D15, D22
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3); ให้ FFP ถ้า prolonged PT, aPTT; ให้ cryoprecipitate ถ้า fibrinogen <150 mg/dL; keep K >4 mEq/L, Mg >1.8 mEq/L, QTc <500 msec — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1 ถึง D28 […… cap oral pc เช้า, …… cap oral pc เย็น; ห้ามให้ทาง NG tube]
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D28
- Arsenic trioxide 0.15 mg/kg/day ใน NSS 250 mL IV drip in 2 hr — D1 ถึง D28
- การประเมินโรค APL: APL day 28–35 ของ induction: BMA, BM biopsy, flow cytometry, LP กรณี high risk — D1

**APML4 — Consolidation Cycle 2** — abbr `APML4 C2`, IPD — _Siriraj order 2025 p.88_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid; ☐ PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC, Cr, Electrolyte, Mg, ALT — D8, D15, D22
- EKG ติดตาม: EKG 12 leads — D8, D15, D22
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3); ให้ FFP ถ้า prolonged PT, aPTT; ให้ cryoprecipitate ถ้า fibrinogen <150 mg/dL; keep K >4 mEq/L, Mg >1.8 mEq/L, QTc <500 msec — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1–D7, D15–D21, D29–D35 […… cap oral pc เช้า, …… cap oral pc เย็น; ห้ามให้ทาง NG tube]
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D5, D8–D12, D15–D19, D22–D26, D29–D33
- Arsenic trioxide 0.15 mg/kg/day ใน NSS 250 mL IV drip in 2 hr — D1–D5, D8–D12, D15–D19, D22–D26, D29–D33
- การประเมินโรค APL: APL หลังจาก consolidation: BMA, BM biopsy, flow cytometry, PML-RARA — D1

**APOLLO — Induction ATRA-ATO (+ Idarubicin)** — abbr `APOLLO Ind`, IPD — _Siriraj order 2025 p.90_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads; eGFR — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC, Cr, Electrolyte, Mg, ALT — D5, D8, D10, D12, D14, D17, D20
- EKG ติดตาม: EKG 12 leads — D4, D8, D11, D15, D18, D22, D25
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <30,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3); ให้ FFP ถ้า prolonged PT, aPTT; ให้ cryoprecipitate ถ้า fibrinogen <150 mg/dL; keep K >4 mEq/L, Mg >1.8 mEq/L, QTc <500 msec — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1, D3, D5 ถึง D28
- Idarubicin 12 mg/m2/day ใน NSS 50 mL IV drip in 10 min — D1, D3 [ระวัง leak] (note: eGFR <30 mL/min/1.73 m2: ลดขนาดยา; TB 2.5–5 mg/dL: 6 mg/m2/day (50%); TB >5 mg/dL: งดยา; อายุ 1–60 ปี: 12 mg/m2/day; อายุ 61–70 ปี: 9 mg/m2/day; อายุ >70 ปี: 6 mg/m2/day)
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1 ถึง D28 (ไม่เกิน D60) […… cap oral pc เช้า, …… cap oral pc เย็น; ห้ามให้ทาง NG tube]
- Arsenic trioxide 0.15 mg/kg/day ใน NSS 250 mL IV drip in 2 hr — D5 ถึง D28
- Prednisolone (5 mg) 0.5 mg/kg/day PO — D1 ถึง D20 [Sig. ……]
- การประเมินโรค APL: BMA, BM biopsy, flow cytometry, cytogenetics, PML-RARA, CT brain/LP กรณีมีอาการทางสมอง — D1

**APOLLO — Consolidation Cycle 1–3** — abbr `APOLLO C1-3`, IPD — _Siriraj order 2025 p.91_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid; ☐ PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC, Cr, Electrolyte, Mg, ALT — D8, D15, D22, D29
- EKG ติดตาม: EKG 12 leads — D8, D15, D22
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3); ให้ FFP ถ้า prolonged PT, aPTT; ให้ cryoprecipitate ถ้า fibrinogen <150 mg/dL; keep K >4 mEq/L, Mg >1.8 mEq/L, QTc <500 msec — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1–D14, D29–D42 […… cap oral pc เช้า, …… cap oral pc เย็น; ห้ามให้ทาง NG tube]
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D5, D8–D12, D15–D19, D22–D26
- Arsenic trioxide 0.15 mg/kg/day ใน NSS 250 mL IV drip in 2 hr — D1–D5, D8–D12, D15–D19, D22–D26
- การประเมินโรค APL: APL day 28–35 ของ induction: BMA, BM biopsy, flow cytometry, LP กรณี high risk — D1

**APOLLO — Consolidation Cycle 4** — abbr `APOLLO C4`, IPD — _Siriraj order 2025 p.92_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, Mg, LFT, uric acid; ☐ PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC, Cr, Electrolyte, Mg, ALT — D8, D15, D22, D29
- EKG ติดตาม: EKG 12 leads — D8, D15, D22
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3); ให้ FFP ถ้า prolonged PT, aPTT; ให้ cryoprecipitate ถ้า fibrinogen <150 mg/dL; keep K >4 mEq/L, Mg >1.8 mEq/L, QTc <500 msec — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ATRA (10 mg) 45 mg/m2/day PO pc เช้า–เย็น — D1–D14 […… cap oral pc เช้า, …… cap oral pc เย็น; ห้ามให้ทาง NG tube]
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D5, D8–D12, D15–D19, D22–D26
- Arsenic trioxide 0.15 mg/kg/day ใน NSS 250 mL IV drip in 2 hr — D1–D5, D8–D12, D15–D19, D22–D26
- การประเมินโรค APL: APL หลังจาก consolidation: BMA, BM biopsy, flow cytometry, PML-RARA — D1

### ALL

**ALL-REZ BFM 2002 Relapsed ALL — Phase F1** — abbr `ALL-REZ F1`, IPD — _Siriraj order 2025 p.94_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC — D3, D5, D8, D10, D12, D15, D18, D21, D24
- Coagulogram ติดตาม: PT, aPTT, fibrinogen — D3, D5, D8, D10
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Intrathecal Methotrexate: Methotrexate 12 mg IT — D1
- Intrathecal Cytarabine: Cytarabine 30 mg IT — D1
- Intrathecal Hydrocortisone: Hydrocortisone 15 mg IT; ส่ง CSF for cell count, cell diff, cytology, flow cytometry for acute leukemia — D1
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชั่วโมง — D1 ถึง D6
- Vincristine 1.5 mg/m2 (max 2 mg) ใน NSS 20 mL IV bolus — D1 และ D6 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Methotrexate 1000 mg/m2 ใน D5W 1,000 mL IV drip in 36 hr — D1 [*Hydration and alkalinization as guideline] (note: CrCl 30–60 mL/min: 50%; CrCl <30 mL/min: งดยา; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Leucovorin 15 mg/m2 ใน D5W 20 mL IV push q 6 hr × 6 doses — D2 ถึง D3
- L-Asparaginase 10000 IU/m2 ใน NSS 500 mL IV in 4 hr — D1 ถึง D5 (note: Consider withhold dose if elevated direct bilirubinemia)
- Dexamethasone (4 mg) 20 mg/m2/day PO BID pc — D1 ถึง D5
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D7

**ALL-REZ BFM 2002 Relapsed ALL — Phase F2** — abbr `ALL-REZ F2`, IPD — _Siriraj order 2025 p.95_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC — D3, D5, D8, D10, D12, D15, D18, D21, D24
- Coagulogram ติดตาม: PT, aPTT, fibrinogen — D5, D8, D10
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Intrathecal Methotrexate: Methotrexate 12 mg IT — D1
- Intrathecal Cytarabine: Cytarabine 30 mg IT — D1
- Intrathecal Hydrocortisone: Hydrocortisone 15 mg IT; ส่ง CSF for cell count, cell diff, cytology, flow cytometry for acute leukemia — D1
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Vitamin B complex: 1 tab oral tid ก่อนให้ cytarabine — D1 ถึง D2
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชั่วโมง — —
- Vincristine 1.5 mg/m2 (max 2 mg) ใน NSS 20 mL IV bolus — D1 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Cytarabine (……®) 3000 mg/m2 ใน NSS 250 mL IV drip in 3 hr q 12 hr (4 doses) — D1 ถึง D2 (note: CrCl 40–60 mL/min: 1,000 mg/m2/day; CrCl <40 mL/min: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- L-Asparaginase 10000 IU/m2 ใน NSS 500 mL IV in 4 hr — D4 (note: Consider withhold dose if elevated direct bilirubinemia)
- Dexamethasone (4 mg) 20 mg/m2/day PO BID pc — D1 ถึง D5
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 6 hr — D1 ถึง D3
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D6

**Blinatumomab in R/R B-ALL — Cycle 1** — abbr `Blina C1`, IPD, cycle 42 วัน — _Siriraj order 2025 p.96_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, Mg, PO4, LFT, Uric, LDH, PT, PTT, Fibrinogen, Amylase, Lipase, CRP, IL-6; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Vital signs หลังให้ยา Blinatumomab: หลังให้ยา Blinatumomab D1 และ D8 ให้ Record vital signs q 15 min × 4 then q 30 min × 4 then q 1 hr × 4 then q 4 hr until completion of infusion; Keep BP ≥90/60 mmHg, RR <20/min — D1, D8
- Lab ติดตาม: CBC, BUN, Cr, Electrolyte, Ca, Mg, PO4, LFT, Uric, LDH, PT, PTT, Fibrinogen, Amylase, Lipase, CRP, IL-6 OD — ทุกวัน
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Acyclovir (400): 1 tab po bid pc — ตลอดการรักษา
- Dexamethasone (premedication): 20 mg IV bolus 1 hr before infusion — D1, D8
- Paracetamol (500) (premedication): 2 tabs po q 6 hr — D1 ถึง D2, D8 ถึง D9
- Blinatumomab 10.375 mcg: 10.375 mcg + stabilizer 5.5 ml in NSS 270 ml IV drip 10 ml/hr for 24 hr; *ห้าม flush สายด้วย NSS หลังยาหมดเด็ดขาด ยาที่ค้างสายให้ทิ้งได้เลย — D1 ถึง D7
- Blinatumomab 32.5 mcg: 32.5 mcg + stabilizer 5.5 ml in NSS 270 ml IV drip 10 ml/hr for 24 hr; *ห้าม flush สายด้วย NSS หลังยาหมดเด็ดขาด ยาที่ค้างสายให้ทิ้งได้เลย — D8 ถึง D28

**Blinatumomab in R/R B-ALL — Cycle 2–9** — abbr `Blina C2-9`, IPD, cycle 42 วัน (C2–C5), 84 วัน (C6–C9) — _Siriraj order 2025 p.97_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, Mg, PO4, LFT, Uric, LDH, PT, PTT, Fibrinogen, Amylase, Lipase, CRP, IL-6; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Vital signs หลังให้ยา Blinatumomab: หลังให้ยา Blinatumomab ให้ Record vital signs q 15 min × 4 then q 30 min × 4 then q 1 hr × 4 then q 4 hr until completion of infusion; Keep BP ≥90/60 mmHg, RR <20/min — D1
- Lab ติดตาม: CBC, BUN, Cr, Electrolyte, Ca, Mg, PO4, LFT, Uric, LDH, PT, PTT, Fibrinogen, Amylase, Lipase, CRP, IL-6 — ทุกวันจันทร์และวันพฤหัสบดี
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Acyclovir (400): 1 tab po bid pc — ตลอดการรักษา
- Dexamethasone (premedication): 20 mg IV bolus 1 hr before infusion — D1
- Paracetamol (500) (premedication): 2 tabs po q 6 hr — D1 ถึง D2
- Blinatumomab 32.5 mcg: 32.5 mcg + stabilizer 5.5 ml in NSS 270 ml IV drip 10 ml/hr for 24 hr; *ห้าม flush สายด้วย NSS หลังยาหมดเด็ดขาด ยาที่ค้างสายให้ทิ้งได้เลย — D1 ถึง D28

### AML

**FLAG regimen** — abbr `FLAG`, IPD — _Siriraj order 2025 p.98_
- Lab D1: CBC, reticulocyte, direct Coombs' test (OPD ชั้น 7); BUN, Cr, LFT, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D0 / D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Antifungal level: ☐ Posaconazole level ☐ Itraconazole level ก่อนรับประทานยา — D8, D14, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- ตรวจ cerebellar signs: ตรวจ cerebellar signs ทุกครั้งก่อนให้ยา cytarabine — D1 ถึง D5
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D1 ถึง D7
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- ☐ Omeprazole (20 mg): (ไม่แนะนำให้คู่กับ itraconazole) 1 cap oral OD ac ก่อนอาหาร 2 ชั่วโมง — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Acyclovir (400 mg): 1 tab oral bid pc — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- ☐ Itraconazole (100 mg): Antifungal prophylaxis: 2 caps oral tid Day 1 to Day 3 then 2 caps oral bid พร้อมอาหาร — ตลอดการรักษา
- Filgrastim (G-CSF for priming): ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D0
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D5
- Fludarabine 30 mg/m2/day ใน NSS 50 mL IV drip in 30 min — D1 ถึง D5 (note: CrCl 30–70 mL/min: 15 mg/m2/day; CrCl <30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Cytarabine 2000 mg/m2/day ใน NSS 250 mL IV drip in 3 hr หลัง fludarabine หมด — D1 ถึง D5 [เริ่ม 4 ชั่วโมงหลังให้ยา Fludarabine หมด] (note: CrCl 40–60 mL/min: 1,000 mg/m2/day; CrCl <40 mL/min: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)

**FLAG-IDA regimen** — abbr `FLAG-IDA`, IPD — _Siriraj order 2025 p.99_
- Lab D1: CBC, reticulocyte, direct Coombs' test (OPD ชั้น 7), BUN, Cr, LFT, uric acid, LDH; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads; eGFR, CrCl — D0 / D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Antifungal level: ☐ Posaconazole level ☐ Itraconazole level ก่อนรับประทานยา — D8, D14, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- ตรวจ cerebellar signs: ตรวจ cerebellar signs ทุกครั้งก่อนให้ยา cytarabine — D1 ถึง D4
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D1 ถึง D7
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- ☐ Omeprazole (20 mg): (ไม่แนะนำให้คู่กับ itraconazole) 1 cap oral OD ac ก่อนอาหาร 2 ชั่วโมง — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Acyclovir (400 mg): 1 tab oral bid pc — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- ☐ Itraconazole (100 mg): Antifungal prophylaxis: 2 caps oral tid Day 1 to Day 3 then 2 caps oral bid พร้อมอาหาร — ตลอดการรักษา
- Filgrastim (G-CSF for priming): ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D0
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D4
- Fludarabine 30 mg/m2/day ใน NSS 50 mL IV drip in 30 min — D1 ถึง D4 (note: CrCl 30–70 mL/min: 15 mg/m2/day; CrCl <30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Cytarabine 2000 mg/m2/day ใน NSS 250 mL IV drip in 3 hr หลัง fludarabine หมด — D1 ถึง D4 (note: CrCl 40–60 mL/min: 1,000 mg/m2/day; CrCl <40 mL/min: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- Idarubicin 12 mg/m2/day ใน NSS 50 mL IV drip in 10 min — D2 ถึง D4 [ระวัง leak] (note: Cr >2.5 mg/dL: ลดขนาดยา; TB 2.5–5 mg/dL: 6 mg/m2/day; TB >5 mg/dL: งดยา)

**MEC regimen** — abbr `MEC`, IPD — _Siriraj order 2025 p.100_
- Lab D1: CBC, BUN, Cr, Electrolyte, LFT, Ca, PO4, uric acid, LDH; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Antifungal level: ☐ Posaconazole level ☐ Itraconazole level ก่อนรับประทานยา — D8, D14, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- ☐ Omeprazole (20 mg): (ไม่แนะนำให้คู่กับ itraconazole) 1 cap oral OD ac ก่อนอาหาร 2 ชั่วโมง — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ☐ Itraconazole (100 mg): Antifungal prophylaxis: 2 caps oral tid Day 1 to Day 3 then 2 caps oral bid พร้อมอาหาร — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D5
- Mitoxantrone 8 mg/m2/day ใน NSS 50 mL IV drip in 10 min — D1 ถึง D5 [ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL: 50%; TB >3 mg/dL: 25%)
- Etoposide 100 mg/m2/day ใน NSS 500 mL IV drip in 1 hr — D1 ถึง D5 (note: CrCl 15–50 mL/min: 75 mg/m2; CrCl <15 mL/min: งดใช้ยา; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50 mg/m2/day; TB >3 mg/dL หรือ AST >180 U/L: งดใช้ยา)
- Cytarabine (……®) 1000 mg/m2/day ใน NSS 250 mL IV drip in 3 hr — D1 ถึง D5 (note: CrCl 40–60 mL/min: 500 mg/m2; CrCl <40 mL/min: ≤200 mg/m2; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- ตรวจ cerebellar signs: ตรวจ cerebellar signs ทุกครั้งก่อนให้ยา cytarabine — D1 ถึง D5
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D1 ถึง D7

### ALL

**Nelarabine monotherapy R/R T-ALL** — abbr `Nelarabine`, IPD, cycle 21 วัน — _Siriraj order 2025 p.101_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Vital signs ระหว่างให้ nelarabine: Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr × 2 ครั้ง; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา: Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — D1, D3, D5
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ☐ Allopurinol (300 mg): 1 tab po OD pc — ตลอดการรักษา
- Paracetamol tab (500 mg) (premedication): 1 tab oral ก่อนให้ nelarabine 30 นาที — D1, D3, D5
- ☐ NSS 1,000 ml: IV drip in 4 hr (if bulky disease) — D1, D3, D5
- Nelarabine 1500 mg/m2 IV drip in 2 hr — D1, D3, D5 [5 mg/ml (50 ml/vial)] (note: ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคไตหรือโรคตับ)

**TPOG Relapsed ALL Regimen (1305 protocol) — Phase I** — abbr `TPOG 1305 Ph I`, IPD — _Siriraj order 2025 p.102_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC / Coagulogram ติดตาม: CBC, PT, aPTT, fibrinogen — D2, D4, D6, D8, D10, D12, D14, D16, D18, D20, D22
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ L-asparaginase: L-asparaginase ผสม 10,000 IU in NSS 2 mL IM ได้; การให้ L-asparaginase วันแรก: Record V/S q 15 min × 2 จากนั้น q 30 min × 2 จากนั้น q 1 hr จนยาหมด ถ้า BP <90/60 mmHg หยุดยาและรายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง; เตรียม adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้; กรณีเกิด severe allergic reaction ให้หยุดยาทันทีและให้ hydrocortisone IV, chlorpheniramine IV; กรณีเกิด anaphylaxis ให้หยุดยาทันทีและให้ adrenaline IV — วันที่ให้ L-asparaginase
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชั่วโมง — —
- Mitoxantrone 10 mg/m2/day ใน NSS 50 mL IV drip in 30 min — D1 ถึง D2 [ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL: 50%; TB >3 mg/dL: 25%)
- Vincristine 1.5 mg/m2 (max 2 mg) ใน NSS 20 mL IV bolus — D3, D10, D17, D24 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- L-Asparaginase 10000 IU/m2 ใน NSS 500 mL IV in 4 hr — D3, D5, D7, D17, D19, D21 (note: Consider withhold dose if elevated direct bilirubinemia)
- Dexamethasone (4 mg) 20 mg/m2/day PO TID pc — D1–D5 และ D15–D19
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — D4, D6, D8, D9, D11–D16, D18, D20, D22–D23, D25 เป็นต้นไป
- Intrathecal Methotrexate: Methotrexate 15 mg IT; ส่ง CSF for cell count, cell diff, cytology, flow cytometry for acute leukemia — D1 และ D8

**TPOG Relapsed ALL Regimen (1305 protocol) — Phase II** — abbr `TPOG 1305 Ph II`, IPD — _Siriraj order 2025 p.103_
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, LFT, uric acid, LDH; PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC / Coagulogram ติดตาม: CBC, PT, aPTT, fibrinogen — D7, D10, D12, D14, D16
- CBC ติดตาม: CBC — D18, D20, D22
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Dexamethasone (4 mg) 6 mg/m2/day PO BID pc — D1 ถึง D5
- Vincristine 1.5 mg/m2 (max 2 mg) ใน NSS 20 mL IV bolus — D3 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Intrathecal Methotrexate: Methotrexate 15 mg IT; ส่ง CSF for cell count, cell diff, cytology, flow cytometry for acute leukemia — D8
- MTX level: MTX level OD จนกว่า <0.05 µmol/L (เริ่มเจาะ 48 hr หลังจากเริ่มให้ MTX) — เริ่ม D10
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชั่วโมง — —
- Methotrexate 1000 mg/m2 ใน D5W 1,000 mL IV drip in 24 hr — D8 (note: CrCl 30–60 mL/min: 50%; CrCl <30 mL/min: งดยา; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Leucovorin 15 mg/m2 ใน D5W 20 mL IV push q 6 hr — เริ่ม D9 [เริ่มให้ 18 hr หลัง MTX หมด; หยุดให้เมื่อ MTX level <0.05 µmol/L]
- L-Asparaginase 10000 IU/m2 ใน NSS 500 mL IV in 4 hr — D9, D11, D13 (note: Consider withhold dose if elevated direct bilirubinemia)
- Cyclophosphamide 440 mg/m2 ใน NSS 100 mL IV drip in 30 min OD — D15 ถึง D19 (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Mesna 440 mg/m2 ใน 5%DN/2 1,000 mL IV drip in 12 hr OD — D15–D19 [เริ่มให้พร้อม cyclophosphamide]
- Etoposide 100 mg/m2/day ใน NSS 500 mL IV drip in 1 hr — D15 ถึง D19 (note: CrCl 15–50 mL/min: 75 mg/m2; CrCl <15 mL/min: งดใช้ยา; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50 mg/m2/day; TB >3 mg/dL หรือ AST >180 U/L: งดใช้ยา)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — D5 ถึง D7, D10, D12, D14, D20 เป็นต้นไป

### Hodgkin

**ABVD regimen** — abbr `ABVD`, IPD, cycle 28 วัน (Cycle 1–6) — _Siriraj order 2025 p.111_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF ☐ ส่งปรึกษาอายุรแพทย์โรคปอด เพื่อประเมิน PFTs รวมทั้ง DLCO — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง การวางแผนมีบุตรในอนาคต การหยุดสูบบุหรี่ และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron injection: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1 และ D15
- Dexamethasone injection: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1 และ D15
- Paracetamol (500 mg): 1 tab oral ก่อนให้ยาเคมีบำบัด 30 นาที — D1 และ D15
- Vinblastine 6 mg/m2 (max 10 mg) ใน NSS 20 mL IV push — D1 และ D15 [max 10 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 และ D15 [ระวัง leak] (note: CrCl <10 mL/min: 75%; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา)
- Bleomycin 10 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 และ D15 (note: CrCl 40–50 mL/min: 70%; CrCl 30–40 mL/min: 60%; CrCl 20–30 mL/min: 55%; CrCl 10–20 mL/min: 45%; CrCl 5–10 mL/min: 40%; ไม่ต้องปรับขนาดยาในโรคตับ)
- Dacarbazine 375 mg/m2 ใน NSS 500 mL IV drip in 3 hr — D1 และ D15 (note: CrCl 30–60 mL/min: 75%; CrCl 10–30 mL/min: 50%; CrCl <10 mL/min: งดยา; ไม่มีคำแนะนำเรื่องปรับขนาดยาในโรคตับ)
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

**B-B regimen (Brentuximab vedotin + Bendamustine)** — abbr `B-B`, IPD, cycle 21 วัน — _Siriraj order 2025 p.112_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Record vital signs (Brentuximab vedotin): หลังให้ยา Brentuximab vedotin ให้ Record vital signs q 15 min × 2 then q 30 min until completion of infusion of brentuximab vedotin — วันที่ให้ Brentuximab vedotin
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณา ให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — วันที่ให้ยา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1 และ D2
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1 และ D2
- Brentuximab vedotin 1.8 mg/kg (max 180 mg) ใน NSS 100 mL IV in 1 hr — D1 [max 180 mg; Cycle 1–16] (note: CrCl <30 mL/min: งดยา; Child-Pugh A: 1.2 mg/kg; BW >100 kg คิดน้ำหนัก 100 kg; Child-Pugh B, C: งดยา)
- Bendamustine 90 mg/m2 ใน NSS 500 mL IV drip in 2 hr — D1 และ D2 [Cycle 1–6] (note: CrCl <40 mL/min: งดยา; TB 1.8–3.6 mg/dL และ AST 100–400 U/L: งดยา; TB >3.6 mg/dL: งดยา)
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

**BEGEV regimen** — abbr `BEGEV`, IPD, cycle 21 วัน (Cycle 1–4) — _Siriraj order 2025 p.113_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D3
- Vinorelbine 20 mg/m2/day ใน NSS 50 mL IV in 10 min — D1 (note: ไม่ต้องปรับขนาดยาในโรคไตและโรคตับ)
- Gemcitabine 800 mg/m2 ใน NSS 250 mL IV in 30 min — D1 และ D4 (note: ไม่มีคำแนะนำการปรับขนาดยาในโรคไต; AST เพิ่มขึ้น: ไม่ต้องปรับขนาดยา; TB เพิ่มขึ้น: 80%)
- Bendamustine 90 mg/m2 ใน NSS 500 mL IV drip in 2 hr — D2 และ D3 (note: CrCl <40 mL/min: งดยา; TB 1.8–3.6 mg/dL และ AST 100–400 U/L: งดยา; TB >3.6 mg/dL: งดยา)
- Prednisolone (5 mg): 5 tabs po tid pc and hs #100 tabs — D1 ถึง D4
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

### Lymphoma

**BR regimen (Bendamustine + Rituximab)** — abbr `BR`, IPD, cycle 28 วัน (Cycle 1–6) — _Siriraj order 2025 p.114_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Record vital signs (Rituximab): Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion — วันที่ให้ Rituximab
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณา ให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — วันที่ให้ยา
- คำแนะนำ Rituximab rate: การให้ยา rituximab ครั้งแรก: ชั่วโมงที่ 1 เริ่มให้ยาในขนาด 50 mg/hr, ชั่วโมงถัดไป เพิ่มขนาดยาได้ 100 mg/hr; การให้ยา rituximab ครั้งต่อไป: ชั่วโมงที่ 1 เริ่มให้ยาในปริมาณ 20% จากนั้นให้ยาที่เหลือ 80% ภายใน 1.5 hr — วันที่ให้ Rituximab
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ☐ Tenofovir alafenamide (25 mg): 1 tab po OD pc กรณี AntiHBc+ — ตลอดการรักษา
- Premedication ก่อนให้ rituximab 30 min: ☐ Dexamethasone 10 mg IV ☐ Chlorpheniramine 10 mg IV ☐ Paracetamol (500 mg) 1 tab oral ☐ Benadryl (25 mg) 2 cap oral — ทุก 28 วัน (Cycle 1–6)
- ☐ Rituximab (375 mg/m2) 375 mg/m2 ใน NSS ☐ 250 mL ☐ 500 mL IV infusion: ชั่วโมงที่ 1 rate …… ml/hr, ชั่วโมงที่ 2 rate …… ml/hr, ชั่วโมงต่อไป rate …… ml/hr — ทุก 28 วัน (Cycle 1–6) (note: เลือกขนาด 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง)
- ☐ Rituximab (500 mg/m2) 500 mg/m2 ใน NSS ☐ 250 mL ☐ 500 mL IV infusion: ชั่วโมงที่ 1 rate …… ml/hr, ชั่วโมงที่ 2 rate …… ml/hr, ชั่วโมงต่อไป rate …… ml/hr — ทุก 28 วัน (Cycle 1–6) (note: เลือกขนาด 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง)
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1, D2
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1, D2
- Bendamustine 90 mg/m2 ใน NSS 500 mL IV drip in 2 hr — D1, D2 [ทุก 28 วัน Cycle 1–6] (note: CrCl <40 mL/min: งดยา; TB 1.8–3.6 mg/dL และ AST 100–400 U/L: งดยา; TB >3.6 mg/dL: งดยา; หมายเหตุ กรณีใช้ single agent bendamustine: 100 mg/m2 D1,2 for newly diagnosed CLL; 120 mg/m2 D1,2 for relapsed/refractory indolent lymphoma)
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

### Hodgkin

**BrECADD regimen** — abbr `BrECADD`, IPD, cycle 21 วัน (Cycle 1–6) — _Siriraj order 2025 p.115_
- Lab D0/D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D0 = …… D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง การวางแผนมีบุตรในอนาคต การหยุดสูบบุหรี่ และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณา ให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — วันที่ให้ยา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron injection: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1 ถึง D3
- Brentuximab vedotin 1.8 mg/kg (max 180 mg) ใน NSS 100 mL IV in 1 hr — D0 [max 180 mg] (note: CrCl <30 mL/min: งดยา; Child-Pugh A: 1.2 mg/kg; BW >100 kg คิดน้ำหนัก 100 kg; Child-Pugh B, C: งดยา)
- Doxorubicin 40 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: CrCl <10 mL/min: 75%; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา)
- Cyclophosphamide 1250 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Etoposide 150 mg/m2 ใน NSS 500 mL IV drip in 2 hr — D1 ถึง D3 (note: CrCl 15–50 mL/min: 75%; CrCl <15 mL/min: งดใช้ยา; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3 mg/dL หรือ AST >180 U/L: งดใช้ยา)
- Dacarbazine 250 mg/m2 ใน NSS 500 mL IV drip in 3 hr — D2 ถึง D3 (note: CrCl 30–60 mL/min: 75%; CrCl 10–30 mL/min: 50%; CrCl <10 mL/min: งดยา; ไม่มีคำแนะนำเรื่องปรับขนาดยาในโรคตับ)
- Dexamethasone (4 mg) 40 mg/m2 Sig. …… — D1 ถึง D4 [พิมพ์ไว้เป็น 40 mg/m2 (ตรวจสอบกับ protocol: BrECADD ใช้ dexamethasone 40 mg/day)]
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……
- Record vital signs (Brentuximab vedotin): หลังให้ยา Brentuximab vedotin ให้ Record vital signs q 15 min × 2 then q 30 min until completion of infusion of brentuximab vedotin — วันที่ให้ Brentuximab vedotin

**Brentuximab vedotin monotherapy** — abbr `BV mono`, IPD, cycle 21 วัน (Cycle 1–16) — _Siriraj order 2025 p.116_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads; ☐ anti-HIV, HBsAg, anti-HBc, anti-HCV — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณา ให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — วันที่ให้ยา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Brentuximab vedotin 1.8 mg/kg (max 180 mg) ใน NSS 100 mL IV in 1 hr — D1 [max 180 mg] (note: CrCl <30 mL/min: งดยา; Child-Pugh A: 1.2 mg/kg; BW >100 kg คิดน้ำหนัก 100 kg; Child-Pugh B, C: งดยา)
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……
- Record vital signs (Brentuximab vedotin): หลังให้ยา Brentuximab vedotin ให้ Record vital signs q 15 min × 2 then q 30 min until completion of infusion of brentuximab vedotin — วันที่ให้ Brentuximab vedotin

**BV-AVD regimen** — abbr `BV-AVD`, IPD, cycle 28 วัน (Cycle 1–6) — _Siriraj order 2025 p.117_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง การวางแผนมีบุตรในอนาคต การหยุดสูบบุหรี่ และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณา ให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — วันที่ให้ยา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron injection: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1 และ D15
- Dexamethasone injection: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1 และ D15
- Paracetamol (500 mg): 1 tab oral ก่อนให้ยาเคมีบำบัด 30 นาที — D1 และ D15
- Vinblastine 6 mg/m2 (max 10 mg) ใน NSS 20 mL IV push — D1 และ D15 [max 10 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 และ D15 [ระวัง leak] (note: CrCl <10 mL/min: 75%; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา)
- Dacarbazine 375 mg/m2 ใน NSS 500 mL IV drip in 3 hr — D1 และ D15 (note: CrCl 30–60 mL/min: 75%; CrCl 10–30 mL/min: 50%; CrCl <10 mL/min: งดยา; ไม่มีคำแนะนำเรื่องปรับขนาดยาในโรคตับ)
- Brentuximab vedotin 1.2 mg/kg (max 120 mg) ใน NSS 100 mL IV in 30 min — D1 และ D15 [max 120 mg; ให้หลังจากให้ยาเคมีตัวอื่นครบ 1 ชั่วโมง] (note: CrCl <30 mL/min: งดยา; Child-Pugh A: 0.9 mg/kg; BW >100 kg คิดน้ำหนัก 100 kg; Child-Pugh B, C: งดยา)
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……
- Record vital signs (Brentuximab vedotin): หลังให้ยา Brentuximab vedotin ให้ Record vital signs q 15 min × 2 then q 30 min until completion of infusion of brentuximab vedotin — วันที่ให้ Brentuximab vedotin

### Lymphoma

**BV-CHP regimen** — abbr `BV-CHP`, IPD, cycle 21 วัน (Cycle 1–6) — _Siriraj order 2025 p.118_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณา ให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — วันที่ให้ยา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Doxorubicin 50 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: CrCl <10 mL/min: 75%; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา)
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Prednisolone (5 mg): 5 tabs PO tid pc and hs #100 tabs — D1 ถึง D5
- Brentuximab vedotin 1.8 mg/kg (max 180 mg) ใน NSS 100 mL IV in 1 hr — D1 [max 180 mg; ให้หลังจากให้ยาเคมีตัวอื่นครบ 1 ชั่วโมง] (note: CrCl <30 mL/min: งดยา; Child-Pugh A: 1.2 mg/kg; BW >100 kg คิดน้ำหนัก 100 kg; Child-Pugh B, C: งดยา)
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……
- Record vital signs (Brentuximab vedotin): หลังให้ยา Brentuximab vedotin ให้ Record vital signs q 15 min × 2 then q 30 min until completion of infusion of brentuximab vedotin — วันที่ให้ Brentuximab vedotin

### Hodgkin

**BV-N regimen (Brentuximab vedotin + Nivolumab)** — abbr `BV-N`, IPD, cycle 21 วัน (Cycle 1–8) — _Siriraj order 2025 p.119_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณา ให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — วันที่ให้ยา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron injection: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Dexamethasone injection: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Paracetamol (500 mg): 1 tab oral ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Brentuximab vedotin 1.8 mg/kg (max 180 mg) ใน NSS 100 mL IV in 30 min — D1 [max 180 mg] (note: CrCl <30 mL/min: งดยา; Child-Pugh A: 1.2 mg/kg; BW >100 kg คิดน้ำหนัก 100 kg; Child-Pugh B, C: งดยา)
- Nivolumab 3 mg/kg ใน NSS 100 mL IV in 1 hr — D1 [(100 mg/10 ml; 40 mg/4 ml)] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB >1.5 mg/dL หรือ AST >60 U/L: ยังไม่มีข้อมูลเรื่องปรับขนาดยาในโรคตับระดับปานกลางหรือรุนแรง)
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……
- Record vital signs (Brentuximab vedotin): หลังให้ยา Brentuximab vedotin ให้ Record vital signs q 15 min × 2 then q 30 min until completion of infusion of brentuximab vedotin — วันที่ให้ Brentuximab vedotin

**BV-N-AD regimen** — abbr `BV-N-AD`, IPD, cycle 28 วัน (Cycle 1–4) — _Siriraj order 2025 p.120_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง การวางแผนมีบุตรในอนาคต การหยุดสูบบุหรี่ และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณา ให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — วันที่ให้ยา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron injection: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1 และ D15
- Dexamethasone injection: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1 และ D15
- Paracetamol (500 mg): 1 tab oral ก่อนให้ยาเคมีบำบัด 30 นาที — D1 และ D15
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 และ D15 [ระวัง leak] (note: CrCl <10 mL/min: 75%; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา)
- Dacarbazine 375 mg/m2 ใน NSS 500 mL IV drip in 3 hr — D1 และ D15 (note: CrCl 30–60 mL/min: 75%; CrCl 10–30 mL/min: 50%; CrCl <10 mL/min: งดยา; ไม่มีคำแนะนำเรื่องปรับขนาดยาในโรคตับ)
- Brentuximab vedotin 1.2 mg/kg (max 120 mg) ใน NSS 100 mL IV in 30 min — D1 และ D15 [max 120 mg; ให้หลังจากให้ยา doxorubicin และ dacarbazine] (note: CrCl <30 mL/min: งดยา; Child-Pugh A: 0.9 mg/kg; BW >100 kg คิดน้ำหนัก 100 kg; Child-Pugh B, C: งดยา)
- Nivolumab (100 mg/10 ml; 40 mg/4 ml): 240 mg in NSS 100 mL IV in 1 hr (ให้หลังจากให้ยา Brentuximab vedotin หมดอย่างน้อย 30 นาที) — D1 และ D15
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……
- Record vital signs (Brentuximab vedotin): หลังให้ยา Brentuximab vedotin ให้ Record vital signs q 15 min × 2 then q 30 min until completion of infusion of brentuximab vedotin — วันที่ให้ Brentuximab vedotin

### Lymphoma

**CDOP regimen (Cyclophosphamide, liposomal Doxorubicin, Vincristine, Prednisolone)** — abbr `CDOP`, IPD, cycle 21 วัน (Cycle 1–8) — _Siriraj order 2025 p.121_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV push — D1 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Liposomal doxorubicin 30 mg/m2 ใน D5W 250 mL IV drip in 2 hr — D1 (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.2–3 mg/dL หรือ AST 60–180 U/L: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา)
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Prednisolone (5 mg) 60 mg/m2 Sig. …… — D1 ถึง D5
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

**CEOP regimen (Cyclophosphamide, Etoposide, Vincristine, Prednisolone)** — abbr `CEOP`, IPD, cycle 21 วัน (Cycle 1–8) — _Siriraj order 2025 p.122_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1 ถึง D3
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV push — D1 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Etoposide (IV) 50 mg/m2/day ใน NSS 500 mL IV drip in 2 hr — D1 (note: CrCl 15–50 mL/min: 75%; CrCl <15 mL/min: งดใช้ยา; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3 mg/dL หรือ AST >180 U/L: งดใช้ยา)
- Etoposide (50 mg/cap) 100 mg/m2/day PO; Sig. …… — D2 ถึง D3 (note: CrCl 15–50 mL/min: 75%; CrCl <15 mL/min: งดใช้ยา; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3 mg/dL หรือ AST >180 U/L: งดใช้ยา)
- Prednisolone (5 mg): 5 tabs PO tid pc and hs #100 tabs — D1 ถึง D5
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

**CHOEP regimen** — abbr `CHOEP`, IPD, cycle 21 วัน (Cycle 1–8) — _Siriraj order 2025 p.123_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1 ถึง D3
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV push — D1 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Doxorubicin 50 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: CrCl <10 mL/min: 75%; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา)
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Etoposide 100 mg/m2/day ใน NSS 500 mL IV drip in 2 hr — D1 ถึง D3 (note: CrCl 15–50 mL/min: 75%; CrCl <15 mL/min: งดใช้ยา; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3 mg/dL หรือ AST >180 U/L: งดใช้ยา)
- Prednisolone (5 mg): 5 tabs PO tid pc and hs #100 tabs — D1 ถึง D5
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

**CHOP regimen** — abbr `CHOP`, IPD, cycle 21 วัน (Cycle 1–8) — _Siriraj order 2025 p.124_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV push — D1 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Doxorubicin 50 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: CrCl <10 mL/min: 75%; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา)
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Prednisolone (5 mg): 5 tabs PO tid pc and hs #100 tabs — D1 ถึง D5
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

**CNOP regimen (Cyclophosphamide, Mitoxantrone, Vincristine, Prednisolone)** — abbr `CNOP`, IPD, cycle 21 วัน (Cycle 1–8) — _Siriraj order 2025 p.125_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV push — D1 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Mitoxantrone 10 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL: 50%; TB >3 mg/dL: 25%)
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV drip in 2 hrs — D1 (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Prednisolone (5 mg): 5 tabs PO tid pc and hs #100 tabs — D1 ถึง D5
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

### Burkitt

**CODOX-M regimen** — abbr `CODOX-M`, IPD, cycle Cycle 1 (2) 3 (สลับกับ IVAC) — _Siriraj order 2025 p.126_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Cytarabine IT: (เบิก 100 mg/vial จำนวน 2 ขวด) 70 mg IT วันที่…… และ …… — D1 และ D3
- CSF: CSF for cell count, differential, protein, sugar, cytology, flow cytometry for NHL; Capillary blood glucose (POCT) หลัง lumbar puncture — D1
- Methotrexate IT: 12 mg IT วันที่…… — D15
- Leucovorin (15 mg): 1 tab oral 24 hr หลังให้ MTX IT — D16
- MTX level: MTX level OD จนกว่า <0.05 µmol/L เริ่ม D12 (48 hr หลังจากเริ่มยา) — เริ่ม D12
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 – D5, D8, D10
- Cyclophosphamide 800 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Cyclophosphamide 200 mg/m2/day ใน NSS 100 mL IV in 1 hr — D2 ถึง D5 (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Doxorubicin 40 mg/m2/day ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: CrCl <10 mL/min: 75%; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา)
- Vincristine 1.4 mg/m2/day (max 2 mg) ใน NSS 20 mL IV push — D1 และ D8 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Methotrexate (loading) 1200 mg/m2 ใน D5W 250 mL IV in 1 hr — D10 (note: CrCl 30–60 mL/min: 50%; CrCl <30 mL/min: งดยา; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Methotrexate (infusion) 2760 mg/m2 ใน D5W 1,000 mL + 7.5% NaHCO3 100 mL IV in 10 hr × 2 ชุด — D10 [2,760 mg/m2/10 hr; then หลัง loading dose] (note: CrCl 30–60 mL/min: 50%; CrCl <30 mL/min: งดยา; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Leucovorin (first dose) 192 mg/m2 ใน D5W 50 mL IV in 10 min — เริ่ม D11 [เริ่มให้ 12 hr หลัง MTX หมด] (note: Leucovorin 50 mg IV q 6 hours if MTX >20 µmol/L at 0 hours, or >1.0 µmol/L at 24 hours, or >0.1 µmol/L at 48 hours after the end of MTX infusion)
- Leucovorin (q 6 hr) 15 mg/m2 ใน D5W 20 mL IV push q 6 hr — เริ่ม D11 [หยุดให้ เมื่อ MTX level <0.05 µmol/L] (note: Leucovorin 50 mg IV q 6 hours if MTX >20 µmol/L at 0 hours, or >1.0 µmol/L at 24 hours, or >0.1 µmol/L at 48 hours after the end of MTX infusion)
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D6 (เว้น D8, D10, D15)

### Hodgkin

**COP/ABV regimen** — abbr `COP/ABV`, IPD, cycle 28 วัน (Cycle 1–6) — _Siriraj order 2025 p.127_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, ESR, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง การวางแผนมีบุตรในอนาคต การหยุดสูบบุหรี่ และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV push — D1 [max 2 mg; ระวัง leak]
- Cyclophosphamide 600 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1
- Prednisolone (5 mg) 60 mg/m2 Sig. …… — D1 ถึง D7
- Vinblastine 6 mg/m2 (max 10 mg) ใน NSS 20 mL IV push — D15 [max 10 mg; ระวัง leak]
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV drip in 10 min — D15 [ระวัง leak]
- Bleomycin 10 IU/m2 ใน NSS 50 mL IV drip in 10 min — D15
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

### Lymphoma

**CVP regimen** — abbr `CVP`, IPD, cycle 21 วัน (Cycle 1–8) — _Siriraj order 2025 p.128_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron injection: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Dexamethasone injection: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV push — D1 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Prednisolone (5 mg): 5 tabs PO tid pc and hs #100 tabs — D1 ถึง D5
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

**DA-EPOCH regimen** — abbr `DA-EPOCH`, IPD, cycle 21 วัน (Cycle 1–8) — _Siriraj order 2025 p.129_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ dose adjustment: ตรวจ CBC สัปดาห์ละ 2 ครั้ง; ถ้า nadir ANC ไม่ต่ำกว่า 500/mm3 เพิ่มขนาดของ etoposide, doxorubicin, และ cyclophosphamide 20% จากขนาดรอบที่แล้ว; ถ้า nadir ANC ต่ำกว่า 500/mm3 1–2 ครั้ง ใช้ขนาดเท่ากับรอบที่แล้ว; ถ้า nadir ANC ต่ำกว่า 500/mm3 3 ครั้งหรือ nadir platelet count ต่ำกว่า 25,000/mm3 1 ครั้ง ลดขนาดของ etoposide, doxorubicin, และ cyclophosphamide 20% จากขนาดที่ใช้ในรอบที่แล้ว — ทุก cycle
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D5
- Etoposide 50 mg/m2/day ใน NSS 500 mL (ผสมรวมกับ doxorubicin และ vincristine) IV drip in 24 hr via central line — D1 ถึง D4 (note: CrCl 15–50 mL/min: 75%; CrCl <15 mL/min: งดใช้ยา; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3 mg/dL หรือ AST >180 U/L: งดใช้ยา)
- Doxorubicin 10 mg/m2/day ใน NSS 500 mL (ผสมรวมกับ etoposide และ vincristine) IV drip in 24 hr via central line — D1 ถึง D4 (note: CrCl <10 mL/min: 75%; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา)
- Vincristine 0.4 mg/m2/day ใน NSS 500 mL (ผสมรวมกับ etoposide และ doxorubicin) IV drip in 24 hr via central line — D1 ถึง D4 (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- NSS 500 mL: IV drip in 24 hr via central line — D1 ถึง D4
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D5 (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Prednisolone (5 mg) 120 mg/m2 PO bid pc; Sig. …… tab #……tab — D1 ถึง D5
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

**DHAP regimen** — abbr `DHAP`, IPD, cycle 21 วัน (Cycle 1–4) — _Siriraj order 2025 p.130_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D2
- Dexamethasone 40 mg/day: ☐ Dexamethasone (4 mg) 5 tabs oral bid pc ☐ Dexamethasone 10 mg IV q 6 hr — D1 ถึง D4
- Cisplatin 100 mg/m2 ใน NSS 1,000 mL IV in 24 hr — D1 [คู่กับ 20% Mannitol 100 mL in D5W 1,000 mL IV drip in 24 hr] (note: CrCl 46–60 mL/min: 50%; CrCl 31–45 mL/min: 25%; CrCl ≤30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- 20% Mannitol: คู่กับ 20% Mannitol 100 mL in D5W 1,000 mL IV drip in 24 hr — D1
- Cytarabine 2000 mg/m2 ใน NSS 250 mL IV in 3 hr q 12 hr — D2 [(……®) รวม 2 doses] (note: CrCl 40–60 mL/min: 1,000 mg/m2/day; CrCl <40 mL/min: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D2 ถึง D4
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

**DHAX regimen** — abbr `DHAX`, IPD, cycle 21 วัน (Cycle 1–4) — _Siriraj order 2025 p.131_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D2
- Dexamethasone (4 mg): 5 tabs oral bid pc — D1 ถึง D4
- Oxaliplatin 130 mg/m2 ใน D5W 250 mL IV in 2 hr — D1 (note: CrCl ≤30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Cytarabine 2000 mg/m2 ใน NSS 250 mL IV in 3 hr q 12 hr — D2 [(……®) รวม 2 doses] (note: CrCl 40–60 mL/min: 1,000 mg/m2/day; CrCl <40 mL/min: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D2 ถึง D4
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

**ESHAP regimen** — abbr `ESHAP`, IPD, cycle 21 วัน (Cycle 1–8) — _Siriraj order 2025 p.132_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D5
- Methylprednisolone: 500 mg in NSS 100 mL IV drip in 15 min — D1 ถึง D4
- Etoposide 40 mg/m2/day ใน NSS 500 mL IV drip in 2 hr — D1 ถึง D4 [พิมพ์เป็นช่วง 40–60 mg/m2/day] (note: CrCl 15–50 mL/min: 75%; CrCl <15 mL/min: งดใช้ยา; TB 1.5–3 mg/dL หรือ AST 60–180 U/L: 50%; TB >3 mg/dL หรือ AST >180 U/L: งดใช้ยา)
- Cisplatin 25 mg/m2/day ใน NSS 1,000 mL IV drip in 20 hr — D1 ถึง D4 [คู่กับ 20% Mannitol 100 mL in D5W 1,000 mL IV drip in 20 hr] (note: CrCl 46–60 mL/min: 50%; CrCl 31–45 mL/min: 25%; CrCl ≤30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- 20% Mannitol: คู่กับ 20% Mannitol 100 mL in D5W 1,000 mL IV drip in 20 hr — D1 ถึง D4
- Cytarabine 2000 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D5 [(……®)] (note: CrCl 40–60 mL/min: 1,000 mg/m2/day; CrCl <40 mL/min: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

### CLL

**FC regimen 3-day protocol (Fludarabine + Cyclophosphamide)** — abbr `FC 3-day`, IPD, cycle 28 วัน (Cycle 1–6) — _Siriraj order 2025 p.133_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Reticulocyte, direct Coombs' test; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Acyclovir (400 mg): 1 tab oral bid pc — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D3
- Fludarabine 25 mg/m2/day ใน NSS 100 mL IV drip in 30 min — D1 ถึง D3 [พิมพ์เป็นช่วง 25–30 mg/m2/day] (note: CrCl 30–70 mL/min: 50%; CrCl <30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Cyclophosphamide 250 mg/m2/day ใน NSS 100 mL IV drip in 30 min — D1 ถึง D3 [พิมพ์เป็นช่วง 250–300 mg/m2/day] (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

**FC regimen 5-day protocol (Fludarabine + Cyclophosphamide)** — abbr `FC 5-day`, IPD, cycle 28 วัน (Cycle 1–6) — _Siriraj order 2025 p.134_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Reticulocyte, direct Coombs' test; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Acyclovir (400 mg): 1 tab oral bid pc — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D5
- Fludarabine 20 mg/m2/day ใน NSS 100 mL IV drip in 30 min — D1 ถึง D5 (note: CrCl 30–70 mL/min: 50%; CrCl <30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Cyclophosphamide 600 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

**FCM regimen (Fludarabine, Cyclophosphamide, Mitoxantrone)** — abbr `FCM`, IPD, cycle 28 วัน (Cycle 1–6) — _Siriraj order 2025 p.135_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Reticulocyte, direct Coombs' test; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Acyclovir (400 mg): 1 tab oral bid pc — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D3
- Mitoxantrone 5 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 mg/dL: 50%; TB >3 mg/dL: 25%)
- Fludarabine 25 mg/m2/day ใน NSS 100 mL IV drip in 30 min — D1 ถึง D3 (note: CrCl 30–70 mL/min: 15 mg/m2/day; CrCl <30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Cyclophosphamide 200 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 ถึง D3 [พิมพ์เป็นช่วง 200–250 mg/m2] (note: CrCl <10 mL/min: 50%; TB 3.1–5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

### Lymphoma

**FLUDAP regimen (Fludarabine, Dexamethasone, Cisplatin, Cytarabine)** — abbr `FLUDAP`, IPD, cycle 21 วัน (Cycle 1–6) — _Siriraj order 2025 p.136_
- Lab D1: BW……kg Ht……cm BSA……m2 CrCl……ml/min; Cr……mg/dL, TB……mg/dL, AST……U/L, ALT……U/L; D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Reticulocyte, direct Coombs' test; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Acyclovir (400 mg): 1 tab oral bid pc — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D3
- Dexamethasone: 100 mg in NSS 50 mL IV drip in 24 hr — D1 ถึง D3
- Fludarabine 30 mg/m2/day (max 50 mg) ใน NSS 50 mL IV drip in 30 min — D2 ถึง D3 [max 50 mg; ก่อนให้ Ara-C 4 hr] (note: CrCl 30–70 mL/min: 50%; CrCl <30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Cisplatin 50 mg/m2 ใน NSS 1,000 mL IV drip in 4 hr — D2 ถึง D3 (note: CrCl 46–60 mL/min: 50%; CrCl 31–45 mL/min: 25%; CrCl ≤30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- 20% Mannitol: 20% Mannitol 100 mL in D5W 1,000 mL IV drip in 20 hr — D2 ถึง D3
- Cytarabine 1000 mg/m2 ใน NSS 50 mL IV in 24 hr — D2 ถึง D3 [(……®)] (note: CrCl 40–60 mL/min: 500 mg/m2 ต่อครั้ง; CrCl <40 mL/min: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- Filgrastim: (……®) ☐ 300 mcg ☐ 480 mcg SC OD — เริ่มวันที่……ถึง……

### CLL

**Fludarabine (CLL)** — abbr `Fludarabine`, IPD, cycle 28 วัน (Cycle 1–6) — _Siriraj order 2025 p.137_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Reticulocyte, direct Coombs test; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Acyclovir (400 mg): 1 tab oral bid pc — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D5
- Fludarabine 25 mg/m2/day ใน NSS 100 mL IV drip in 30 min — D1–D5 [พิมพ์เป็นช่วง 25–30 mg/m2/day] (note: CrCl 30–70: 50%; CrCl <30: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

### Lymphoma

**FND regimen** — abbr `FND`, IPD, cycle Cycle 1–8 (ไม่ระบุรอบ) — _Siriraj order 2025 p.138_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Reticulocyte, direct Coombs test; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Acyclovir (400 mg): 1 tab oral bid pc — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D3
- Mitoxantrone 10 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3: 50%; TB >3: 25%)
- Fludarabine 25 mg/m2/day ใน NSS 100 mL IV drip in 30 min — D1–D3 (note: CrCl 30–70: 15 mg/m2/day; CrCl <30: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Dexamethasone (4 mg): 5 tabs oral OD pc (#25 tabs) — D1–D5
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

**GCVP regimen** — abbr `GCVP`, IPD, cycle 21 วัน (Cycle 1–6) — _Siriraj order 2025 p.139_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D4, D7
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ Gemcitabine: ขนาดยาของ Gemcitabine: Cycle 1: 750 mg/m2; Cycle 2: 875 mg/m2; Cycle ถัดไป: 1,000 mg/m2 — ทุก cycle
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1, D8
- Dexamethasone injection: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1, D8
- Gemcitabine 750 mg/m2 ใน NSS 250 mL IV drip in 30 min — D1, D8 [750–1,000 mg/m2: cycle 1 = 750, cycle 2 = 875, cycle ถัดไป = 1,000 mg/m2] (note: ไม่มีคำแนะนำการปรับขนาดยาในโรคไต; AST เพิ่มขึ้น: ไม่ต้องปรับขนาดยา; TB เพิ่มขึ้น: 80%)
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV push — D1 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 หรือ AST 60–180: 50%; TB >3.1 หรือ AST >180: งดยา)
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: CrCl <10: 50%; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา)
- Prednisolone (5 mg): 5 tabs PO tid pc and hs (#100 tabs) — D1–D5
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

**GDP regimen** — abbr `GDP`, IPD, cycle 21 วัน (Cycle 1–6) — _Siriraj order 2025 p.140_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D4, D7
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1, D8
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Gemcitabine 1000 mg/m2 ใน NSS 250 mL IV drip in 30 min — D1, D8 (note: ไม่มีคำแนะนำการปรับขนาดยาในโรคไต; AST เพิ่มขึ้น: ไม่ต้องปรับขนาดยา; TB เพิ่มขึ้น: 80%)
- 5% D/NSS (pre-hydration): 250 mL IV drip in 1 hr ก่อนให้ cisplatin — D1
- Cisplatin 75 mg/m2/day ใน NSS 500 mL IV drip in 2 hr — D1 [คู่กับ 20% Mannitol 250 mL IV drip in 2 hr] (note: CrCl 46–60: 50%; CrCl 31–45: 25%; CrCl ≤30: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- NSS (post-hydration): 500 mL IV drip 120 mL/hr เริ่มหลัง cisplatin หมด — D1
- Dexamethasone (4 mg): 5 tabs oral bid pc (#40 tabs) — D1–D4
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

**GemOx regimen** — abbr `GemOx`, IPD, cycle 14 วัน (Cycle 1–4) — _Siriraj order 2025 p.141_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1
- Gemcitabine 1000 mg/m2 ใน NSS 250 mL IV in 30 min — D1 (note: ไม่มีคำแนะนำการปรับขนาดยาในโรคไต; AST เพิ่มขึ้น: ไม่ต้องปรับขนาดยา; TB เพิ่มขึ้น: 80%)
- Oxaliplatin 100 mg/m2 ใน D5W 250 mL IV in 3 hr — D1 (note: CrCl <30: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

**GIFOX regimen** — abbr `GIFOX`, IPD, cycle 14 วัน (Cycle 1–4) — _Siriraj order 2025 p.142_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D2
- Gemcitabine 1000 mg/m2 ใน NSS 250 mL IV in 30 min — D1 (note: ไม่มีคำแนะนำการปรับขนาดยาในโรคไต; AST เพิ่มขึ้น: ไม่ต้องปรับขนาดยา; TB เพิ่มขึ้น: 80%)
- Oxaliplatin 130 mg/m2 ใน D5W 250 mL IV in 3 hr — D2 (note: CrCl <30: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Ifosfamide 5000 mg/m2 ใน NSS 1,000 mL IV drip in 20 hr — D2 [ผสมร่วมกับ Mesna 5,000 mg/m2 ในขวดเดียวกัน] (note: CrCl 46–60: 80%; CrCl 31–45: 75%; CrCl 10–30: 70%; CrCl <10: งดยา; ไม่มีคำแนะนำการปรับยาในโรคตับ)
- Mesna 5000 mg/m2 ใน NSS 1,000 mL IV drip in 20 hr — D2 [ผสมร่วมกับ Ifosfamide 5,000 mg/m2 ในขวดเดียวกัน]
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

### Hodgkin

**GVD regimen** — abbr `GVD`, IPD, cycle 21 วัน (Cycle 1–6) — _Siriraj order 2025 p.143_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D3
- Gemcitabine 1000 mg/m2 ใน NSS 250 mL IV in 30 min — D1, D8 (note: ไม่มีคำแนะนำการปรับขนาดยาในโรคไต; AST เพิ่มขึ้น: ไม่ต้องปรับขนาดยา; TB เพิ่มขึ้น: 80%)
- Vinorelbine 20 mg/m2/day ใน NSS 50 mL IV in 10 min — D1, D8 (note: ไม่ต้องปรับขนาดยาในโรคไตและโรคตับ)
- Liposomal doxorubicin 15 mg/m2 ใน D5W 250 mL IV drip in 2 hr — D1 (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.2–3 หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งดยา)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

### CNS lymphoma

**HD-MTX regimen (with vincristine, IT cytarabine)** — abbr `HD-MTX`, IPD, cycle Cycle 1–6 (ไม่ระบุรอบ) — _Siriraj order 2025 p.144_
- Lab D1: CBC, BUN, Cr, LFT, uric acid, LDH; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- MTX level: MTX level OD จนกว่า <0.05 µmol/L (เริ่มเจาะ 48 hr หลังจากเริ่มให้ MTX) — เริ่ม D4
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Record V/S และ urine: Record V/S and urine output q 4 hr; keep urine pH >7 and urine output >100 mL/hr — D1–D2
- Intrathecal Cytarabine: เบิก Cytarabine 100 mg/vial; Cytarabine 15 mg IT — D7, D8, D9 และ D17, D18, D19
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- งดยา: งดให้ยา omeprazole และ co-trimoxazole — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D2
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV push — D1 [max 2 mg; ระวัง leak]
- Dexamethasone injection: 5 mg IV q 6 hr — D1–D4
- Hydration: D5W 1,000 mL + 7.5% NaHCO3 100 mL IV drip 120 mL/hr เริ่มอย่างน้อย 12 hr ก่อนให้ methotrexate; ช่วงที่ drip methotrexate อยู่ ให้ลด rate IV เป็น 100 mL/hr และให้ต่อจนกว่า methotrexate หมด 48 hr จากนั้นให้ดื่มน้ำ >2,000 mL/day (พิจารณาลด rate IV ในผู้ป่วยอายุมาก, โรคหัวใจ และอื่นๆ) — เริ่ม D1
- Methotrexate (bolus) 1500 mg/m2 ใน D5W 100 mL IV in 1 hr — D2 [ให้ก่อน then Methotrexate infusion] (note: CrCl 30–60: 50% ของขนาดยา; CrCl <30: งดยา; TB 3.1–5 หรือ AST >180: 75% ของขนาดยา; TB >5: งดยา)
- Methotrexate (infusion × 2 ชุด) 1650 mg/m2 ใน D5W 1,000 mL + 7.5% NaHCO3 100 mL IV in 6 hr × 2 ชุด — D2 [ตามพิมพ์ "Methotrexate (1,650 mg/m2) …… mg in D5W 1,000 mL + 7.5% NaHCO3 100 mL IV in 6 hr × 2 ชุด"] (note: CrCl 30–60: 50% ของขนาดยา; CrCl <30: งดยา; TB 3.1–5 หรือ AST >180: 75% ของขนาดยา; TB >5: งดยา)
- Leucovorin 15 mg/m2 ใน D5W 20 mL IV push q 6 hr เริ่มให้ 12 hr หลัง MTX หมด หยุดให้เมื่อ MTX level <0.05 µmol/L — เริ่ม D3 (note: Leucovorin 50 mg IV q 6 hr ถ้า MTX >20 µmol/L at 0 hr, หรือ >1.0 µmol/L at 24 hr, หรือ >0.1 µmol/L at 48 hr after the end of MTX infusion)

**HD-MTX-Ara C** — abbr `HD-MTX-AraC`, IPD, cycle 21 วัน (Cycle 1–6) — _Siriraj order 2025 p.145_
- Lab D1: CBC, BUN, Cr, LFT, uric acid, LDH; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- MTX level: MTX level OD จนกว่า <0.05 µmol/L (เริ่มเจาะ 48 hr หลังจากเริ่มให้ MTX) — เริ่ม D4
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Record V/S และ urine: Record V/S and urine output q 4 hr; keep urine pH >7 and urine output >100 mL/hr — D1–D2
- Cerebellar signs: ตรวจ cerebellar signs ทุกครั้งก่อนให้ยา cytarabine — D3–D4
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D3–D6
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- งดยา: งดให้ยา omeprazole และ co-trimoxazole — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D2–D4
- Dexamethasone: 5 mg IV q 6 hr — D1–D4
- Hydration: D5W 1,000 mL + 7.5% NaHCO3 100 mL IV drip 120 mL/hr เริ่มอย่างน้อย 12 hr ก่อนให้ methotrexate; ช่วงที่ drip methotrexate อยู่ ให้ลด rate IV เป็น 100 mL/hr และให้ต่อจนกว่า methotrexate หมด 48 hr จากนั้นให้ดื่มน้ำ >2,000 mL/day (พิจารณาลด rate IV ในผู้ป่วยอายุมาก, โรคหัวใจ และอื่นๆ) — เริ่ม D1
- Methotrexate (bolus) 500 mg/m2 ใน D5W 50 mL IV in 15 min — D2 [ให้ก่อน then Methotrexate infusion] (note: CrCl 30–60: 50% ของขนาดยา; CrCl <30: งดยา; TB 3.1–5 หรือ AST >180: 75% ของขนาดยา; TB >5: งดยา)
- Methotrexate (infusion) 3000 mg/m2 ใน D5W 500 mL + 7.5% NaHCO3 50 mL IV in 3 hr — D2 (note: CrCl 30–60: 50% ของขนาดยา; CrCl <30: งดยา; TB 3.1–5 หรือ AST >180: 75% ของขนาดยา; TB >5: งดยา)
- Leucovorin 15 mg/m2 ใน D5W 20 mL IV push q 6 hr เริ่มให้ 12 hr หลัง MTX หมด หยุดให้เมื่อ MTX level <0.05 µmol/L — เริ่ม D3 (note: Leucovorin 50 mg IV q 6 hr ถ้า MTX >20 µmol/L at 0 hr, หรือ >1.0 µmol/L at 24 hr, หรือ >0.1 µmol/L at 48 hr after the end of MTX infusion)
- Cytarabine 2000 mg/m2 ใน NSS 300 mL IV in 3 hr q 12 hr (4 doses) — D3–D4 [ยี่ห้อ (……)] (note: CrCl 40–60: 1,000 mg/m2 ต่อครั้ง; CrCl <40: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

**HD-MTX for CNS prophylaxis** — abbr `HD-MTX CNS ppx`, IPD, cycle Cycle 1–4 (ไม่ระบุรอบ) — _Siriraj order 2025 p.146_
- Lab D1: CBC, BUN, Cr, LFT, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- MTX level: MTX level OD จนกว่า <0.05 µmol/L (เริ่มเจาะ 48 hr หลังจากเริ่มให้ MTX) — เริ่ม D4
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Record V/S และ urine: Record V/S and urine output q 4 hr; keep urine pH >7 and urine output >100 mL/hr — D1–D2
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- งดยา: งดให้ยา omeprazole และ co-trimoxazole — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D2
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D2
- Hydration: D5W 1,000 mL + 7.5% NaHCO3 100 mL IV drip 120 mL/hr เริ่มอย่างน้อย 12 hr ก่อนให้ methotrexate; ช่วงที่ drip methotrexate อยู่ ให้ลด rate IV เป็น 100 mL/hr และให้ต่อจนกว่า methotrexate หมด 48 hr จากนั้นให้ดื่มน้ำ >2,000 mL/day (พิจารณาลด rate IV ในผู้ป่วยอายุมาก, โรคหัวใจ และอื่นๆ) — เริ่ม D1
- Methotrexate (bolus) 1500 mg/m2 ใน D5W 100 mL IV in 1 hr — D2 [ให้ก่อน then Methotrexate infusion] (note: CrCl 30–60: 50% ของขนาดยา; CrCl <30: งดยา; TB 3.1–5 หรือ AST >180: 75% ของขนาดยา; TB >5: งดยา)
- Methotrexate (infusion) 1500 mg/m2 ใน D5W 1,000 mL + 7.5% NaHCO3 100 mL IV in 6 hr — D2 (note: CrCl 30–60: 50% ของขนาดยา; CrCl <30: งดยา; TB 3.1–5 หรือ AST >180: 75% ของขนาดยา; TB >5: งดยา)
- Leucovorin 15 mg/m2 ใน D5W 20 mL IV push q 6 hr เริ่มให้ 12 hr หลัง MTX หมด หยุดให้เมื่อ MTX level <0.05 µmol/L — เริ่ม D3 (note: Leucovorin 50 mg IV q 6 hr ถ้า MTX >20 µmol/L at 0 hr, หรือ >1.0 µmol/L at 24 hr, หรือ >0.1 µmol/L at 48 hr after the end of MTX infusion)

### Lymphoma

**ICE regimen** — abbr `ICE`, IPD, cycle 21 วัน (Cycle 1, 2, 3 ……) — _Siriraj order 2025 p.147_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- AUC: AUC = CrCl + 25 = …… — D1
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D3
- Ifosfamide 1670 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D1–D3 [ผสมร่วมกับ Mesna 1,670 mg/m2/day ในขวดเดียวกัน] (note: CrCl 46–60: 80%; CrCl 31–45: 75%; CrCl 10–30: 70%; CrCl <10: งดยา; ไม่มีคำแนะนำการปรับยาในโรคตับ)
- Mesna 1670 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D1–D3 [ผสมร่วมกับ Ifosfamide ในขวดเดียวกัน]
- Carboplatin undefined AUC5 (max 800 mg) ใน D5W 250 mL IV drip in 1 hr — D2 [5 AUC; max 800 mg] (note: ปรับขนาดยาตาม AUC; CrCl <30: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Etoposide 100 mg/m2/day ใน NSS 500 mL IV drip in 2 hr — D1–D3 (note: CrCl 15–50: 75%; CrCl <15: งดใช้ยา; TB 1.5–3 หรือ AST 60–180: 50%; TB >3 หรือ AST >180: งดใช้ยา)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

**ICE regimen 24-hour infusion** — abbr `ICE 24hr`, IPD, cycle 21 วัน* (Cycle 1, 2, 3 ……) — *Original regimen ทุก 14 วัน — _Siriraj order 2025 p.148_
- Lab D1: CBC, BUN, Cr, LFT, uric acid, LDH; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- AUC: AUC = CrCl + 25 = …… — D1
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D3
- Ifosfamide 5000 mg/m2/day ใน NSS 1,000 mL IV drip in 24 hr — D2 [ผสมร่วมกับ Mesna 5,000 mg/m2/day ในขวดเดียวกัน] (note: CrCl 46–60: 80%; CrCl 31–45: 75%; CrCl 10–30: 70%; CrCl <10: งดยา; ไม่มีคำแนะนำการปรับยาในโรคตับ)
- Mesna 5000 mg/m2/day ใน NSS 1,000 mL IV drip in 24 hr — D2 [ผสมร่วมกับ Ifosfamide ในขวดเดียวกัน]
- Carboplatin undefined AUC5 (max 800 mg) ใน D5W 250 mL IV drip in 1 hr — D2 [5 AUC; max 800 mg] (note: ปรับขนาดยาตาม AUC; CrCl <30: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Etoposide 100 mg/m2/day ใน NSS 500 mL IV drip in 2 hr — D1–D3 (note: CrCl 15–50: 75%; CrCl <15: งดใช้ยา; TB 1.5–3 หรือ AST 60–180: 50%; TB >3 หรือ AST >180: งดใช้ยา)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

### Hodgkin

**IGEV regimen** — abbr `IGEV`, IPD, cycle 21 วัน (Cycle 1–4) — _Siriraj order 2025 p.149_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D3
- Vinorelbine 20 mg/m2/day ใน NSS 50 mL IV in 10 min — D1 (note: ไม่ต้องปรับขนาดยาในโรคไตและโรคตับ)
- Gemcitabine 800 mg/m2 ใน NSS 250 mL IV in 30 min — D1, D4 (note: ไม่มีคำแนะนำการปรับขนาดยาในโรคไต; AST เพิ่มขึ้น: ไม่ต้องปรับขนาดยา; TB เพิ่มขึ้น: 80%)
- Ifosfamide 2000 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D1–D4 [ผสมร่วมกับ Mesna 2,000 mg/m2/day ในขวดเดียวกัน] (note: CrCl 46–60: 80%; CrCl 31–45: 75%; CrCl 10–30: 70%; CrCl <10: งดยา; ไม่มีคำแนะนำการปรับยาในโรคตับ)
- Mesna 2000 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D1–D4 [ผสมร่วมกับ Ifosfamide ในขวดเดียวกัน]
- Prednisolone (5 mg): 5 tabs po tid pc and hs (#100 tabs) — D1–D4
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

### Burkitt

**IVAC regimen (Cycle 2, 4)** — abbr `IVAC`, IPD, cycle ให้ใน Cycle 2 และ 4 — _Siriraj order 2025 p.150_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Intrathecal Methotrexate: Methotrexate (เบิก 50 mg/vial จำนวน 1 ขวด) 12 mg IT วันที่……; ส่ง CSF for cell count, differential count, protein, sugar และ cytology; Capillary blood glucose (POCT) หลัง lumbar puncture — D5
- Leucovorin (15 mg): 1 tab oral 24 hr หลังให้ MTX IT — D6
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D5
- Ifosfamide 1500 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D1–D5 [ผสมร่วมกับ Mesna 1,500 mg/m2/day ในขวดเดียวกัน] (note: CrCl 46–60: 80%; CrCl 31–45: 75%; CrCl 10–30: 70%; CrCl <10: งดยา; ไม่มีคำแนะนำการปรับยาในโรคตับ)
- Mesna 1500 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D1–D5 [ผสมร่วมกับ Ifosfamide ในขวดเดียวกัน]
- Etoposide 60 mg/m2/day ใน NSS 500 mL IV drip in 2 hr — D1–D5 (note: CrCl 15–50: 75%; CrCl <15: งดใช้ยา; TB 1.5–3 หรือ AST 60–180: 50%; TB >3 หรือ AST >180: งดใช้ยา)
- Cytarabine 2000 mg/m2 ใน NSS 250 mL IV drip in 2 hr q 12 hr (รวม 4 doses) — D1–D2 (note: CrCl 40–60: 1,000 mg/m2 ต่อครั้ง; CrCl <40: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- Cerebellar sign: ตรวจ cerebellar sign ทุกครั้งก่อนให้ยา cytarabine — D1–D2
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD — เริ่ม D6

### CNS lymphoma

**MATRIx regimen** — abbr `MATRIx`, IPD, cycle 21 วัน (Cycle 1–4); *Original MATRIx regimen has rituximab in Day-5 — _Siriraj order 2025 p.151_
- Lab D0: CBC, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA), EKG 12 leads — D0
- Consult: ☐ ส่งปรึกษาทันตกรรม — D0
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Premedication ก่อนให้ rituximab 30 นาที: ☐ Dexamethasone 10 mg IV ☐ Paracetamol (500 mg) 1 tab oral ☐ Chlorpheniramine 10 mg IV ☐ Benadryl (25 mg) 2 cap oral — D0
- Record vital signs (rituximab): Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion of rituximab; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — D0
- Record V/S และ urine: Record V/S and urine output q 4 hr; keep urine pH >7 and urine output >100 mL/hr — D0–D1
- Cerebellar signs: ตรวจ cerebellar signs ทุกครั้งก่อนให้ยา cytarabine — D2–D3
- คำแนะนำ rituximab: การให้ยา rituximab ครั้งแรก: ชั่วโมงที่ 1 เริ่มให้ยาในขนาด 50 mg/hr ชั่วโมงถัดไป เพิ่มขนาดยาได้ 100 mg/hr; การให้ยา rituximab ครั้งต่อไป: ชั่วโมงที่ 1 เริ่มให้ยาในปริมาณ 20% จากนั้นให้ยาที่เหลือ 80% ภายใน 1.5 hr — D0
- MTX level: MTX level OD จนกว่า <0.05 µmol/L (48 hr หลังจากเริ่มยา) — เริ่ม D3
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Dex-oph eye drop: 2 drops หยอดตา 2 ข้าง q 8 hr — D2–D5
- งดยา: งดให้ยา omeprazole และ co-trimoxazole — ตลอดการรักษา
- ☐ Tenofovir alafenamide (25 mg): 1 tab po OD pc กรณี AntiHBc+ — ตลอดการรักษา
- Rituximab 375 mg/m2 ใน NSS ☐ 250 mL ☐ 500 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr) — D0
- Ondansetron: 8 mg IV ก่อนให้ยาเคมี 30 min, prn q 8 hr — D1–D4
- Dexamethasone: 5 mg IV q 6 hr — D1–D4
- Hydration: D5W 1,000 mL + 7.5% NaHCO3 100 mL IV drip 120 mL/hr เริ่มอย่างน้อย 12 hr ก่อนให้ methotrexate; ช่วงที่ drip methotrexate อยู่ ให้ลด rate IV เป็น 100 mL/hr และให้ต่อจนกว่า methotrexate หมด 48 hr จากนั้นให้ดื่มน้ำ >2,000 mL/day (พิจารณาลด rate IV ในผู้ป่วยอายุมาก, โรคหัวใจ และอื่นๆ) — เริ่ม D0
- Methotrexate (bolus) 500 mg/m2 ใน D5W 50 mL IV in 15 min — D1 [ให้ก่อน then Methotrexate infusion] (note: CrCl 30–60: 50% ของขนาดยา; CrCl <30: งดยา; TB 3.1–5 หรือ AST >180: 75% ของขนาดยา; TB >5: งดยา)
- Methotrexate (infusion) 3000 mg/m2 ใน D5W 500 mL + 7.5% NaHCO3 50 mL IV in 3 hr — D1 (note: CrCl 30–60: 50% ของขนาดยา; CrCl <30: งดยา; TB 3.1–5 หรือ AST >180: 75% ของขนาดยา; TB >5: งดยา)
- Leucovorin 15 mg/m2 ใน D5W 20 mL IV push q 6 hr เริ่มให้ 12 hr หลัง MTX หมด หยุดให้เมื่อ MTX level <0.05 µmol/L — เริ่ม D2 (note: Leucovorin 50 mg IV q 6 hr ถ้า MTX >20 µmol/L at 0 hr, หรือ >1.0 µmol/L at 24 hr, หรือ >0.1 µmol/L at 48 hr after the end of MTX infusion)
- Cytarabine 2000 mg/m2 ใน NSS 300 mL IV in 3 hr q 12 hr (4 doses) — D2–D3 [ยี่ห้อ (……)] (note: CrCl 40–60: 1,000 mg/m2 ต่อครั้ง; CrCl <40: ≤200 mg/m2/day; ไม่มีคำแนะนำเรื่องการปรับขนาดยาในโรคตับ)
- Thiotepa 30 mg/m2 ใน NSS …… mL (0.5–1 mg/mL) IV in 1 hr — D4 [4 ชม. หลังให้ยา Thiotepa จนถึง 36 ชม. หลังยา Thiotepa หมด ให้อาบน้ำเปล่า (งดสบู่) 4 ครั้งต่อวัน และงดทาครีม] (note: ไม่มีคำแนะนำการปรับยาในโรคไตและโรคตับ)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

### Lymphoma

**MINE regimen** — abbr `MINE`, IPD, cycle 21 วัน (Cycle 1–6) — _Siriraj order 2025 p.152_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; Mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1–D3
- Ifosfamide 1333 mg/m2 ใน NSS 250 mL IV in 2 hr — D1–D3 [ผสมร่วมกับ Mesna 1,333 mg/m2 ในขวดเดียวกัน] (note: CrCl 46–60: 80%; CrCl 31–45: 75%; CrCl 10–30: 70%; CrCl <10: งดยา; ไม่มีคำแนะนำการปรับยาในโรคตับ)
- Mesna (ร่วมกับ ifosfamide) 1333 mg/m2 ใน NSS 250 mL IV in 2 hr — D1–D3 [ผสมร่วมกับ Ifosfamide ในขวดเดียวกัน]
- Mesna (หลัง ifosfamide) 500 mg/m2 ใน NSS 100 mL IV in 30 min หลังให้ ifosfamide 4 hr — D1–D3
- Mitoxantrone 8 mg/m2 ใน NSS 50 mL IV in 15 min — D1 (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3: 4 mg/m2; TB >3: 2 mg/m2)
- Etoposide 65 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D1–D3 (note: CrCl 15–50: 75%; CrCl <15: งดใช้ยา; TB 1.5–3 หรือ AST 60–180: 50%; TB >3 หรือ AST >180: งดใช้ยา)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

**mini-CHOP regimen** — abbr `mini-CHOP`, IPD, cycle 21 วัน (Cycle 1–8) — _Siriraj order 2025 p.153_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Vincristine: 1 mg in NSS 20 mL IV push ระวัง leak — D1
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: CrCl <10: 75%; TB 1.5–3 หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งดยา)
- Cyclophosphamide 400 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: CrCl <10: 50%; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา)
- Prednisolone (5 mg) 40 mg/m2 PO (Sig. ……) — D1–D5
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

### Hodgkin

**Nivolumab-AVD regimen** — abbr `Nivo-AVD`, IPD, cycle 28 วัน (Cycle 1–6) — _Siriraj order 2025 p.154_
- Lab D1: CBC, ESR, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง การวางแผนมีบุตรในอนาคต การหยุดสูบบุหรี่ และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron injection: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1, D15
- Dexamethasone injection: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1, D15
- Paracetamol (500 mg): 1 tab oral ก่อนให้ยาเคมีบำบัด 30 นาที — D1, D15
- Vinblastine 6 mg/m2 (max 10 mg) ใน NSS 20 mL IV push — D1, D15 [max 10 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 หรือ AST 60–180: 50%; TB >3.1 หรือ AST >180: งดยา)
- Doxorubicin 25 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1, D15 [ระวัง leak] (note: CrCl <10: 75%; TB 1.5–3 หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งดยา)
- Dacarbazine 375 mg/m2 ใน NSS 500 mL IV drip in 3 hr — D1, D15 (note: CrCl 30–60: 75%; CrCl 10–30: 50%; CrCl <10: งดยา; ไม่มีคำแนะนำเรื่องปรับขนาดยาในโรคตับ)
- Nivolumab (100 mg/10 mL; 40 mg/4 mL): 240 mg in NSS 100 mL IV in 1 hr — D1, D15
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

### Lymphoma

**Obinutuzumab infusion protocol** — abbr `Obinutuzumab`, IPD, cycle Cycle 1–6 …… — _Siriraj order 2025 p.155_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- คำแนะนำ Obinutuzumab: การให้ยา Obinutuzumab ครั้งแรก: ชั่วโมงที่ 1–4 เริ่มให้ยาในขนาด 25 mg/hr ชั่วโมงถัดไป ให้ยาในขนาด 50 mg/hr และสามารถเพิ่มได้ครั้งละ 50 mg/hr ในทุกๆ 30 นาที จนถึงอัตราสูงสุด 400 mg/hr; การให้ยา Obinutuzumab ครั้งต่อไป: ชั่วโมงที่ 1 เริ่มให้ยาในขนาด 100 mg/hr ชั่วโมงถัดไป ให้ยาในขนาด 200 mg/hr และเพิ่มขึ้นครั้งละ 100 mg/hr ทุกๆ 30 นาที จนถึงอัตราสูงสุด 400 mg/hr — ทุกครั้งที่ให้ยา
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — ทุกครั้งที่ให้ยา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ — ตลอดการรักษา
- ☐ Tenofovir alafenamide (25 mg): 1 tab po OD pc กรณี AntiHBc+ — ตลอดการรักษา
- Premedication ก่อนให้ obinutuzumab 60 นาที: ☐ Dexamethasone injection 20 mg IV ☐ Chlorpheniramine injection 10 mg IV ☐ Paracetamol tab (500 mg) 2 tabs oral ☐ Benadryl (25 mg) 2 cap oral — ทุกครั้งที่ให้ยา
- Obinutuzumab: 1,000 mg in NSS 250 mL IV infusion: เริ่มต้น rate 25 mL/hr; นาทีที่ 30 rate 50 mL/hr; นาทีที่ 60 rate 75 mL/hr; นาทีที่ 90 rate 100 mL/hr — ทุก cycle
- Record vital signs: q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion — ทุกครั้งที่ให้ยา

**Pola-BR regimen** — abbr `Pola-BR`, IPD, cycle 21 วัน (Cycle 1–6 ……) — _Siriraj order 2025 p.156_
- Lab D1: CBC, BUN, Cr, LFT, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — D1
- คำแนะนำ rituximab: การให้ยา rituximab ครั้งแรก: ชั่วโมงที่ 1 เริ่มให้ยาในขนาด 50 mg/hr ชั่วโมงถัดไป เพิ่มขนาดยาได้ 100 mg/hr; การให้ยา rituximab ครั้งต่อไป: ชั่วโมงที่ 1 เริ่มให้ยาในปริมาณ 20% จากนั้นให้ยาที่เหลือ 80% ภายใน 1.5 hr — D1
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ☐ Tenofovir alafenamide (25 mg): 1 tab po OD pc กรณี AntiHBc+ — ตลอดการรักษา
- Premedication ก่อนให้ rituximab 30 min: ☐ Dexamethasone 10 mg IV ☐ Paracetamol (500 mg) 1 tab oral ☐ Chlorpheniramine 10 mg IV ☐ Benadryl (25 mg) 2 cap oral — D1
- ☐ Rituximab (375 mg/m2) 375 mg/m2 ใน NSS ☐ 250 mL ☐ 500 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr) — D1 (note: เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง)
- ☐ Rituximab (500 mg/m2) 500 mg/m2 ใน NSS ☐ 250 mL ☐ 500 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr) — D1 (note: เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง)
- Polatuzumab vedotin 1.8 mg/kg (max 240 mg) ใน NSS 100 mL IV drip in 60 min (ครั้งแรก 90 min) — D1 [ให้ต่อจาก Rituximab; max 240 mg/cycle; *drip in 90 min in 1st time] (note: ไม่ต้องปรับขนาดยาในโรคไตที่ CrCl ≥30 และไม่มีข้อมูลการปรับยาในโรคไตที่ CrCl <30; TB 1.5–3 หรือ AST 60–180: งดยา; maximum dose 240 mg/cycle)
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1, D2
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1, D2
- Bendamustine 90 mg/m2 ใน NSS 500 mL IV drip in 2 hr — D1, D2 (note: CrCl <40: งดยา; TB 1.8–3.6 และ AST 100–400: งดยา; TB >3.6: งดยา)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……
- Record vital signs: หลังให้ยา Rituximab และ Polatuzumab ให้ Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion — D1

**Pola-R-CHP regimen** — abbr `Pola-R-CHP`, IPD, cycle 21 วัน (CHP + Polatuzumab Cycle 1–6; Rituximab Cycle 1–8) — _Siriraj order 2025 p.157_
- Lab D1: CBC, BUN, Cr, LFT, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Record vital signs: หลังให้ยา Rituximab และ Polatuzumab ให้ Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion — D1
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — D1
- คำแนะนำ rituximab: การให้ยา rituximab ครั้งแรก: ชั่วโมงที่ 1 เริ่มให้ยาในขนาด 50 mg/hr ชั่วโมงถัดไป เพิ่มขนาดยาได้ 100 mg/hr; การให้ยา rituximab ครั้งต่อไป: ชั่วโมงที่ 1 เริ่มให้ยาในปริมาณ 20% จากนั้นให้ยาที่เหลือ 80% ภายใน 1.5 hr — D1
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ☐ Tenofovir alafenamide (25 mg): 1 tab po OD pc กรณี AntiHBc+ — ตลอดการรักษา
- Premedication ก่อนให้ rituximab 30 min: ☐ Dexamethasone 10 mg IV ☐ Paracetamol (500 mg) 1 tab oral ☐ Chlorpheniramine 10 mg IV ☐ Benadryl (25 mg) 2 cap oral — D1
- Rituximab 375 mg/m2 ใน NSS ☐ 250 mL ☐ 500 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr) — D1 [Cycle 1–8]
- Polatuzumab vedotin 1.8 mg/kg (max 240 mg) ใน NSS 100 mL IV drip in 60 min (ครั้งแรก 90 min) — D1 [Cycle 1–6; ให้ต่อจาก Rituximab; max 240 mg/cycle; *drip in 90 min in 1st time] (note: ไม่ต้องปรับขนาดยาในโรคไตที่ CrCl ≥30 และไม่มีข้อมูลการปรับยาในโรคไตที่ CrCl <30; TB 1.5–3 หรือ AST 60–180: งดยา; maximum dose 240 mg/cycle)
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Doxorubicin 50 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: CrCl <10: 75%; TB 1.5–3 หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งดยา)
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: CrCl <10: 50%; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา)
- Prednisolone (5 mg): 5 tabs PO tid pc and hs (#100 tabs) — D1–D5
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

**Polatuzumab vedotin (single agent)** — abbr `Pola`, IPD, cycle Cycle 1–6 (ไม่ระบุรอบ) — _Siriraj order 2025 p.158_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- คำแนะนำ Polatuzumab: การให้ยา Polatuzumab vedotin ครั้งแรก: ให้ drip in 90 min และ observe อย่างน้อย 90 min following completion of dose; การให้ยา Polatuzumab vedotin ครั้งถัดไป: ให้ drip in 60 min และ observe อย่างน้อย 30 min following completion of dose — D1
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ — ตลอดการรักษา
- Premedication: ☐ Chlorpheniramine injection 10 mg IV ☐ Paracetamol tab (500 mg) 1 tab oral ☐ Benadryl (25 mg) 2 cap oral — D1
- Polatuzumab vedotin 1.8 mg/kg (max 240 mg) ใน NSS 100 mL IV drip in …… min — D1 [ครั้งแรก 90 min, ครั้งถัดไป 60 min; max 240 mg/cycle] (note: ไม่ต้องปรับขนาดยาในโรคไตที่ CrCl ≥30 และไม่มีข้อมูลการปรับยาในโรคไตที่ CrCl <30; TB 1.5–3 หรือ AST 60–180: งดยา; maximum dose 240 mg/cycle)
- Record vital signs: q 15 min × 2 then q 30 min × 2 then ☐ q 1 hr × 2 ครั้ง; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — D1

**RBAC500 regimen** — abbr `RBAC500`, IPD, cycle 28 วัน (Cycle 1–6) — _Siriraj order 2025 p.159_
- Lab D1: CBC, BUN, Cr, LFT, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาธนาคารเลือดเพื่อขอ irradiated blood product ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ irradiated PFB ถ้า hemoglobin <8 g/dL; ให้ irradiated LPPC/SDP ถ้า platelet <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; Blood product ทุกชนิดเป็น irradiated product เท่านั้น; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Record vital signs: หลังให้ Rituximab ให้ Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion — D1
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — D1
- คำแนะนำ rituximab: การให้ยา rituximab ครั้งแรก: ชั่วโมงที่ 1 เริ่มให้ยาในขนาด 50 mg/hr ชั่วโมงถัดไป เพิ่มขนาดยาได้ 100 mg/hr; การให้ยา rituximab ครั้งต่อไป: ชั่วโมงที่ 1 เริ่มให้ยาในปริมาณ 20% จากนั้นให้ยาที่เหลือ 80% ภายใน 1.5 hr — D1
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ☐ Tenofovir alafenamide (25 mg): 1 tab po OD pc กรณี AntiHBc+ — ตลอดการรักษา
- Premedication ก่อนให้ rituximab 30 min: ☐ Dexamethasone 10 mg IV ☐ Paracetamol (500 mg) 1 tab oral ☐ Chlorpheniramine 10 mg IV ☐ Benadryl (25 mg) 2 cap oral — D1
- ☐ Rituximab (375 mg/m2) 375 mg/m2 ใน NSS ☐ 250 mL ☐ 500 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr) — D1 (note: เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง)
- ☐ Rituximab (500 mg/m2) 500 mg/m2 ใน NSS ☐ 250 mL ☐ 500 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr) — D1 (note: เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง)
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D2–D4
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D2–D4
- Bendamustine 70 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D2–D3 (note: CrCl <40: งดยา; TB 1.8–3.6 และ AST 100–400: งดยา; TB >3.6: งดยา)
- Cytarabine 500 mg/m2 ใน NSS 250 mL IV drip in 2 hr (เริ่มให้หลังจาก Bendamustine หมด 2 hr) — D2–D4 [ยี่ห้อ (……)] (note: ขนาดยา 500 mg/m2: ไม่มีคำแนะนำเรื่องปรับขนาดยาในโรคไตและโรคตับ)
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

**R-CHOP regimen** — abbr `R-CHOP`, IPD, cycle 21 วัน (Cycle 1–8) — _Siriraj order 2025 p.160_
- Lab D1: CBC, BUN, Cr, LFT, Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Record vital signs: หลังให้ Rituximab ให้ Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion — D1
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — D1
- คำแนะนำ rituximab: การให้ยา rituximab ครั้งแรก: ชั่วโมงที่ 1 เริ่มให้ยาในขนาด 50 mg/hr ชั่วโมงถัดไป เพิ่มขนาดยาได้ 100 mg/hr; การให้ยา rituximab ครั้งต่อไป: ชั่วโมงที่ 1 เริ่มให้ยาในปริมาณ 20% จากนั้นให้ยาที่เหลือ 80% ภายใน 1.5 hr — D1
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ☐ Tenofovir alafenamide (25 mg): 1 tab po OD pc กรณี AntiHBc+ — ตลอดการรักษา
- Premedication ก่อนให้ rituximab 30 min: ☐ Dexamethasone injection 10 mg IV ☐ Chlorpheniramine injection 10 mg IV ☐ Paracetamol tab (500 mg) 1 tab oral ☐ Benadryl (25 mg) 2 cap oral — D1
- Rituximab 375 mg/m2 ใน NSS ☐ 250 mL ☐ 500 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr) — D1
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที — D1
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 20 mL IV push — D1 [max 2 mg; ระวัง leak] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5–3 หรือ AST 60–180: 50%; TB >3.1 หรือ AST >180: งดยา)
- Doxorubicin 50 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: CrCl <10: 75%; TB 1.5–3 หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งดยา)
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: CrCl <10: 50%; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา)
- Prednisolone (5 mg): 5 tabs PO tid pc and hs (#100 tabs) — D1–D5
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……

**Rituximab infusion protocol** — abbr `Rituximab`, IPD, cycle Cycle 1–8 — _Siriraj order 2025 p.161_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; ☐ HBs Ag, Anti HBc Ab; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- คำแนะนำ rituximab: การให้ยา rituximab ครั้งแรก: ชั่วโมงที่ 1 เริ่มให้ยาในขนาด 50 mg/hr ชั่วโมงถัดไป เพิ่มขนาดยาได้ 100 mg/hr; การให้ยา rituximab ครั้งต่อไป: ชั่วโมงที่ 1 เริ่มให้ยาในปริมาณ 20% จากนั้นให้ยาที่เหลือ 80% ภายใน 1.5 hr — ทุกครั้งที่ให้ยา
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — ทุกครั้งที่ให้ยา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ — ตลอดการรักษา
- ☐ Tenofovir alafenamide (25 mg): 1 tab po OD pc กรณี AntiHBc+ — ตลอดการรักษา
- Premedication ก่อนให้ rituximab 30 นาที: ☐ Dexamethasone injection 10 mg IV ☐ Chlorpheniramine injection 10 mg IV ☐ Paracetamol tab (500 mg) 1 tab oral ☐ Benadryl (25 mg) 2 cap oral — ทุกครั้งที่ให้ยา
- ☐ Rituximab (375 mg/m2) 375 mg/m2 ใน NSS ☐ 250 mL ☐ 500 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr) — ทุก cycle (note: เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง)
- ☐ Rituximab (500 mg/m2) 500 mg/m2 ใน NSS ☐ 250 mL ☐ 500 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr) — ทุก cycle (note: เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง)
- Record vital signs: q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion — ทุกครั้งที่ให้ยา

**VR-CAP regimen** — abbr `VR-CAP`, IPD, cycle 21 วัน (Cycle 1–6 (7) (8)) — _Siriraj order 2025 p.162_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; U/A, stool conc. for parasite for 3 days; ☐ HBs Ag, Anti HBc Ab; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin <8 g/dL; ให้ LPPC/SDP ถ้า platelet count <20,000/mm3; เจาะ hemoculture × 2 specimens ถ้า T ≥38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Infusion reaction: ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½–1 hr หลังจากสิ้นสุดการให้ยา — D1
- คำแนะนำ rituximab: การให้ยา rituximab ครั้งแรก: ชั่วโมงที่ 1 เริ่มให้ยาในขนาด 50 mg/hr ชั่วโมงถัดไป เพิ่มขนาดยาได้ 100 mg/hr; การให้ยา rituximab ครั้งต่อไป: ชั่วโมงที่ 1 เริ่มให้ยาในปริมาณ 20% จากนั้นให้ยาที่เหลือ 80% ภายใน 1.5 hr — D1
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- ☐ Tenofovir alafenamide (25 mg): 1 tab po OD pc กรณี AntiHBc+ — ตลอดการรักษา
- Premedication ก่อนให้ rituximab 30 min: ☐ Dexamethasone 10 mg IV ☐ Paracetamol (500 mg) 1 tab oral ☐ Chlorpheniramine 10 mg IV ☐ Benadryl (25 mg) 2 cap oral — D1
- ☐ Rituximab (375 mg/m2) 375 mg/m2 ใน NSS ☐ 250 mL ☐ 500 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr) — D1 (note: เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง (ในแบบฟอร์มไม่พิมพ์วันกำกับ))
- ☐ Rituximab (500 mg/m2) 500 mg/m2 ใน NSS ☐ 250 mL ☐ 500 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr) — D1 (note: เลือก 375 หรือ 500 mg/m2 อย่างใดอย่างหนึ่ง (ในแบบฟอร์มไม่พิมพ์วันกำกับ))
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 min — D1
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด 30 min — D1
- Bortezomib 1.3 mg/m2 SC — D1, D4, D8, D11 [ยี่ห้อ (……)] (note: TB >3.1: 0.7 mg/m2 ใน cycle 1 และพิจารณาปรับขนาดยาเป็น 0.5–1 mg/m2 ใน cycle ถัดไป)
- Doxorubicin 50 mg/m2 ใน NSS 50 mL IV drip in 10 min — D1 [ระวัง leak] (note: อายุ >70 ปี: 75%; CrCl <10: 75%; TB 1.5–3 หรือ AST 60–180: 50%; TB 3.1–5 หรือ AST >180: 25%; TB >5: งดยา)
- Cyclophosphamide 750 mg/m2 ใน NSS 250 mL IV drip in 2 hr — D1 (note: อายุ >70 ปี: 75%; CrCl <10: 50%; TB 3.1–5 หรือ AST >180: 75%; TB >5: งดยา)
- Prednisolone (5 mg): 5 tabs PO tid pc and hs (#100 tabs) — D1–D5
- Filgrastim: ☐ 300 mcg ☐ 480 mcg SC OD เริ่มวันที่…… ถึง…… — ……
- Record vital signs: หลังให้ Rituximab ให้ Record vital signs q 15 min × 2 then q 30 min × 2 then q 1 hr until completion of infusion — D1

### NK/T lymphoma

**AspaMetDex regimen** — abbr `AspaMetDex`, IPD — _Siriraj order 2025 p.164_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid ☐ Ferritin, triglyceride; ☐ PT, APTT, fibrinogen, D-dimer ☐ EBV viral load; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาแพทย์ ENT ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC D5, D8, D11, D14, D17, D20; PT, aPTT, fibrinogen D5, D8 — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin < 8 g/dL; ให้ LPPC/SDP ถ้า platelet count < 20,000/mm3; เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3°C (และ ANC < 500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ L-asparaginase: L-asparaginase ผสม 10,000 IU in NSS 2 ml IM ได้; การให้ L-asparaginase วันแรก: Record V/S q 15 min x 2 จากนั้น q 30 min x 2 จากนั้น q 1 hr จนยาหมด ถ้า BP < 90/60 mmHg หยุดยาและรายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง; เตรียม adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้; กรณีเกิด severe allergic reaction ให้หยุดยาทันทีและให้ hydrocortisone IV, chlorpheniramine IV; กรณีเกิด anaphylaxis ให้หยุดยาทันทีและให้ adrenaline IV — วันที่ให้ L-asparaginase
- MTX level: MTX level OD จนกว่า < 0.05 μmol/L — เริ่ม D3 (48 hr หลังจากเริ่มยา)
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- งดให้ยา omeprazole และ co-trimoxazole: งดให้ยา omeprazole และ co-trimoxazole — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — ……
- Dexamethasone: 10 mg IV ก่อนให้ยาเคมีบำบัด — D1
- Prehydration / urine alkalinisation: D5W 1,000 ml + 7.5% NaHCO3 100 ml IV drip 120 ml/hr เริ่มก่อนให้ methotrexate อย่างน้อย 12 hr, ระหว่างให้ methotrexate อยู่ ให้ลด rate IV เหลือ 100 ml/hr และหยุดหลังจาก methotrexate หมดครบ 48 hr จากนั้นดื่มน้ำ > 2,000 mL/day (พิจารณา ลด rate IV ในผู้ป่วยอายุมาก, โรคหัวใจ และอื่นๆ) — D1
- Record V/S and urine output: Record vital sign and urine output q 4 hr; keep urine pH > 7 and urine output > 100 ml/hr — D1
- Methotrexate 3000 mg/m2 ใน D5W 500 mL IV drip in 3 hr — D1 (note: CrCl 30-60 mL/min: 50% ของขนาดยา; CrCl <30 mL/min: งดยา; TB 3.1-5 mg/dL หรือ AST >180 U/L: 75% ของขนาดยา; TB >5 mg/dL: งดยา)
- Leucovorin 30 mg/m2 ใน D5W 20 mL IV push q 12 hr — เริ่ม D2 [เริ่มให้ 12 hr หลัง MTX หมด หยุดให้ เมื่อ MTX level < 0.05 μmol/L] (note: Leucovorin 50 mg IV q 6 hours if MTX > 20 μmol/L at 0 hours, or > 1.0 μmol/L at 24 hours, or > 0.1 μmol/L at 48 hours after the end of MTX infusion)
- L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV drip in 4 hr — D2, D4, D6, D8 [ดูคำแนะนำ L-asparaginase (ผสม 10,000 IU in NSS 2 ml IM ได้)]
- Dexamethasone (4 mg): 5 tabs oral bid pc #40 tabs — D1 ถึง D4
- Filgrastim: (……………®) ○ 300 μg ○ 480 μg SC OD — เริ่มวันที่……

**DDGP regimen** — abbr `DDGP`, IPD — _Siriraj order 2025 p.165_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid ☐ Ferritin, triglyceride; ☐ PT, APTT, fibrinogen, D-dimer ☐ EBV viral load; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาแพทย์ ENT ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC, PT, aPTT, fibrinogen — D4, D7
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin < 8 g/dL; ให้ LPPC/SDP ถ้า platelet count < 20,000/mm3; เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3°C (และ ANC < 500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ L-asparaginase: เตรียม adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้; กรณีเกิด severe allergic reaction ให้หยุดยาทันทีและให้ hydrocortisone IV, chlorpheniramine IV; กรณีเกิด anaphylaxis ให้หยุดยาทันทีและให้ adrenaline IV; L-asparaginase ผสม 10,000 IU in NSS 2 ml IM ได้; การให้ L-asparaginase วันแรก: Record V/S q 15 min x 2 จากนั้น q 30 min x 2 จากนั้น q 1 hr จนยาหมด ถ้า BP < 90/60 mmHg หยุดยาและรายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง — วันที่ให้ L-asparaginase
- Sandwich CMT-RT (early stage): กรณีที่ใช้รักษาใน early stage ให้การรักษาเป็น sandwich CMT-RT: Rx cycle 1 (wk 1-3) → Rx cycle 2 (wk 1-3) → RT 50-56 Gy 25-28 Fr (wk 1-6) → พัก 4 wk → Rx cycle 3 (wk 1-3) → Rx cycle 4 (wk 1-3) — ตามแผนการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1
- Dexamethasone 15 mg/m2 IV q 12 hr — D1 ถึง D5
- Cisplatin 20 mg/m2 ใน NSS 1,000 mL IV drip in 20 hr — D1 ถึง D4 [คู่กับ 20% Mannitol 100 mL in D5W 1,000 mL IV drip in 20 hr] (note: ไม่มี footnote ปรับขนาด cisplatin พิมพ์ในหน้านี้)
- Gemcitabine 800 mg/m2 ใน NSS 250 mL IV in 30 min — D1 และ D8 (note: ไม่มีคำแนะนำการปรับยาในโรคไต; AST สูงขึ้น: ไม่ต้องปรับขนาดยา; TB สูงขึ้น: 800 mg/m2/day (80%))
- L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV in 2 hr — D1 ถึง D7 [ดูคำแนะนำ L-asparaginase (ผสม 10,000 IU in NSS 2 ml IM ได้)] (note: *modified protocol from Pegaspargase to L-asparaginase)
- Filgrastim: (……………®) ○ 300 μg ○ 480 μg SC OD — เริ่มวันที่…… ถึง ……

**DeVIC regimen** — abbr `DeVIC`, IPD — _Siriraj order 2025 p.166_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid; ☐ Ferritin, triglyceride; ☐ PT, APTT, fibrinogen, D-dimer; ☐ EBV viral load; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาแพทย์ ENT ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin < 8 g/dL; ให้ LPPC/SDP ถ้า platelet count < 20,000/mm3; เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3°C (และ ANC < 500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Concurrent RT-DeVIC schedule: Week 1-9: RT over 5 weeks (50-50.4 Gy) ใน week 1-5; DeVIC cycle 1 week 1, cycle 2 week 4, cycle 3 week 7 — ตามแผนการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D3
- Dexamethasone: 20 mg IV q 12 hr — D1 ถึง D3
- Etoposide 67 mg/m2/day ใน NSS 500 mL IV drip in 2 hr — D1 ถึง D3 (note: CrCl 15-50 mL/min: 75% ของขนาดยา; CrCl <15 mL/min: งดยา; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50% ของขนาดยา; TB >3 mg/dL หรือ AST >180 U/L: งดยา)
- Ifosfamide 1000 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D1 ถึง D3 [ผสมรวมกับ Mesna (1,000 mg/m2/day) ในขวดเดียวกัน] (note: CrCl 46-60 mL/min: 80% ของขนาดยา; CrCl 31-45 mL/min: 75% ของขนาดยา; CrCl 10-30 mL/min: 70% ของขนาดยา; CrCl <10 mL/min: งดยา; ไม่มีคำแนะนำการปรับยาในโรคตับ)
- Mesna 1000 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D1 ถึง D3 [ผสมรวมกับ Ifosfamide ในขวดเดียวกัน]
- Carboplatin 200 mg/m2 (max 800 mg) ใน D5W 250 mL IV drip in 1 hr — D1 [max 800 mg] (note: ปรับขนาดยาตาม AUC (AUC 5-7) ในโรคไต; CrCl <30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Filgrastim: (……………®) ○ 300 μg ○ 480 μg SC OD — เริ่มวันที่…… ถึง ……

**GELAD regimen** — abbr `GELAD`, IPD — _Siriraj order 2025 p.167_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid ☐ Ferritin, triglyceride; ☐ PT, APTT, fibrinogen, D-dimer ☐ EBV viral load; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาแพทย์ ENT ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC, PT, aPTT, fibrinogen — D4, D7
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin < 8 g/dL; ให้ LPPC/SDP ถ้า platelet count < 20,000/mm3; เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3°C (และ ANC < 500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ L-asparaginase: เตรียม adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้; กรณีเกิด severe allergic reaction ให้หยุดยาทันทีและให้ hydrocortisone IV, chlorpheniramine IV; กรณีเกิด anaphylaxis ให้หยุดยาทันทีและให้ adrenaline IV; L-asparaginase ผสม 10,000 IU in NSS 2 ml IM ได้; การให้ L-asparaginase วันแรก: Record V/S q 15 min x 2 จากนั้น q 30 min x 2 จากนั้น q 1 hr จนยาหมด ถ้า BP < 90/60 mmHg หยุดยาและรายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง — วันที่ให้ L-asparaginase
- Sandwich CMT-RT (early stage): กรณีที่ใช้รักษาใน early stage ให้การรักษาเป็น sandwich CMT-RT: Rx cycle 1 (wk 1-3) → Rx cycle 2 (wk 1-3) → RT 50-56 Gy 25-28 Fr (wk 1-6) → พัก 4 wk → Rx cycle 3 (wk 1-3) → Rx cycle 4 (wk 1-3) — ตามแผนการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1
- Gemcitabine 1000 mg/m2 ใน NSS 250 mL IV in 30 min — D1 (note: ไม่มีคำแนะนำการปรับยาในโรคไต; AST สูงขึ้น: ไม่ต้องปรับขนาดยา; TB สูงขึ้น: 800 mg/m2/day (80%))
- Etoposide 60 mg/m2 ใน NSS 500 mL IV drip in 2 hr — D1 ถึง D3 (note: CrCl 15-50 mL/min: 75%; CrCl <15 mL/min: งดใช้ยา; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50%; TB >3 mg/dL หรือ AST >180 U/L: งดใช้ยา)
- L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV in 2 hr — D1 ถึง D7 [ดูคำแนะนำ L-asparaginase (ผสม 10,000 IU in NSS 2 ml IM ได้)] (note: *modified protocol from Pegaspargase to L-asparaginase)
- Dexamethasone: 20 mg IV q 12 hr — D1 ถึง D4
- Filgrastim: (……………®) ○ 300 μg ○ 480 μg SC OD — เริ่มวันที่…… ถึง ……

**GELOX regimen** — abbr `GELOX`, IPD — _Siriraj order 2025 p.168_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid ☐ Ferritin, triglyceride; ☐ PT, APTT, fibrinogen, D-dimer ☐ EBV viral load; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาแพทย์ ENT ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC, PT, aPTT, fibrinogen — D4, D7
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin < 8 g/dL; ให้ LPPC/SDP ถ้า platelet count < 20,000/mm3; เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3°C (และ ANC < 500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ L-asparaginase: เตรียม adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้; กรณีเกิด severe allergic reaction ให้หยุดยาทันทีและให้ hydrocortisone IV, chlorpheniramine IV; กรณีเกิด anaphylaxis ให้หยุดยาทันทีและให้ adrenaline IV; L-asparaginase ผสม 10,000 IU in NSS 2 ml IM ได้; การให้ L-asparaginase วันแรก: Record V/S q 15 min x 2 จากนั้น q 30 min x 2 จากนั้น q 1 hr จนยาหมด ถ้า BP < 90/60 mmHg หยุดยาและรายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง — วันที่ให้ L-asparaginase
- Sandwich CMT-RT (early stage): กรณีที่ใช้รักษาใน early stage ให้การรักษาเป็น sandwich CMT-RT: Rx cycle 1 (wk 1-3) → Rx cycle 2 (wk 1-3) → RT 56 Gy 28 Fr (wk 1-6) → พัก 1 wk → Rx cycle 3 (wk 1-3) → Rx cycle 4 (wk 1-3) → (cycle 5) → (cycle 6) — ตามแผนการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D8
- Gemcitabine 1000 mg/m2 ใน NSS 250 mL IV in 30 min — D1 และ D8 (note: ไม่มีคำแนะนำการปรับยาในโรคไต; AST สูงขึ้น: ไม่ต้องปรับขนาดยา; TB สูงขึ้น: 800 mg/m2/day (80%))
- Oxaliplatin 130 mg/m2 ใน D5W 250 mL IV in 3 hr — D1 (note: CrCl <30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV in 2 hr — D1 ถึง D7 [ดูคำแนะนำ L-asparaginase (ผสม 10,000 IU in NSS 2 ml IM ได้)] (note: *P-GEMOX คือ protocol ที่เปลี่ยนจาก GELOX โดยปรับ L-asparaginase เป็น Pegaspargase และปรับขนาดยา gemcitabine & oxaliplatin ในกรณีที่แพ้ L-asparaginase)
- Filgrastim: (……………®) ○ 300 μg ○ 480 μg SC OD — เริ่มวันที่…… ถึง ……

**SMILE regimen** — abbr `SMILE`, IPD — _Siriraj order 2025 p.169_
- Lab D1: D0 = ……, D1 = ……; CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid ☐ Ferritin, triglyceride; ☐ PT, APTT, fibrinogen, D-dimer ☐ EBV viral load; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาแพทย์ ENT ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC, PT, aPTT, fibrinogen — D4, D7, D10, D13, D15, D17, D19, D21
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin < 8 g/dL; ให้ LPPC/SDP ถ้า platelet count < 20,000/mm3; เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3°C (และ ANC <500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษาโดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Record V/S and urine output: Record V/S and urine output q 4 hr; Keep urine pH >7 and urine output > 100 mL/hr — D0 ถึง D1
- คำแนะนำ L-asparaginase: L-asparaginase ผสม 10,000 IU in NSS 2 ml IM ได้; การให้ L-asparaginase วันแรก: Record V/S q 15 min x 2 จากนั้น q 30 min x 2 จากนั้น q 1 hr จนยาหมด ถ้า BP < 90/60 mmHg หยุดยาและรายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง; เตรียม adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้; กรณีเกิด severe allergic reaction ให้หยุดยาทันทีและให้ hydrocortisone IV, chlorpheniramine IV; กรณีเกิด anaphylaxis ให้หยุดยาทันทีและให้ adrenaline IV — วันที่ให้ L-asparaginase
- MTX level: MTX level OD จนกว่า < 0.05 μmol/L — เริ่ม D3 (48 hr หลังเริ่มยา)
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- งดให้ยา omeprazole และ co-trimoxazole: งดให้ยา omeprazole และ co-trimoxazole — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — ……
- Prehydration / urine alkalinisation: D5W 1,000 mL + 7.5% NaHCO3 100 mL IV drip 120 ml/hr เริ่มก่อนให้ methotrexate อย่างน้อย 12 hr, ระหว่างให้ methotrexate อยู่ ให้ลด rate IV เหลือ 100 ml/hr และหยุดหลังจาก methotrexate หมดครบ 48 hr จากนั้นดื่มน้ำ > 2,000 mL/day (พิจารณา ลด rate IV ในผู้ป่วยอายุมาก, โรคหัวใจ และอื่นๆ) — D0
- Methotrexate 2000 mg/m2 ใน D5W 1,000 mL + 7.5% NaHCO3 100 mL IV in 6 hr — D1 (note: CrCl 30-60 mL/min: 50% ของขนาดยา; CrCl <30 mL/min: งดยา; TB 3.1-5 mg/dL หรือ AST >180 U/L: 75% ของขนาดยา; TB >5 mg/dL: งดยา)
- Leucovorin 30 mg/m2 ใน D5W 20 mL IV push q 12 hr — เริ่ม D2 [เริ่มให้ 12 hr หลัง MTX หมด หยุดให้ เมื่อ MTX level < 0.05 μmol/L] (note: Leucovorin 50 mg IV q 6 hours if MTX >20 μmol/L at 0 hours, or >1.0 μmol/L at 24 hours, or >0.1 μmol/L at 48 hours after the end of MTX infusion)
- Dexamethasone: 20 mg IV q 12 hr — D2 ถึง D4
- Ifosfamide 1500 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D2 ถึง D4 [ผสมรวมกับ Mesna (1,500 mg/m2/day) ในขวดเดียวกัน] (note: CrCl 46-60 mL/min: 80% ของขนาดยา; CrCl 31-45 mL/min: 75% ของขนาดยา; CrCl 10-30 mL/min: 70% ของขนาดยา; CrCl <10 mL/min: งดยา; ไม่มีคำแนะนำการปรับยาในโรคตับ)
- Mesna 1500 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D2 ถึง D4 [ผสมรวมกับ Ifosfamide ในขวดเดียวกัน]
- Etoposide 100 mg/m2/day ใน NSS 500 mL IV drip in 2 hr — D2 ถึง D4 (note: CrCl 15-50 mL/min: 75% ของขนาดยา; CrCl <15 mL/min: งดยา; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50% ของขนาดยา; TB >3 mg/dL หรือ AST >180 U/L: งดยา)
- L-asparaginase 6000 IU/m2 ใน NSS 500 mL IV in 2 hr — D8, D10, D12, D14, D16, D18, D20 [ดูคำแนะนำ L-asparaginase (ผสม 10,000 IU in NSS 2 ml IM ได้)] (note: *Modified SMILE คือ protocol SMILE ที่ปรับ L-asparaginase เป็น Pegaspargase)
- Filgrastim: (……………®) ○ 300 μg ○ 480 μg SC OD — เริ่ม D……

**VIDL regimen** — abbr `VIDL`, IPD — _Siriraj order 2025 p.170_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid ☐ Ferritin, triglyceride; ☐ PT, APTT, fibrinogen, D-dimer ☐ EBV viral load; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาแพทย์ ENT ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC D5, D8; CBC, PT, aPTT, fibrinogen D11, D14, D17, D20 — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin < 8 g/dL; ให้ LPPC/SDP ถ้า platelet count < 20,000/mm3; เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3°C (และ ANC < 500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ L-asparaginase: เตรียม adrenaline 1 amp, chlorpheniramine 10 mg, hydrocortisone 100 mg ไว้; กรณีเกิด severe allergic reaction ให้หยุดยาทันทีและให้ hydrocortisone IV, chlorpheniramine IV; กรณีเกิด anaphylaxis ให้หยุดยาทันทีและให้ adrenaline IV; L-asparaginase ผสม 10,000 IU in NSS 2 ml IM ได้; การให้ L-asparaginase วันแรก: Record V/S q 15 min x 2 จากนั้น q 30 min x 2 จากนั้น q 1 hr จนยาหมด ถ้า BP < 90/60 mmHg หยุดยาและรายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง — วันที่ให้ L-asparaginase
- CCRT ก่อน VIDL (schematic): Week 1-4: CRCLT 1.8-2 Gy/day + weekly Cisplatin 30 mg/m2 (3-5 wk) → VIDL cycle 1 week 1, cycle 2 week 4 — ตามแผนการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D3
- Ifosfamide 1200 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D1 ถึง D3 [ผสมรวมกับ Mesna (1,200 mg/m2/day) ในขวดเดียวกัน] (note: CrCl 46-60 mL/min: 80% ของขนาดยา; CrCl 31-45 mL/min: 75% ของขนาดยา; CrCl 10-30 mL/min: 70% ของขนาดยา; CrCl <10 mL/min: งดยา; ไม่มีคำแนะนำการปรับยาในโรคตับ)
- Mesna 1200 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D1 ถึง D3 [ผสมรวมกับ Ifosfamide ในขวดเดียวกัน]
- Etoposide 100 mg/m2/day ใน NSS 500 mL IV drip in 2 hr — D1 ถึง D3 (note: CrCl 15-50 mL/min: 75% ของขนาดยา; CrCl <15 mL/min: งดยา; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50% ของขนาดยา; TB >3 mg/dL หรือ AST >180 U/L: งดยา)
- Dexamethasone (4 mg): 5 tabs oral bid pc #30 tabs — D1 ถึง D3
- L-asparaginase 4000 IU/m2 ใน NSS 500 mL IV in 2 hr — D8, D10, D12, D14, D16, D18, D20 [ดูคำแนะนำ L-asparaginase (ผสม 10,000 IU in NSS 2 ml IM ได้)]
- Filgrastim: (……………®) ○ 300 μg ○ 480 μg SC OD — เริ่มวันที่…… ถึง ……

**VIPD regimen** — abbr `VIPD`, IPD — _Siriraj order 2025 p.171_
- Lab D1: CBC, BUN, Cr, LFT, LDH; ☐ Electrolyte, Ca, PO4, uric acid ☐ Ferritin, triglyceride; ☐ PT, APTT, fibrinogen, D-dimer ☐ EBV viral load; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาแพทย์ ENT ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin < 8 g/dL; ให้ LPPC/SDP ถ้า platelet count < 20,000/mm3; เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3°C (และ ANC < 500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- CCRT ก่อน VIPD (schematic): Week 1-4: CRCLT 1.8-2 Gy/day + weekly Cisplatin 30 mg/m2 (3-5 wk) → VIPD cycle 1 week 1, cycle 2 week 4, cycle 3 week 7 — ตามแผนการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D3
- Ifosfamide 1200 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D1 ถึง D3 [ผสมรวมกับ Mesna (1,200 mg/m2/day) ในขวดเดียวกัน] (note: CrCl 46-60 mL/min: 80% ของขนาดยา; CrCl 31-45 mL/min: 75% ของขนาดยา; CrCl 10-30 mL/min: 70% ของขนาดยา; CrCl <10 mL/min: งดยา; ไม่มีคำแนะนำการปรับยาในโรคตับ)
- Mesna 1200 mg/m2/day ใน NSS 250 mL IV drip in 2 hr — D1 ถึง D3 [ผสมรวมกับ Ifosfamide ในขวดเดียวกัน]
- Cisplatin 33 mg/m2/day ใน NSS 1,000 mL IV drip in 20 hr — D1 ถึง D3 [คู่กับ 20% Mannitol 100 mL in D5W 1,000 mL IV drip in 20 hr] (note: CrCl 46-60 mL/min: 50% ของขนาดยา; CrCl 31-45 mL/min: 25% ของขนาดยา; CrCl <30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Etoposide 100 mg/m2/day ใน NSS 500 mL IV drip in 2 hr — D1 ถึง D3 (note: CrCl 15-50 mL/min: 75% ของขนาดยา; CrCl <15 mL/min: งดยา; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50% ของขนาดยา; TB >3 mg/dL หรือ AST >180 U/L: งดยา)
- Dexamethasone (4 mg): 5 tabs oral bid pc #40 tabs — D1 ถึง D4
- Filgrastim: (……………®) ○ 300 μg ○ 480 μg SC OD — เริ่มวันที่…… ถึง ……

### Myeloma

**Dara-Vd regimen (D-Vd)** — abbr `D-Vd`, OPD, cycle 21 วัน (ตาราง 3 สัปดาห์) — _Siriraj order 2025 p.173_
- Lab D1: CBC, BUN, Cr, LFT, total Ca, LDH; ☐ เจาะเลือดใส่ EDTA tube 6 mL ส่ง ABO & Rh blood group, antibody screening test, DAT, red cell phenotyping ก่อนให้ยาครั้งแรก; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- คำสั่งพยาบาล: ให้คำแนะนำเกี่ยวกับการวินิจฉัยโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ Daratumumab infusion: การให้ยาครั้งแรก ผสม NSS 1000 mL เริ่ม rate 50 mL/hr; ครั้งที่ 2 ผสม NSS 500 mL เริ่ม rate 50 mL/hr; ครั้งที่ 3 เป็นต้นไป ผสม NSS 500 mL เริ่ม rate 100 mL/hr; เพิ่ม rate ทีละ 50 mL/hr ทุก 1 ชั่วโมง จนถึง 200 mL/hr; * หากเกิด IRRs ในครั้งก่อน ให้พิจารณาปรับ NSS และปรับ rate ตามคำแนะนำ — ทุกครั้งที่ให้ Daratumumab
- Record vital signs / IRR: Record vital signs q 15 min x 4 then q 30 min x 2 then q 1 hr until completion of infusion; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½ - 1 hr หลังจากสิ้นสุดการให้ยา — ทุกครั้งที่ให้ Daratumumab
- ตารางการให้ยา (schedule): Cycle 1-3: Daratumumab D1, D8, D15 (ทุกสัปดาห์); Bortezomib D1, D4, D8, D11; Dexamethasone D1-2, D4-5, D8-9, D11-12. Cycle 4-8: Daratumumab D1 (ทุก 3 สัปดาห์); Bortezomib D1, D4, D8, D11; Dexamethasone เหมือนเดิม. Cycle ≥9: Daratumumab D1 (ทุก 4 สัปดาห์) — ตลอดการรักษา
- Dexamethasone (premedication): 20 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15
- Paracetamol (500 mg) (premedication): 2 tabs oral ก่อนให้ยา 30 นาที — D1, D8, D15
- Chlorpheniramine (premedication): 10 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15
- Daratumumab 16 mg/kg ใน NSS ☐ 500 mL ☐ 1000 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงที่ 3 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr); ใช้ Vented Paclitaxel infusion set 0.22 um หรือ 0.2 um — D1, D8, D15 [Sig. …… mg] (note: Cycle 1-3 ทุกสัปดาห์ (D1, D8, D15); Cycle 4-8 ทุก 3 สัปดาห์ (D1); Cycle ≥9 ทุก 4 สัปดาห์ (D1); *ในผู้ป่วยที่มีประวัติ COPD ให้พิจารณายาขยายหลอดลมชนิดออกฤทธิ์สั้นและยาว และยาคอร์ติโคสเตียรอยด์ชนิดพ่น หลังการหยุดยา 4 ครั้งแรก; *หากผู้ป่วยไม่เกิด IRRs ที่สำคัญ อาจหยุดยาชนิดพ่นได้)
- ☐ Bortezomib 1.3 mg/m2 SC — D1, D4, D8, D11 [(……………………®) Sig. …… mg SC]
- ☐ Dexamethasone (4 mg): 5 tabs oral OD pc — D2, D4, D5, D8*, D9, D11, D12

**Dara-Rd regimen / Daratumumab monotherapy (D-Rd)** — abbr `D-Rd`, OPD, cycle 28 วัน — _Siriraj order 2025 p.174_
- Lab D1: CBC, BUN, Cr, LFT, total Ca, LDH; ☐ เจาะเลือดใส่ EDTA tube 6 mL ส่ง ABO & Rh blood group, antibody screening test, DAT, red cell phenotyping ก่อนให้ยาครั้งแรก; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- คำสั่งพยาบาล: ให้คำแนะนำเกี่ยวกับการวินิจฉัยโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ Daratumumab infusion: การให้ยาครั้งแรก ผสม NSS 1000 mL เริ่ม rate 50 mL/hr; ครั้งที่ 2 ผสม NSS 500 mL เริ่ม rate 50 mL/hr; ครั้งที่ 3 เป็นต้นไป ผสม NSS 500 mL เริ่ม rate 100 mL/hr; เพิ่ม rate ทีละ 50 mL/hr ทุก 1 ชั่วโมง จนถึง 200 mL/hr; * หากเกิด IRRs ในครั้งก่อน ให้พิจารณาปรับ NSS และปรับ rate ตามคำแนะนำ — ทุกครั้งที่ให้ Daratumumab
- Record vital signs / IRR: Record vital signs q 15 min x 4 then q 30 min x 2 then q 1 hr until completion of infusion; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½ - 1 hr หลังจากสิ้นสุดการให้ยา — ทุกครั้งที่ให้ Daratumumab
- ตารางการให้ยา (schedule): Cycle 1-2: Daratumumab D1, D8, D15, D22 (ทุกสัปดาห์); Lenalidomide D1-D21; Dexamethasone D1, D8, D15, D22. Cycle 3-6: Daratumumab D1, D15 (ทุก 2 สัปดาห์); Lenalidomide D1-D21; Dexamethasone D1, D8, D15, D22. Cycle ≥7: Daratumumab D1 (ทุก 4 สัปดาห์) — ตลอดการรักษา
- Dexamethasone (premedication): 20 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Paracetamol (500 mg) (premedication): 2 tabs oral ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Chlorpheniramine (premedication): 10 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Daratumumab 16 mg/kg ใน NSS ☐ 500 mL ☐ 1000 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงที่ 3 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr); ใช้ Vented Paclitaxel infusion set 0.22 um หรือ 0.2 um — D1, D8, D15, D22 [Sig. …… mg] (note: Cycle 1-2 ทุกสัปดาห์ (D1, D8, D15, D22); Cycle 3-6 ทุก 2 สัปดาห์ (D1, D15); Cycle ≥7 ทุก 4 สัปดาห์ (D1); *ในผู้ป่วยที่มีประวัติ COPD ให้พิจารณายาขยายหลอดลมชนิดออกฤทธิ์สั้นและยาว และยาคอร์ติโคสเตียรอยด์ชนิดพ่น หลังการหยุดยา 4 ครั้งแรก; *หากผู้ป่วยไม่เกิด IRRs ที่สำคัญ อาจหยุดยาชนิดพ่นได้)
- ☐ Lenalidomide (10, 15, 25 mg): (……………………®) …… cap oral OD pc — D1 ถึง D21
- ☐ Dexamethasone (4 mg) (สำหรับ DRd): 5 tabs oral BID pc (สำหรับ DRd) — D1, D8, D15, D22
- ☐ Dexamethasone (4 mg) (สำหรับ Daratumumab monotherapy): 5 tabs oral OD pc (สำหรับ Daratumumab monotherapy) — D2 และ D3

**Dara-Pd regimen (D-Pd)** — abbr `D-Pd`, OPD, cycle 28 วัน — _Siriraj order 2025 p.175_
- Lab D1: CBC, BUN, Cr, LFT, total Ca, LDH; ☐ เจาะเลือดใส่ EDTA tube 6 mL ส่ง ABO & Rh blood group, antibody screening test, DAT, red cell phenotyping ก่อนให้ยาครั้งแรก; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- คำสั่งพยาบาล: ให้คำแนะนำเกี่ยวกับการวินิจฉัยโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ Daratumumab infusion: การให้ยาครั้งแรก ผสม NSS 1000 mL เริ่ม rate 50 mL/hr; ครั้งที่ 2 ผสม NSS 500 mL เริ่ม rate 50 mL/hr; ครั้งที่ 3 เป็นต้นไป ผสม NSS 500 mL เริ่ม rate 100 mL/hr; เพิ่ม rate ทีละ 50 mL/hr ทุก 1 ชั่วโมง จนถึง 200 mL/hr; * หากเกิด IRRs ในครั้งก่อน ให้พิจารณาปรับ NSS และปรับ rate ตามคำแนะนำ — ทุกครั้งที่ให้ Daratumumab
- Record vital signs / IRR: Record vital signs q 15 min x 4 then q 30 min x 2 then q 1 hr until completion of infusion; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½ - 1 hr หลังจากสิ้นสุดการให้ยา — ทุกครั้งที่ให้ Daratumumab
- ตารางการให้ยา (schedule): Cycle 1-2: Daratumumab D1, D8, D15, D22 (ทุกสัปดาห์); Pomalidomide D1-D21; Dexamethasone D1, D8, D15, D22. Cycle 3-6: Daratumumab D1, D15 (ทุก 2 สัปดาห์); Pomalidomide D1-D21; Dexamethasone D1, D8, D15, D22. Cycle ≥7: Daratumumab D1 (ทุก 4 สัปดาห์) — ตลอดการรักษา
- Dexamethasone (premedication): 20 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Paracetamol (500 mg) (premedication): 2 tabs oral ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Chlorpheniramine (premedication): 10 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Daratumumab 16 mg/kg ใน NSS ☐ 500 mL ☐ 1000 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงที่ 3 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr); ใช้ Vented Paclitaxel infusion set 0.22 um หรือ 0.2 um — D1, D8, D15, D22 [Sig. …… mg] (note: Cycle 1-2 ทุกสัปดาห์ (D1, D8, D15, D22); Cycle 3-6 ทุก 2 สัปดาห์ (D1, D15); Cycle ≥7 ทุก 4 สัปดาห์ (D1); *ในผู้ป่วยที่มีประวัติ COPD ให้พิจารณายาขยายหลอดลมชนิดออกฤทธิ์สั้นและยาว และยาคอร์ติโคสเตียรอยด์ชนิดพ่น หลังการหยุดยา 4 ครั้งแรก; *หากผู้ป่วยไม่เกิด IRRs ที่สำคัญ อาจหยุดยาชนิดพ่นได้)
- ☐ Pomalidomide (2, 3, 4 mg): (……………………®) …… cap oral OD pc — D1 ถึง D21
- ☐ Dexamethasone (4 mg): 5 tabs oral BID pc — D1, D8, D15, D22

**Dara-Kd regimen (D-Kd)** — abbr `D-Kd`, OPD, cycle 28 วัน — _Siriraj order 2025 p.176_
- Lab D1: CBC, BUN, Cr, LFT, total Ca, LDH; ☐ เจาะเลือดใส่ EDTA tube 6 mL ส่ง ABO & Rh blood group, antibody screening test, DAT, red cell phenotyping ก่อนให้ยาครั้งแรก; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- คำสั่งพยาบาล: ให้คำแนะนำเกี่ยวกับการวินิจฉัยโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ Daratumumab infusion: การให้ยาครั้งแรก ผสม NSS 1000 mL เริ่ม rate 50 mL/hr; ครั้งที่ 2 ผสม NSS 500 mL เริ่ม rate 50 mL/hr; ครั้งที่ 3 เป็นต้นไป ผสม NSS 500 mL เริ่ม rate 100 mL/hr; เพิ่ม rate ทีละ 50 mL/hr ทุก 1 ชั่วโมง จนถึง 200 mL/hr; * หากเกิด IRRs ในครั้งก่อน ให้พิจารณาปรับ NSS และปรับ rate ตามคำแนะนำ — ทุกครั้งที่ให้ Daratumumab
- Record vital signs / IRR: Record vital signs q 15 min x 4 then q 30 min x 2 then q 1 hr until completion of infusion; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½ - 1 hr หลังจากสิ้นสุดการให้ยา — ทุกครั้งที่ให้ Daratumumab
- ตารางการให้ยา (schedule): Cycle 1-2: Daratumumab D1, D8, D15, D22 (ทุกสัปดาห์); Carfilzomib D1, D8, D15; Dexamethasone D1, D8, D15, D22. Cycle 3-6: Daratumumab D1, D15 (ทุก 2 สัปดาห์); Carfilzomib D1, D8, D15; Dexamethasone D1, D8, D15, D22. Cycle ≥7: Daratumumab D1 (ทุก 4 สัปดาห์) — ตลอดการรักษา
- Dexamethasone (premedication): 20 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Paracetamol (500 mg) (premedication): 2 tabs oral ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Chlorpheniramine (premedication): 10 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Daratumumab 16 mg/kg ใน NSS ☐ 500 mL ☐ 1000 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงที่ 3 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr); ใช้ Vented Paclitaxel infusion set 0.22 um หรือ 0.2 um — D1, D8, D15, D22 [Sig. …… mg] (note: Cycle 1-2 ทุกสัปดาห์ (D1, D8, D15, D22); Cycle 3-6 ทุก 2 สัปดาห์ (D1, D15); Cycle ≥7 ทุก 4 สัปดาห์ (D1); *ในผู้ป่วยที่มีประวัติ COPD ให้พิจารณายาขยายหลอดลมชนิดออกฤทธิ์สั้นและยาว และยาคอร์ติโคสเตียรอยด์ชนิดพ่น หลังการหยุดยา 4 ครั้งแรก; *หากผู้ป่วยไม่เกิด IRRs ที่สำคัญ อาจหยุดยาชนิดพ่นได้)
- ☐ Carfilzomib 20 mg/m2 ใน 5%DW 50 mL IV in 30 min — D1, D8, D15 [ขนาดที่พิมพ์ให้เลือก: 20, 27, 36, 56, 70 mg/m2] (note: ขนาดยาเลือกได้ 20, 27, 36, 56 หรือ 70 mg/m2 (ใส่ค่า 20 เป็นค่าตั้งต้น))
- ☐ Dexamethasone (4 mg): 5 tabs oral BID pc — D1, D8, D15, D22

**Dara-CyBorD regimen (D-VCD)** — abbr `D-VCD`, OPD, cycle 28 วัน — _Siriraj order 2025 p.177_
- Lab D1: CBC, BUN, Cr, LFT, total Ca, LDH; ☐ เจาะเลือดใส่ EDTA tube 6 mL ส่ง ABO & Rh blood group, antibody screening test, DAT, red cell phenotyping ก่อนให้ยาครั้งแรก; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- คำสั่งพยาบาล: ให้คำแนะนำเกี่ยวกับการวินิจฉัยโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ Daratumumab infusion: การให้ยาครั้งแรก ผสม NSS 1000 mL เริ่ม rate 50 mL/hr; ครั้งที่ 2 ผสม NSS 500 mL เริ่ม rate 50 mL/hr; ครั้งที่ 3 เป็นต้นไป ผสม NSS 500 mL เริ่ม rate 100 mL/hr; เพิ่ม rate ทีละ 50 mL/hr ทุก 1 ชั่วโมง จนถึง 200 mL/hr; * หากเกิด IRRs ในครั้งก่อน ให้พิจารณาปรับ NSS และปรับ rate ตามคำแนะนำ — ทุกครั้งที่ให้ Daratumumab
- Record vital signs / IRR: Record vital signs q 15 min x 4 then q 30 min x 2 then q 1 hr until completion of infusion; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½ - 1 hr หลังจากสิ้นสุดการให้ยา — ทุกครั้งที่ให้ Daratumumab
- ตารางการให้ยา (schedule): Cycle 1-2: Daratumumab D1, D8, D15, D22 (ทุกสัปดาห์); VCD D1, D8, D15, D22. Cycle 3-6: Daratumumab D1, D15 (ทุก 2 สัปดาห์); VCD D1, D8, D15, D22. Then 1-24: Daratumumab D1 (ทุก 4 สัปดาห์) — ตลอดการรักษา
- Dexamethasone (premedication): 20 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Paracetamol (500 mg) (premedication): 2 tabs oral ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Chlorpheniramine (premedication): 10 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Daratumumab 16 mg/kg ใน NSS ☐ 500 mL ☐ 1000 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงที่ 3 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr); ใช้ Vented Paclitaxel infusion set 0.22 um หรือ 0.2 um — D1, D8, D15, D22 [Sig. …… mg] (note: Cycle 1-2 ทุกสัปดาห์ (D1, D8, D15, D22); Cycle 3-6 ทุก 2 สัปดาห์ (D1, D15); Then 1-24 ทุก 4 สัปดาห์ (D1); *ในผู้ป่วยที่มีประวัติ COPD ให้พิจารณายาขยายหลอดลมชนิดออกฤทธิ์สั้นและยาว และยาคอร์ติโคสเตียรอยด์ชนิดพ่น หลังการหยุดยา 4 ครั้งแรก; *หากผู้ป่วยไม่เกิด IRRs ที่สำคัญ อาจหยุดยาชนิดพ่นได้)
- ☐ Cyclophosphamide (50 mg) 300 mg/m2 oral (Sig. ……) — D1, D8, D15, D22 [ยาเม็ด 50 mg; Sig. ……………………]
- ☐ Bortezomib 1.3 mg/m2 SC — D1, D8, D15, D22 [(……………………®) Sig. …… mg SC]
- ☐ Dexamethasone (4 mg) (40 mg/wk) สัปดาห์ที่ได้ Daratumumab: 5 tabs po OD pc (สำหรับสัปดาห์ที่ได้ Daratumumab) — D2, D9, D16, D23
- ☐ Dexamethasone (4 mg) (40 mg/wk) สัปดาห์ที่ไม่ได้ Daratumumab: 5 tabs po bid pc (สำหรับสัปดาห์ที่ไม่ได้ Daratumumab) — D1, D8, D15, D22

**Dara-VMP regimen (D-VMP)** — abbr `D-VMP`, OPD, cycle 42 วัน (6 สัปดาห์) — _Siriraj order 2025 p.178_
- Lab D1: CBC, BUN, Cr, LFT, total Ca, LDH; ☐ เจาะเลือดใส่ EDTA tube 6 mL ส่ง ABO & Rh blood group, antibody screening test, DAT, red cell phenotyping ก่อนให้ยาครั้งแรก; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- คำสั่งพยาบาล: ให้คำแนะนำเกี่ยวกับการวินิจฉัยโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ Daratumumab infusion: การให้ยาครั้งแรก ผสม NSS 1000 mL เริ่ม rate 50 mL/hr; ครั้งที่ 2 ผสม NSS 500 mL เริ่ม rate 50 mL/hr; ครั้งที่ 3 เป็นต้นไป ผสม NSS 500 mL เริ่ม rate 100 mL/hr; เพิ่ม rate ทีละ 50 mL/hr ทุก 1 ชั่วโมง จนถึง 200 mL/hr; * หากเกิด IRRs ในครั้งก่อน ให้พิจารณาปรับ NSS และปรับ rate ตามคำแนะนำ — ทุกครั้งที่ให้ Daratumumab
- Record vital signs / IRR: Record vital signs q 15 min x 4 then q 30 min x 2 then q 1 hr until completion of infusion; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½ - 1 hr หลังจากสิ้นสุดการให้ยา — ทุกครั้งที่ให้ Daratumumab
- ตารางการให้ยา (schedule): Cycle 1: Daratumumab D1, D8, D15, D22, D29, D36 (ทุกสัปดาห์); Bortezomib D1, D4, D8, D11, D22, D25, D29, D32; Melphalan + Prednisolone D1-D4. Cycle 2-9: Daratumumab D1, D22 (ทุก 3 สัปดาห์); Bortezomib D1, D8, D22, D29; Melphalan + Prednisolone D1-D4. Cycle ≥10: Daratumumab D1 (ทุก 4 สัปดาห์) — ตลอดการรักษา
- Dexamethasone (premedication): 20 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22, D29, D36
- Paracetamol (500 mg) (premedication): 2 tabs oral ก่อนให้ยา 30 นาที — D1, D8, D15, D22, D29, D36
- Chlorpheniramine (premedication): 10 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22, D29, D36
- Daratumumab 16 mg/kg ใน NSS ☐ 500 mL ☐ 1000 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงที่ 3 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr); ใช้ Vented Paclitaxel infusion set 0.22 um หรือ 0.2 um — D1, D8, D15, D22, D29, D36 [Sig. …… mg] (note: Cycle 1 ทุกสัปดาห์ (D1, D8, D15, D22, D29, D36); Cycle 2-9 ทุก 3 สัปดาห์ (D1, D22); Cycle ≥10 ทุก 4 สัปดาห์ (D1); *ในผู้ป่วยที่มีประวัติ COPD ให้พิจารณายาขยายหลอดลมชนิดออกฤทธิ์สั้นและยาว และยาคอร์ติโคสเตียรอยด์ชนิดพ่น หลังการหยุดยา 4 ครั้งแรก; *หากผู้ป่วยไม่เกิด IRRs ที่สำคัญ อาจหยุดยาชนิดพ่นได้)
- Dexamethasone (4 mg) (ใน cycle 1): 1 tab oral OD pc (ใน cycle 1) — ☐ D2, D3 ☐ D9, D10
- ☐ Bortezomib* 1.3 mg/m2 SC — ☐ D1, D8, D22, D29 ☐ D1, D4, D8, D11, D22, D25, D29, D32 [Sig. …… mg SC] (note: เลือกตารางวัน: ทุกสัปดาห์ (cycle 2-9) หรือ 2 ครั้ง/สัปดาห์ (cycle 1))
- ☐ Melphalan (2 mg) 9 mg/m2 oral (Sig. ……) — D1 ถึง D4 [ยาเม็ด 2 mg; Sig. ……………………] (note: ให้เฉพาะใน week 1 C1-9)
- ☐ Prednisolone (5 mg) 60 mg/m2 oral (Sig. ……) — D1 ถึง D4 [ยาเม็ด 5 mg; Sig. ……………………] (note: ให้เฉพาะใน week 1 C1-9)

**Dara-VTd regimen (D-VTd)** — abbr `D-VTd`, OPD, cycle 28 วัน — _Siriraj order 2025 p.179_
- Lab D1: CBC, BUN, Cr, LFT, total Ca, LDH; ☐ เจาะเลือดใส่ EDTA tube 6 mL ส่ง ABO & Rh blood group, antibody screening test, DAT, red cell phenotyping ก่อนให้ยาครั้งแรก; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- คำสั่งพยาบาล: ให้คำแนะนำเกี่ยวกับการวินิจฉัยโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ Daratumumab infusion: การให้ยาครั้งแรก ผสม NSS 1000 mL เริ่ม rate 50 mL/hr; ครั้งที่ 2 ผสม NSS 500 mL เริ่ม rate 50 mL/hr; ครั้งที่ 3 เป็นต้นไป ผสม NSS 500 mL เริ่ม rate 100 mL/hr; เพิ่ม rate ทีละ 50 mL/hr ทุก 1 ชั่วโมง จนถึง 200 mL/hr; * หากเกิด IRRs ในครั้งก่อน ให้พิจารณาปรับ NSS และปรับ rate ตามคำแนะนำ — ทุกครั้งที่ให้ Daratumumab
- Record vital signs / IRR: Record vital signs q 15 min x 4 then q 30 min x 2 then q 1 hr until completion of infusion; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½ - 1 hr หลังจากสิ้นสุดการให้ยา — ทุกครั้งที่ให้ Daratumumab
- ตารางการให้ยา (schedule): Cycle 1-2: Daratumumab D1, D8, D15, D22 (ทุกสัปดาห์); Bortezomib D1, D4, D8, D11; Thalidomide D1-D28; Dexamethasone D1-2, D8-9, D15-16, D22-23. Cycle 3-4 และ post ASCT consolidation: Daratumumab D1, D15 (ทุก 2 สัปดาห์); Bortezomib D1, D4, D8, D11; Thalidomide D1-D28; Dexamethasone D1-2, D8-9, D15-16, D22-23. Maintenance (max 2 yr): Daratumumab D1 (ทุก 4 สัปดาห์) — ตลอดการรักษา
- Dexamethasone (premedication): 20 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Paracetamol (500 mg) (premedication): 2 tabs oral ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Chlorpheniramine (premedication): 10 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Daratumumab 16 mg/kg ใน NSS ☐ 500 mL ☐ 1000 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงที่ 3 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr); ใช้ Vented Paclitaxel infusion set 0.22 um หรือ 0.2 um — D1, D8, D15, D22 [Sig. …… mg] (note: Cycle 1-2 ทุกสัปดาห์ (D1, D8, D15, D22); Cycle 3-4 และ post ASCT consolidation ทุก 2 สัปดาห์ (D1, D15); MT (max 2 yr) ทุก 4 สัปดาห์ (D1); *ในผู้ป่วยที่มีประวัติ COPD ให้พิจารณายาขยายหลอดลมชนิดออกฤทธิ์สั้นและยาว และยาคอร์ติโคสเตียรอยด์ชนิดพ่น หลังการหยุดยา 4 ครั้งแรก; *หากผู้ป่วยไม่เกิด IRRs ที่สำคัญ อาจหยุดยาชนิดพ่นได้)
- ☐ Bortezomib 1.3 mg/m2 SC — D1, D4, D8, D11 [(……………………®) Sig. …… mg SC]
- ☐ Thalidomide (50 mg): 2 tabs po OD hs — D1 ถึง D28
- ☐ Dexamethasone (4 mg) (40 mg/d in C1-C2): 5 tabs po OD pc D1, D8, D15, D22 + 5 tabs po bid pc D2, D9, D16, D23 — D1, D8, D15, D22 + D2, D9, D16, D23
- ☐ Dexamethasone (4 mg) (20 mg/d in other cycle): 5 tabs po OD pc — D2, D8, D9, D16, D22, D23

**Dara-VRd regimen (modified D-VRd)** — abbr `mod D-VRd`, OPD, cycle 28 วัน (C1-C6) — _Siriraj order 2025 p.180_
- Lab D1: CBC, BUN, Cr, LFT, total Ca, LDH; ☐ เจาะเลือดใส่ EDTA tube 6 mL ส่ง ABO & Rh blood group, antibody screening test, DAT, red cell phenotyping ก่อนให้ยาครั้งแรก; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- คำสั่งพยาบาล: ให้คำแนะนำเกี่ยวกับการวินิจฉัยโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัดพร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- คำแนะนำ Daratumumab infusion: การให้ยาครั้งแรก ผสม NSS 1000 mL เริ่ม rate 50 mL/hr; ครั้งที่ 2 ผสม NSS 500 mL เริ่ม rate 50 mL/hr; ครั้งที่ 3 เป็นต้นไป ผสม NSS 500 mL เริ่ม rate 100 mL/hr; เพิ่ม rate ทีละ 50 mL/hr ทุก 1 ชั่วโมง จนถึง 200 mL/hr; * หากเกิด IRRs ในครั้งก่อน ให้พิจารณาปรับ NSS และปรับ rate ตามคำแนะนำ — ทุกครั้งที่ให้ Daratumumab
- Record vital signs / IRR: Record vital signs q 15 min x 4 then q 30 min x 2 then q 1 hr until completion of infusion; ถ้าผู้ป่วยมีอาการ ไข้ หนาวสั่น ความดันเลือดลดลง หยุดยาทันที รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง สังเกตอาการและบันทึก vital signs จนปกติ จึงเริ่มให้ยาใหม่ได้ในขนาด ½ ของปริมาณยาก่อนหยุด; พิจารณาให้ยา Chlorpheniramine 10 mg IV ในรายที่พบ chill & urticaria, Dexamethasone 10 mg IV ในรายที่มีอาการรุนแรง; เฝ้าติดตามผู้ป่วยต่ออีกเป็นเวลา ½ - 1 hr หลังจากสิ้นสุดการให้ยา — ทุกครั้งที่ให้ Daratumumab
- ตารางการให้ยา (schedule): Cycle 1-4: Daratumumab D1, D8, D15, D22 (ทุกสัปดาห์); Bortezomib D1, D8, D15, D22; Lenalidomide 25 mg D1-D21; Dexamethasone D1-2, D8-9, D15-16, D22-23. Cycle 5-6 (post ASCT consolidation): Daratumumab D1, D15; Bortezomib D1, D8, D15, D22; Lenalidomide 25 mg D1-D21; Dexamethasone เหมือนเดิม. C7-9 MT: Daratumumab D1; Lenalidomide 10 mg D1-D21. C10-32 MT: Daratumumab D1; Lenalidomide 15 mg D1-D21. *modified D-VRd – ปรับจาก 3-week/cycle to 4-week/cycle in C1-C6, Daratumumab D1,8,15 to D1,8,15,22 in C1-C4, Bortezomib D1,4,8,11 to D1,8,15,22 in C1-C6 — ตลอดการรักษา
- Dexamethasone (premedication): 20 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Paracetamol (500 mg) (premedication): 2 tabs oral ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Chlorpheniramine (premedication): 10 mg IV ก่อนให้ยา 30 นาที — D1, D8, D15, D22
- Daratumumab 16 mg/kg ใน NSS ☐ 500 mL ☐ 1000 mL IV infusion (ชั่วโมงที่ 1 rate …… mL/hr, ชั่วโมงที่ 2 rate …… mL/hr, ชั่วโมงที่ 3 rate …… mL/hr, ชั่วโมงต่อไป rate …… mL/hr); ใช้ Vented Paclitaxel infusion set 0.22 um หรือ 0.2 um — D1, D8, D15, D22 [Sig. …… mg] (note: Cycle 1-4 ทุกสัปดาห์ (D1, D8, D15, D22); Cycle 5-6 (post ASCT consolidation) ทุก 2 สัปดาห์ (D1, D15); C7-32 MT ทุก 4 สัปดาห์ (D1); *ในผู้ป่วยที่มีประวัติ COPD ให้พิจารณายาขยายหลอดลมชนิดออกฤทธิ์สั้นและยาว และยาคอร์ติโคสเตียรอยด์ชนิดพ่น หลังการหยุดยา 4 ครั้งแรก; *หากผู้ป่วยไม่เกิด IRRs ที่สำคัญ อาจหยุดยาชนิดพ่นได้)
- ☐ Bortezomib 1.3 mg/m2 SC — D1, D8, D15, D22 [(……………………®) Sig. …… mg SC]
- ☐ Lenalidomide (10, 15, 25 mg): (……………………®) …… cap oral OD pc — D1 ถึง D21
- ☐ Dexamethasone (4 mg) (40 mg/d in C1-C2): 5 tabs po OD pc D1, D8, D15, D22 + 5 tabs po bid pc D2, D9, D16, D23 — D1, D8, D15, D22 + D2, D9, D16, D23
- ☐ Dexamethasone (4 mg) (20 mg/d in other cycle): 5 tabs po OD pc — D2, D8, D9, D15, D16, D22, D23

**DT-PACE regimen** — abbr `DT-PACE`, IPD, cycle 28 วัน — _Siriraj order 2025 p.183_
- การประเมินโรค MM: BMA, BM biopsy, FISH, albumin, beta2-microglobulin, LDH, SPEP, SIFX, SFLC, bone survey, CT/MRI/PET-CT เมื่อมีข้อบ่งชี้ — ก่อนเริ่มการรักษา
- Lab D1: CBC, BUN, Cr, LFT, Electrolyte, Ca, PO4, Mg; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin < 8 g/dL; ให้ LPPC/SDP ถ้า platelet count < 20,000/mm3; เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3 °C (และ ANC < 500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D4
- NSS 1,000 mL + KCl 20 mEq: IV drip in 4 hr ก่อนยาเคมีบำบัด — D1
- Cisplatin 10 mg/m2/day ใน NSS 1,000 mL (ผสมรวมกับ Cyclophosphamide และ Etoposide) IV drip in 24 hr via central line/port A — D1 ถึง D4 [ผสมรวม Cisplatin + Cyclophosphamide + Etoposide ในถุงเดียวกัน] (note: CrCl 46-60 mL/min: 50%; CrCl 31-45 mL/min: 25%; CrCl <30 mL/min: งดยา; ไม่ต้องปรับขนาดยาในโรคตับ)
- Cyclophosphamide 400 mg/m2/day ใน NSS 1,000 mL (ผสมรวมกับ Cisplatin และ Etoposide) IV drip in 24 hr via central line/port A — D1 ถึง D4 [ผสมรวม Cisplatin + Cyclophosphamide + Etoposide ในถุงเดียวกัน] (note: CrCl <10 mL/min: 50%; TB 3.1-5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Etoposide 40 mg/m2/day ใน NSS 1,000 mL (ผสมรวมกับ Cisplatin และ Cyclophosphamide) IV drip in 24 hr via central line/port A — D1 ถึง D4 [ผสมรวม Cisplatin + Cyclophosphamide + Etoposide ในถุงเดียวกัน] (note: CrCl 15-50 mL/min: 75%; CrCl <15 mL/min: งดใช้ยา; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50%; TB >3 mg/dL หรือ AST >180 U/L: งดใช้ยา)
- Doxorubicin 10 mg/m2/day ใน NSS 100 ml IV drip in 24 hr via central line/port A — D1 ถึง D4 (note: CrCl <10 mL/min: 75%; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50%; TB 3.1-5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา)
- NSS 1,000 mL + KCl 20 mEq + 50%MgSO4 20 mEq: IV drip in 4 hr — D5
- Dexamethasone (4 mg): 5 tabs oral bid pc — D1 ถึง D4
- Thalidomide (50 mg): …… cap oral OD pc — D1 ถึง D28
- Filgrastim: (……………………®) ○ 300 μg ○ 480 μg SC OD — เริ่มวันที่…… ถึง……

**DVD regimen** — abbr `DVD`, IPD, cycle 28 วัน (Cycle 1-8) — _Siriraj order 2025 p.184_
- การประเมินโรค MM: BMA, BM biopsy, FISH, albumin, beta2-microglobulin, LDH, SPEP, SIFX, SFLC, bone survey, CT/MRI/PET-CT เมื่อมีข้อบ่งชี้ — ก่อนเริ่มการรักษา
- Lab D1: CBC, BUN, Cr, LFT, Ca; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin < 8 g/dL; ให้ LPPC/SDP ถ้า platelet count < 20,000/mm3; เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3 °C (และ ANC < 500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron injection: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1
- Liposomal doxorubicin 40 mg/m2 ใน D5W 250 mL IV drip in 1½ hr — D1 (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.2-3 mg/dL หรือ AST 60-180 U/L: 50%; TB 3.1-5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา)
- Vincristine 1.4 mg/m2 (max 2 mg) ใน NSS 100 mL IV drip in 1 hr — D1 [max 2 mg] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50%; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Dexamethasone (4 mg): 5 tabs oral bid pc — D1 - D4, D9 - D12, D17 - D20
- Filgrastim: (……………………®) ○ 300 μg ○ 480 μg SC OD — เริ่มวันที่…… ถึง……

**mCBAD regimen** — abbr `mCBAD`, IPD, cycle 28 วัน — _Siriraj order 2025 p.185_
- การประเมินโรค MM: BMA, BM biopsy, FISH, albumin, beta2-microglobulin, LDH, SPEP, SIFX, SFLC, bone survey, CT/MRI/PET-CT เมื่อมีข้อบ่งชี้ — ก่อนเริ่มการรักษา
- Lab D1: CBC, BUN, Cr, Electrolyte, Ca, PO4, LFT, uric acid, LDH, PT, APTT, fibrinogen, D-dimer; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม ☐ ส่งปรึกษาอายุรแพทย์โรคหัวใจ เพื่อประเมิน EF — D1
- CBC ติดตาม: CBC — D5, D8, D10, D12, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin < 8 g/dL; ให้ LPPC/SDP ถ้า platelet count < 20,000/mm3; เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3 °C (และ ANC < 500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- Acyclovir (400 mg): 1 tab oral bid pc — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D4, D8, D11
- Cyclophosphamide 350 mg/m2 ใน NSS 100 mL IV drip in 1 hr q 12 hr (8 doses) — D1 ถึง D4 [q 12 hr รวม 8 doses] (note: CrCl <10 mL/min: 50%; TB 3.1-5 mg/dL หรือ AST >180 U/L: 75%; TB >5 mg/dL: งดยา)
- Mesna 400 mg/m2 ใน 5%DN/2 1,000 mL IV drip in 12 hr q 12 hr (8 doses) — D1 ถึง D4 [เริ่มให้พร้อม cyclophosphamide; q 12 hr รวม 8 doses]
- Bortezomib 1.3 mg/m2 SC — D1, D4, D8, D11 [Sig. …… mg SC]
- Doxorubicin 9 mg/m2 ใน NSS 100 ml IV drip in 24 hr via central line/port A — D1 ถึง D4 (note: CrCl <10 mL/min: 75%; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50%; TB 3.1-5 mg/dL หรือ AST >180 U/L: 25%; TB >5 mg/dL: งดยา)
- Dexamethasone (40 mg/d): ☐ Dexamethasone (4 mg) 5 tabs oral bid pc ☐ Dexamethasone 10 mg IV q 6 hr — D1 - D4, D9 - D12, D17 - D20
- Filgrastim: (……………………®) ○ 300 μg ○ 480 μg SC OD — เริ่ม D5 (เว้น D8, D11) ถึง……

**VAD regimen** — abbr `VAD`, IPD, cycle 28 วัน (Cycle 1-8) — _Siriraj order 2025 p.186_
- การประเมินโรค MM: BMA, BM biopsy, FISH, albumin, beta2-microglobulin, LDH, SPEP, SIFX, SFLC, bone survey, CT/MRI/PET-CT เมื่อมีข้อบ่งชี้ — ก่อนเริ่มการรักษา
- Lab D1: CBC, BUN, Cr, LFT, Ca; U/A, stool concentrate for parasite for 3 days; CXR (PA); EKG 12 leads — D1
- Consult: ☐ ส่งปรึกษาทันตกรรม — D1
- CBC ติดตาม: CBC — D5, D8, D11, D14, D17, D20
- Transfusion / sepsis: ให้ PFB ถ้า hemoglobin < 8 g/dL; ให้ LPPC/SDP ถ้า platelet count < 20,000/mm3; เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3 °C (และ ANC < 500/mm3) — ตลอดการรักษา
- คำสั่งพยาบาล: Regular diet; Record V/S, I/O; NSS mouth wash หลังอาหารทุกมื้อ; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล — ตลอดการรักษา
- Domperidone (10 mg): 1 tab oral tid ac — ตลอดการรักษา
- Omeprazole (20 mg): 1 cap oral OD ac — ตลอดการรักษา
- Senokot: 2 tabs oral hs prn for constipation — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D4
- Vincristine 0.4 mg/m2/day (max 0.5 mg) ใน NSS 100 mL (ผสมรวมกับ Doxorubicin) IV drip in 24 hr via central line — D1 ถึง D4 [max 0.5 mg/day; ผสมรวม Vincristine + Doxorubicin ในถุงเดียวกัน] (note: ไม่ต้องปรับขนาดยาในโรคไต; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50% ของขนาดยา; TB >3.1 mg/dL หรือ AST >180 U/L: งดยา)
- Doxorubicin 9 mg/m2/day ใน NSS 100 mL (ผสมรวมกับ Vincristine) IV drip in 24 hr via central line — D1 ถึง D4 [ผสมรวม Vincristine + Doxorubicin ในถุงเดียวกัน] (note: CrCl <10 mL/min: 75% ของขนาดยา; TB 1.5-3 mg/dL หรือ AST 60-180 U/L: 50% ของขนาดยา; TB 3.1-5 mg/dL หรือ AST >180 U/L: 25% ของขนาดยา; TB >5 mg/dL: งดยา)
- NSS 1,000 mL: IV drip in 24 hr via central line — D1 ถึง D4
- Dexamethasone (4 mg): 5 tabs oral bid pc — D1 - D4, D9 - D12, D17 - D20
- Filgrastim: (……………………®) ○ 300 μg ○ 480 μg SC OD — เริ่มวันที่……

**Teclistamab protocol — Medication & Monitoring (Page 1–2)** — abbr `Teclistamab`, IPD — _Siriraj order 2025 p.187_
- Lab D1: ☐ CBC, Ferritin, CRP, IL-6; ☐ BUN, Cr, Electrolyte, LFT, Total calcium, Mg, PO4, Uric acid, LDH; ☐ SPEP, Immunofixation, SFLC; ☐ PT, aPTT, fibrinogen, D-dimer; ☐ HBsAg, Anti-HBs, Anti-HBc, Anti-HCV, Anti-HIV, HSV IgG, VZV IgG; ☐ Serum IgG levels* (*IgG level should be maintained ≥ 4 g/L; 400 mg/dL and suggest follow up level every 4 weeks) — D1
- คำสั่งพยาบาล: Regular neutropenic diet; Record V/S, I/O; ให้คำแนะนำเกี่ยวกับโรค การดูแลตนเอง และการรักษาด้วยเคมีบำบัด พร้อมลงนามในหนังสือแสดงเจตนายินยอมรับการรักษา โดยแพทย์; ให้คำแนะนำชนิดอาหาร การทำความสะอาด การแปรงฟัน และระวังเลือดออกผิดปกติ โดยพยาบาล; แนะนำให้ผู้ป่วยอยู่ในโรงพยาบาลอย่างน้อย 2 วัน หลังได้รับยา ในช่วงการให้ยา 3 ครั้งแรก เพื่อสังเกตอาการ; หากผู้ป่วยมีอาการในกลุ่ม CRS และ/หรือ Immune-effector cell associated neurotoxicity syndrome (ICANS) แนะนำให้เลื่อนการให้ยาในครั้งถัดไป จนกว่าอาการแสดงดังกล่าวจะหายขาด; หากมีการพิจารณาเลื่อนการได้รับยาของผู้ป่วย กรุณาดูรายละเอียดคำแนะนำเพิ่มเติมจาก Treatment guideline — ตลอดการรักษา
- วิธีการให้ยา Teclistamab: บริหารยา teclistamab โดยวิธีการฉีดใต้ผิวหนัง (Subcutaneous); โดยแนะนำให้ฉีดบริเวณหน้าท้อง หรือต้นขา; ยาที่บรรจุใน syringe พร้อมฉีด แนะนำให้ใช้ทันที หรือภายใน 20 ชั่วโมง; กรุณาตรวจสอบรายละเอียดวิธีการเตรียมยา และวิธีการให้ยาฉบับเต็มใน treatment guideline — ทุกครั้งที่ให้ยา
- Monitoring and Record vital signs: D1, D….., D….. after infusion: Every 15 min x 4 then Every 30 min x 4 then Every 1 hour x 4 then every 4 hr; Keep BP ≥ 90/60 mmHg, RR < 20/min; ถ้ามีอาการไข้ หนาวสั่น ความดันลดลง รายงานแพทย์ Hemato เจ้าของไข้ทุกครั้ง — D1, D….., D….. (หลังให้ยา)
- Routine investigation: Blood for CBC, ferritin, CRP, IL-6, PT, aPTT, fibrinogen, D-Dimer OD; Blood for BUN, Cr, Electrolyte, Total Ca, PO4, Uric acid q 6 hr D1, D….., D…..; Blood for LFT, Mg, FBS ทุกวันจันทร์ และพฤหัส; CRS assessment ทุกเวร ตาม protocol; ICANS assessment ทุกเวรเช้า บ่าย ตาม protocol — ตลอดการรักษา
- Additional investigation after suspected CRS or ICANS: Record V/S + notify if BP ≤ 90/60 mmHg, MAP ≤ 65 mmHg; HR > 120 bpm + ให้ทำ EKG 12 lead; RR > 24 /min, SpO2 < 95% (RA). If BT ≥ 38.0 °C + please notify and investigation: Blood for IL-6, CRP, ferritin, procalcitonin, PT, aPTT, fibrinogen, D-dimer, BUN, Cr, LFT stat; Blood for H/C x 2, UA, MUC; CXR-Portable; Empirical ATB: Piperacillin/Tazobactam 4.5 gm IV drip in 1 hr stat then Piperacillin/Tazobactam 4.5 gm IV drip in 3 hr q 6 hr — เมื่อสงสัย CRS หรือ ICANS
- Omeprazole: 40 mg IV OD — ตลอดการรักษา
- ☐ Allopurinol (100 mg): 3 caps oral pc เช้า — ตลอดการรักษา
- ☐ Febuxostat (80 mg): 1 cap oral pc เช้า — ตลอดการรักษา
- Co-trimoxazole SS (80/400): 2 tabs oral OD วันจันทร์, พุธ, ศุกร์ — ตลอดการรักษา
- ☐ Fluconazole (200): 2 caps oral OD pc เช้า — ตลอดการรักษา
- ☐ Ciprofloxacin (500): 1 tab oral bid pc — ตลอดการรักษา
- ☐ Acyclovir (400): 1 tab po bid pc กรณี HSV IgG positive — ตลอดการรักษา
- ☐ Acyclovir (800): 1 tab po bid pc กรณี VZV IgG positive — ตลอดการรักษา
- ☐ Tenofovir alafenamide (25 mg): 1 tab po OD pc กรณี AntiHBc+ — ตลอดการรักษา
- ☐ Dexamethasone (premedication): 16 mg IV ก่อนการให้ Teclistamab 1-3 ชั่วโมง — ทุกครั้งที่ให้ Teclistamab
- ☐ Diphenhydramine (25 mg) (premedication): 2 caps oral ก่อนการให้ Teclistamab 1-3 ชั่วโมง — ทุกครั้งที่ให้ Teclistamab
- ☐ Paracetamol (500 mg) (premedication): 2 tabs oral ก่อนการให้ Teclistamab 1-3 ชั่วโมง — ทุกครั้งที่ให้ Teclistamab
- Teclistamab — Step-up dose ครั้งที่ 1 0.06 mg/kg SC — D1 = …… [10 mg/mL/vial; Sig. …… ml SC] (note: ไม่ต้องปรับขนาดยาในโรคไตและโรคตับ)
- Teclistamab — Step-up dose ครั้งที่ 2 0.3 mg/kg SC — D….. (ห่างจาก Step-up dose ครั้งที่ 1 เป็นเวลา 2-4 วัน) [10 mg/mL/vial; Sig. …… ml SC] (note: ไม่ต้องปรับขนาดยาในโรคไตและโรคตับ)
- Teclistamab — First treatment dose 1.5 mg/kg SC — D….. (ห่างจาก Step-up dose ครั้งที่ 2 เป็นเวลา 2-4 วัน) [90 mg/mL/vial; Sig. …… ml SC] (note: ไม่ต้องปรับขนาดยาในโรคไตและโรคตับ)
- Teclistamab — Treatment dose for maintenance 1.5 mg/kg SC — D….. ☐ ทุก 1 สัปดาห์ ☐ ทุก 2 สัปดาห์ [90 mg/mL/vial; Sig. …… ml SC] (note: ไม่ต้องปรับขนาดยาในโรคไตและโรคตับ; เลือกความถี่ ทุก 1 หรือ 2 สัปดาห์)

**Teclistamab protocol — CRS (Page 3)** — abbr `Teclistamab CRS`, IPD — _Siriraj order 2025 p.189_
- Criteria CRS: ☐ CRS grade 1: Fever ≥ 38.0 °C; ☐ CRS grade 2: Fever with hypotension not requiring vasopressor and/or hypoxia required low-flow nasal canula; ☐ CRS grade 3: Fever with hypotension requiring vasopressor with or without vasopressin and/or hypoxia required high-flow nasal canula, face-mask; ☐ CRS grade 4: Fever with hypotension requiring multiple vasopressors and/or hypoxia requiring positive pressure (CPAP, BIPAP, Intubation, Mechanical ventilation) — เมื่อสงสัย CRS
- เบิก Norepinephrine: เบิก Norepinephrine 4 mg/vial 10 vials — D1
- CRS grade 1 — ☐ Tocilizumab: …… mg in NSS to 100 mL IV in 1 hr (8 mg/kg/dose, not exceed 800 mg/dose); Repeat in 8 hr if no improvement, no more than 3 dose in 24 hours — CRS grade 1
- CRS grade 2 — ☐ Tocilizumab: …… mg in NSS to 100 mL IV in 1 hr; If no improvement within 24 hours of starting tocilizumab: ☐ Dexamethasone 10 mg IV q 12 hr — CRS grade 2
- CRS grade 3 — ☐ Tocilizumab: …… mg in NSS to 100 mL IV in 1 hr; If no improvement: ☐ Dexamethasone 10 mg IV q 6 hr — CRS grade 3
- CRS grade 4 — ☐ Tocilizumab: …… mg + NSS 100 mL IV in 1 hr; Consider administer (ให้พร้อมกันหรือ อาการไม่ดีขึ้นหลังจาก tocilizumab): ☐ Methylprednisolone 1,000 mg in NSS 100 mL IV in 1 hr x 3 days — CRS grade 4

**Teclistamab protocol — ICANS (Page 4)** — abbr `Teclistamab ICANS`, IPD — _Siriraj order 2025 p.190_
- Criteria ICANS: ☐ ICAN grade 1: ICE score 7-9, Awake spontaneously; ☐ ICAN grade 2: ICE score 3-6, Awake to voice; ☐ ICAN grade 3: ICE score 1-2, Awake only to tactile stimulus, Any clinical seizure focal or generalized that resolves rapidly or non-convulsive seizure on EEG, Focal/local edema on neuroimaging; ☐ ICAN grade 4: ICE score 0, Unarousable or require vigorous or repetitive tactile or stupor or coma, Life-threatening prolong seizure > 5 min, Deep focal motor weakness (hemiparesis or paraparesis), Diffuse cerebral edema on neuroimaging or decerebrate or decorticate or sixth cranial nerve palsy or papilledema or Crushing's triad; If ICAN symptoms present please notify (eg. Tremor, severe dizziness, delirium, confusion, agitation, alteration of consciousness, severe headache, aphasia) — เมื่อสงสัย ICANS
- If seizure present: Notify hematologist, neurologist; If seizure give diazepam 10 mg IV stat; On oxygen canular 3 LPM — เมื่อมี seizure
- ICAN grade 2 — ☐ Dexamethasone: 10 mg IV x 1 dose (can be repeated q 6 hr if no improvement then taper dose) — ICAN grade 2
- ICAN grade 3 (ICU care is recommended): ☐ Dexamethasone 10 mg IV q 6 hr or ☐ Methylprednisolone (1 mg/kg IV) …… mg in NSS 100 mL IV in 1 hr q 12 hr; Consider repeat neuroimaging (CT or MRI) every 2–3 days if patient has persistent grade ≥3 neurotoxicity — ICAN grade 3
- ICAN grade 4 (ICU care, consider mechanical ventilation for airway protection): ☐ Methylprednisolone 1,000 mg + NSS 100 mL IV in 1 hr x 3 days then 250 mg in NSS 100 mL IV in 1 hr q 12 hr x 2 days then 125 mg in NSS 100 mL IV in 1 hr q 12 hr x 2 days then 60 mg in NSS 100 mL IV in 1 hr q 12 hr x 2 days; Consider repeat neuroimaging (CT or MRI) every 2–3 days if patient has persistent grade ≥3 neurotoxicity; Treat convulsive status epilepticus per institutional guidelines — ICAN grade 4

### HSCT

**Ara-C Mobilization — PBSC mobilization for Autologous HSCT** — abbr `HSCT AraC mobil`, IPD — _Siriraj order 2025 p.192_
- Lab D1: BW……kg Ht……cm BSA……m2; D1 = ……; Blood for CBC, BUN, Cr, electrolyte, LFT, PT, aPTT; EKG 12 lead ก่อนให้ cytarabine; Blood for NAT (Lab ส่งธนาคารเลือด) พร้อม consent form for anti-HIV; Blood for anti-HIV, HBsAg, Anti-HBc, anti HCV, VDRL, TPHA, CMV IgG, VZV IgG, HSV IgG — D1
- คำสั่งจำหน่าย / นัด: ยาเคมีบำบัดครบให้ D/C ได้; นัด admit …… / …… / …… ที่หอผู้ป่วย …… เพื่อใส่ DLC & เก็บ stem cells — หลังครบยาเคมีบำบัด
- Filgrastim (H/M) 10 mcg/kg/day SC OD 18.00 น — เริ่ม D5 = …… เป็นต้นไป [10 ug/kg/day (……®); Sig. …… mcg SC OD 18.00 น; เบิกจำนวน …… doses] (note: ยากลับบ้าน (H/M) เริ่ม D5 จนถึงวันเก็บ stem cells)
- คำสั่งพยาบาล: Regular diet; Record V/S, I/O; Blood product ทุกชนิดเป็น irradiated product เท่านั้น — ตลอดการรักษา
- Ondansetron: 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม. — D1 ถึง D2
- Cytarabine 400 mg/m2 ใน NSS 250 mL IV drip in 2 hr q 12 hr — D1 ถึง D2 [Total 4 doses (q 12 hr D1–D2)]
- Paracetamol (500 mg): 1 tab oral prn for fever or pain q 4-6 hr — ตลอดการรักษา
- Lorazepam (0.5 mg): 1 tab po prn for insomnia — ตลอดการรักษา

**Stem cell collection Patient — PBSC harvest for Autologous HSCT (Page 1–3)** — abbr `HSCT PBSC harvest Pt`, IPD — _Siriraj order 2025 p.193_
- Lab D1: BW……kg Ht……cm BSA……m2; CBC, BUN, Cr, electrolyte, Mg, LFT, PT, aPTT, Total Ca; Blood group ABO and Rh; Blood for infectious screening ส่งธนาคารเลือดทั้งหมด (NAT, anti-HIV, HBsAg, Anti-HBc, anti HCV, VDRL, TPHA, CMV IgG, VZV IgG, HSV IgG) พร้อม consent form for anti-HIV; On IV catheter; EKG 12 lead — D1
- Consent / DLC / เก็บ stem cell: เซ็น consent form สำหรับการเก็บ stem cell; เซ็น consent form สำหรับการใส่สาย DLC; Set DLC insertion ICU ชั้น 3 อัษฎางค์ เวลา …… วันที่ ……; CXR portable หลังใส่สาย DLC; ส่งเก็บ stem cell ตึกนวมินทร์ ชั้น 3 เวลา 8.00 น วันที่ ……; เบิก Heparin LEO 5,000 unit/ml # 1; เบิก 10% Calcium gluconate 10 ml # 4; เตรียมอุปกรณ์สำหรับเก็บ stem cell — วันใส่ DLC / วันเก็บ stem cell
- ☐ Plerixafor: …… mg SC วันที่ …… เวลา 22.00 น — วันที่ ……
- อุปกรณ์ใส่ DLC (เบิกจากคลังเวชภัณฑ์): วันที่ใส่ DLC ให้เบิกอุปกรณ์ไปกับผู้ป่วยที่ ICU3: เบิกสาย Arrow 12 Fr 2 lumen Hemodialysis Catheter for High Volume Infusion REF CS-12122-F (รหัสเบิก 30055688) จำนวน 1 สาย; Tegaderm-CHG 1657R Size 10 cm x 12 cm จำนวน 1 อัน; Gown disposable for HIV *special* [Surgical Gown] จำนวน 1 ชุด; Camera Sleeve (disp. sterile) 150 x 2,550 mm. จำนวน 1 อัน; Glove Sterile (No powder) No.6.5 และ No.7 (Gammex) จำนวนอย่างละ 1 คู่; Optisonic ultrasound gel จำนวน 1 อัน; Spinal set (รหัสเบิก 30041416) จำนวน 1 อัน; Red dot 3 อัน — วันใส่ DLC
- อุปกรณ์ใส่ DLC (เบิกจากห้องยา): ยาขา 2% lidocaine-GPO 2 ml. จำนวน 2 ampule; NSS 100 ml. จำนวน 1 ขวด; Heparin 5000 units/ml -5 ml จำนวน 1 ขวด (สำหรับใส่สาย 12 Fr 2 lumen เท่านั้น); 2% Chlorhexidine in 70% Alcohol จำนวน 1 ขวด — วันใส่ DLC
- Key lab วันเก็บ stem cell (Hemato med): 1.1 Post apheresis หลังเก็บ stem cell (Key order ใบที่ 1): CD34 enumeration by flow cytometry (HCLAB 401248) ส่งฉก. 12 (ระบุน้ำหนักผู้ป่วยลงในใบ Ehis); 1.2 Post apheresis หลังเก็บ stem cell (Key order ใบที่ 2): PBSC processing (1 lab number ต่อ 1 ถุง stem cell), HSC storage (1 lab number ต่อ 1 ถุง stem cell), CD34 enumeration by flow cytometry (HCLAB 401248) ส่งฉก. 12 (ระบุน้ำหนักผู้ป่วยลงในใบ Ehis); ติดต่อสอบถามจำนวนถุงของ stem cell ที่เจ้าหน้าที่แลปตึก ฉก 12 (โทร 94418) หรือติดต่อแพทย์ผู้ดูแล; Print ใบ Ehis ส่ง ฉก 12 — วันเก็บ stem cell
- Key lab วันเก็บ stem cell (จุลชีววิทยา): 2.1 Stem cell culture for bacteria (1 lab number ต่อ 1 ถุง stem cell); 2.2 Stem cell culture for fungus (1 lab number ต่อ 1 ถุง stem cell); ทางเจ้าหน้าที่ ฉก.12 จะส่งขวด culture มาให้หอผู้ป่วยเพื่อ key order ในระบบ Ehis และส่งตรวจห้องแลปจุลชีววิทยา; ติดต่อแพทย์ผู้ดูแลหากมีปัญหาในการ key order — วันเก็บ stem cell
- คำสั่งพยาบาล: Regular diet; Record vital sign, I/O as mL; All blood component ให้ irradiation — ตลอดการรักษา
- Lab ติดตาม: CBC OD เริ่มวันที่ ……; Total Ca วันที่เก็บ stem cell ตอนเช้า เริ่มวันที่ ……; Blood for HPC count by Hematological Analyzer (รหัส HCLAB 401318) EDTA tube 3 ml ส่ง OPD700 OD เริ่มเช้า 6.00 น. วันที่ใส่สาย ……; CBC, Electrolyte, iCa, Mg (หลังเก็บ stem cell) (หากจะเก็บ stem cell วันถัดไปให้ keep platelet ≥ 50,000/mm3) — OD / วันเก็บ stem cell
- Paracetamol (500 mg): 1 tab oral prn for fever or pain q 4-6 hr — ตลอดการรักษา
- Lorazepam (0.5 mg): 1 tab po prn for insomnia — ตลอดการรักษา
- Calcium Forte: 1 tab ละลายน้ำ 30 ml oral 8.00, 20.00 น. เริ่มก่อนเก็บ stem cell 1 วัน วันที่ …… — เริ่มก่อนเก็บ stem cell 1 วัน
- Filgrastim 10 mcg/kg/day ใน D5W …… mL IV 30 min OD 23.00 น — OD [10 ug/kg/day (……®); Sig. …… µg in D5W …… ml IV 30 min OD 23.00 น.]

**Stem cell collection Donor — PBSC mobilization for Donor Allo-SCT (Page 1–3)** — abbr `HSCT PBSC harvest Donor`, IPD — _Siriraj order 2025 p.196_
- Lab D1: BW……kg Ht……cm BSA……m2; CBC, BUN, Cr, electrolyte, Mg, LFT, PT, aPTT, Total Ca; Blood group ABO and Rh; Blood for Chimerism; Blood for infectious screening ส่งธนาคารเลือดทั้งหมด (NAT, anti-HIV, HBsAg, Anti-HBc, anti HCV, VDRL, TPHA, CMV IgG, VZV IgG, HSV IgG) พร้อม consent form for anti-HIV; On IV catheter; EKG 12 lead — D1
- Consent / DLC / เก็บ stem cell: เซ็น consent form สำหรับการเก็บ stem cell; เซ็น consent form สำหรับการใส่สาย DLC; Set DLC insertion ICU ชั้น 3 อัษฎางค์ เวลา …… วันที่ ……; CXR portable หลังใส่สาย DLC; ส่งเก็บ stem cell ตึกนวมินทร์ ชั้น 3 เวลา 8.00 น วันที่ ……; เบิก Heparin LEO 5,000 unit/ml # 1; เบิก 10% Calcium gluconate 10 ml # 4; เตรียมอุปกรณ์สำหรับเก็บ stem cell — วันใส่ DLC / วันเก็บ stem cell
- อุปกรณ์ใส่ DLC (เบิกจากคลังเวชภัณฑ์): วันที่ใส่ DLC ให้เบิกอุปกรณ์ไปกับผู้ป่วยที่ ICU3: เบิกสาย Arrow 12 Fr 2 lumen Hemodialysis Catheter for High Volume Infusion REF CS-12122-F (รหัสเบิก 30055688) จำนวน 1 สาย; Tegaderm-CHG 1657R Size 10 cm x 12 cm จำนวน 1 อัน; Gown disposable for HIV *special* [Surgical Gown] จำนวน 1 ชุด; Camera Sleeve (disp. sterile) 150 x 2,550 mm. จำนวน 1 อัน; Glove Sterile (No powder) No.6.5 และ No.7 (Gammex) จำนวนอย่างละ 1 คู่; Optisonic ultrasound gel จำนวน 1 อัน; Spinal set (รหัสเบิก 30041416) จำนวน 1 อัน; Red dot 3 อัน — วันใส่ DLC
- อุปกรณ์ใส่ DLC (เบิกจากห้องยา): ยาขา 2% lidocaine-GPO 2 ml. จำนวน 2 ampule; NSS 100 ml. จำนวน 1 ขวด; Heparin 5000 units/ml -5 ml จำนวน 1 ขวด (สำหรับใส่สาย 12 Fr 2 lumen เท่านั้น); 2% Chlorhexidine in 70% Alcohol จำนวน 1 ขวด — วันใส่ DLC
- Key lab วันเก็บ stem cell (Hemato med): 1.1 Post apheresis หลังเก็บ stem cell (Key order ใบที่ 1): CD34 enumeration by flow cytometry (HCLAB 401248) ส่งฉก. 12 (ระบุน้ำหนักผู้ป่วยลงในใบ Ehis); 1.2 Post apheresis หลังเก็บ stem cell (Key order ใบที่ 2): PBSC processing (1 lab number ต่อ 1 ถุง stem cell), HSC storage (1 lab number ต่อ 1 ถุง stem cell), CD34 enumeration by flow cytometry (HCLAB 401248) ส่งฉก. 12 (ระบุน้ำหนักผู้ป่วยลงในใบ Ehis); ติดต่อสอบถามจำนวนถุงของ stem cell ที่เจ้าหน้าที่แลปตึก ฉก 12 (โทร 94418) หรือติดต่อแพทย์ผู้ดูแล; Print ใบ Ehis ส่ง ฉก 12 — วันเก็บ stem cell
- Key lab วันเก็บ stem cell (จุลชีววิทยา): 2.1 Stem cell culture for bacteria (1 lab number ต่อ 1 ถุง stem cell); 2.2 Stem cell culture for fungus (1 lab number ต่อ 1 ถุง stem cell); ทางเจ้าหน้าที่ ฉก.12 จะส่งขวด culture มาให้หอผู้ป่วยเพื่อ key order ในระบบ Ehis และส่งตรวจห้องแลปจุลชีววิทยา; ติดต่อแพทย์ผู้ดูแลหากมีปัญหาในการ key order — วันเก็บ stem cell
- คำสั่งพยาบาล: Regular diet; Record vital sign, I/O as mL; All blood component ให้ irradiation — ตลอดการรักษา
- Lab ติดตาม: CBC OD เริ่มวันที่ ……; Total Ca วันที่เก็บ stem cell ตอนเช้า เริ่มวันที่ ……; Blood for HPC count by Hematological Analyzer (รหัส HCLAB 401318) EDTA tube 3 ml ส่ง OPD700 OD เริ่มเช้า 6.00 น. วันที่ใส่สาย ……; CBC, Electrolyte, iCa, Mg (หลังเก็บ stem cell) (หากจะเก็บ stem cell วันถัดไปให้ keep platelet ≥ 50,000/mm3) — OD / วันเก็บ stem cell
- Paracetamol (500 mg): 1 tab oral prn for fever or pain q 4-6 hr — ตลอดการรักษา
- Lorazepam (0.5 mg): 1 tab po prn for insomnia — ตลอดการรักษา
- Calcium Forte: 1 tab ละลายน้ำ 30 ml oral 8.00, 20.00 น. เริ่มก่อนเก็บ stem cell 1 วัน วันที่ …… — เริ่มก่อนเก็บ stem cell 1 วัน
- Filgrastim 10 mcg/kg/day ใน D5W …… mL IV 30 min OD 18.00 น — OD [10 ug/kg/day (……®); Sig. …… µg in D5W …… ml IV 30 min OD 18.00 น.]
