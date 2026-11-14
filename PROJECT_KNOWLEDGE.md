# Baza wiedzy projektu

Krótki zapis zweryfikowanych informacji. Aktualizuj po potwierdzeniu trwałych zmian; nie zamieniaj niewiadomych w założone fakty.

## Potwierdzony stan techniczny
- Projekt jest opisany jako portfolio SDET mające prezentować podejście autora do testowania oprogramowania.
- Testy są w `tests/`, a konfiguracja Playwright w `playwright.config.ts`.
- Zależność testowa: `@playwright/test`. Konfiguracja uruchamia Chromium, Firefox i WebKit; reporter jest ustawiony na HTML.
- Testy UI są w `tests/`; scenariusze logowania, rejestracji i nawigacji VB Bank są odpowiednio w `tests/login.spec.ts`, `tests/registration.spec.ts` i `tests/navigation.spec.ts`. Rejestracja działa we wszystkich skonfigurowanych przeglądarkach i generuje unikalne fikcyjne dane.
- `tests/navigation.spec.ts` sprawdza sekcje panelu demonstracyjnego; w widoku John Doe Dashboard pokazuje transakcje, a History pustą listę. Oczekiwana zgodność tych danych wymaga potwierdzenia.
- `tests/banking-read-only.spec.ts` zawiera bezpieczne kontrole funkcji panelu bez przelewów, płatności ani zapisu zmian profilu.
- Przypadki testowe są dokumentowane per funkcja w `tests/login-test-cases.md`, `tests/registration-test-cases.md` i `tests/banking-functional-test-cases.md`; ostatni plik zawiera propozycje, które wymagają danych testowych i potwierdzenia reguł biznesowych. Zasady, szablon i polecenia opisuje `tests/test-case-guidelines.md`.
- GitHub Actions wykonuje `npm ci`, instaluje przeglądarki Playwright i uruchamia `npx playwright test` dla push/PR do `main` lub `master`.
- ESLint używa flat config w `eslint.config.mjs`, sprawdza JavaScript/TypeScript i pomija pliki Markdown. `npm run lint` uruchamia sprawdzanie.
- Husky uruchamia `npm run lint` w hooku `.husky/pre-commit`; lokalny hook można ominąć przez `git commit --no-verify`.
- `package.json` zawiera zależności Prettier, Husky i dotenv; sama obecność pakietu nie potwierdza jego konfiguracji ani użycia.
- Playwright ładuje zmienne z `.env/.env.default`, a w razie jego braku z `.env/.env.default.example`; wartość `BASE_URL` ustawiona w środowisku procesu ma pierwszeństwo. Nie potwierdzono konfiguracji testów API.
- Obiekty stron Playwright znajdują się w `tests/pages/`, a wspólne fixture’y w `tests/fixtures/`. Każdy test korzysta z izolowanego kontekstu; testy logowania nie używają współdzielonego `storageState`.

## Do doprecyzowania
- Docelowy zakres portfolio, odbiorcy i środowisko/aplikacja pod testem.
- Wymagania produktowe, docelowe środowisko testowe poza domyślnym demo oraz zakres przypadków API.
- Czy dodać lint do GitHub Actions i wymagać pozytywnego statusu CI przed scaleniem.
- Czy i jak skonfigurować dotenv oraz Prettier.

## Utrzymanie
- Zaktualizuj tę bazę, gdy repozytorium lub uzgodnione wymagania zmienią powyższy stan.
- Przy każdej informacji odróżniaj stan sprawdzony od planu lub otwartego pytania.
