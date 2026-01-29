

## সমস্যার কারণ

বর্তমানে `animate-spin` ক্লাস কাজ করছে না কারণ:
1. **Missing Animation**: Tailwind এর built-in `spin` keyframe এবং animation টি `tailwindcss-animate` প্লাগইনে থাকলেও, custom animation config এ সেটি ওভাররাইড হয়ে গেছে
2. **Transition Conflict**: `transition-transform` ক্লাসটি animation এর সাথে conflict করতে পারে

## সমাধান

### ধাপ ১: CSS এ Spin Animation যোগ করা
`src/index.css` ফাইলে একটি reliable spin animation যোগ করব যা সব জায়গায় কাজ করবে:

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

### ধাপ ২: Member Page এর Refresh Button Fix
`src/pages/Member.tsx` ফাইলে:
- `transition-transform` রিমুভ করব (animation এর সাথে conflict করে)
- শুধুমাত্র `animate-spin` ক্লাস ব্যবহার করব

### ধাপ ৩: Header এ একই Animation যোগ করা
`src/components/Header.tsx` ফাইলেও:
- `isRefreshing` state যোগ করব
- Refresh button এ spinning animation যোগ করব

## প্রযুক্তিগত বিবরণ

### index.css এ যোগ করতে হবে:
```css
/* Spin Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 0.8s linear infinite;
}
```

### Member.tsx এ পরিবর্তন:
```tsx
// Line 186 - transition-transform রিমুভ
<RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
```

### Header.tsx এ পরিবর্তন:
```tsx
import { forwardRef, useState } from "react";

// Add state
const [isRefreshing, setIsRefreshing] = useState(false);

// Update handler
const handleRefreshBalance = async () => {
  setIsRefreshing(true);
  await queryClient.invalidateQueries({ queryKey: ['user-profile'] });
  setTimeout(() => {
    setIsRefreshing(false);
    toast({...});
  }, 600);
};

// Update icon
<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
```

## ফাইল পরিবর্তন

| ফাইল | পরিবর্তন |
|------|---------|
| `src/index.css` | Spin keyframe ও animation class যোগ |
| `src/pages/Member.tsx` | transition-transform রিমুভ |
| `src/components/Header.tsx` | isRefreshing state ও animation যোগ |

