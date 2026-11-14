# Przypadki testowe: nawigacja po panelu VB Bank

**Typ:** UI smoke test  
**Środowisko:** https://vb-bank-demo.vercel.app  
**Konto:** użytkownik testowy dostępny przez **Login as User**  
**Przeglądarki:** projekty skonfigurowane w Playwright

Przyjęte konwencje opisano w [standardzie dokumentacji](./test-case-guidelines.md).

## TC-APP-001 — Nawigacja po sekcjach panelu

- **Cel:** Potwierdzić dostęp do głównych sekcji panelu i widoczność ich kluczowej zawartości.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Użytkownik jest wylogowany.
- **Dane testowe:** Konto demonstracyjne **John Doe**.

**Kroki:**
1. Zaloguj się przez **Login as User**.
2. Sprawdź Dashboard, a następnie przejdź kolejno do **Transfer**, **History**, **Bills Payment**, **Cards**, **Loans**, **Top Up** i **Settings**.
3. Na każdej stronie sprawdź adres, główny nagłówek i kluczowe sekcje lub pola formularza.
4. W **Settings** otwórz **Change Password** i sprawdź pola oraz informację o minimalnej długości hasła.
5. Wróć do Dashboard i wyloguj się.

**Oczekiwany rezultat:**
- Każda zakładka otwiera właściwą stronę z oczekiwaną zawartością.
- Formularze płatności, przelewów i ustawień są tylko sprawdzane — test ich nie wysyła ani nie zapisuje.
- Użytkownik może wrócić do Dashboard i wylogować się.

**Uwaga dotycząca danych:** W aktualnym widoku demo Dashboard pokazuje transakcje, podczas gdy History pokazuje pustą listę. Test sprawdza strukturę obu stron, ale nie porównuje liczby transakcji do czasu potwierdzenia oczekiwanego zachowania.

**Automatyzacja:** `test('TC-APP-001: visits every banking section and checks its content')` w [navigation.spec.ts](./navigation.spec.ts).
