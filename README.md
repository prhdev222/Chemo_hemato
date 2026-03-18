# 💊 Hematology Chemo Order System

ระบบสั่งยาเคมีบำบัดสาขาโลหิตวิทยา — React + Vite + MongoDB Atlas + Vercel

---

## ขั้นตอนการ Deploy ทั้งหมด

---

### ขั้นตอนที่ 1 — สมัคร MongoDB Atlas (database ฟรี)

1. ไปที่ **https://mongodb.com/atlas** → กด **Try Free**
2. สมัครด้วย Google หรือ Email
3. หลัง login → กด **Create a cluster**
4. เลือก **M0 Free** (ฟรีตลอด)
5. Region → เลือก **Singapore (AP_SOUTHEAST_1)**
6. กด **Create Deployment**

#### ตั้งค่า User
7. หน้า **Security Quickstart** จะขึ้นมา
8. ใส่ชื่อ Username เช่น `chemo_admin`
9. กด **Autogenerate Secure Password** → **Copy Password** (จดไว้!)
10. กด **Create Database User**

#### เปิด Network Access
11. เลื่อนลงมา → **Add My Current IP Address** ถ้าต้องการ test
12. **สำคัญ:** กด **Allow Access from Anywhere** แทน (ใส่ `0.0.0.0/0`)
13. กด **Finish and Close**

#### Copy Connection String
14. กด **Connect** (บน cluster)
15. เลือก **Drivers**
16. Copy connection string ที่ได้ — หน้าตาแบบนี้:
```
mongodb+srv://chemo_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
17. **แทน `<password>`** ด้วย password ที่ copy ไว้ในขั้นตอน 9
18. **เพิ่มชื่อ database** ต่อท้าย `/` ก่อน `?` ให้เป็น:
```
mongodb+srv://chemo_admin:PASSWORD@cluster0.xxxxx.mongodb.net/chemo_order?retryWrites=true&w=majority
```

---

### ขั้นตอนที่ 2 — Upload ขึ้น GitHub

1. สมัคร/login **https://github.com**
2. กด **New repository**
3. ตั้งชื่อ เช่น `chemo-order`
4. เลือก **Private** (แนะนำ)
5. กด **Create repository**
6. แตก zip ไฟล์ที่ได้รับ
7. เปิด Terminal แล้วรันตามนี้:

```bash
cd chemo-order
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/chemo-order.git
git push -u origin main
```

> แทน `YOUR_USERNAME` ด้วย GitHub username ของตัวเอง

---

### ขั้นตอนที่ 3 — Deploy บน Vercel

1. ไปที่ **https://vercel.com** → Login ด้วย GitHub
2. กด **Add New Project**
3. เลือก repo `chemo-order` ที่เพิ่ง push
4. กด **Import**
5. Framework Preset → เลือก **Vite**
6. **อย่ากด Deploy ก่อน** — ไปที่ **Environment Variables** ก่อน

#### ใส่ Environment Variables
7. กด **Environment Variables** → เพิ่ม 2 ค่า:

| Name | Value |
|------|-------|
| `MONGODB_URI` | connection string จากขั้นตอนที่ 1 |
| `ADMIN_PASSWORD` | รหัสผ่านที่ต้องการสำหรับ admin เช่น `Hema@2024` |

8. กด **Deploy**
9. รอประมาณ 1–2 นาที
10. เมื่อเสร็จจะได้ URL เช่น `https://chemo-order.vercel.app`

---

### ขั้นตอนที่ 4 — Seed สูตรยา Built-in (ทำครั้งแรกครั้งเดียว)

1. เปิด `https://chemo-order.vercel.app/admin`
2. Login ด้วย **ADMIN_PASSWORD** ที่ตั้งไว้
3. กด **🗄️ Seed built-in**
4. กด **ยืนยัน**
5. รอสักครู่ — จะมีข้อความ "Seed แล้ว 15 สูตร"
6. กด **← หน้าหลัก** เพื่อดูสูตรยาทั้งหมด

✅ **เสร็จแล้ว! พร้อมใช้งาน**

---

## การใช้งานประจำวัน

### หมอทั่วไป
```
เปิด https://chemo-order.vercel.app
→ ค้นหาสูตรยา
→ กรอกข้อมูลผู้ป่วย (BW, Ht, Labs)
→ ระบบคำนวณ dose อัตโนมัติ
→ แก้ไขรายละเอียดยาได้
→ Copy เป็น Text (LINE/HIS) หรือ พิมพ์ใบสั่งยา
```

### Admin (แพทย์/เภสัช ที่ดูแลระบบ)
```
เปิด https://chemo-order.vercel.app/admin
→ Login ด้วย ADMIN_PASSWORD
→ เพิ่มสูตรยาใหม่ / แก้ไข / ลบ
→ การเปลี่ยนแปลงมีผลทันที ไม่ต้อง redeploy
```

---

## เพิ่ม/แก้ไขสูตรยา

1. เปิด `/admin` → Login
2. กด **➕ เพิ่มสูตรใหม่** หรือกด **แก้ไข** ที่สูตรที่ต้องการ
3. กรอกข้อมูล:
   - ชื่อสูตร, ชื่อย่อ, category, type (OPD/IPD), cycle
   - รายการยาแต่ละตัว: dose, unit, vehicle, route, วัน
4. กด **💾 บันทึก**

#### Unit ของยา
| Unit | ใช้เมื่อ |
|------|---------|
| `mg/m2` | คิดตาม BSA |
| `mg/kg` | คิดตามน้ำหนัก |
| `AUC5` | Carboplatin (คิดจาก CCr) |
| `mg/m2/day` | ให้ทุกวัน คิดตาม BSA |
| `fixed` | ขนาดคงที่ ไม่คำนวณ เช่น Ondansetron, Prednisolone |

---

## ข้อมูลความปลอดภัย

- ✅ **ไม่เก็บข้อมูลผู้ป่วย** — ชื่อ, HN, AN, Labs อยู่แค่ใน browser ไม่บันทึกที่ไหน
- ✅ **เก็บเฉพาะสูตรยา** ใน MongoDB
- ✅ **Admin ต้องใส่ password** ทุกครั้งที่แก้ไขข้อมูล
- ✅ **PDPA compliant** — ไม่มี PHI ใน database

---

## ถ้ามีปัญหา

| ปัญหา | วิธีแก้ |
|-------|---------|
| โหลดสูตรยาไม่ขึ้น | ตรวจสอบ `MONGODB_URI` ใน Vercel settings |
| Login admin ไม่ได้ | ตรวจสอบ `ADMIN_PASSWORD` ใน Vercel settings |
| แก้ค่าใน Vercel แล้ว | ต้องกด **Redeploy** ใน Vercel dashboard |
| เพิ่มสูตรยาแล้วไม่เห็น | กด refresh หน้าเว็บ |

---

## โครงสร้างไฟล์

```
chemo-order/
├── api/                        ← Vercel serverless functions (backend)
│   ├── _db.js                  ← MongoDB connection
│   ├── regimens.js             ← GET สูตรยาทั้งหมด / POST สร้างใหม่
│   ├── regimens/[id].js        ← PUT แก้ไข / DELETE ลบ
│   └── seed.js                 ← seed built-in 15 สูตร
├── src/                        ← React frontend
│   ├── App.jsx                 ← หน้าหลัก (ค้นหา + order)
│   ├── components/
│   │   └── PrintArea.jsx       ← layout ใบสั่งยา print
│   ├── pages/
│   │   └── AdminPage.jsx       ← หน้า admin จัดการสูตรยา
│   ├── utils/
│   │   ├── api.js              ← fetch functions
│   │   └── dose.js             ← คำนวณ BSA, dose
│   └── index.css               ← styles (mobile-first)
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```
