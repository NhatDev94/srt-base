📘 FRONTEND_CONVENTION.md

    Project: STR Miền Nam – Internal Business System
    Stack: Next.js (App Router) + TypeScript + TailwindCSS + shadcn/ui
    Architecture: Feature-based modular structure

1️⃣ General Principles

    Code phải readable > clever
    Không dùng any
    Không đặt business logic trong UI component thuần
    Không gọi API trực tiếp trong component
    Mỗi feature phải self-contained
    Tối ưu theo hướng scale nhiều module (CRM system)

2️⃣ Project Structure (Feature-Based)
    src/
    ├── app/                     # Next.js App Router
    ├── components/
    │    ├── ui/                 # shadcn customized components (global reusable)
    │    ├── layout/             # App layout (sidebar, header)
    ├── features/                # Feature modules
    │    ├── auth/
    │    │    ├── components/
    │    │    ├── hooks/
    │    │    ├── services/
    │    │    ├── types/
    │    │    └── index.ts
    │    ├── property/
    │    ├── customer/
    │    ├── deal/
    │    └── dashboard/
    ├── lib/                     # axios config, utils
    ├── store/                   # global state (if needed)
    ├── types/                   # shared global types
    ├── constants/
    ├── config/



    📌 Nguyên tắc
        - Mỗi feature tự quản lý:
            + Component
            + Hook
            + Service
            + Types
        - Không import chéo giữa các feature nếu không cần thiết
        - Shared component để trong components/ui

3️⃣ Naming Convention
    - Component - PascalCase
        LoginForm.tsx
        PropertyCard.tsx
        CustomerTable.tsx

    - Hook - Bắt đầu bằng use
        useAuth.ts
        usePropertyFilter.ts

    - Service
        auth.service.ts
        property.service.ts
        customer.service.ts

    - Type
        auth.type.ts
        property.type.ts

    - Variable - camelCase
        userList
        isLoading
        selectedProperty
    - Constant - UPPER_CASE
        API_BASE_URL
        DEFAULT_PAGE_SIZE

4️⃣ Feature Structure Example
    Ví dụ: feature auth
        features/auth/
        ├── components/
        │    └── LoginForm.tsx
        ├── hooks/
        │    └── useAuth.ts
        ├── services/
        │    └── auth.service.ts
        ├── types/
        │    └── auth.type.ts
        └── index.ts

    index.ts pattern
        export * from "./components/LoginForm"
        export * from "./hooks/useAuth"

    → Import gọn:
        import { LoginForm } from "@/features/auth"

5️⃣ API Layer Rules
    - Axios config nằm trong lib/api.ts
    - Feature chỉ gọi qua service layer
    - Không gọi axios trong component

    Ví dụ:
    // features/property/services/property.service.ts
    export const getProperties = async (): Promise<Property[]> => {
        const res = await api.get("/properties")
        return res.data
    }

6️⃣ Component Rules
    ✅ UI component thuần → đặt trong components/ui
    ✅ Business component → đặt trong feature
    ✅ Props phải có type rõ ràng
    ✅ Không để logic fetch trong JSX

7️⃣ State Management
    State local → useState
    State feature → custom hook trong feature
    State global (nếu cần) → store/
    Không truyền props quá 3 cấp.

8️⃣ Styling Convention
    Dùng TailwindCSS
    Không viết CSS file riêng nếu không cần
    Không dùng inline style trừ khi dynamic
    Theme màu theo brand STR

9️⃣ Git Convention
    Commit format:
        feat(auth): add login flow
        feat(property): add property filter
        fix(dashboard): fix kpi rendering
        refactor(layout): optimize sidebar
        chore: update eslint config

🔟 Pull Request Rule
    Không push trực tiếp vào main
    PR phải có description
    Review trước khi merge
    Không merge nếu còn type error

🎯 Architectural Goal
    Modular
    Scalable
    Microservice-friendly
    Ready cho CRM BĐS nhiều module