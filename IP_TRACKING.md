# 🌐 IP-Based Attempt Tracking System

## ✅ Feature Implemented

Your platform now tracks test attempts by **IP address / device ID**, preventing students from exceeding attempt limits by using different accounts or clearing browser data.

---

## 🎯 How It Works

### 1. IP Detection
When a student opens a test, the system:
- Detects their public IP address using multiple fallback services
- Caches the IP in localStorage for 24 hours
- Falls back to browser fingerprinting if IP detection fails

### 2. Attempt Tracking
Each attempt record now includes:
- `takerIP` - The student's IP address or device fingerprint
- `attemptNumber` - Sequential attempt number for this IP+test combination

### 3. Limit Enforcement
Before allowing a test to start:
- System checks how many **submitted** attempts exist from this IP for this test
- If attempts >= limit → **Block access** with clear message
- If attempts < limit → **Allow access**

---

## 📊 Example Scenarios

### Scenario 1: Test with 5 Attempt Limit

| Attempt | IP Address | Status | Result |
|---------|-----------|--------|--------|
| 1st | 192.168.1.100 | Submitted | ✅ Allowed |
| 2nd | 192.168.1.100 | Submitted | ✅ Allowed |
| 3rd | 192.168.1.100 | Submitted | ✅ Allowed |
| 4th | 192.168.1.100 | Submitted | ✅ Allowed |
| 5th | 192.168.1.100 | Submitted | ✅ Allowed |
| 6th | 192.168.1.100 | — | ❌ **BLOCKED** |

**Message shown:**
> "You have already used all 5 allowed attempts from this device."

### Scenario 2: Different IP Address

| Attempt | IP Address | Status | Result |
|---------|-----------|--------|--------|
| 1st | 192.168.1.100 | Submitted | ✅ Allowed |
| 2nd | 192.168.1.100 | Submitted | ✅ Allowed |
| 1st | 192.168.1.200 | Submitted | ✅ Allowed (different device) |

**Result:** Different IPs are tracked separately.

### Scenario 3: No Attempt Limit

If teacher sets `attemptLimit: null`:
- Students can retake unlimited times
- IP is still tracked for reporting purposes

---

## 🔧 Technical Implementation

### Files Modified

1. **`src/types.ts`**
   - Added `takerIP: string` field to `Attempt` interface

2. **`src/utils/ip.ts`** (NEW)
   - `detectIP()` - Detects public IP using multiple services
   - `getCachedIP()` - Returns cached IP if recent
   - `generateFallbackID()` - Browser fingerprint fallback

3. **`src/firestoreStore.ts`**
   - Updated `createAttempt()` to accept and store `takerIP`
   - Added `getAttemptsByIP()` - Query attempts by IP
   - Added `checkAttemptLimit()` - Validates attempt limits

4. **`src/pages/TestTake.tsx`**
   - Detects IP on page load
   - Checks attempt limit before showing test
   - Shows blocked screen if limit exceeded
   - Displays device ID in test info

5. **`src/pages/Results.tsx`**
   - Shows IP address and attempt number in results table

6. **`src/utils/pdf.ts`**
   - Includes IP address in PDF reports

---

## 🎨 User Experience

### Student View (When Blocked)

```
┌─────────────────────────────────┐
│         🔒 Attempt Limit        │
│           Reached               │
│                                 │
│  You have already used all 5    │
│  allowed attempts from this     │
│  device.                        │
│                                 │
│  Device: 192.168.1.100          │
│                                 │
│  Please contact your instructor │
│  if you believe this is an      │
│  error.                         │
└─────────────────────────────────┘
```

### Student View (Test Info)

```
┌─────────────────────────────────┐
│      Midterm Exam - Math 101    │
│                                 │
│  20 questions · 100 points      │
│  Time limit: 60 min             │
│  Attempts allowed: 5            │
│  Device: 192.168.1.100          │
│                                 │
│  [Continue to enter details]    │
└─────────────────────────────────┘
```

### Teacher View (Results)

```
┌──────────────────────────────────────────────────┐
│ Taker              Score    Time    Flags  View   │
├──────────────────────────────────────────────────┤
│ John Doe           85%      45m     —      [View] │
│ S/O Robert Doe                                    │
│ john@email.com · STU001                           │
│ IP: 192.168.1.100 · #3                            │
└──────────────────────────────────────────────────┘
```

---

## 🔒 Security Features

### 1. Multiple IP Detection Services
```typescript
const services = [
  'https://api.ipify.org?format=json',
  'https://api.ip.sb/ip',
  'https://ipapi.co/json/'
];
```
If one service fails, tries the next.

### 2. Browser Fingerprint Fallback
If all IP services fail, generates a unique ID based on:
- User agent
- Screen resolution
- Language
- Timezone
- Platform
- Hardware concurrency

### 3. IP Caching
- Caches IP in localStorage for 24 hours
- Reduces API calls
- Faster subsequent tests

### 4. Timeout Protection
- 3-second timeout per IP service
- Prevents hanging on slow networks

---

## 📝 Configuration

### For Teachers

In **Test Settings** → **Timing & Attempts**:

```
Attempt Limit: [5] attempts (leave blank for unlimited)
```

- **Set to 5**: Students can take test 5 times from same device
- **Leave blank**: Unlimited attempts allowed

### For Administrators

No additional configuration needed. IP tracking is automatic.

---

## 🚀 Deployment

```bash
git add .
git commit -m "Add IP-based attempt tracking system"
git push origin main
```

Wait 2-3 minutes for Vercel to redeploy.

---

## 🧪 Testing Checklist

### Test 1: IP Detection
1. Open a test link
2. ✅ Should show "Device: [IP address]" in test info
3. ✅ IP should be a valid IPv4 address

### Test 2: Attempt Limit Enforcement
1. Create test with attempt limit = 2
2. Take test from Device A → Submit
3. Take test again from Device A → Submit
4. Try to take test 3rd time from Device A
5. ✅ Should see "Attempt Limit Reached" screen

### Test 3: Different Devices
1. Take test from Device A (IP: 192.168.1.100)
2. Take test from Device B (IP: 192.168.1.200)
3. ✅ Both should be allowed (different IPs)

### Test 4: Results Display
1. View results page
2. ✅ Should show IP address under student info
3. ✅ Should show attempt number (#1, #2, etc.)

### Test 5: PDF Export
1. Export student result as PDF
2. ✅ Should include "Device/IP: [address]" in report

---

## 🎯 Benefits

### For Teachers
- ✅ Prevents cheating via multiple accounts
- ✅ Tracks attempt history per device
- ✅ Clear visibility in results
- ✅ Included in PDF reports

### For Administrators
- ✅ Enforces academic integrity
- ✅ Device-level tracking
- ✅ Works with existing attempt limits
- ✅ No configuration needed

### For Students
- ✅ Clear messaging when blocked
- ✅ Know their device ID
- ✅ Can contact instructor if error

---

## 🔮 Future Enhancements

Potential improvements:
1. **IP Geolocation** - Show country/city of test taker
2. **Device Fingerprinting** - Track browser/device characteristics
3. **Admin Override** - Allow teachers to reset attempt limits
4. **IP Whitelist** - Allow specific IPs to bypass limits
5. **Time-based Limits** - "Max 2 attempts per day"
6. **Audit Log** - Track all IP detection attempts

---

## 📊 Summary

| Feature | Status |
|---------|--------|
| IP Detection | ✅ Implemented |
| Attempt Tracking | ✅ Implemented |
| Limit Enforcement | ✅ Implemented |
| Blocked Screen | ✅ Implemented |
| Results Display | ✅ Implemented |
| PDF Reports | ✅ Implemented |
| Fallback System | ✅ Implemented |

---

**IP-based attempt tracking is now fully functional!** 🎉

Students cannot exceed attempt limits from the same device, even if they create multiple accounts or clear browser data.
