# Przypadki testowe: logowanie VB Bank

**Typ:** UI  
**Środowisko:** https://vb-bank-demo.vercel.app/login  
**Przeglądarki:** Chromium, Firefox i WebKit (projekty skonfigurowane w Playwright)

Przyjęte konwencje opisano w [standardzie dokumentacji](./test-case-guidelines.md).

## TC-LOGIN-001 — Pomyślne logowanie użytkownika testowego

- **Cel:** Potwierdzić logowanie kontem użytkownika testowego.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Użytkownik jest wylogowany i znajduje się na stronie logowania.
- **Dane testowe:** Konto dostępne przez skrót **Login as User**.

**Kroki:**
1. Kliknij **Login as User** w sekcji **Quick Login (For Testing)**.

**Oczekiwany rezultat:**
- Następuje przekierowanie na `/dashboard`.
- W nagłówku widoczne są **John Doe** i rola **User**.
- Widoczny jest przycisk **Logout**.

**Automatyzacja:** `test('TC-LOGIN-001: logs in using the test user shortcut')` w [login.spec.ts](./login.spec.ts).

## TC-LOGIN-002 — Odrzucenie nieprawidłowych danych logowania

- **Cel:** Potwierdzić odrzucenie nieprawidłowych danych logowania.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Użytkownik jest wylogowany i znajduje się na stronie logowania.
- **Dane testowe:** `invalid.user@example.com` / `WrongPassword123!`.

**Kroki:**
1. W polu **Username** wpisz `invalid.user@example.com`.
2. W polu **Password** wpisz `WrongPassword123!`.
3. Kliknij **Login**.

**Oczekiwany rezultat:**
- Widoczny jest komunikat **Invalid username or password**.
- Użytkownik pozostaje na stronie `/login` i nie uzyskuje dostępu do dashboardu.

**Automatyzacja:** `test('TC-LOGIN-002: rejects invalid credentials')` w [login.spec.ts](./login.spec.ts).

## TC-LOGIN-003 — Wymagane hasło

- **Cel:** Sprawdzić walidację pustego pola **Password**.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Użytkownik jest wylogowany i znajduje się na stronie logowania.
- **Dane testowe:** Username `john.doe`; hasło puste.

**Kroki:**
1. W polu **Username** wpisz `john.doe`.
2. Pozostaw pole **Password** puste.
3. Kliknij **Login**.

**Oczekiwany rezultat:**
- Formularz nie loguje użytkownika ani nie opuszcza strony `/login`.
- Pole **Password** otrzymuje fokus, aby wskazać brakującą wartość.

**Automatyzacja:** `test('TC-LOGIN-003: requires a password')` w [login.spec.ts](./login.spec.ts).

## TC-LOGIN-004 — Wymagana nazwa użytkownika

- **Cel:** Sprawdzić walidację pustego pola **Username**.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Użytkownik jest wylogowany i znajduje się na stronie logowania.
- **Dane testowe:** Username i hasło puste.

**Kroki:**
1. Pozostaw pola **Username** i **Password** puste.
2. Kliknij **Login**.

**Oczekiwany rezultat:**
- Formularz nie loguje użytkownika ani nie opuszcza strony `/login`.
- Pole **Username** otrzymuje fokus jako pierwsze wymagane pole.

**Automatyzacja:** `test('TC-LOGIN-004: requires a username')` w [login.spec.ts](./login.spec.ts).
