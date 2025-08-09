# Midas Panel Pro (Production-ready)

پنل VPN مبتنی بر **Next.js 14 + TypeScript + Prisma/PostgreSQL + Redis + NextAuth + Stripe + Tailwind + WireGuard**

## امکانات
- Dockerfile چندمرحله‌ای و خروجی standalone
- `docker-compose.prod.yml` شامل سرویس‌های: frontend، Postgres، Redis، و **wg-easy**
- اسکریپت‌های نصب/بروزرسانی/حذف در مسیر `scripts/`
- Prisma schema با مدل‌های `User`, `Subscription`, `Order`, `Plan` و enum `Role`
- Seed اولیه (پلن‌های Basic و Pro)
- GitHub Actions برای Build & Push به GHCR و دیپلوی با SSH

---

## نصب یک‌کلیکی (الگویی شبیه مرزبان)
> جایگزین `OWNER/REPO` را با ریپوی خودتان انجام دهید.

```bash
curl -fsSL https://raw.githubusercontent.com/OWNER/REPO/main/scripts/install.sh | bash
```

یا پس از کلون ریپو:
```bash
cp .env.example .env
bash scripts/install.sh
```

## دیپلوی با GitHub Actions
1. سکرت‌های زیر را در ریپوی GitHub تنظیم کنید:
   - `SSH_USER`, `SSH_PRIVATE_KEY`
2. اکشن **Build & Push (GHCR)** به‌صورت خودکار روی برنچ `main` اجرا می‌شود و ایمیج را به **GHCR** پوش می‌کند.
3. اکشن **Deploy via SSH** را از تب Actions اجرا کنید و `host` و `path` را وارد کنید.

## سرویس‌ها و پورت‌ها
- **frontend (Next.js)**: `APP_PORT` (پیش‌فرض 3000)
- **Postgres**: 5432
- **Redis**: 6379
- **wg-easy**: 51820/udp (WireGuard) و 51821/tcp (پنل)

## توسعه محلی
```bash
npm install
npm run dev
```

## Prisma
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:deploy
npm run prisma:seed
```

## متغیرهای محیطی
به `.env.example` مراجعه کنید. حداقل‌ها:
- `NEXTAUTH_SECRET`
- `DATABASE_URL`
- `REDIS_URL`
- `STRIPE_*`
- `WG_HOST`, `WG_PASSWORD`
- `APP_PORT`
