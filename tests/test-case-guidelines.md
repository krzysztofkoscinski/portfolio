# Standard dokumentowania przypadków testowych

## Proces

1. Ustal wymaganie i oczekiwany rezultat. Niewiadome zapisz jako pytania lub założenia do potwierdzenia.
2. Rozbij wymaganie na przypadki o jednym głównym celu; nadaj każdemu stałe, nieużywane wcześniej ID.
3. Opisz warunki wstępne, dane, kroki i obserwowalny rezultat.
4. Jeśli przypadek jest automatyzowany, użyj tego samego ID w tytule testu Playwright i dodaj odnośnik do pliku.
5. Przy zmianie zachowania zaktualizuj dokument i test w tym samym PR.
6. Wynik wykonania pozostaw w raporcie Playwright/CI; nie utrzymuj ręcznego statusu „zaliczony/niezaliczony” w opisie przypadku.

## Konwencje

- Przypadki są grupowane według funkcji w `login-test-cases.md`, `registration-test-cases.md` i `banking-functional-test-cases.md`.
- ID mają format `TC-<OBSZAR>-<NNN>` i nie są ponownie używane.
- Jeden przypadek powinien mieć jeden główny cel i jednoznaczny rezultat.
- Priorytet ustawiaj po uzgodnieniu; do tego czasu zapisuj **Do ustalenia**.
- Wartości brzegowe opisuj jako sprawdzane dane, a nie wymagania limitu, jeśli limit nie został określony.
- Używaj fikcyjnych danych. Zaznacz skutki uboczne, takie jak utworzenie trwałego konta w środowisku demo.

## Szablon

```markdown
## TC-AREA-001 — Nazwa przypadku

- **Cel:** ...
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** ...
- **Dane testowe:** ...

**Kroki:**
1. ...

**Oczekiwany rezultat:**
- ...

**Automatyzacja:** `test('TC-AREA-001: ...')` w [plik.spec.ts](./plik.spec.ts).
```

## Uruchamianie automatyzacji

- Wszystkie testy: `npx playwright test`
- Konkretny plik: `npx playwright test tests/login.spec.ts`
- Tylko przypadek po ID, np.: `npx playwright test --grep "TC-REG-004"`
- Raport HTML: `npx playwright show-report`
