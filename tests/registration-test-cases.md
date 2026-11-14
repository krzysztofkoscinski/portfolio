# Przypadki testowe: rejestracja VB Bank

**Typ:** przypadki UI automatyzowane w Playwright  
**Środowisko:** https://vb-bank-demo.vercel.app/register  
**Przeglądarki:** Chromium, Firefox i WebKit (projekty skonfigurowane w Playwright)

Przyjęte konwencje opisano w [standardzie dokumentacji](./test-case-guidelines.md).

## TC-REG-001 — Pomyślna rejestracja

- **Cel:** Potwierdzić utworzenie konta i zalogowanie nowego użytkownika.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Użytkownik jest wylogowany i znajduje się na stronie logowania.
- **Dane testowe:** Fikcyjne imię i hasło; username i email generowane unikalnie dla każdej próby.

**Kroki:**
1. Kliknij **Register here**.
2. Wypełnij formularz prawidłowymi danymi.
3. Kliknij **Create Account**.

**Oczekiwany rezultat:**
- Następuje przekierowanie na `/dashboard`.
- Dashboard wyświetla powitanie użytkownika i przycisk **Logout**.

**Skutek uboczny:** Test tworzy konto w środowisku demo; konto nie jest usuwane po teście.

**Automatyzacja:** `test('TC-REG-001: creates an account and opens its dashboard')` w [registration.spec.ts](./registration.spec.ts).

## TC-REG-002 — Wymagane pola formularza

- **Cel:** Sprawdzić wymagane pola formularza rejestracji.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Użytkownik jest wylogowany i znajduje się na stronie rejestracji.
- **Dane testowe:** Pola puste, następnie wypełniane kolejno; Confirm Password pozostaje puste.

**Kroki:**
1. Kliknij **Create Account** bez wypełniania pól.
2. Wypełniaj kolejno wskazywane wymagane pola, ponawiając kliknięcie:
   **Full Name**, **Username**, **Email** i **Password**.
3. Pozostaw **Confirm Password** puste.

**Oczekiwany rezultat:**
- Fokus przechodzi kolejno na pierwsze niewypełnione wymagane pole.
- Formularz nie tworzy konta ani nie opuszcza strony `/register`.

**Automatyzacja:** `test('TC-REG-002: requires all registration fields')` w [registration.spec.ts](./registration.spec.ts).

## TC-REG-003 — Graniczne wartości pól tekstowych

- **Cel:** Sprawdzić, czy pola tekstowe zachowują krótką i długą wartość bez obcięcia.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Użytkownik jest wylogowany i znajduje się na stronie rejestracji.
- **Dane testowe:** Full Name `A`; Username składający się z 256 znaków.

**Kroki:**
1. Wpisz wartości testowe do pól **Full Name** i **Username**.

**Oczekiwany rezultat:**
- Pola zachowują wpisane wartości bez obcięcia.
- Test nie wysyła formularza ani nie tworzy konta.

**Automatyzacja:** `test('TC-REG-003: preserves text field boundary values')` w [registration.spec.ts](./registration.spec.ts).

## TC-REG-004 — Niepoprawny format email

- **Cel:** Sprawdzić blokadę wysłania formularza dla niepoprawnego formatu email.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Użytkownik jest wylogowany i znajduje się na stronie rejestracji.
- **Dane testowe:** Email `invalid-email`; pozostałe wymagane pola wypełnione poprawnymi danymi fikcyjnymi.

**Kroki:**
1. Wypełnij formularz, używając niepoprawnego adresu email.
2. Kliknij **Create Account**.

**Oczekiwany rezultat:**
- Niepoprawny email blokuje wysłanie formularza i otrzymuje fokus.
- Użytkownik pozostaje na stronie `/register`; konto nie zostaje utworzone.

**Automatyzacja:** `test('TC-REG-004: rejects an invalid email format')` w [registration.spec.ts](./registration.spec.ts).
